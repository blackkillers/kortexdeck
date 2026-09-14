#!/usr/bin/env bash
# ==============================================================================
# KORTEXDECK - UNIVERSAL AGENT LIVE SYNCHRONIZER
# Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)
# ==============================================================================

set -e

CYAN='\033[0;36m'
AMBER='\033[0;33m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║    🧠 KORTEXDECK - Universal Agent Neural Synchronizer (v2.5)   ║${NC}"
echo -e "${CYAN}║    Multi-Platform Bridge: Antigravity • Claude • Cursor • Codex  ║${NC}"
echo -e "${CYAN}║    Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)     ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"

HOME_DIR="${HOME:-/Users/$USER}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

ANTIGRAVITY_DIR="$HOME_DIR/.gemini/antigravity/rules"
ANTIGRAVITY_DEST="$ANTIGRAVITY_DIR/kortexdeck.rule"
CLAUDE_DIR="$HOME_DIR/.claude"
CLAUDE_DEST="$CLAUDE_DIR/CLAUDE.md"
CURSOR_DEST="$HOME_DIR/.cursorrules"
CODEX_DEST="$HOME_DIR/.codex_system_prompt.json"

echo -e "\n${AMBER}[1/4] Connecting to KortexDeck Neural Gateway...${NC}"
API_URL="https://cohenwebstudio.com/kortexdeck/api/skills.json"
TEMP_JSON="/tmp/kortexdeck_skills_${TIMESTAMP}.json"

if curl -sSL -f "$API_URL" -o "$TEMP_JSON" 2>/dev/null; then
    echo -e "  ${GREEN}✓ Connected to live KortexDeck API (${API_URL})${NC}"
else
    echo -e "  ${AMBER}ℹ Live network fetch unavailable, inspecting local scratch files...${NC}"
    LOCAL_DATA="/Users/ilan/.gemini/antigravity/scratch/omnicommand-hub/src/data/commandsData.json"
    if [ -f "$LOCAL_DATA" ]; then
        cp "$LOCAL_DATA" "$TEMP_JSON"
        echo -e "  ${GREEN}✓ Loaded 530+ skills from local KortexDeck core${NC}"
    else
        echo -e "  ${RED}✗ Error: Unable to fetch KortexDeck skills database.${NC}"
        exit 1
    fi
fi

mkdir -p "$ANTIGRAVITY_DIR" "$CLAUDE_DIR"

echo -e "\n${AMBER}[2/4] Generating safety backups (.bak)...${NC}"
[ -f "$ANTIGRAVITY_DEST" ] && cp "$ANTIGRAVITY_DEST" "${ANTIGRAVITY_DEST}.bak_${TIMESTAMP}" && echo -e "  ✓ Backed up: $ANTIGRAVITY_DEST"
[ -f "$CLAUDE_DEST" ] && cp "$CLAUDE_DEST" "${CLAUDE_DEST}.bak_${TIMESTAMP}" && echo -e "  ✓ Backed up: $CLAUDE_DEST"
[ -f "$CURSOR_DEST" ] && cp "$CURSOR_DEST" "${CURSOR_DEST}.bak_${TIMESTAMP}" && echo -e "  ✓ Backed up: $CURSOR_DEST"

echo -e "\n${AMBER}[3/4] Compiling 530+ Curated Skills across all agent runtimes...${NC}"

KORTEX_JSON_PATH="$TEMP_JSON" python3 - << 'PYEOF'
import json, os, sys

json_path = os.environ.get('KORTEX_JSON_PATH', '/tmp/kortexdeck_skills.json')
home = os.path.expanduser('~')

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        skills = data.get('skills', data) if isinstance(data, dict) else data
except Exception as e:
    print(f"Parsing error: {e}")
    sys.exit(1)

total = len(skills)
print(f"  ⚡ Parsed {total} active skills and system directives.")

