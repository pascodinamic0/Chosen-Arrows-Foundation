---
allowed-tools: [Read, Grep, Bash, Glob]
description: "Compare code versions, files, and implementations with diff analysis"
---

# /compare - Code Comparison

## Purpose
Compare code versions, files, implementations, and branches with comprehensive diff analysis and change detection.

## Usage
```
/compare [source] [target] [--type file|branch|commit|implementation] [--format unified|split|summary]
```

## Arguments
- `source` - Source file, branch, or commit
- `target` - Target file, branch, or commit
- `--type` - Comparison type (file, branch, commit, implementation)
- `--format` - Output format (unified, split, summary)
- `--context` - Number of context lines
- `--ignore-whitespace` - Ignore whitespace changes

## Comparison Types

### File Comparison
- Compare two files
- Show differences
- Highlight changes
- Display line-by-line diff

### Branch Comparison
- Compare branches
- Show branch differences
- List changed files
- Display commit differences

### Commit Comparison
- Compare commits
- Show commit changes
- Display file changes
- Highlight modifications

### Implementation Comparison
- Compare implementations
- Show approach differences
- Highlight code patterns
- Display performance differences

## Execution Flow
1. **Preparation Phase**
   - Load source and target
   - Parse code structures
   - Prepare comparison
   - Set up diff algorithm

2. **Comparison Phase**
   - Compare code structures
   - Detect differences
   - Identify changes
   - Calculate diff

3. **Analysis Phase**
   - Analyze change types
   - Categorize changes
   - Assess impact
   - Identify patterns

4. **Presentation Phase**
   - Format diff output
   - Highlight changes
   - Show context
   - Provide summary

## Compare Code Integration
- Uses Bash for Git diff operations
- Leverages Read for file comparison
- Uses Grep for pattern matching
- Uses Glob for file discovery
- Maintains structured diff reporting

## Comparison Tools

### Git Diff
```bash
# Compare files
git diff file1.ts file2.ts

# Compare branches
git diff main..feature-branch

# Compare commits
git diff commit1 commit2
```

### File Comparison
```bash
# Compare files
diff -u file1.ts file2.ts

# Compare directories
diff -r dir1/ dir2/
```

## Comparison Formats

### Unified Format
```diff
--- file1.ts
+++ file2.ts
@@ -1,3 +1,3 @@
-function oldFunction() {
+function newFunction() {
   return true;
 }
```

### Split Format
- Side-by-side comparison
- Left: source
- Right: target
- Highlighted differences

### Summary Format
- Change statistics
- File list
- Change types
- Impact assessment

## Examples
```
/compare app/components/UserCard.tsx app/components/UserCard.new.tsx
/compare main feature-branch --type branch
/compare HEAD~1 HEAD --type commit
/compare "old implementation" "new implementation" --type implementation
```

## Integration with Other Commands
- **/review**: Compare code during review
- **/refactor**: Compare before/after refactoring
- **/git**: Use Git diff for comparison
- **/analyze**: Analyze differences

## Comparison Features

### Change Detection
- Added lines
- Removed lines
- Modified lines
- Moved code blocks

### Impact Analysis
- Change scope
- Affected files
- Breaking changes
- Compatibility impact

### Visualization
- Color-coded diffs
- Line highlighting
- Change indicators
- Context display

