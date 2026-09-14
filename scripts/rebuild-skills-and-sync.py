#!/usr/bin/env python3
import os, sys, json, re, shutil, zipfile, subprocess

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_PATH = os.path.join(BASE_DIR, 'src/data/commandsData.json')
PUBLIC_API_PATH = os.path.join(BASE_DIR, 'public/api/skills.json')
PUBLIC_ZIP_PATH = os.path.join(BASE_DIR, 'public/kortexdeck_500_skills.zip')
CATALOG_DIR = os.path.expanduser('~/.gemini/antigravity/scratch/skills_catalog')

print("🧠 [KORTEXDECK HOOK] Regenerating skills API, catalogs, and syncing agents...")

if not os.path.exists(DATA_PATH):
    print(f"❌ Error: {DATA_PATH} not found!")
    sys.exit(1)

with open(DATA_PATH, 'r', encoding='utf-8') as f:
    skills = json.load(f)

total = len(skills)
print(f"  ⚡ Loaded {total} skills from {DATA_PATH}")

# 1. Update public/api/skills.json
os.makedirs(os.path.dirname(PUBLIC_API_PATH), exist_ok=True)
with open(PUBLIC_API_PATH, 'w', encoding='utf-8') as f:
    json.dump({
        'total': total,
        'version': '2.5.0',
        'updated_at': subprocess.check_output(['date', '+%Y-%m-%d']).decode().strip(),
        'skills': skills
    }, f, indent=2, ensure_ascii=False)
print(f"  ✓ Updated {PUBLIC_API_PATH}")

# 2. Rebuild catalog directories and SKILL.md files
if os.path.exists(CATALOG_DIR):
    shutil.rmtree(CATALOG_DIR)
os.makedirs(CATALOG_DIR, exist_ok=True)

index_md = [
    "# 🧠 KortexDeck 500+ Curated SKILL.md Master Index",
    f"**Total Registered Skills**: {total}",
    "",
    "| ID | Title | Platform | Category | Type | Command |",
    "|---|---|---|---|---|---|"
]

for s in skills:
    s_id = s.get('id', 'skill')
    s_id = re.sub(r'[^a-zA-Z0-9_-]', '_', s_id).lower()
    
    skill_folder = os.path.join(CATALOG_DIR, s_id)
    os.makedirs(skill_folder, exist_ok=True)
    skill_file = os.path.join(skill_folder, 'SKILL.md')
    
    title = s.get('title', 'Skill')
    command = s.get('command', '')
    platform = s.get('platform', 'universal')
    category = s.get('category', 'General')
    type_name = s.get('type', 'Autonomous Rule')
    summary = s.get('summary', '').replace('\n', ' ')
    desc = s.get('description', summary)
    example = s.get('example', '')
    tags = ', '.join([f'"{t}"' for t in s.get('tags', [])])
    syntax = s.get('syntax', command)
    difficulty = s.get('difficulty', 'Advanced')
    
    content = f"""---
name: {s_id}
description: "{summary}"
category: "{category}"
platform: "{platform}"
type: "{type_name}"
difficulty: "{difficulty}"
tags: [{tags}]
---

# {title}

> **Platform**: `{platform.upper()}` | **Category**: `{category}` | **Type**: `{type_name}` | **Difficulty**: `{difficulty}`

## 1. Executive Summary & Purpose
{desc}

## 2. Activation Syntax & Command Line
```bash
{syntax}
```

## 3. Core Behavioral Directives & Execution Protocol
1. **Context Initialization**: Prioritize zero-latency client-side execution, defensive boundaries, and strict type safety.
2. **Autonomous Execution**: When triggered via `{command}`, execute all sub-tasks systematically until complete verification.
3. **Safety & Privacy**: Sanitize all inputs. Never log or transmit authentication credentials, private tokens, or sensitive user environment data.
4. **Error Handling**: Gracefully recover from network or parsing anomalies with actionable diagnostic logs.

## 4. Practical Implementation Example
```markdown
{example}
```

## 5. Multi-Platform Agent Compatibility Matrix
- **Google Antigravity**: Native support via `/goal`, `/schedule`, and rule sidecars.
- **Anthropic Claude Code**: Integrated into `CLAUDE.md` and XML system prompt blocks.
- **Cursor IDE**: Direct compilation into `.cursorrules` and semantic index queries.
- **Windsurf / Codex / Cline / Roo Code**: Universal MCP and system prompt compatible.
"""
    with open(skill_file, 'w', encoding='utf-8') as sf:
        sf.write(content)
    index_md.append(f"| `{s_id}` | **{title}** | `{platform}` | {category} | `{type_name}` | `{command}` |")

with open(os.path.join(CATALOG_DIR, 'README.md'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index_md))

# 3. Create ZIP archive
with zipfile.ZipFile(PUBLIC_ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(CATALOG_DIR):
        for file in files:
            abs_f = os.path.join(root, file)
            rel_f = os.path.relpath(abs_f, CATALOG_DIR)
            zipf.write(abs_f, rel_f)
print(f"  ✓ Updated {PUBLIC_ZIP_PATH} ({os.path.getsize(PUBLIC_ZIP_PATH)} bytes)")

# 4. Run local agent live sync
sync_script = os.path.join(BASE_DIR, 'public/sync.sh')
if os.path.exists(sync_script):
    subprocess.run(['bash', sync_script], check=True)

print("🚀 [KORTEXDECK HOOK] Pipeline executed successfully! All agent environments updated.")
