---
allowed-tools: [Read, Write, Edit, Glob, TodoWrite, mcp__magic__magic]
description: "Generate code from templates, patterns, and scaffolding with MCP integration"
---

# /generate - Code Generation

## Purpose
Generate code files, components, API routes, database models, and other code structures from templates and patterns.

## Usage
```
/generate [type] [name] [--template template-name] [--path path] [--props props]
```

## Arguments
- `type` - Type of code to generate (component, api, page, model, hook, test)
- `name` - Name for the generated code (PascalCase for components, kebab-case for files)
- `--template` - Specific template to use
- `--path` - Target directory path
- --props` - Props/parameters for the generated code (JSON or key=value)
- `--with-tests` - Generate test files alongside code
- `--with-stories` - Generate Storybook stories
- `--with-docs` - Generate documentation

## Generation Types

### Component Generation
```bash
# React component
/generate component UserCard --path app/components
/generate component Dashboard --with-tests --with-stories

# Generated structure:
# app/components/UserCard.tsx
# app/components/UserCard.test.tsx
# app/components/UserCard.stories.tsx
```

### API Route Generation
```bash
# API route
/generate api users --path app/api/users
/generate api posts/[id] --path app/api/posts

# Generated structure:
# app/api/users/route.ts (GET, POST)
# app/api/users/[id]/route.ts (GET, PUT, DELETE)
```

### Page Generation
```bash
# Next.js page
/generate page profile --path app/profile
/generate page settings --path app/settings

# Generated structure:
# app/profile/page.tsx
# app/profile/layout.tsx (optional)
```

### Database Model Generation
```bash
# Database model
/generate model User --table users
/generate model Post --table posts --with-migration

# Generated structure:
# lib/models/User.ts
# supabase/migrations/xxx_create_users_table.sql
```

### Hook Generation
```bash
# Custom hook
/generate hook useAuth
/generate hook useLocalStorage --path hooks

# Generated structure:
# hooks/useAuth.ts
# hooks/useAuth.test.ts
```

### Test Generation
```bash
# Test file
/generate test UserCard --path app/components
/generate test api/users --type integration

# Generated structure:
# app/components/UserCard.test.tsx
# __tests__/api/users.test.ts
```

## Generate Code Integration
- Uses Write for creating new files
- Uses Read for template analysis
- Uses Glob for pattern discovery
- Uses Edit for template customization
- Applies TodoWrite for generation tracking
- Integrates Magic MCP for UI component generation
- Maintains consistent code patterns

## Templates

### Component Template
```typescript
// Template: component.tsx
import { FC } from 'react';

interface {{ComponentName}}Props {
  // Add props here
}

export const {{ComponentName}}: FC<{{ComponentName}}Props> = (props) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

### API Route Template
```typescript
// Template: api-route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // GET logic
    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // POST logic
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Hook Template
```typescript
// Template: hook.ts
import { useState, useEffect } from 'react';

export function use{{HookName}}() {
  const [state, setState] = useState();

  useEffect(() => {
    // Hook logic
  }, []);

  return { state };
}
```

## Magic MCP Integration

### UI Component Generation
```typescript
// Use Magic for complex UI components
mcp__magic__magic({
  prompt: "Generate a user profile card component",
  framework: "react",
  style: "tailwind"
})
```

### Component Variants
- Generate with TypeScript types
- Generate with Tailwind styling
- Generate with accessibility features
- Generate with responsive design

## Generation Patterns

### Next.js App Router
- Page components
- Layout components
- Route handlers
- Server components
- Client components

### Supabase Integration
- Database models
- RLS policies
- Edge functions
- Database migrations

### Component Library
- UI components
- Form components
- Layout components
- Utility components

## Examples
```
/generate component Button --path components/ui
/generate api auth/login --path app/api/auth
/generate page dashboard --path app/dashboard
/generate model Product --table products --with-migration
/generate hook useProducts --path hooks
/generate test UserCard --with-coverage
```

## Template Customization

### Props Injection
```bash
/generate component UserCard \
  --props '{"variant":"card","showAvatar":true,"showBio":true}'
```

### Path Customization
```bash
/generate component Button --path components/ui/buttons
/generate api users --path app/api/v1/users
```

### Multi-file Generation
```bash
/generate component UserProfile \
  --with-tests \
  --with-stories \
  --with-docs
```

## Integration with Other Commands
- **/implement**: Use generation as starting point
- **/format**: Format generated code
- **/test**: Generate tests alongside code
- **/document**: Generate documentation

## Code Quality
- Follow project conventions
- Include TypeScript types
- Add proper imports
- Include error handling
- Add JSDoc comments
- Follow naming conventions

## File Structure Generation
- Create directory structure
- Generate index files
- Create barrel exports
- Generate configuration files
- Create test directories

