---
allowed-tools: [Read, Write, Edit, MultiEdit, Bash, Glob, TodoWrite, Task, mcp__magic__magic, mcp__context7__context7, mcp__sequential-thinking__sequentialthinking]
description: "Feature and code implementation with intelligent persona activation and MCP integration"
---

# /implement - Feature Implementation

## Purpose
Implement features, components, and code functionality with intelligent expert activation, MCP integration, and comprehensive development support.

## Usage
```
/implement [feature-description] [--type component|api|service|feature] [--framework react|vue|express|etc] [--safe] [--iterative] [--with-tests] [--documentation]
```

## Arguments
- `feature-description` - Description of what to implement
- `--type` - Implementation type (component, api, service, feature, module)
- `--framework` - Target framework or technology stack
- `--safe` - Use conservative implementation approach
- `--iterative` - Enable iterative development with validation steps
- `--with-tests` - Include test implementation
- `--documentation` - Generate documentation alongside implementation

## Implementation Types

### Component Implementation
- React/Next.js components
- Vue components
- UI components
- Form components
- Layout components

### API Implementation
- REST API endpoints
- GraphQL resolvers
- API route handlers
- Middleware functions
- Authentication endpoints

### Service Implementation
- Business logic services
- Data processing services
- Integration services
- Background jobs
- Scheduled tasks

### Feature Implementation
- Complete features
- User workflows
- Integration features
- Admin features
- Reporting features

## Execution Flow
1. **Analysis Phase**
   - Analyze implementation requirements
   - Detect technology context
   - Identify dependencies
   - Review existing patterns

2. **Planning Phase**
   - Create implementation plan
   - Auto-activate relevant personas
   - Coordinate with MCP servers
   - Define implementation steps

3. **Implementation Phase**
   - Generate implementation code
   - Apply best practices
   - Follow project conventions
   - Integrate with existing code

4. **Validation Phase**
   - Apply security validation
   - Run quality checks
   - Test implementation
   - Verify functionality

5. **Documentation Phase**
   - Generate documentation
   - Add code comments
   - Create usage examples
   - Update related docs

## Implement Code Integration
- Uses Write/Edit/MultiEdit for code generation and modification
- Leverages Read and Glob for codebase analysis and context understanding
- Uses Bash for tool execution
- Applies TodoWrite for implementation progress tracking
- Integrates Task tool for complex multi-step implementations
- Coordinates with MCP servers (Magic, Context7, Sequential) for specialized functionality
- Auto-activates appropriate personas based on implementation type

## MCP Integration

### Magic MCP (UI Components)
```typescript
// Use Magic for UI component generation
mcp__magic__magic({
  prompt: "Generate a user profile card component",
  framework: "react",
  style: "tailwind"
})
```

### Context7 MCP (Patterns)
```typescript
// Use Context7 for framework patterns
mcp__context7__context7({
  query: "Next.js API route patterns",
  framework: "nextjs"
})
```

### Sequential MCP (Complex Logic)
```typescript
// Use Sequential for complex reasoning
mcp__sequential-thinking__sequentialthinking({
  problem: "Implement authentication flow",
  steps: ["design", "implement", "test"]
})
```

## Auto-Activation Patterns

### Frontend Persona
- UI components
- React/Vue/Angular development
- State management
- Styling approaches
- Component composition

### Backend Persona
- APIs and services
- Database integration
- Authentication/authorization
- Business logic
- Data processing

### Security Persona
- Authentication implementation
- Authorization checks
- Data protection
- Input validation
- Security best practices

### Architecture Persona
- System design
- Module structure
- Integration patterns
- Scalability considerations

### Performance Persona
- Optimization techniques
- Performance best practices
- Resource management
- Caching strategies

## Examples
```
/implement "user authentication system" --type feature --with-tests
/implement "dashboard component" --type component --framework react
/implement "REST API for user management" --type api --safe
/implement "payment processing service" --type service --iterative
/implement "user profile page" --type component --with-tests --documentation
```

## Integration with Other Commands
- **/test**: Run tests after implementation
- **/format**: Format code after implementation
- **/review**: Review implementation quality
- **/document**: Generate documentation
- **/deploy**: Deploy implemented features

## Implementation Best Practices

### Code Quality
- Follow project conventions
- Use TypeScript types
- Add error handling
- Include input validation
- Write clean code

### Testing
- Write unit tests
- Add integration tests
- Test edge cases
- Verify error handling
- Check accessibility

### Documentation
- Add code comments
- Document public APIs
- Include usage examples
- Update README files
- Document design decisions
