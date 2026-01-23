---
allowed-tools: [Read, Grep, Glob, Bash, Write]
description: "Load and analyze project context, configurations, and dependencies"
---

# /load - Project Context Loading

## Purpose
Load and analyze project context, configurations, dependencies, and environment setup for comprehensive project understanding.

## Usage
```
/load [target] [--type project|config|deps|env] [--cache] [--refresh]
```

## Arguments
- `target` - Project directory or specific configuration to load
- `--type` - Loading type (project, config, deps, env, all)
- `--cache` - Cache loaded context for faster subsequent access
- `--refresh` - Force refresh of cached context
- `--output` - Output file for context data

## Loading Types

### Project Context
- Project structure
- File organization
- Technology stack
- Build configuration
- Development setup

### Configuration Context
- Configuration files
- Environment variables
- Build settings
- Deployment config
- Tool configurations

### Dependencies Context
- Package dependencies
- Version information
- Dependency tree
- Peer dependencies
- Dev dependencies

### Environment Context
- Environment variables
- Runtime environment
- Platform information
- System requirements
- Deployment environment

## Execution Flow
1. **Discovery Phase**
   - Discover project structure
   - Identify configuration files
   - Find dependency files
   - Locate environment files

2. **Loading Phase**
   - Load configuration files
   - Parse dependencies
   - Read environment variables
   - Extract project metadata

3. **Analysis Phase**
   - Analyze configurations
   - Validate dependencies
   - Check environment setup
   - Identify issues

4. **Caching Phase** (if --cache)
   - Cache loaded context
   - Store metadata
   - Create context map
   - Save for future use

5. **Reporting Phase**
   - Generate context report
   - Show loaded information
   - Highlight issues
   - Provide recommendations

## Load Code Integration
- Uses Glob for comprehensive project discovery
- Leverages Read for configuration analysis
- Uses Grep for pattern matching
- Uses Bash for environment validation
- Uses Write for caching context
- Maintains efficient context caching mechanisms

## Context Information

### Project Structure
- Directory layout
- File organization
- Module structure
- Component organization

### Configuration Files
- `package.json` - Project metadata
- `tsconfig.json` - TypeScript config
- `next.config.mjs` - Next.js config
- `.env` files - Environment variables
- `tailwind.config.ts` - Tailwind config

### Dependencies
- Production dependencies
- Development dependencies
- Peer dependencies
- Optional dependencies
- Version ranges

### Environment
- Node.js version
- Package manager
- Operating system
- Build tools
- Runtime environment

## Examples
```
/load . --type all --cache
/load app/ --type project --refresh
/load --type deps --output deps.json
/load .env --type env
```

## Integration with Other Commands
- **/analyze**: Use context for analysis
- **/build**: Use context for building
- **/implement**: Use context for implementation
- **/workflow**: Use context for workflow planning

## Context Caching

### Cache Benefits
- Faster subsequent loads
- Reduced file I/O
- Improved performance
- Consistent context

### Cache Management
- Cache invalidation
- Cache refresh
- Cache cleanup
- Cache validation
