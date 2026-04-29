---
name: agents-md-sync
description: Use when the codebase has been modified and AGENTS.md documentation may need updates - verifies dependencies, file structure, and patterns match current project state
---

# AGENTS.md Sync

## Overview

Verifies and updates AGENTS.md documentation when project changes occur. Ensures documentation stays in sync with actual codebase state.

## When to Use

- After installing new dependencies (`npm install`, `yarn add`, etc)
- When creating new components or files
- When updating existing project structure
- When project configuration changes
- When explicitly requested: "verify AGENTS.md", "check if documentation is updated"

## Trigger Symptoms

- New dependency added to project
- New file created in src/
- File structure changed
- Build/development commands modified
- Configuration files changed

## Verification Process

### 1. Check Dependencies

Read `package.json` and compare with AGENTS.md Key Dependencies table:

| What to Check | How to Check |
|---------------|-------------|
| Package versions | Compare exact versions in dependencies/devDependencies |
| New packages | Any package in package.json not in AGENTS.md |
| Removed packages | Any package in AGENTS.md not in package.json |

### 2. Check File Structure

Run glob to compare actual files:

```bash
glob "**/*.tsx"
glob "**/*.ts"
```

Compare with AGENTS.md File Structure section.

### 3. Check Commands

Compare scripts in `package.json` with AGENTS.md Commands table.

### 4. Check Project Overview

Verify:
- React version
- TypeScript version
- Build tool version
- Styling solution

## Update Process

### Update Procedure

1. Read current AGENTS.md
2. Read package.json
3. Identify differences
4. Update affected sections:
   - **Key Dependencies**: Update versions, add/remove packages
   - **File Structure**: Add new files, remove deleted
   - **Commands**: Update scripts section
   - **Project Overview**: Update version numbers

### Example Update

```diff
## Key Dependencies

| Package               | Purpose                   |
| --------------------- | ------------------------- |
- | `react` 19            | UI library                |
+ | `react` ^19.2.0       | UI library                |
- | `vite` 7              | Build tool                |
+ | `vite` ^7.2.4        | Build tool                |
+ | `remask` ^1.2.2      | Input masks (money, CPF)  |
```

## Common Updates Needed

| Change Type | AGENTS.md Section |
|-------------|-------------------|
| npm install | Key Dependencies |
| New component | File Structure |
| Script change | Commands |
| Version bump | Project Overview, Key Dependencies |

## Integration

**This skill should be manually invoked** after making project changes:

```
User: "Instalei a biblioteca remask"
→ Use agents-md-sync to verify AGENTS.md is updated
```

**Auto-discovery**: Not recommended - manual invocation ensures intent.

## Red Flags - When NOT to Use

- Regular code changes (no documentation impact)
- Documentation-only changes
- Read-only exploration tasks

## Quick Reference

| Task | Action |
|------|--------|
| Verify AGENTS.md | Read package.json + AGENTS.md, compare |
| Update dependencies | Update Key Dependencies table |
| Update structure | Update File Structure section |
| Update commands | Update Commands table |