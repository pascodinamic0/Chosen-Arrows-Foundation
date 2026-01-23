---
allowed-tools: [Read, Bash, Glob, Edit, MultiEdit, TodoWrite]
description: "Optimize code performance, bundle size, and runtime efficiency"
---

# /optimize - Performance Optimization

## Purpose
Optimize code performance, bundle size, runtime efficiency, and resource usage with comprehensive analysis and improvements.

## Usage
```
/optimize [target] [--type performance|bundle|runtime|all] [--analyze] [--apply]
```

## Arguments
- `target` - Files, directories, or project to optimize
- `--type` - Optimization type (performance, bundle, runtime, all)
- `--analyze` - Analyze without applying changes
- `--apply` - Apply optimizations automatically
- `--report` - Generate optimization report

## Optimization Types

### Performance Optimization
- React component optimization
- Unnecessary re-render prevention
- Memoization improvements
- Lazy loading implementation
- Code splitting optimization

### Bundle Optimization
- Bundle size reduction
- Tree shaking improvements
- Dead code elimination
- Import optimization
- Asset optimization

### Runtime Optimization
- Database query optimization
- API call optimization
- Caching implementation
- Memory leak fixes
- CPU usage optimization

## Execution Flow
1. **Analysis Phase**
   - Analyze performance metrics
   - Identify bottlenecks
   - Measure current performance
   - Detect optimization opportunities

2. **Planning Phase**
   - Create optimization plan
   - Prioritize optimizations
   - Assess impact
   - Plan implementation

3. **Optimization Phase** (if --apply)
   - Apply optimizations
   - Update code
   - Implement improvements
   - Verify changes

4. **Validation Phase**
   - Measure improvements
   - Verify functionality
   - Test performance
   - Check for regressions

5. **Reporting Phase**
   - Generate optimization report
   - Show improvements
   - Provide metrics
   - Recommend further optimizations

## Optimize Code Integration
- Uses Bash for performance analysis tools
- Leverages Read for code analysis
- Uses Glob for file discovery
- Applies Edit/MultiEdit for optimization changes
- Applies TodoWrite for optimization tracking
- Maintains performance monitoring

## Optimization Tools

### Bundle Analysis
```bash
# Analyze bundle
pnpm build --analyze

# Check bundle size
pnpm build --stats

# Analyze imports
webpack-bundle-analyzer
```

### Performance Profiling
```bash
# Profile React components
react-devtools-profiler

# Profile Node.js
node --prof app.js

# Profile browser
Chrome DevTools Performance
```

### Runtime Analysis
```bash
# Monitor performance
lighthouse --performance

# Check database queries
EXPLAIN ANALYZE SELECT ...

# Monitor API calls
apm-trace api-calls
```

## Optimization Techniques

### React Optimization
- Use React.memo
- Implement useMemo
- Use useCallback
- Optimize re-renders
- Lazy load components

### Bundle Optimization
- Code splitting
- Tree shaking
- Minification
- Compression
- Asset optimization

### Runtime Optimization
- Database indexing
- Query optimization
- Caching strategies
- Memory management
- Async optimization

## Examples
```
/optimize app/components --type performance --analyze
/optimize . --type bundle --apply
/optimize app/api --type runtime --report
/optimize --type all --analyze
```

## Integration with Other Commands
- **/analyze**: Analyze performance issues
- **/improve**: Apply performance improvements
- **/build**: Optimize build output
- **/test**: Test performance improvements

## Optimization Metrics

### Performance Metrics
- Load time
- Render time
- Time to interactive
- First contentful paint

### Bundle Metrics
- Total bundle size
- Individual chunk sizes
- Asset sizes
- Compression ratios

### Runtime Metrics
- Memory usage
- CPU usage
- Database query time
- API response time

