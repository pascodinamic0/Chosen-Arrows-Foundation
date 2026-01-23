---
allowed-tools: [Bash, Read, Grep, Glob, TodoWrite, Edit]
description: "Comprehensive git workflow assistance with troubleshooting, recovery, and best practices"
---

# /githelper - Comprehensive Git Workflow Assistant

## Purpose
Expert guidance for git operations, workflows, troubleshooting, and recovery. Provides comprehensive git assistance with focus on clean, maintainable version control practices.

## Usage
```
/githelper [action] [args] [--scenario scenario-name] [--safe] [--dry-run] [--explain]
```

## Arguments
- `action` - Git operation or scenario (status, branch, commit, merge, rebase, recover, troubleshoot, etc.)
- `args` - Operation-specific arguments
- `--scenario` - Use predefined scenario (new-feature, conflict-resolution, cleanup-history, undo-mistake, recover-work, sync-remote, pr-prep, config, optimize)
- `--safe` - Use safe operations only (no force push, check before destructive ops)
- `--dry-run` - Preview changes without executing
- `--explain` - Explain what commands do and why

## Core Capabilities

### Branch Management
- Creating feature branches with proper naming conventions
- Switching between branches safely
- Cleaning up stale branches
- Understanding branch strategies (GitFlow, GitHub Flow)

### Commit Excellence
- Writing clear, conventional commit messages
- Managing staged changes effectively
- Commit history cleanup and organization
- Interactive rebase workflows

### Merge & Rebase Workflows
- Safe merge strategies
- Rebase vs merge decisions
- Conflict resolution techniques
- Keeping history clean

### Troubleshooting & Recovery
- Fixing common git issues
- Recovery from mistakes
- Understanding git state
- Diagnostic commands
- Recovering deleted branches
- Undoing operations safely

## Execution Flow

### 1. Assess Current State
Always start by understanding the current git situation:
```bash
git status
git branch -a
git log --oneline -10
```

### 2. Understand the Goal
Determine what the user wants to accomplish:
- New feature work → branch creation and setup
- Code review → commit organization and PR preparation
- Bug fix → targeted commits and proper branching
- Release preparation → version tagging and branch protection

### 3. Execute Safely
Follow git safety principles:
- Never force push to shared branches
- Always check remote state before major operations
- Use `--dry-run` for destructive operations
- Create backups of important branches

## Branch Strategy Guidelines

### Feature Branches
```bash
# Good naming conventions
git checkout -b feature/user-authentication
git checkout -b fix/login-validation-error
git checkout -b docs/api-documentation-update
git checkout -b chore/update-dependencies
git checkout -b refactor/simplify-auth-flow
```

### Branch Cleanup
```bash
# List merged branches
git branch --merged main

# Safe deletion (merged branches)
git branch -d feature-name

# Force deletion (unmerged branches) - USE WITH CAUTION
git branch -D feature-name

# Delete remote branch
git push origin --delete branch-name
```

## Commit Message Standards

### Conventional Commits Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add JWT token refresh mechanism
fix: resolve memory leak in image processing
docs: update API authentication examples
refactor: simplify user service dependency injection
test: add unit tests for auth service
chore: update dependencies
```

## Common Workflows

### Starting New Feature
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Start development
# ... work on your feature ...

# 4. Stage and commit
git add .
git commit -m "feat: implement initial feature structure"

# 5. Push and create PR
git push -u origin feature/your-feature-name
```

### Interactive Rebase for Clean History
```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Commands in interactive mode:
# pick = use commit
# reword = use commit but edit message
# edit = use commit but amend it
# squash = combine with previous commit
# fixup = combine with previous (discard this message)
# drop = remove commit
```

### Safe Merge Strategies
```bash
# Merge feature into main
git checkout main
git pull origin main
git merge --no-ff feature/branch-name  # Creates merge commit

# Rebase feature onto main (cleaner history)
git checkout feature/branch-name
git fetch origin
git rebase origin/main
```

## Troubleshooting Commands

### Undo Operations
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - DESTRUCTIVE
git reset --hard HEAD~1

# Undo specific commit (safe, creates new commit)
git revert <commit-hash>

# Recover deleted branch
git reflog  # Find the hash
git checkout -b recovered-branch <hash>
```

### Conflict Resolution
```bash
# See conflict status
git status

# List conflicted files
git diff --name-only --diff-filter=U

