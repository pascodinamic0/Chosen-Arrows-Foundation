---
allowed-tools: [Read, Bash, Glob, Grep, TodoWrite]
description: "Validate code, schemas, configurations, and project integrity"
---

# /validate - Code Validation

## Purpose
Validate code quality, schemas, configurations, and project integrity through linting, type checking, and comprehensive validation checks.

## Usage
```
/validate [target] [--type lint|type|schema|config|all] [--fix] [--strict]
```

## Arguments
- `target` - Files, directories, or project to validate
- `--type` - Validation type (lint, type, schema, config, all)
- `--fix` - Automatically fix fixable issues
- `--strict` - Use strict validation rules
- `--format` - Output format (text, json, report)

## Validation Types

### Lint Validation
- ESLint checks
- Code style validation
- Best practices enforcement
- Error detection
- Warning identification

### Type Validation
- TypeScript type checking
- Type safety verification
- Interface compliance
- Generic type validation
- Type inference checks

### Schema Validation
- JSON schema validation
- API schema validation
- Database schema validation
- Configuration schema validation
- Data structure validation

### Config Validation
- Configuration file validation
- Environment variable validation
- Build configuration validation
- Deployment configuration validation
- Tool configuration validation

## Execution Flow
1. **Discovery Phase**
   - Discover files to validate
   - Identify validation types
   - Load validation rules
   - Prepare validators

2. **Validation Phase**
   - Run linting checks
   - Execute type checking
   - Validate schemas
   - Check configurations

3. **Analysis Phase**
   - Collect validation results
   - Categorize issues
   - Prioritize fixes
   - Generate reports

4. **Fix Phase** (if --fix)
   - Apply automatic fixes
   - Update files
   - Verify fixes
   - Report changes

5. **Reporting Phase**
   - Generate validation report
   - Show issue summary
   - Provide fix recommendations
   - Display statistics

## Validate Code Integration
- Uses Bash for validation tool execution
- Leverages Read for file analysis
- Uses Glob for file discovery
- Uses Grep for pattern detection
- Applies TodoWrite for validation tracking
- Maintains structured validation reporting

## Validation Tools

### ESLint Validation
```bash
# Run ESLint
pnpm eslint .

# Fix auto-fixable issues
pnpm eslint --fix .

# Check specific files
pnpm eslint app/components/**/*.tsx
```

### TypeScript Validation
```bash
# Type check
pnpm typecheck

# Strict type check
pnpm tsc --noEmit --strict

# Check specific files
pnpm tsc --noEmit app/components/UserCard.tsx
```

### Schema Validation
```bash
# Validate JSON schemas
ajv validate schema.json data.json

# Validate API schemas
swagger-cli validate api-spec.yaml
```

## Validation Rules

### Code Quality Rules
- No console.logs
- No debugger statements
- Proper error handling
- Type safety
- Code organization

### Style Rules
- Consistent formatting
- Naming conventions
- Import organization
- Code structure

### Best Practices Rules
- React best practices
- Next.js best practices
- TypeScript best practices
- Security best practices

## Examples
```
/validate . --type all --fix
/validate app/components --type lint --strict
/validate app/api --type type --format json
/validate config/ --type config
```

## Integration with Other Commands
- **/format**: Format code before validation
- **/build**: Validate before building
- **/test**: Validate before testing
- **/deploy**: Validate before deployment

## Validation Reports

### Issue Summary
- Total issues found
- Issues by severity
- Issues by category
- Fixable issues count

### Detailed Report
- Issue location
- Issue description
- Severity level
- Fix recommendation
- Code example

