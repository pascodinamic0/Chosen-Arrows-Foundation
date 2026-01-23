---
allowed-tools: [Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Bash]
description: "Systematically refactor code to improve structure without changing behavior"
---

# /refactor - Code Refactoring

## Purpose
Systematically refactor code to improve structure, readability, and maintainability without changing external behavior.

## Usage
```
/refactor [target] [--type extract|rename|restructure|consolidate] [--safe] [--test]
```

## Arguments
- `target` - Files, directories, or code patterns to refactor
- `--type` - Refactoring type (extract, rename, restructure, consolidate, all)
- `--safe` - Apply only safe refactorings with behavior preservation guarantees
- `--test` - Run tests before and after refactoring to verify behavior
- `--dry-run` - Preview refactoring changes without applying them
- `--scope` - Refactoring scope (function, class, module, file, project)

## Refactoring Types

### Extract
- Extract function/method from inline code
- Extract constant/variable from magic numbers/strings
- Extract component from JSX/TSX
- Extract interface/type from implementation

### Rename
- Rename variables, functions, classes, files
- Update all references across codebase
- Handle imports/exports automatically
- Preserve git history where possible

### Restructure
- Move code between files/modules
- Reorganize file structure
- Split large files into smaller modules
- Merge related code into cohesive units

### Consolidate
- Remove duplicate code
- Unify similar patterns
- Consolidate related functionality
- Merge overlapping abstractions

## Execution
1. Analyze target code and identify refactoring opportunities
2. Detect dependencies and usage patterns across codebase
3. Create refactoring plan with risk assessment
4. Apply refactorings incrementally with validation
5. Verify behavior preservation through testing
6. Update documentation and references

## Refactor Code Integration
- Uses Read for comprehensive code analysis
- Leverages Grep for pattern detection and reference tracking
- Applies MultiEdit for coordinated multi-file changes
- Uses Glob for systematic file discovery
- Applies TodoWrite for refactoring progress tracking
- Uses Bash for test execution and validation
- Maintains behavior preservation guarantees

## Safety Mechanisms
- **Pre-refactoring Analysis**: Detect all usages and dependencies
- **Incremental Application**: Apply changes in small, verifiable steps
- **Test Validation**: Run tests before and after each refactoring
- **Rollback Capability**: Maintain ability to revert changes
- **Reference Tracking**: Ensure all references are updated correctly

## Examples
```
/refactor components/UserCard.tsx --type extract --safe
/refactor utils/ --type rename --dry-run
/refactor app/api/ --type restructure --test
/refactor lib/ --type consolidate --scope module
```

## Integration with Other Commands
- **/test**: Run tests to verify refactoring safety
- **/analyze**: Analyze code before refactoring to identify opportunities
- **/improve**: Apply improvements alongside refactoring
- **/document**: Update documentation after refactoring