# Mark conflicts as resolved
git add <conflicted-file>
git commit  # Continue with merge/rebase

# Abort and restart
git merge --abort  # or git rebase --abort
```

### Stashing
```bash
# Save current work
git stash push -m "work in progress"

# List stashes
git stash list

# Apply and remove stash
git stash pop

# Apply but keep stash
git stash apply stash@{0}

# Drop specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

## Git Configuration Best Practices

### Essential Settings
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global push.autoSetupRemote true
```

### Aliases for Productivity
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.graph 'log --oneline --graph --decorate --all'
```

## Advanced Patterns

### Partial Commits
```bash
# Stage specific parts of files
git add -p

# Interactive staging
git add -i

# Commit specific hunks
git add --patch file.js
```

### Cherry-picking
```bash
# Pick specific commit from another branch
git checkout target-branch
git cherry-pick <commit-hash>

# Pick multiple commits
git cherry-pick <start-commit>..<end-commit>
```

### Bisect for Bug Finding
```bash
# Start bisect
git bisect start
git bisect bad  # Current version has bug
git bisect good <known-good-commit>

# Git will checkout commits, you test:
git bisect good  # or git bisect bad

# When done, git shows the culprit commit
git bisect reset
```

## Safety Checks

### Before Destructive Operations
```bash
# Check what will be deleted
git branch -d branch-name  # Test deletion
git push origin --delete branch-name  # Test remote deletion

# Check rebase before doing it
git log --oneline main..feature-branch
git rebase --interactive --autosquash HEAD~5
```

### Remote Sync Status
```bash
# Check if you're behind/ahead
git status
git log --oneline origin/main..HEAD  # Ahead commits
git log --oneline HEAD..origin/main  # Behind commits
```

## Predefined Scenarios

### Scenario 1: Starting New Feature
**Usage**: `/githelper --scenario new-feature [feature-name]`

```bash
# Checks current state
git status
git branch

# Updates main and creates feature branch
git checkout main
git pull origin main
git checkout -b feature/feature-name
```

### Scenario 2: Commit Message Help
**Usage**: `/githelper --scenario commit-help`

```bash
# Analyzes changes and suggests commit messages
git status
git diff --staged

# Suggests appropriate commit type and message
# Based on changes: feat, fix, docs, refactor, etc.
```

### Scenario 3: Merge Conflict Resolution
**Usage**: `/githelper --scenario conflict-resolution`

```bash
# Identifies conflicts
git status
git diff --name-only --diff-filter=U

# Guides through resolution process
# Step-by-step conflict resolution
```

### Scenario 4: Cleaning Up Git History
**Usage**: `/githelper --scenario cleanup-history [--commits N]`

```bash
# Shows recent commits
git log --oneline -10

# Interactive rebase to combine/squash commits
git rebase -i HEAD~5  # Last 5 commits

# Or creates clean branch from main
git checkout main
git pull origin main
git checkout -b clean-feature-branch
git cherry-pick <good-commit-1> <good-commit-2>
```

### Scenario 5: Undoing Mistakes
**Usage**: `/githelper --scenario undo-mistake [--type committed-to-main|wrong-commit|etc]`

```bash
# Fixes common mistakes safely
# Example: Committed to main instead of feature branch
git checkout -b feature/your-feature-name main
git checkout main
git reset --hard HEAD~1
git checkout feature/your-feature-name
```

### Scenario 6: Recovering Lost Work
**Usage**: `/githelper --scenario recover-work [branch-name]`

```bash
# Uses reflog to find lost branches/commits
git reflog

# Recreates branch from commit hash
git checkout -b recovered-branch <commit-hash>
```

### Scenario 7: Syncing with Remote Changes
**Usage**: `/githelper --scenario sync-remote [--strategy merge|rebase]`

```bash
# Fetches and shows sync status
git fetch origin
git log --oneline origin/main..HEAD
git log --oneline HEAD..origin/main

# Merges or rebases based on strategy
git merge origin/main  # or git rebase origin/main
```

### Scenario 8: Code Review Preparation
**Usage**: `/githelper --scenario pr-prep`

```bash
# Prepares commits for PR
git log --oneline -10
git rebase -i HEAD~3  # Clean up commits
git fetch origin
git rebase origin/main
git log --oneline origin/main..HEAD
git diff origin/main..HEAD --stat
```

