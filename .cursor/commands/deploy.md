---
allowed-tools: [Read, Bash, Glob, TodoWrite, Grep]
description: "Deploy applications to production and staging environments with validation"
---

# /deploy - Deployment Automation

## Purpose
Automate deployment processes to production and staging environments with comprehensive validation, rollback capabilities, and environment management.

## Usage
```
/deploy [target] [--env production|staging|preview] [--validate] [--rollback]
```

## Arguments
- `target` - Application or service to deploy (default: current project)
- `--env` - Target environment (production, staging, preview)
- `--validate` - Run validation checks before deployment
- `--rollback` - Rollback to previous deployment version
- `--dry-run` - Preview deployment without executing
- `--force` - Skip validation checks (use with caution)
- `--version` - Deploy specific version/tag

## Deployment Platforms

### Vercel (Next.js)
```bash
# Build validation
pnpm build

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Rollback
vercel rollback [deployment-url]
```

### Supabase
```bash
# Database migrations
supabase db push

# Edge functions
supabase functions deploy [function-name]

# Check deployment status
supabase projects list
```

### Docker/Container
```bash
# Build image
docker build -t [image-name] .

# Push to registry
docker push [image-name]

# Deploy
docker-compose up -d
```

## Execution Flow
1. **Pre-deployment Validation**
   - Run build process
   - Execute test suite
   - Check environment variables
   - Validate database migrations
   - Check dependency security

2. **Environment Preparation**
   - Load environment-specific configs
   - Verify deployment credentials
   - Check resource availability
   - Validate infrastructure state

3. **Deployment Execution**
   - Build application artifacts
   - Upload to deployment platform
   - Run database migrations
   - Update environment variables
   - Deploy edge functions/services

4. **Post-deployment Verification**
   - Health check endpoints
   - Smoke tests
   - Monitor error rates
   - Verify critical functionality

5. **Rollback Preparation**
   - Tag current version
   - Store deployment metadata
   - Prepare rollback commands

## Deploy Code Integration
- Uses Bash for deployment command execution
- Leverages Read for configuration and environment analysis
- Uses Glob for artifact discovery
- Applies TodoWrite for deployment progress tracking
- Uses Grep for log analysis and error detection
- Integrates with platform CLIs (Vercel, Supabase, Docker)

## Validation Checks

### Build Validation
- TypeScript compilation
- Build success verification
- Bundle size checks
- Asset optimization

### Security Checks
- Dependency vulnerability scanning
- Environment variable validation
- Secret exposure detection
- Security header verification

### Database Checks
- Migration status verification
- Schema consistency checks
- Data integrity validation
- Backup verification

### Performance Checks
- Bundle size limits
- Load time targets
- API response times
- Database query performance

## Rollback Procedures

### Vercel Rollback
```bash
# List deployments
vercel ls [project-name]

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Supabase Rollback
```bash
# List migrations
supabase migration list

# Rollback migration
supabase migration repair [version] --status reverted
```

### Database Rollback
```sql
-- Manual rollback script
BEGIN;
-- Rollback operations
ROLLBACK;
```

## Environment Management

### Environment Variables
- Load from `.env.production`, `.env.staging`
- Validate required variables
- Check for missing secrets
- Verify variable formats

### Configuration Files
- `vercel.json` for Vercel config
- `supabase/config.toml` for Supabase
- `next.config.mjs` for Next.js
- Platform-specific configs

## Examples
```
/deploy --env production --validate
/deploy app --env staging --dry-run
/deploy --rollback production
/deploy --env preview --version v1.2.3
```

## Integration with Other Commands
- **/build**: Build application before deployment
- **/test**: Run tests as part of validation
- **/migrate**: Apply database migrations during deployment
- **/troubleshoot**: Diagnose deployment failures

## Error Handling
- Capture deployment logs
- Detect common failure patterns
- Provide rollback instructions
- Generate error reports
- Notify on deployment status

