---
allowed-tools: [Bash, Read, Glob, TodoWrite, Edit]
description: "Git operations with intelligent commit messages and branch management"
---

# /git - Git Operations

## Purpose
Execute Git operations with intelligent commit messages, branch management, and workflow optimization.

## Usage
```
/git [operation] [args] [--smart-commit] [--branch-strategy] [--interactive]
```

## Arguments
- `operation` - Git operation (add, commit, push, pull, merge, branch, status)
- `args` - Operation-specific arguments
- `--smart-commit` - Generate intelligent commit messages
- `--branch-strategy` - Apply branch naming conventions
- `--interactive` - Interactive mode for complex operations
- `--dry-run` - Preview changes without executing

## Git Operations

### Status Operations
```bash
# Check repository status
git status

# Check branch status
git branch -v

# Check remote status
git remote -v
```

### Add Operations
```bash
# Stage all changes
git add .

# Stage specific files
git add path/to/file

# Stage with patterns
git add "*.ts" "*.tsx"
```

### Commit Operations
```bash
# Commit with message
git commit -m "feat: add user authentication"

# Commit with smart message generation
/git commit --smart-commit

# Commit with conventional format
git commit -m "type(scope): description"
```

### Branch Operations
```bash
# Create new branch
git checkout -b feat/feature-name

# Switch branch
git checkout branch-name

# List branches
git branch -a
```

### Push/Pull Operations
```bash
# Push to remote
git push origin branch-name

# Pull from remote
git pull origin main

# Push with upstream
git push -u origin branch-name
```

### Merge Operations
```bash
# Merge branch
git merge branch-name

# Merge with no-ff
git merge --no-ff branch-name

# Merge with squash
git merge --squash branch-name
```

## Execution Flow
1. **Analysis Phase**
   - Analyze current Git state
   - Check repository status
   - Identify changes
   - Validate operation

2. **Preparation Phase**
   - Prepare operation arguments
   - Generate commit messages (if needed)
   - Validate branch names
   - Check for conflicts

3. **Execution Phase**
   - Execute Git commands
   - Monitor operation progress
   - Handle errors
   - Capture output

4. **Validation Phase**
   - Verify operation success
   - Check repository state
   - Validate changes
   - Report results

5. **Cleanup Phase**
   - Clean up temporary files
   - Update tracking
   - Provide next steps

## Git Code Integration
- Uses Bash for Git command execution
- Leverages Read for repository analysis
- Uses Glob for file pattern matching
- Applies TodoWrite for operation tracking
- Uses Edit for commit message generation
- Maintains Git best practices and conventions

## Commit Message Generation

### Conventional Commits Format
```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance tasks

### Smart Commit Messages
- Analyze staged changes
- Generate appropriate type
- Create descriptive message
- Follow project conventions

## Branch Naming Conventions

### Branch Types
- `feat/` - Feature branches
- `fix/` - Bug fix branches
- `chore/` - Maintenance branches
- `docs/` - Documentation branches
- `refactor/` - Refactoring branches

### Branch Examples
```
feat/user-authentication
fix/login-error
chore/update-dependencies
docs/api-documentation
```

## Examples
```
/git status
/git add . --smart-commit
/git commit --message "feat: add user dashboard"
/git branch feat/new-feature --branch-strategy
/git push origin main
/git merge feat/feature-name
```

## Integration with Other Commands
- **/format**: Format code before commit
- **/test**: Run tests before commit
- **/build**: Build before push
- **/deploy**: Deploy after merge

## Git Best Practices

### Commit Practices
- Write clear commit messages
- Make atomic commits
- Test before committing
- Review before pushing

### Branch Practices
- Use descriptive branch names
- Keep branches focused
- Merge frequently
- Delete merged branches

### Workflow Practices
- Follow project conventions
- Use pull requests
- Review before merging
- Keep main branch clean

## Easy Git Workflow for the Lazy

This workflow is a subset of "git flow", but can easily be extended to handle releases as well.

### Setup

1. Either create a repo on github and clone it
   
   OR
   
   create a project folder and initialize it

2. That's basically it

### Commands to Know

There is way more to know but hopefully this gets you started.

1. `git init` -- initializes git within a directory

2. `git status` -- shows you what git sees in your directory, you will run this 10,000 times per day lol

3. `git add` -- this tells git to add modified files to the "stage", you put things on the stage before you commit them

4. `git commit -m "something cool was made"` -- this is how you commit your changes

5. `git checkout -b my-branch-name` -- this is how you create a new branch from whatever directory/branch you are in/on

6. `git branch -d my-branch-name` -- delete branches after you merge them, clean up after yourself hippie

7. `git checkout branchname` -- start using that branch instead

8. `git merge my-branch-name` -- merge the changes you made in `my-branch-name` into whatever branch you are currently in

### Using It

High-level process is like this:

1. create a feature branch from your develop branch
2. make changes in your feature branch
3. once the changes look good, merge them back into the develop branch
4. delete the feature branch
5. that's it

### How Do We Do That?

1. Make sure you're on the develop branch
   ```
   git checkout develop
   ```

2. Create a feature branch for your new changes
   ```
   git checkout -b feature/my-new-feature
   ```

3. Make your code changes.

4. Stage those changes for commit
   ```
   git add .
   ```
   You can now see them with `git status` (some tools like Codex do this for you, but other tools like Antigravity do not.)

5. Commit your changes
   ```
   git commit -m "Look at my cool new feature"
   ```

6. Merge your feature branch into your develop branch
   ```
   git checkout develop
   git merge feature/my-new-feature
   ```

7. Delete the merged branch since you don't need it anymore
   ```
   git branch -d feature/my-new-feature
   ```

8. Enjoy!

### Lazy Workflow Integration

This simplified workflow integrates with the existing git commands:
- Use `/git status` to check your current state
- Use `/git branch feat/my-feature --branch-strategy` to create feature branches
- Use `/git add . --smart-commit` for staging changes
- Use `/git commit --message "feat: description"` following conventional commits
- Use `/git merge feat/feature-name` to merge back to develop
- Clean up with branch deletion after successful merges

