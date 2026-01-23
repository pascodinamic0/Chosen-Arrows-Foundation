---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite]
description: "Analyze code quality, security, performance, and architecture"
---

# /analyze - Code Analysis

## Purpose
Execute comprehensive code analysis across quality, security, performance, and architecture domains.

## Usage
```
/analyze [target] [--focus quality|security|performance|architecture] [--depth quick|deep] [--format text|json|report]
```

## Arguments
- `target` - Files, directories, or project to analyze
- `--focus` - Analysis focus area (quality, security, performance, architecture, all)
- `--depth` - Analysis depth (quick, deep, comprehensive)
- `--format` - Output format (text, json, report)
- `--output` - Output file path for report

## Analysis Types

### Quality Analysis
- Code readability and maintainability
- Code organization and structure
- Naming conventions adherence
- Code duplication detection
- Complexity analysis
- Best practices compliance

### Security Analysis
- Security vulnerability detection
- Authentication/authorization issues
- Data exposure risks
- SQL injection vulnerabilities
- XSS vulnerabilities
- Secret management issues
- Input validation gaps
- RLS policy verification

### Performance Analysis
- Performance bottlenecks
- Unnecessary re-renders
- Database query optimization
- Bundle size analysis
- Memory leak detection
- Async operation efficiency
- Resource loading optimization

### Architecture Analysis
- Design pattern usage
- Component structure
- API design quality
- Database schema design
- Integration patterns
- Scalability considerations

## Execution Flow
1. **Discovery Phase**
   - Discover files matching target pattern
   - Categorize files by type and purpose
   - Identify analysis scope

2. **Analysis Phase**
   - Apply appropriate analysis tools
   - Detect patterns and issues
   - Generate findings with severity ratings

3. **Evaluation Phase**
   - Prioritize findings by severity
   - Create actionable recommendations
   - Assess impact and risk

4. **Reporting Phase**
   - Generate comprehensive analysis report
   - Format findings for readability
   - Provide remediation guidance

## Analyze Code Integration
- Uses Glob for systematic file discovery
- Leverages Grep for pattern-based analysis
- Applies Read for deep code inspection
- Uses Bash for tool execution
- Applies TodoWrite for analysis tracking
- Maintains structured analysis reporting

## Analysis Tools

### Code Quality Tools
```bash
# ESLint analysis
pnpm eslint --format json .

# TypeScript analysis
pnpm typecheck

# Complexity analysis
npm run complexity-check
```

### Security Tools
```bash
# Dependency vulnerabilities
pnpm audit

# Security patterns
grep -r "eval\|innerHTML\|dangerouslySetInnerHTML" .
```

### Performance Tools
```bash
# Bundle analysis
pnpm build --analyze

# Performance profiling
npm run profile
```

## Examples
```
/analyze app/components --focus quality --depth deep
/analyze app/api --focus security --format report
/analyze . --focus performance --output analysis-report.json
/analyze app/ --focus all --depth comprehensive
```

## Integration with Other Commands
- **/review**: Use analysis results for code review
- **/improve**: Apply improvements based on analysis findings
- **/refactor**: Identify refactoring opportunities
- **/troubleshoot**: Analyze error-prone areas

## Report Format

### Summary Section
- Overall code quality score
- Critical issues count
- Warning count
- Suggestions count

### Findings by Category
- Security issues
- Performance issues
- Quality issues
- Architecture issues

### Detailed Findings
- Issue location (file:line)
- Issue severity (critical/high/medium/low)
- Issue description
- Recommended fix
- Code example
