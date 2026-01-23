---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite]
description: "Diagnose and resolve issues in code, builds, or system behavior"
---

# /troubleshoot - Issue Diagnosis and Resolution

## Purpose
Systematically diagnose and resolve issues in code, builds, deployments, or system behavior with comprehensive error analysis.

## Usage
```
/troubleshoot [issue] [--type bug|build|performance|deployment] [--trace] [--fix]
```

## Arguments
- `issue` - Description of the problem or error message
- `--type` - Issue category (bug, build, performance, deployment, all)
- `--trace` - Enable detailed tracing and logging
- `--fix` - Automatically apply fixes when safe
- `--verbose` - Show detailed diagnostic information

## Issue Types

### Bug Issues
- Runtime errors
- Logic errors
- Type errors
- Null reference errors
- State management issues

### Build Issues
- Compilation errors
- Type errors
- Dependency issues
- Configuration problems
- Environment issues

### Performance Issues
- Slow performance
- Memory leaks
- High CPU usage
- Slow database queries
- Large bundle sizes

### Deployment Issues
- Deployment failures
- Environment mismatches
- Configuration errors
- Database migration issues
- Service unavailable

## Execution Flow
1. **Analysis Phase**
   - Analyze issue description
   - Gather error information
   - Collect logs and traces
   - Identify symptoms

2. **Investigation Phase**
   - Identify potential root causes
   - Trace error sources
   - Analyze code paths
   - Check configurations

3. **Diagnosis Phase**
   - Narrow down root cause
   - Verify hypothesis
   - Test assumptions
   - Confirm diagnosis

4. **Solution Phase**
   - Propose solutions
   - Evaluate options
   - Apply fixes (if --fix)
   - Test solutions

5. **Verification Phase**
   - Verify fix works
   - Test for regressions
   - Document solution
   - Provide prevention tips

## Troubleshoot Code Integration
- Uses Read for error log analysis
- Leverages Grep for pattern-based issue detection
- Uses Glob for file discovery
- Uses Bash for runtime diagnostics
- Applies TodoWrite for issue tracking
- Maintains structured troubleshooting documentation

## Diagnostic Tools

### Error Analysis
```bash
# Check error logs
tail -f logs/error.log

# Search for errors
grep -r "ERROR\|Error\|error" .

# Check build errors
pnpm build 2>&1 | tee build-errors.log
```

### Performance Analysis
```bash
# Profile performance
node --prof app.js

# Check memory usage
node --inspect app.js

# Analyze bundle
pnpm build --analyze
```

### Debugging
```bash
# Run with debug flags
DEBUG=* pnpm dev

# Check environment
env | grep NODE

# Verify dependencies
pnpm list
```

## Examples
```
/troubleshoot "build failing with type errors" --type build --trace
/troubleshoot "application crashes on startup" --type bug --fix
/troubleshoot "slow page load" --type performance --verbose
/troubleshoot "deployment failed" --type deployment
```

## Integration with Other Commands
- **/analyze**: Analyze code for issues
- **/test**: Run tests to reproduce issues
- **/build**: Check build configuration
- **/review**: Review code for issues

## Troubleshooting Strategies

### Systematic Approach
- Start with symptoms
- Narrow down scope
- Test hypotheses
- Verify solutions

### Common Patterns
- Check recent changes
- Verify configurations
- Test dependencies
- Check environment

### Prevention
- Add error handling
- Improve logging
- Add monitoring
- Document solutions
