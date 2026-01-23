---
allowed-tools: [Read, Grep, Glob, Write, Edit, TodoWrite]
description: "Design system architecture, APIs, and component interfaces"
---

# /design - System and Component Design

## Purpose
Design system architecture, APIs, component interfaces, and technical specifications with comprehensive documentation.

## Usage
```
/design [target] [--type architecture|api|component|database] [--format diagram|spec|code] [--iterative]
```

## Arguments
- `target` - System, component, or feature to design
- `--type` - Design type (architecture, api, component, database, all)
- `--format` - Output format (diagram, spec, code, markdown)
- `--iterative` - Enable iterative design refinement
- `--template` - Use specific design template
- `--output` - Output file path

## Design Types

### Architecture Design
- System architecture diagrams
- Component relationships
- Data flow diagrams
- Service boundaries
- Technology stack selection
- Scalability considerations

### API Design
- RESTful API specifications
- GraphQL schema design
- Endpoint definitions
- Request/response schemas
- Authentication/authorization
- Error handling patterns

### Component Design
- Component interfaces
- Props/state definitions
- Component relationships
- Composition patterns
- Styling approach
- Accessibility considerations

### Database Design
- Schema design
- Table relationships
- Index strategies
- Query optimization
- Migration planning
- Data modeling

## Execution Flow
1. **Requirements Analysis**
   - Analyze design requirements
   - Identify constraints
   - Gather context
   - Define scope

2. **Design Phase**
   - Create initial design concepts
   - Explore alternatives
   - Evaluate trade-offs
   - Select optimal approach

3. **Specification Phase**
   - Develop detailed specifications
   - Define interfaces
   - Document decisions
   - Create diagrams

4. **Validation Phase**
   - Validate against requirements
   - Check best practices
   - Review with stakeholders
   - Refine design

5. **Documentation Phase**
   - Generate design documentation
   - Create implementation guides
   - Document design decisions
   - Provide examples

## Design Code Integration
- Uses Read for requirement analysis
- Leverages Grep for pattern discovery
- Uses Glob for codebase analysis
- Applies Write for design documentation
- Uses Edit for design refinement
- Applies TodoWrite for design task tracking
- Maintains consistency with architectural patterns

## Design Templates

### API Design Template
```typescript
// API Specification Template
interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  request: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, any>;
  };
  response: {
    status: number;
    body: Record<string, any>;
  };
  errors: Array<{
    status: number;
    message: string;
  }>;
}
```

### Component Design Template
```typescript
// Component Interface Template
interface ComponentProps {
  // Props definition
}

interface ComponentState {
  // State definition
}

// Component structure
export const Component: FC<ComponentProps> = (props) => {
  // Component implementation
};
```

## Design Patterns

### Architecture Patterns
- Microservices architecture
- Monolithic architecture
- Serverless architecture
- Event-driven architecture
- Layered architecture

### API Patterns
- RESTful design
- GraphQL design
- RPC design
- WebSocket design

### Component Patterns
- Container/Presentational
- Higher-Order Components
- Render Props
- Hooks pattern
- Compound Components

## Examples
```
/design user-authentication --type architecture --format diagram
/design api/users --type api --format spec
/design UserCard --type component --format code
/design database-schema --type database --iterative
```

## Integration with Other Commands
- **/implement**: Use design specifications for implementation
- **/workflow**: Include design phase in workflow
- **/document**: Document design decisions
- **/review**: Review design quality

## Design Documentation

### Architecture Documentation
- System overview
- Component diagrams
- Data flow diagrams
- Technology decisions
- Scalability considerations

### API Documentation
- Endpoint specifications
- Request/response examples
- Authentication requirements
- Error codes
- Rate limiting

### Component Documentation
- Component interfaces
- Usage examples
- Props documentation
- State management
- Styling guidelines