# 1. Google Antigravity
agy_path = os.path.join(home, '.gemini/antigravity/rules/kortexdeck.rule')
os.makedirs(os.path.dirname(agy_path), exist_ok=True)
with open(agy_path, 'w', encoding='utf-8') as f:
    f.write(f"# Google Antigravity Rules Configuration\n")
    f.write(f"# Synchronized from KortexDeck (Cohen Web Studio)\n")
    f.write(f"# Total Skills Active: {total}\n\n")
    f.write("[KORTEXDECK_AI_STACK]\nPlatform: Google Antigravity 2.0\n\n")
    for i, s in enumerate(skills, 1):
        f.write(f"## Skill {i}: {s.get('title')}\n")
        f.write(f"Command: {s.get('command')}\n")
        f.write(f"Type: {s.get('type')}\n")
        f.write(f"Category: {s.get('category')}\n")
        f.write(f"Directive: {s.get('summary')}\n")
        if s.get('example'):
            f.write(f"Example: {s.get('example')}\n")
        f.write("\n")

# 2. Claude Code CLAUDE.md
claude_path = os.path.join(home, '.claude/CLAUDE.md')
os.makedirs(os.path.dirname(claude_path), exist_ok=True)
with open(claude_path, 'w', encoding='utf-8') as f:
    f.write(f"# CLAUDE.md - KortexDeck Universal Agent Stack\n")
    f.write(f"# Synchronized from: https://cohenwebstudio.com/kortexdeck\n")
    f.write(f"# Active Directives & Skills: {total}\n\n")
    f.write("## Execution Directives & Tool Registry\n\n")
    for i, s in enumerate(skills, 1):
        f.write(f"### {i}. {s.get('title')}\n")
        f.write(f"- **Command**: `{s.get('command')}`\n")
        f.write(f"- **Category**: {s.get('category')} | **Type**: {s.get('type')}\n")
        f.write(f"- **Role**: {s.get('summary')}\n")
        f.write(f"- **Pattern**: {s.get('example')}\n\n")

# 3. Cursor .cursorrules
cursor_path = os.path.join(home, '.cursorrules')
with open(cursor_path, 'w', encoding='utf-8') as f:
    f.write(f"# .cursorrules - KortexDeck Master Rule Set ({total} Skills)\n")
    f.write(f"# Powered by Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)\n\n")
    f.write("# CORE INVARIANTS\n")
    f.write("- Strict TypeScript typing, zero 'any', Zod boundary validation.\n")
    f.write("- OWASP security standards enforcement and PostgreSQL RLS protection.\n")
    f.write("- Modular architecture with clean separation of concerns.\n\n")
    f.write(f"# ACTIVE SKILLS REGISTRY ({total} ITEMS)\n\n")
    for s in skills:
        f.write(f"## [{s.get('platform', 'UNIVERSAL').upper()}] {s.get('title')}\n")
        f.write(f"# Command: {s.get('command')}\n")
        f.write(f"# Rule: {s.get('summary')}\n")
        f.write(f"# Example: {s.get('example')}\n\n")

# 4. OpenAI Codex system_prompt.json
codex_path = os.path.join(home, '.codex_system_prompt.json')
with open(codex_path, 'w', encoding='utf-8') as f:
    json.dump({
        "kortexdeck_version": "2.5.0",
        "synced_at": "2026-09-14",
        "total_skills": total,
        "source": "https://cohenwebstudio.com/kortexdeck",
        "skills": skills
    }, f, indent=2)

print(f"  ✨ Synchronized all {total} skills into agent files successfully!")
PYEOF

echo -e "\n${GREEN}[4/4] 🚀 SYNCHRONIZATION COMPLETE!${NC}"
echo -e "  🌟 ${BOLD}Google Antigravity${NC} : $ANTIGRAVITY_DEST"
echo -e "  🌟 ${BOLD}Anthropic Claude${NC}   : $CLAUDE_DEST"
echo -e "  🌟 ${BOLD}Cursor IDE Composer${NC}: $CURSOR_DEST"
echo -e "  🌟 ${BOLD}OpenAI Codex${NC}       : $CODEX_DEST"
echo -e "\n${CYAN}All AI agents are now connected and powered by KortexDeck (530+ skills).${NC}\n"

rm -f "$TEMP_JSON"
