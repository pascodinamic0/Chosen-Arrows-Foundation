---
allowed-tools: [Read, Grep, Glob, Bash, Edit, MultiEdit]
description: "Clean up code, remove dead code, and optimize project structure"
---

# /cleanup - Code and Project Cleanup

## Purpose
Systematically clean up code, remove dead code, optimize imports, and improve project structure.

## Usage
```
/cleanup [target] [--type code|imports|files|all] [--safe|--aggressive] [--dry-run]
```

## Arguments
- `target` - Files, directories, or entire project to clean
- `--type` - Cleanup type (code, imports, files, dependencies, all)
- `--safe` - Conservative cleanup (default)
- `--aggressive` - More thorough cleanup with higher risk
- `--dry-run` - Preview changes without applying them
- `--backup` - Create backup before cleanup

## Cleanup Types

### Code Cleanup
- Remove dead code
- Remove unused functions
- Remove commented-out code
- Remove console.logs
- Remove debugger statements
- Remove TODO/FIXME comments (optional)

### Import Cleanup
- Remove unused imports
- Organize import statements
- Sort imports alphabetically
- Group imports (external, internal)
- Remove duplicate imports

### File Cleanup
- Remove unused files
- Remove empty files
- Remove duplicate files
- Clean up temporary files
- Remove build artifacts

### Dependency Cleanup
- Remove unused dependencies
- Update outdated dependencies
- Remove duplicate dependencies
- Clean up node_modules

## Execution Flow
1. **Analysis Phase**
   - Scan target for cleanup opportunities
   - Identify dead code patterns
   - Detect unused imports
   - Find redundant files

2. **Planning Phase**
   - Create cleanup plan
   - Assess risk level
   - Categorize cleanup items
   - Prioritize safe changes

3. **Backup Phase** (if --backup)
   - Create backup of target
   - Store backup location
   - Verify backup integrity

4. **Cleanup Phase**
   - Execute cleanup operations
   - Apply changes incrementally
   - Validate each change
   - Track cleanup progress

5. **Validation Phase**
   - Verify code still compiles
   - Run tests if available
   - Check for broken references
   - Report cleanup results

## Cleanup Code Integration
- Uses Glob for systematic file discovery
- Leverages Grep for dead code detection
- Uses Read for code analysis
- Applies MultiEdit for batch cleanup operations
- Uses Bash for file operations
- Uses Edit for individual file cleanup
- Maintains backup and rollback capabilities

## Cleanup Patterns

### Dead Code Detection
```bash
# Find unused exports
grep -r "export" . | grep -v "import"

# Find unused functions
grep -r "function\|const.*=" . | analyze-usage

# Find unused variables
grep -r "const\|let\|var" . | check-usage
```

### Import Analysis
```bash
# Find unused imports
eslint --fix --rule "no-unused-vars: error" .

# Organize imports
organize-imports --write .
```

### File Analysis
```bash
# Find unused files
find . -name "*.ts" -o -name "*.tsx" | check-usage

# Find empty files
find . -empty -type f
```

## Safety Mechanisms

### Safe Mode (Default)
- Only remove obviously unused code
- Preserve commented code
- Keep TODO comments
- Conservative file removal

### Aggressive Mode
- More thorough cleanup
- Remove commented code
- Remove TODO comments
- More aggressive file removal

### Dry Run Mode
- Preview all changes
- Show what would be removed
- No actual changes applied
- Safe to test

## Examples
```
/cleanup app/components --type imports --safe
/cleanup . --type code --aggressive --dry-run
/cleanup app/ --type all --backup
/cleanup --type files --safe
```

## Integration with Other Commands
- **/format**: Format code after cleanup
- **/refactor**: Refactor cleaned code
- **/test**: Run tests after cleanup
- **/analyze**: Analyze cleanup impact

## Rollback Capability
- Store original code state
- Track all changes made
- Provide rollback commands
- Verify rollback success
