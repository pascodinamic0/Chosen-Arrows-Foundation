---
allowed-tools: [Read, Grep, Glob, Bash]
description: "Provide clear explanations of code, concepts, or system behavior"
---

# /explain - Code and Concept Explanation

## Purpose
Deliver clear, comprehensive explanations of code functionality, concepts, or system behavior tailored to different knowledge levels.

## Usage
```
/explain [target] [--level basic|intermediate|advanced] [--format text|diagram|examples] [--context additional-context]
```

## Arguments
- `target` - Code file, function, concept, or system to explain
- `--level` - Explanation complexity (basic, intermediate, advanced)
- `--format` - Output format (text, diagram, examples, all)
- `--context` - Additional context for explanation
- `--interactive` - Enable interactive Q&A mode

## Explanation Levels

### Basic Level
- Simple, clear language
- Avoid technical jargon
- Focus on what, not how
- Use analogies
- Provide examples

### Intermediate Level
- Technical details included
- Explain how things work
- Show relationships
- Include code examples
- Discuss trade-offs

### Advanced Level
- Deep technical details
- Implementation specifics
- Performance considerations
- Edge cases
- Optimization techniques

## Execution Flow
1. **Analysis Phase**
   - Analyze target code or concept
   - Identify key components
   - Understand relationships
   - Gather context

2. **Structuring Phase**
   - Structure explanation by complexity level
   - Organize information logically
   - Identify key points
   - Plan examples

3. **Explanation Phase**
   - Write clear explanations
   - Provide relevant examples
   - Show code snippets
   - Explain relationships

4. **Enhancement Phase**
   - Add diagrams if needed
   - Include use cases
   - Provide additional context
   - Link related concepts

5. **Presentation Phase**
   - Format for readability
   - Use appropriate format
   - Ensure clarity
   - Verify accuracy

## Explain Code Integration
- Uses Read for comprehensive code analysis
- Leverages Grep for pattern identification
- Uses Glob for related code discovery
- Uses Bash for runtime behavior analysis
- Maintains clear, educational communication style

## Explanation Formats

### Text Format
- Written explanations
- Structured paragraphs
- Clear headings
- Bullet points
- Code snippets

### Diagram Format
- Visual representations
- Flow charts
- Architecture diagrams
- Sequence diagrams
- Component diagrams

### Examples Format
- Code examples
- Usage examples
- Real-world scenarios
- Before/after comparisons
- Interactive examples

## Explanation Topics

### Code Explanations
- Function behavior
- Component functionality
- Algorithm logic
- Data structures
- Design patterns

### Concept Explanations
- Programming concepts
- Framework features
- Architecture patterns
- Best practices
- Technical terms

### System Explanations
- System architecture
- Data flow
- Component interactions
- Integration patterns
- Deployment process

## Examples
```
/explain app/components/UserCard.tsx --level intermediate
/explain "React hooks" --level basic --format examples
/explain authentication-flow --level advanced --format diagram
/explain useEffect --level intermediate --context "React component lifecycle"
```

## Integration with Other Commands
- **/document**: Use explanations in documentation
- **/review**: Explain code during review
- **/implement**: Explain implementation approach
- **/design**: Explain design decisions

## Explanation Quality

### Clarity
- Clear language
- Well-structured
- Easy to follow
- Appropriate level

### Completeness
- Covers all aspects
- Includes examples
- Addresses questions
- Provides context

### Accuracy
- Technically correct
- Up-to-date information
- Accurate examples
- Correct terminology
