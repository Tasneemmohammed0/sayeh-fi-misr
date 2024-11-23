# Project Workflow Documentation

## Table of Contents:

1. [Introduction](#introduction)
2. [Branching Strategy](#branching-strategy)
3. [Commit Conventions](#commit-conventions)
4. [Git Workflow](#git-workflow)
5. [Pull Requests & Code Reviews](#pull-requests--code-reviews)
6. [Release Management](#release-management)
7. [Versioning](#versioning)
8. [Best Practices](#best-practices)

## 1. Introduction

This guide outlines the version control practices and workflows used in our repository, aiming to provide a structured and efficient approach for managing our codebase.

---

## 2. Branching Strategy

We follow a branching strategy that ensures a clean separation between the development of new features, bug fixes, and production-ready code.

### Main Branches:

1. **`main`**: The main branch is always in a deployable state. Only release-ready code should be merged here.
2. **`develop`**: This is the integration branch for features, bug fixes, and experiments. Once code is fully tested and reviewed in feature branches, it’s merged into `develop`.
3. **`feature/{feature-name}`**: Feature branches are created from `develop` for new features.
4. **`bugfix/{bugfix-name}`**: Bug fix branches are created from `develop` for fixing issues.
5. **`release/{version}`**: Release branches are created when preparing for a new release. This branch allows for last-minute fixes and version updates before merging into `main`.
6. **`hotfix/{bugfix-name}`**: Hotfix branches are created from `main` for critical fixes that need to be applied to production immediately.

### Branch Naming Conventions:

- **Feature Branch**: `feature/{feature-name}`
- **Bug Fix Branch**: `bugfix/{bugfix-name}`
- **Release Branch**: `release/{version-number}`
- **Hotfix Branch**: `hotfix/{bugfix-name}`

---

## 3. Commit Conventions

We follow **Conventional Commits** to standardize the commit messages. This makes the version history more readable and enables automation tools to generate changelogs and version updates.

### Commit Message Format:

```
<type>(<scope>): <subject>
```

- **type**: Describes the kind of change (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, etc.).
- **scope** (optional): The module or part of the project being affected.

### Examples:

1. **Feature Commit:**

   ```
   feat(auth): add JWT authentication
   ```

2. **Bug Fix Commit:**

   ```
   fix(api): resolve issue with data parsing
   ```

3. **Documentation Commit:**
   ```
   docs(readme): update setup instructions
   ```

---