### Scenario 9: Git Configuration
**Usage**: `/githelper --scenario config [--team|--personal]`

```bash
# Sets up git configuration
git config --list
# Configures user, aliases, and team settings
```

### Scenario 10: Performance Optimization
**Usage**: `/githelper --scenario optimize`

```bash
# Optimizes git performance
git config core.fsmonitor true
git lfs install  # If needed
git gc --prune=now
git count-objects -vH
```

## Quick Reference Cheatsheet

### Daily Operations
```bash
git status                    # Working directory status
git log --oneline -10         # Recent commits
git branch -a                 # All branches
git diff                      # Unstaged changes
git diff --staged             # Staged changes
```

### Basic Workflow
```bash
git add <file>                # Stage file
git add .                     # Stage all changes
git commit -m "message"       # Commit staged changes
git push                      # Push to remote
git pull                      # Pull from remote
```

### Branch Management
```bash
git branch <name>             # Create branch
git checkout <name>           # Switch branch
git checkout -b <name>        # Create & switch
git switch <name>             # Modern switch command
git branch -d <name>          # Delete merged branch
git branch -D <name>          # Force delete branch
```

### Commit Management
```bash
git commit -m "feat: add feature"  # Simple commit
git commit --amend                 # Edit last commit
git reset --soft HEAD~1            # Undo commit (keep changes)
git reset --hard HEAD~1            # Undo commit (discard changes)
git revert <commit>                 # Safe undo (creates new commit)
```

### Merge & Rebase
```bash
git merge <branch>            # Merge branch
git merge --no-ff <branch>    # Merge with commit
git rebase <branch>           # Rebase onto branch
git rebase -i HEAD~3         # Interactive rebase
```

### Remote Operations
```bash
git remote -v                 # Show remotes
git fetch origin              # Fetch updates
git push origin <branch>      # Push branch
git push -u origin <branch>   # Push & set upstream
git pull --rebase            # Pull with rebase
```

### Recovery
```bash
git reflog                    # Action history
git fsck --lost-found         # Find lost commits
git checkout -b <name> <hash> # Recover from hash
```

## Integration with Other Tools

### GitHub CLI Integration
```bash
# Create PR from current branch
gh pr create --title "Feature description" --body "Detailed description"

# Sync PR branch
gh pr sync

# View PR status
gh pr view --web
```

### Pre-commit Hooks
```bash
# Install pre-commit for quality checks
pip install pre-commit
pre-commit install

# Common checks: linting, formatting, security scans
```

## Examples

```bash
# Start new feature
/githelper --scenario new-feature user-authentication

# Get commit message help
/githelper --scenario commit-help

# Resolve merge conflicts
/githelper --scenario conflict-resolution

# Clean up commit history
/githelper --scenario cleanup-history --commits 5

# Recover deleted branch
/githelper --scenario recover-work feature/my-feature

# Prepare for PR
/githelper --scenario pr-prep

# Sync with remote
/githelper --scenario sync-remote --strategy rebase

# Configure git
/githelper --scenario config --team

# Optimize performance
/githelper --scenario optimize

# Safe branch operations
/githelper branch cleanup --safe --dry-run

# Interactive rebase with explanation
/githelper rebase -i HEAD~3 --explain
```

## Integration with Other Commands
- **/format**: Format code before commit
- **/test**: Run tests before commit
- **/build**: Build before push
- **/deploy**: Deploy after merge
- **/git**: Use for direct git operations

## Git Best Practices

### Commit Practices
- Write clear commit messages following Conventional Commits
- Make atomic commits (one logical change per commit)
- Test before committing
- Review before pushing

### Branch Practices
- Use descriptive branch names (feat/, fix/, docs/, etc.)
- Keep branches focused on single features
- Merge frequently to avoid large conflicts
- Delete merged branches to keep repo clean

### Workflow Practices
- Follow project conventions
- Use pull requests for code review
- Review before merging
- Keep main branch clean and deployable
- Never force push to shared branches

## When to Use This Command

Use `/githelper` when you need:
- Comprehensive git guidance and troubleshooting
- Recovery from git mistakes
- Help with complex workflows (rebase, merge conflicts)
- Understanding git concepts and best practices
- Safe execution of potentially destructive operations
- Predefined workflows for common scenarios

For simple, direct git operations, use `/git` instead.

