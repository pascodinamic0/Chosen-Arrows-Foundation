---
allowed-tools: [Read, Grep, Glob, Edit, MultiEdit, TodoWrite]
description: "Apply systematic improvements to code quality, performance, and maintainability"
---

# /improve - Code Improvement

## Purpose
Apply systematic improvements to code quality, performance, maintainability, and best practices.

## Usage
```
/improve [target] [--type quality|performance|maintainability|style] [--safe] [--preview]
```

## Arguments
- `target` - Files, directories, or project to improve
- `--type` - Improvement type (quality, performance, maintainability, style, all)
- `--safe` - Apply only safe, low-risk improvements
- `--preview` - Show improvements without applying them
- `--iterative` - Apply improvements incrementally

## Improvement Types

### Quality Improvements
- Code readability enhancements
- Error handling improvements
- Type safety improvements
- Code organization improvements
- Best practices application

### Performance Improvements
- Optimization opportunities
- Unnecessary re-render prevention
- Database query optimization
- Bundle size reduction
- Memory leak fixes

### Maintainability Improvements
- Code structure improvements
- Documentation additions
- Naming convention improvements
- Code organization improvements
- Dependency management

### Style Improvements
- Code formatting
- Naming consistency
- Import organization
- Comment improvements
- Code style consistency

## Execution Flow
1. **Analysis Phase**
   - Analyze code for improvement opportunities
   - Identify specific improvement patterns
   - Assess current code quality
   - Prioritize improvements

2. **Planning Phase**
   - Create improvement plan
   - Assess risk level
   - Categorize improvements
   - Plan implementation

3. **Preview Phase** (if --preview)
   - Show proposed improvements
   - Explain changes
   - Allow review before applying

4. **Application Phase**
   - Apply improvements incrementally
   - Validate each change
   - Test improvements
   - Track progress

5. **Validation Phase**
   - Verify improvements
   - Run tests
   - Check for regressions
   - Report results

## Improve Code Integration
- Uses Read for comprehensive code analysis
- Leverages Grep for pattern detection
- Uses Glob for file discovery
- Applies MultiEdit for batch improvements
- Uses Edit for individual improvements
- Applies TodoWrite for improvement tracking
- Maintains safety and validation mechanisms

## Improvement Patterns

### Code Quality Patterns
- Extract complex logic into functions
- Improve error handling
- Add type safety
- Improve code organization
- Apply design patterns

### Performance Patterns
- Optimize React components
- Improve database queries
- Reduce bundle size
- Optimize images
- Implement caching

### Maintainability Patterns
- Improve code structure
- Add documentation
- Standardize naming
- Organize imports
- Reduce complexity

## Safety Mechanisms

### Safe Mode (Default)
- Only apply safe improvements
- Preserve functionality
- Maintain backward compatibility
- Test before applying

### Preview Mode
- Show all improvements
- Explain changes
- Allow selective application
- No actual changes

## Examples
```
/improve app/components --type quality --safe
/improve app/api --type performance --preview
/improve . --type all --iterative
/improve app/utils --type maintainability
```

## Integration with Other Commands
- **/test**: Run tests after improvements
- **/format**: Format code after improvements
- **/refactor**: Combine with refactoring
- **/review**: Review improvement quality

## Improvement Validation

### Pre-Application Checks
- Code compiles
- Tests pass
- No breaking changes
- Backward compatible

### Post-Application Checks
- Code still compiles
- Tests still pass
- Functionality preserved
- Performance improved
