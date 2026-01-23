---
allowed-tools: [Read, Write, Bash, Glob, TodoWrite, mcp_supabase_apply_migration, mcp_supabase_list_migrations, mcp_supabase_execute_sql]
description: "Manage database migrations for Supabase and other database systems"
---

# /migrate - Database Migration Management

## Purpose
Create, apply, rollback, and manage database migrations with comprehensive validation and safety checks.

## Usage
```
/migrate [action] [name] [--apply] [--rollback] [--status] [--validate]
```

## Actions
- `create` - Create new migration file
- `apply` - Apply pending migrations
- `rollback` - Rollback last migration
- `status` - Show migration status
- `validate` - Validate migration SQL
- `repair` - Repair migration state

## Arguments
- `name` - Migration name (snake_case, required for create)
- `--apply` - Apply migrations immediately
- `--rollback` - Rollback to specific version
- `--status` - Show current migration status
- `--validate` - Validate SQL before applying
- `--dry-run` - Preview migration without applying
- `--version` - Target migration version
- `--local` - Use local Supabase instance
- `--remote` - Use remote Supabase project

## Migration Workflow

### Create Migration
```bash
# Using Supabase CLI
supabase migration new [migration_name]

# Migration file location
supabase/migrations/[timestamp]_[migration_name].sql
```

### Apply Migrations
```bash
# Local development
supabase db push

# Remote production
supabase db push --db-url [connection-string]

# Using MCP (preferred)
mcp_supabase_apply_migration(name, query)
```

### Check Status
```bash
# List migrations
supabase migration list

# Using MCP
mcp_supabase_list_migrations()
```

### Execute SQL
```bash
# Direct SQL execution
supabase db execute "SELECT * FROM users LIMIT 10"

# Using MCP
mcp_supabase_execute_sql(query)
```

## Migrate Code Integration
- Uses Bash for Supabase CLI operations
- Leverages MCP Supabase tools for migration management
- Uses Read for migration file analysis
- Uses Write for creating migration files
- Uses Glob for migration file discovery
- Applies TodoWrite for migration tracking
- Validates SQL syntax and safety

## Migration File Structure

### Standard Format
```sql
-- Migration: add_user_profiles_table
-- Created: 2024-01-15 10:30:00

-- Create table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);
```

### Best Practices
- Use `IF NOT EXISTS` for idempotency
- Include rollback comments
- Add indexes for performance
- Enable RLS for security
- Include policy definitions
- Add data migrations separately

## Safety Checks

### Pre-Apply Validation
- SQL syntax validation
- Check for destructive operations
- Verify migration dependencies
- Validate RLS policies
- Check for missing indexes

### Rollback Safety
- Detect irreversible migrations
- Warn about data loss
- Create backup before rollback
- Verify rollback SQL exists

### Conflict Detection
- Check for migration conflicts
- Detect out-of-order migrations
- Verify migration version consistency
- Check for duplicate migrations

## Migration Types

### Schema Migrations
- CREATE TABLE
- ALTER TABLE
- DROP TABLE
- CREATE INDEX
- CREATE FUNCTION

### Data Migrations
- INSERT/UPDATE/DELETE
- Data transformations
- Bulk operations
- Seed data

### Policy Migrations
- RLS policies
- Security policies
- Access control

## Examples
```
/migrate create add_user_profiles_table
/migrate apply --validate
/migrate status
/migrate rollback --version 20240115103000
/migrate validate supabase/migrations/20240115103000_add_user_profiles.sql
```

## Integration with Other Commands
- **/deploy**: Apply migrations during deployment
- **/test**: Test migrations in test environment
- **/analyze**: Analyze migration impact
- **/troubleshoot**: Diagnose migration failures

## Error Handling
- Capture migration errors
- Provide rollback instructions
- Log migration history
- Detect partial migrations
- Repair migration state

## Migration History
- Track applied migrations
- Store migration metadata
- Log migration execution times
- Record migration errors
- Maintain rollback capability

