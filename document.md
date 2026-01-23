---
allowed-tools: [Read, Grep, Glob, Write, Edit]
description: "Create focused documentation for specific components or features"
---

# /document - Focused Documentation

## Purpose
Generate precise, focused documentation for specific components, functions, or features with consistent formatting and structure.

## Usage
```
/document [target] [--type inline|external|api|guide] [--style brief|detailed] [--template template-name]
```

## Arguments
- `target` - Specific file, function, or component to document
- `--type` - Documentation type (inline, external, api, guide, readme)
- `--style` - Documentation style (brief, detailed, comprehensive)
- `--template` - Use specific documentation template
- `--output` - Output file path for external documentation
- `--update` - Update existing documentation

## Documentation Types

### Inline Documentation
- JSDoc comments
- TypeScript type comments
- Function documentation
- Parameter descriptions
- Return value documentation
- Usage examples

### External Documentation
- Component documentation files
- API documentation
- Feature guides
- Architecture documentation
- README files

### API Documentation
- Endpoint descriptions
- Request/response schemas
- Authentication requirements
- Error codes
- Usage examples

### Guide Documentation
- How-to guides
- Tutorials
- Best practices
- Troubleshooting guides
- Migration guides

## Execution Flow
1. **Analysis Phase**
   - Analyze target component
   - Extract key information
   - Identify documentation needs
   - Understand context

2. **Planning Phase**
   - Determine documentation structure
   - Identify audience
   - Select appropriate style
   - Choose documentation format

3. **Generation Phase**
   - Generate documentation content
   - Apply consistent formatting
   - Include code examples
   - Add cross-references

4. **Integration Phase**
   - Integrate with existing docs
   - Update related documentation
   - Add navigation links
   - Verify consistency

5. **Validation Phase**
   - Review documentation quality
   - Check for completeness
   - Verify accuracy
   - Test examples

## Document Code Integration
- Uses Read for deep component analysis
- Leverages Grep for pattern extraction
- Uses Glob for related file discovery
- Applies Edit for inline documentation updates
- Applies Write for external documentation creation
- Maintains documentation standards and conventions

## Documentation Templates

### JSDoc Template
```typescript
/**
 * Component description
 * 
 * @param props - Component props
 * @param props.title - Title text
 * @param props.onClick - Click handler
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <Component title="Hello" onClick={() => {}} />
 * ```
 */
```

### API Documentation Template
```markdown
## Endpoint Name

**Method:** `GET|POST|PUT|DELETE`
**Path:** `/api/endpoint`

### Description
Endpoint description

### Request
\`\`\`json
{
  "param": "value"
}
\`\`\`

### Response
\`\`\`json
{
  "data": {}
}
\`\`\`
```

### Component Documentation Template
```markdown
# ComponentName

Component description

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| prop | type | yes | Description |

## Usage

\`\`\`tsx
<ComponentName prop="value" />
\`\`\`
```

## Documentation Standards

### Code Documentation
- Clear descriptions
- Parameter documentation
- Return value documentation
- Usage examples
- Error handling

### API Documentation
- Endpoint descriptions
- Request/response examples
- Authentication requirements
- Error codes
- Rate limiting

### Component Documentation
- Component purpose
- Props documentation
- Usage examples
- Styling guidelines
- Accessibility notes

## Examples
```
/document app/components/UserCard.tsx --type inline --style detailed
/document app/api/users --type api --output docs/api/users.md
/document authentication --type guide --style comprehensive
/document README --type readme --update
```

## Integration with Other Commands
- **/implement**: Generate documentation alongside implementation
- **/design**: Document design decisions
- **/index**: Include in project documentation index
- **/review**: Review documentation quality

## Documentation Quality

### Completeness
- All public APIs documented
- All components documented
- All functions documented
- Examples provided

### Accuracy
- Documentation matches code
- Examples are tested
- Links are valid
- Information is current

### Clarity
- Clear descriptions
- Easy to understand
- Well-organized
- Properly formatted
