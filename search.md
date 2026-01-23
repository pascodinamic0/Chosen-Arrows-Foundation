---
allowed-tools: [Read, Grep, Glob, codebase_search]
description: "Advanced code search with semantic and pattern-based search capabilities"
---

# /search - Advanced Code Search

## Purpose
Perform advanced code search with semantic search, pattern matching, and cross-file code navigation.

## Usage
```
/search [query] [--type semantic|pattern|usage|definition] [--scope file|directory|project] [--format text|json]
```

## Arguments
- `query` - Search query or pattern
- `--type` - Search type (semantic, pattern, usage, definition, all)
- `--scope` - Search scope (file, directory, project)
- `--format` - Output format (text, json)
- `--case-sensitive` - Case-sensitive search
- `--regex` - Use regex patterns

## Search Types

### Semantic Search
- Understand code meaning
- Find conceptually related code
- Discover similar implementations
- Locate related functionality

### Pattern Search
- Find code patterns
- Match specific structures
- Search for code templates
- Identify common patterns

### Usage Search
- Find function usages
- Locate component usage
- Track variable usage
- Find import references

### Definition Search
- Find function definitions
- Locate type definitions
- Find component definitions
- Search for exports

## Execution Flow
1. **Query Analysis**
   - Parse search query
   - Determine search type
   - Identify search scope
   - Prepare search strategy

2. **Search Execution**
   - Execute semantic search
   - Run pattern matching
   - Find usages/definitions
   - Collect results

3. **Result Processing**
   - Rank results by relevance
   - Group related results
   - Extract context
   - Format output

4. **Presentation**
   - Display search results
   - Show code snippets
   - Provide navigation
   - Highlight matches

## Search Code Integration
- Uses codebase_search for semantic search
- Leverages Grep for pattern-based search
- Uses Glob for file discovery
- Uses Read for code analysis
- Maintains efficient search indexing

## Search Examples

### Semantic Search
```bash
# Find authentication-related code
/search "user authentication flow" --type semantic

# Find error handling patterns
/search "error handling" --type semantic --scope project
```

### Pattern Search
```bash
# Find React hooks
/search "use[A-Z]\w+" --type pattern --regex

# Find API routes
/search "export.*GET\|POST" --type pattern --regex
```

### Usage Search
```bash
# Find where UserCard is used
/search "UserCard" --type usage

# Find function calls
/search "fetchUser" --type usage
```

### Definition Search
```bash
# Find function definitions
/search "function fetchUser" --type definition

# Find type definitions
/search "interface User" --type definition
```

## Examples
```
/search "authentication" --type semantic
/search "useState" --type usage --scope project
/search "export.*function" --type pattern --regex
/search "UserCard" --type definition
```

## Integration with Other Commands
- **/explain**: Use search results for explanations
- **/refactor**: Find code to refactor
- **/review**: Search for review targets
- **/implement**: Find similar implementations

## Search Features

### Result Ranking
- Relevance scoring
- Context matching
- Usage frequency
- Recency weighting

### Code Context
- Show surrounding code
- Highlight matches
- Display file paths
- Provide line numbers

### Navigation
- Jump to definitions
- Navigate to usages
- Follow references
- Browse related code

