---
allowed-tools: [Read, Grep, Glob, Bash, TodoWrite, Edit, MultiEdit, Write]
description: "Break complex tasks into coordinated subtasks with efficient execution"
---

# /spawn - Task Orchestration

## Purpose
Decompose complex requests into manageable subtasks and coordinate their execution with dependency management and progress tracking.

## Usage
```
/spawn [task] [--sequential|--parallel] [--validate] [--track]
```

## Arguments
- `task` - Complex task or project to orchestrate
- `--sequential` - Execute tasks in dependency order (default)
- `--parallel` - Execute independent tasks concurrently
- `--validate` - Enable quality checkpoints between tasks
- `--track` - Track progress with todos
- `--dry-run` - Preview task breakdown without executing

## Execution Strategies

### Sequential Execution
- Execute tasks in dependency order
- Wait for dependencies to complete
- Validate each step
- Handle errors gracefully

### Parallel Execution
- Identify independent tasks
- Execute concurrently
- Coordinate results
- Merge outcomes

### Hybrid Execution
- Mix sequential and parallel
- Optimize for dependencies
- Maximize parallelism
- Minimize wait time

## Execution Flow
1. **Analysis Phase**
   - Parse complex request
   - Identify task components
   - Map dependencies
   - Assess complexity

2. **Decomposition Phase**
   - Break into subtasks
   - Create task hierarchy
   - Define dependencies
   - Estimate effort

3. **Planning Phase**
   - Choose execution strategy
   - Optimize task order
   - Plan checkpoints
   - Prepare validation

4. **Execution Phase**
   - Execute subtasks
   - Monitor progress
   - Handle errors
   - Track completion

5. **Integration Phase**
   - Integrate results
   - Validate completion
   - Generate report
   - Provide next steps

## Spawn Code Integration
- Uses TodoWrite for task breakdown and tracking
- Leverages Read for task analysis
- Uses Glob for file discovery
- Uses Bash for command execution
- Applies Edit/MultiEdit for coordinated changes
- Uses Write for task documentation
- Applies efficient batching for related operations
- Maintains clear dependency management

## Task Management

### Task Hierarchy
- Main task
- Subtasks
- Sub-subtasks
- Action items

### Dependency Mapping
- Identify dependencies
- Map relationships
- Detect cycles
- Optimize order

### Progress Tracking
- Track task status
- Monitor completion
- Report progress
- Handle failures

## Examples
```
/spawn "implement user authentication system" --sequential --validate
/spawn "refactor codebase" --parallel --track
/spawn "deploy application" --sequential --dry-run
/spawn "migrate database" --validate --track
```

## Integration with Other Commands
- **/task**: Use for complex task management
- **/implement**: Coordinate implementation tasks
- **/workflow**: Execute workflow tasks
- **/test**: Run tests as subtasks

## Task Coordination

### Dependency Resolution
- Automatic dependency detection
- Optimal task ordering
- Parallel execution where possible
- Sequential execution when needed

### Error Handling
- Handle task failures
- Provide rollback options
- Continue on non-critical errors
- Report all issues

### Progress Reporting
- Real-time progress updates
- Completion percentages
- Time estimates
- Status summaries
