#!/usr/bin/env bash
# ==============================================================================
# Setup Git Hooks for KortexDeck
# ==============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOKS_DIR="$ROOT_DIR/.git/hooks"

mkdir -p "$HOOKS_DIR"

# 1. Post-Commit Hook (triggers sync immediately after commit)
cat << 'EOF' > "$HOOKS_DIR/post-commit"
#!/usr/bin/env bash
set -e

# Check if skills data or scripts were part of the latest commit
CHANGED_FILES=$(git diff-tree -r --no-commit-id --name-only HEAD)

if echo "$CHANGED_FILES" | grep -qE "src/data/commandsData.json|scripts/|public/api/"; then
    echo "⚡ [Git Hook: post-commit] Detected skill dataset changes. Triggering auto-sync..."
    python3 scripts/rebuild-skills-and-sync.py
fi
EOF

# 2. Pre-Push Hook (ensures everything is built, tested, and synced before push)
cat << 'EOF' > "$HOOKS_DIR/pre-push"
#!/usr/bin/env bash
set -e

echo "🔒 [Git Hook: pre-push] Validating build, test suite, and skills synchronization..."

# Run rebuild and sync
python3 scripts/rebuild-skills-and-sync.py

# Run tests
npm test

# Run build
npm run build

echo "✅ [Git Hook: pre-push] All checks and synchronizations passed cleanly!"
EOF

chmod +x "$HOOKS_DIR/post-commit" "$HOOKS_DIR/pre-push"
chmod +x "$ROOT_DIR/scripts/rebuild-skills-and-sync.py"

echo "🎉 Git hooks installed successfully in $HOOKS_DIR:"
echo "   - post-commit: Auto-rebuilds and syncs agents when skills change"
echo "   - pre-push: Validates tests, builds, and syncs before every push"
