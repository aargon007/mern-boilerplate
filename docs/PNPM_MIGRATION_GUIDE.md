# pnpm Migration Guide (Optional)

## When to Migrate

Consider migrating to pnpm when:
- Current yarn@1 causes issues (deprecated in 2024)
- Need better monorepo support
- Want faster dependency resolution
- Team requires better disk space efficiency
- Planning major dependency updates

## Why pnpm?

| Feature | Yarn 1 | pnpm |
|---------|--------|------|
| Monorepo Support | Basic | Excellent |
| Disk Space | ~500MB+ | ~150MB |
| Install Speed | Slow | Very Fast |
| Strict Mode | No | Yes |
| Peer Dependencies | Auto-hoist | Explicit |
| Audit Security | Basic | Advanced |

## Pre-Migration Checklist

- [ ] All team members on Node 20.12.2 (via `.nvmrc`)
- [ ] All changes committed to git
- [ ] CI/CD updated to use pnpm
- [ ] All dependencies locked (yarn.lock committed)
- [ ] Backup taken (git branch or tag)

## Migration Steps

### Step 1: Install pnpm Globally

```bash
# Using npm (recommended)
npm install -g pnpm@latest

# Or using Homebrew (macOS)
brew install pnpm

# Or using Chocolatey (Windows)
choco install pnpm

# Verify installation
pnpm --version
# Should show version 8.15.4 or later
```

### Step 2: Update Package Manager Specification

Edit `/package.json`:
```json
{
  "packageManager": "pnpm@8.15.4+sha512.xxxx...",
  // ... rest of package.json
}
```

To get the exact hash, run:
```bash
pnpm --version
# Note the version, then use it in package.json
```

### Step 3: Delete Old Lock Files

```bash
# Remove yarn lock file
rm yarn.lock

# Remove npm lock file if exists
rm package-lock.json

# Remove node_modules
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
```

### Step 4: Create pnpm Lock File

```bash
# This creates pnpm-lock.yaml
pnpm install

# This may take a few minutes on first run
# pnpm will resolve all dependencies fresh
```

### Step 5: Verify Installation

```bash
# Check all dependencies installed
pnpm list --depth=0

# Verify workspace structure
pnpm list --recursive --depth=0

# Run initial build
pnpm build

# Run linting
pnpm lint

# Run development
pnpm dev
```

### Step 6: Update .gitignore (Optional)

The `.gitignore` already includes `pnpm-lock.json`, but verify:

```
# Dependencies
node_modules
.pnp
.pnp.js
package-lock.json
pnpm-lock.yaml  # Add this
yarn-lock.json
```

### Step 7: Update CI/CD Configuration

If using GitHub Actions, update workflows:

```yaml
# .github/workflows/build.yml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8.15.4

- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20.12.2'
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install

- name: Build
  run: pnpm build
```

### Step 8: Update Documentation

```bash
# Update all scripts documentation
# Change: yarn <command>
# To: pnpm <command>

# Update team docs
# - SETUP_IMPROVEMENTS.md
# - README.md
# - CONTRIBUTING.md
```

### Step 9: Commit Changes

```bash
# Stage all changes
git add .

# Commit with clear message
git commit -m "chore: migrate from yarn to pnpm

- Update package.json packageManager field
- Generate pnpm-lock.yaml from scratch
- Update CI/CD workflows for pnpm
- Update documentation and guides"

# Push to feature branch first
git push origin feature/migrate-to-pnpm
```

### Step 10: Test Everything

```bash
# Fresh clone simulation
rm -rf node_modules .next dist
pnpm install

# Test all scripts
pnpm lint
pnpm build
pnpm dev

# Test workspace filtering
pnpm build --filter frontend
pnpm build --filter server
pnpm dev --filter frontend
```

## Command Migration Guide

### Common Commands

| Task | Yarn | pnpm |
|------|------|------|
| Install | `yarn install` | `pnpm install` |
| Add package | `yarn add pkg` | `pnpm add pkg` |
| Add dev pkg | `yarn add -D pkg` | `pnpm add -D pkg` |
| Remove pkg | `yarn remove pkg` | `pnpm remove pkg` |
| Update pkg | `yarn upgrade pkg` | `pnpm update pkg` |
| Install global | `yarn global add pkg` | `pnpm add -g pkg` |
| Run script | `yarn script` | `pnpm script` |
| Run with args | `yarn script --arg` | `pnpm script -- --arg` |

