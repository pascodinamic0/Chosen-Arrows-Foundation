---
allowed-tools: [Read, Grep, Glob, Bash, Write]
description: "Generate comprehensive project documentation and knowledge base"
---

# /index - Project Documentation

## Purpose
Create and maintain comprehensive project documentation, indexes, and knowledge bases with structured organization and cross-references.

## Usage
```
/index [target] [--type docs|api|structure|readme] [--format md|json|yaml] [--update]
```

## Arguments
- `target` - Project directory or specific component to document
- `--type` - Documentation type (docs, api, structure, readme, all)
- `--format` - Output format (md, json, yaml)
- `--update` - Update existing documentation
- `--output` - Output directory for documentation

## Documentation Types

### Project Documentation
- Project overview
- Architecture documentation
- Component documentation
- API documentation
- Guide documentation

### API Documentation
- API endpoint index
- Request/response schemas
- Authentication documentation
- Error code reference
- Usage examples

### Structure Documentation
- Project structure
- Directory organization
- File organization
- Module structure
- Dependency graph

### README Documentation
- Project README
- Component READMEs
- Feature READMEs
- Setup guides
- Contribution guides

## Execution Flow
1. **Discovery Phase**
   - Analyze project structure
   - Identify key components
   - Discover documentation files
   - Map relationships

2. **Extraction Phase**
   - Extract documentation from code
   - Parse code comments
   - Read existing README files
   - Gather metadata

3. **Generation Phase**
   - Generate documentation structure
   - Create navigation
   - Add cross-references
   - Format content

4. **Organization Phase**
   - Organize by category
   - Create index pages
   - Add search functionality
   - Link related docs

5. **Output Phase**
   - Write documentation files
   - Generate indexes
   - Create navigation structure
   - Update existing docs

## Index Code Integration
- Uses Glob for systematic file discovery
- Leverages Grep for extracting documentation patterns
- Uses Read for code analysis
- Uses Bash for file operations
- Applies Write for creating structured documentation
- Maintains consistency with project conventions

## Documentation Structure

### Project Index
```
docs/
├── README.md
├── architecture/
│   ├── overview.md
│   ├── components.md
│   └── data-flow.md
├── api/
│   ├── index.md
│   └── endpoints/
├── guides/
│   ├── setup.md
│   └── contribution.md
└── components/
    └── [component-docs]
```

### API Index
```markdown
# API Documentation

## Authentication
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

## Users
- GET /api/users
- POST /api/users
- GET /api/users/:id
```

## Examples
```
/index . --type all --format md
/index app/api --type api --output docs/api
/index --type structure --update
/index app/components --type docs
```

## Integration with Other Commands
- **/document**: Use for focused documentation
- **/design**: Include design documentation
- **/implement**: Generate docs during implementation
- **/workflow**: Document workflows

## Documentation Features

### Navigation
- Table of contents
- Cross-references
- Related links
- Search functionality

### Organization
- Categorized by type
- Organized by feature
- Grouped by component
- Sorted alphabetically

### Cross-References
- Link to related docs
- Reference code files
- Link to examples
- Connect concepts
