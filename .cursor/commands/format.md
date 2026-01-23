---
allowed-tools: [Read, Bash, Glob, Edit, MultiEdit, TodoWrite]
description: "Format code using Prettier, ESLint, and other formatters with consistent style"
---

# /format - Code Formatting

## Purpose
Format code files using Prettier, ESLint, and other formatters to maintain consistent code style across the project.

## Usage
```
/format [target] [--fix] [--check] [--write] [--config]
```

## Arguments
- `target` - Files, directories, or glob patterns to format (default: all)
- `--fix` - Automatically fix formatting issues
- `--check` - Check formatting without making changes
- `--write` - Write formatted code to files
- `--config` - Use specific config file
- `--ignore` - Files/patterns to ignore
- `--prettier` - Use Prettier formatter
- `--eslint` - Use ESLint formatter
- `--all` - Format all supported file types

## Formatters

### Prettier
```bash
# Format files
pnpm prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"

# Check formatting
pnpm prettier --check "**/*.{ts,tsx,js,jsx,json,css,md}"

# Format specific file
pnpm prettier --write path/to/file.ts
```

### ESLint
```bash
# Fix auto-fixable issues
pnpm eslint --fix "**/*.{ts,tsx,js,jsx}"

# Check without fixing
pnpm eslint "**/*.{ts,tsx,js,jsx}"

# Format specific file
pnpm eslint --fix path/to/file.ts
```

### Combined Formatting
```bash
# Run both Prettier and ESLint
pnpm prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}" && \
pnpm eslint --fix "**/*.{ts,tsx,js,jsx}"
```

## Format Code Integration
- Uses Bash for formatter command execution
- Leverages Glob for file discovery
- Uses Read for file content analysis
- Uses Edit/MultiEdit for formatting changes
- Applies TodoWrite for formatting progress tracking
- Integrates with Prettier and ESLint configs

## File Type Support

### TypeScript/JavaScript
- `.ts`, `.tsx`, `.js`, `.jsx`
- Format with Prettier + ESLint
- Preserve TypeScript types
- Handle JSX syntax

### JSON
- `.json`, `.jsonc`
- Format with Prettier
- Validate JSON syntax
- Preserve comments (JSONC)

### CSS/SCSS
- `.css`, `.scss`, `.less`
- Format with Prettier
- Handle nested syntax
- Preserve vendor prefixes

### Markdown
- `.md`, `.mdx`
- Format with Prettier
- Preserve code blocks
- Format tables and lists

### Other Formats
- `.html`, `.svg`, `.yaml`, `.yml`
- Format with Prettier
- Preserve structure
- Handle special syntax

## Configuration Files

### Prettier Config
```json
// .prettierrc or package.json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

### ESLint Config
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### Ignore Files
```
# .prettierignore
node_modules
.next
dist
build
*.min.js
```

## Execution Flow
1. **Discovery Phase**
   - Find files matching target pattern
   - Exclude ignored files/patterns
   - Filter by file type
   - Group by formatter

2. **Analysis Phase**
   - Read file contents
   - Detect formatting issues
   - Check against config
   - Identify fixable issues

3. **Formatting Phase**
   - Apply Prettier formatting
   - Apply ESLint fixes
   - Preserve code structure
   - Handle edge cases

4. **Validation Phase**
   - Verify formatting success
   - Check for syntax errors
   - Validate against config
   - Report remaining issues

5. **Reporting Phase**
   - Show formatted files
   - Report formatting changes
   - List unfixable issues
   - Provide summary statistics

## Formatting Rules

### Code Style
- Consistent indentation (2 spaces)
- Semicolon usage
- Quote style (single/double)
- Trailing commas
- Line length limits

### Import Organization
- Sort imports alphabetically
- Group imports (external, internal)
- Remove unused imports
- Organize import statements

### Spacing
- Consistent spacing around operators
- Spacing in function calls
- Spacing in object literals
- Spacing in arrays

## Examples
```
/format --fix
/format app/components --write
/format "**/*.ts" --check
/format --all --prettier --eslint
/format --ignore "**/*.test.ts"
```

## Integration with Other Commands
- **/cleanup**: Format code during cleanup
- **/improve**: Format code during improvements
- **/refactor**: Format code after refactoring
- **/build**: Format code before build

## Pre-commit Integration
```bash
# Format on commit
git add .
/format --fix
git add .
git commit -m "Format code"
```

## CI/CD Integration
```bash
# Check formatting in CI
/format --check

# Fail build if formatting is incorrect
if ! /format --check; then
  echo "Code formatting check failed"
  exit 1
fi
```

## Performance Optimization
- Format files in parallel
- Cache formatting results
- Skip unchanged files
- Batch file operations
- Optimize formatter execution

