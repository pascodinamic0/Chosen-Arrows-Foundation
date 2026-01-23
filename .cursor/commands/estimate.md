---
allowed-tools: [Read, Grep, Glob, Bash]
description: "Provide development estimates for tasks, features, or projects"
---

# /estimate - Development Estimation

## Purpose
Generate accurate development estimates for tasks, features, or projects based on complexity analysis, historical data, and best practices.

## Usage
```
/estimate [target] [--type time|effort|complexity|cost] [--unit hours|days|weeks] [--breakdown]
```

## Arguments
- `target` - Task, feature, or project to estimate
- `--type` - Estimation type (time, effort, complexity, cost, all)
- `--unit` - Time unit for estimates (hours, days, weeks)
- `--breakdown` - Provide detailed breakdown of estimates
- `--confidence` - Include confidence intervals
- `--compare` - Compare with similar past projects

## Estimation Types

### Time Estimation
- Development time
- Testing time
- Review time
- Documentation time
- Total project time

### Effort Estimation
- Story points
- Complexity points
- Relative effort
- Team capacity

### Complexity Estimation
- Technical complexity
- Business complexity
- Integration complexity
- Risk complexity

### Cost Estimation
- Development cost
- Infrastructure cost
- Maintenance cost
- Total project cost

## Execution Flow
1. **Analysis Phase**
   - Analyze scope and requirements
   - Identify complexity factors
   - Assess dependencies
   - Review similar projects

2. **Estimation Phase**
   - Apply estimation methodologies
   - Consider historical data
   - Factor in complexity
   - Account for risks

3. **Breakdown Phase**
   - Break down into subtasks
   - Estimate each subtask
   - Identify dependencies
   - Calculate totals

4. **Validation Phase**
   - Review estimates
   - Check for consistency
   - Validate against benchmarks
   - Adjust for confidence

5. **Presentation Phase**
   - Format estimates clearly
   - Include breakdowns
   - Show confidence intervals
   - Provide recommendations

## Estimate Code Integration
- Uses Read for requirement analysis
- Leverages Glob for codebase complexity assessment
- Uses Grep for pattern-based estimation
- Uses Bash for historical data analysis
- Maintains structured estimation documentation

## Estimation Methodologies

### Story Point Estimation
- Assign story points (1, 2, 3, 5, 8, 13)
- Compare with reference stories
- Consider complexity factors
- Account for uncertainty

### Time-Based Estimation
- Break down into tasks
- Estimate each task
- Add buffer time
- Consider dependencies

### Complexity-Based Estimation
- Assess technical complexity
- Evaluate integration complexity
- Consider business complexity
- Factor in risk

## Estimation Factors

### Complexity Factors
- Code complexity
- Integration complexity
- Business logic complexity
- Performance requirements

### Risk Factors
- Technical risks
- Timeline risks
- Resource risks
- Dependency risks

### Historical Data
- Similar past projects
- Team velocity
- Average task duration
- Common delays

## Examples
```
/estimate "user authentication feature" --type time --unit hours --breakdown
/estimate app/dashboard --type complexity --confidence
/estimate "payment integration" --type all --compare
/estimate project --type effort --unit days
```

## Integration with Other Commands
- **/workflow**: Include estimates in workflow
- **/task**: Use estimates for task planning
- **/implement**: Estimate implementation effort
- **/design**: Estimate design effort

## Estimation Output

### Summary
- Total estimate
- Confidence level
- Risk assessment
- Key assumptions

### Breakdown
- Task-by-task estimates
- Dependencies
- Critical path
- Buffer recommendations

### Recommendations
- Resource allocation
- Timeline suggestions
- Risk mitigation
- Optimization opportunities
