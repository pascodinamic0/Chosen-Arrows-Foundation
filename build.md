---
allowed-tools: [Read, Bash, Glob, TodoWrite, Edit]
description: "Build, compile, and package projects with error handling and optimization"
---

# /build - Project Building

## Purpose
Build, compile, and package projects with comprehensive error handling, optimization, and validation.

## Usage
```
/build [target] [--type dev|prod|test] [--clean] [--optimize] [--verbose]
```

## Arguments
- `target` - Project or specific component to build (default: current project)
- `--type` - Build type (dev, prod, test, staging)
- `--clean` - Clean build artifacts before building
- `--optimize` - Enable build optimizations
- `--verbose` - Enable detailed build output
- `--analyze` - Generate bundle analysis report
- `--watch` - Watch mode for development

## Build Types

### Development Build
```bash
# Next.js development build
pnpm build

# With type checking
pnpm typecheck && pnpm build
```

### Production Build
```bash
# Optimized production build
pnpm build --prod

# With bundle analysis
pnpm build --analyze
```

### Test Build
```bash
# Build for testing
pnpm build --test

# With test execution
pnpm test:build
```

## Execution Flow
1. **Pre-build Validation**
   - Check build configuration
   - Validate dependencies
   - Verify environment setup
   - Check for build blockers

2. **Clean Phase** (if --clean)
   - Remove build artifacts
   - Clear cache directories
   - Clean temporary files

3. **Build Phase**
   - Execute build commands
   - Monitor build progress
   - Capture build output
   - Handle build errors

4. **Optimization Phase** (if --optimize)
   - Apply build optimizations
   - Minify assets
   - Optimize images
   - Generate source maps

5. **Validation Phase**
   - Verify build success
   - Check build artifacts
   - Validate output structure
   - Generate build report

## Build Code Integration
- Uses Bash for build command execution
- Leverages Read for build configuration analysis
- Uses Glob for artifact discovery
- Applies TodoWrite for build progress tracking
- Uses Edit for configuration updates
- Maintains comprehensive error handling and reporting

## Build Commands

### Next.js Build
```bash
# Standard build
pnpm build

# Production build
NODE_ENV=production pnpm build

# Build with analysis
ANALYZE=true pnpm build
```

### TypeScript Compilation
```bash
# Type check
pnpm typecheck

# Build TypeScript
pnpm tsc --build
```

### Package Building
```bash
# Build package
pnpm build:package

# Build with watch
pnpm build:watch
```

## Error Handling

### Build Errors
- Capture error messages
- Identify error sources
- Provide diagnostic information
- Suggest fixes

### Common Issues
- Missing dependencies
- Type errors
- Configuration issues
- Environment problems

## Build Artifacts

### Output Directories
- `.next/` - Next.js build output
- `dist/` - Distribution files
- `build/` - Build artifacts
- `.turbo/` - Turbo cache

### Generated Files
- Compiled JavaScript
- Optimized assets
- Source maps
- Type definitions

## Examples
```
/build --type prod --optimize
/build app/components --clean
/build --type dev --watch
/build --analyze --verbose
```

## Integration with Other Commands
- **/test**: Run tests after build
- **/deploy**: Use build artifacts for deployment
- **/format**: Format code before build
- **/troubleshoot**: Diagnose build failures

## Build Optimization

### Performance Optimizations
- Code splitting
- Tree shaking
- Minification
- Compression
- Image optimization

### Caching Strategies
- Build cache
- Dependency cache
- Asset cache
- Incremental builds