### Workspace Commands

| Task | Yarn | pnpm |
|------|------|------|
| Filter workspace | `yarn workspace app` | `pnpm --filter app` |
| Run in workspace | `yarn workspace app add pkg` | `pnpm add -F app pkg` |
| Run script workspace | `yarn run -r script` | `pnpm -r script` |
| Install all | `yarn install --frozen` | `pnpm install --frozen-lockfile` |

## Troubleshooting

### Issue: Peer Dependency Warnings

**Symptom**: `ERR_PNPM_MISSING_PEER_DEPENDENCY`

**Solution**: Explicitly install peer dependencies
```bash
pnpm add -w typescript @types/node
```

### Issue: Different Node Modules Structure

**Symptom**: Code paths break (e.g., `node_modules` nested differently)

**Solution**: pnpm uses stricter isolation by default
- Check if imports are correctly specified
- May need to update TypeScript paths config
- Use `pnpm ls` to verify structure

### Issue: Monorepo Scripts Don't Work

**Symptom**: Workspace filtering fails

**Solution**: Use correct pnpm syntax
```bash
# Wrong
pnpm --filter="@repo/pkg" build

# Right
pnpm --filter @repo/pkg build
```

### Issue: Global Package Installation Conflicts

**Symptom**: Different behavior from yarn global

**Solution**: Use workspace-local devDependencies instead
```bash
# Instead of: pnpm add -g eslint
# Use: pnpm add -D -w eslint
```

### Issue: Performance Not Improved

**Symptom**: Still slow installs

**Solution**: Check configuration
```bash
# Verify cache
pnpm store status

# Clear cache if needed
pnpm store prune

# Check registry
pnpm config get registry
```

## Rollback Plan

If migration fails, rollback is easy:

```bash
# Revert to commit before migration
git revert <migration-commit-hash>

# Or reset entire branch
git reset --hard <previous-commit>

# Reinstall yarn
npm install -g yarn@1.22.22

# Restore yarn.lock
git checkout yarn.lock

# Clear and reinstall
rm -rf node_modules pnpm-lock.yaml
yarn install
```

## Performance Comparison

### Before (Yarn 1)
```
First install: ~2-3 minutes
Subsequent installs: ~1-2 minutes
Cache: Limited
Disk usage: ~500MB+
```

### After (pnpm)
```
First install: ~30-45 seconds
Subsequent installs: ~5-10 seconds
Cache: Efficient
Disk usage: ~150MB
```

## Advanced Configuration

### pnpm Configuration File (.npmrc)

```ini
# Strict peer dependency enforcement
strict-peer-dependencies = true

# Allow hoisting for specific packages
public-hoist-pattern[] = *types*
public-hoist-pattern[] = *eslint*
public-hoist-pattern[] = prettier

# Shamefully hoist if needed (not recommended)
shamefully-hoist = false

# Module directory strategy
modules-dir = node_modules

# Additional store location for CI
virtual-store-dir = .pnpm
```

### pnpm Configuration in package.json

```json
{
  "pnpm": {
    "overrides": {
      "vulnerable-package": "^1.2.3"
    },
    "peerDependencyRules": {
      "ignoreMissing": ["@next/env"]
    },
    "packageExtensions": {
      "react@16": {
        "peerDependencies": {
          "react-dom": "16"
        }
      }
    }
  }
}
```

## Support & Resources

- Official Docs: https://pnpm.io
- Migration Guide: https://pnpm.io/migration-from-yarn
- Troubleshooting: https://pnpm.io/faq
- GitHub Issues: https://github.com/pnpm/pnpm/issues

## Timeline

- **Now**: Review this guide
- **Week 1**: Back up repo, create feature branch
- **Week 2**: Execute migration steps 1-4
- **Week 3**: Test locally and update CI/CD
- **Week 4**: PR review and merge
- **Week 5+**: Monitor for issues, support team

## Notes

- This is optional - current yarn setup works fine
- Migrate when convenient, not urgent
- No breaking changes expected if done properly
- All scripts remain the same except the package manager name
- Can revert if needed

## Next Steps

1. Get team approval before migrating
2. Create a feature branch: `git checkout -b migrate/pnpm`
3. Follow the migration steps
4. Test thoroughly
5. Create PR with clear migration documentation
6. Merge after approval
7. Communicate change to team
