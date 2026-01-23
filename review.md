---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite, mcp__sequential-thinking__sequentialthinking]
description: "Review code for quality, security, performance, and best practices"
---

# /review - Code Review

## Purpose
Comprehensive code review for quality, security, performance, best practices, and adherence to project standards.

## Usage
```
/review [target] [--type quality|security|performance|all] [--level basic|detailed]
```

## Arguments
- `target` - Files, directories, PR, or commit to review
- `--type` - Review type (quality, security, performance, architecture, all)
- `--level` - Review depth (basic, detailed, comprehensive)
- `--focus` - Focus areas (bugs, security, performance, style)
- `--compare` - Compare with base branch/commit
- `--suggest` - Provide improvement suggestions
- `--report` - Generate detailed review report

## Review Types

### Quality Review
- Code readability and maintainability
- Code organization and structure
- Naming conventions
- Code duplication
- Complexity analysis
- Best practices adherence

### Security Review
- Security vulnerabilities
- Authentication/authorization issues
- Data exposure risks
- SQL injection risks
- XSS vulnerabilities
- Secret management
- Input validation
- RLS policy verification

### Performance Review
- Performance bottlenecks
- Unnecessary re-renders
- Database query optimization
- Bundle size analysis
- Memory leaks
- Async operation efficiency

### Architecture Review
- Design patterns usage
- Component structure
- API design
- Database schema
- Integration patterns
- Scalability considerations

## Review Code Integration
- Uses Read for comprehensive code analysis
- Leverages Grep for pattern detection
- Uses Glob for file discovery
- Uses Bash for tool execution
- Applies TodoWrite for review tracking
- Integrates Sequential thinking for complex analysis
- Maintains structured review reporting

## Review Process

### 1. Code Analysis
```bash
# Analyze code structure
grep -r "TODO\|FIXME\|HACK" .
grep -r "console.log\|debugger" .
grep -r "any\|@ts-ignore" .

# Check for common issues
eslint --format json .
tsc --noEmit
```

### 2. Security Scanning
```bash
# Dependency vulnerabilities
pnpm audit

# Security patterns
grep -r "eval\|innerHTML\|dangerouslySetInnerHTML" .
grep -r "process.env" .
grep -r "localStorage\|sessionStorage" .
```

### 3. Performance Analysis
```bash
# Bundle analysis
pnpm build --analyze

# Check for performance issues
grep -r "useEffect\|useMemo\|useCallback" .
```

### 4. Quality Checks
```bash
# Code complexity
npm run complexity-check

# Test coverage
npm run test:coverage
```

## Review Checklist

### General Quality
- [ ] Code follows project style guide
- [ ] No console.logs or debuggers
- [ ] No TODO/FIXME comments
- [ ] Proper error handling
- [ ] Type safety (no `any` types)
- [ ] Meaningful variable names
- [ ] Functions are focused and small
- [ ] No code duplication

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Authentication checks
- [ ] Authorization checks
- [ ] RLS policies enabled
- [ ] Secure API endpoints

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper memoization
- [ ] Efficient database queries
- [ ] Optimized images/assets
- [ ] Code splitting implemented
- [ ] Lazy loading where appropriate

### Architecture
- [ ] Proper separation of concerns
- [ ] Consistent patterns
- [ ] Reusable components
- [ ] Clear API contracts
- [ ] Proper error boundaries

## Review Report Format

### Summary
- Overall score (1-10)
- Critical issues count
- Warning count
- Suggestions count

### Issues by Category
- Security issues
- Performance issues
- Quality issues
- Architecture issues

### Detailed Findings
- Issue location (file:line)
- Issue severity (critical/high/medium/low)
- Issue description
- Suggested fix
- Code example

## Examples
```
/review app/components/UserCard.tsx --type quality
/review app/api/ --type security --level detailed
/review --compare main --type all
/review --focus bugs --suggest
/review --report review-report.md
```

## Integration with Other Commands
- **/analyze**: Use analysis results in review
- **/test**: Include test coverage in review
- **/improve**: Generate improvement suggestions
- **/troubleshoot**: Review error-prone areas

## Automated Review Rules

### Critical Issues (Must Fix)
- Security vulnerabilities
- Data leaks
- Authentication bypasses
- SQL injection risks
- XSS vulnerabilities

### High Priority (Should Fix)
- Performance bottlenecks
- Memory leaks
- Type safety issues
- Error handling gaps

### Medium Priority (Consider Fixing)
- Code duplication
- Complexity issues
- Style inconsistencies
- Missing documentation

### Low Priority (Nice to Have)
- Minor optimizations
- Code style improvements
- Documentation enhancements

## Review Tools Integration

### ESLint
```bash
eslint --format json --output-file review-eslint.json .
```

### TypeScript
```bash
tsc --noEmit --pretty false > review-typescript.txt
```

### Security Audit
```bash
pnpm audit --json > review-security.json
```

### Test Coverage
```bash
npm run test:coverage -- --json > review-coverage.json
```

## Review Best Practices
- Focus on code, not the author
- Provide constructive feedback
- Suggest specific improvements
- Explain reasoning behind suggestions
- Prioritize critical issues
- Balance perfectionism with pragmatism

