# Testing GitHub Actions Locally

## Option 1: Using `act` (Recommended)

[act](https://github.com/nektos/act) is a tool that runs your GitHub Actions locally using Docker.

### Installation

**Windows (using Chocolatey):**
```bash
choco install act-cli
```

**Windows (using Scoop):**
```bash
scoop install act
```

**macOS:**
```bash
brew install act
```

**Linux:**
```bash
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### Usage

```bash
# Test the preview-comment workflow
act pull_request -W .github/workflows/preview-comment.yml

# Test with a specific event file
act pull_request -W .github/workflows/preview-comment.yml -e test-event.json

# List available workflows
act -l
```

### Create Test Event File

Create `test-event.json`:
```json
{
  "pull_request": {
    "number": 1,
    "head": {
      "ref": "test-branch",
      "sha": "abc123def456",
      "repo": {
        "name": "robinson-gaming"
      }
    }
  },
  "repository": {
    "owner": {
      "login": "crobin27"
    },
    "name": "robinson-gaming"
  }
}
```

## Option 2: GitHub CLI

Test parts of the workflow using GitHub CLI:

```bash
# Install GitHub CLI if needed
# https://cli.github.com/

# Test listing comments on a PR
gh api repos/crobin27/robinson-gaming/issues/4/comments

# Test creating a comment (use with caution!)
gh api repos/crobin27/robinson-gaming/issues/4/comments -f body="Test comment"
```

## Option 3: Syntax Validation

Validate YAML syntax without running:

```bash
# Using yamllint
yamllint .github/workflows/preview-comment.yml

# Using actionlint
# https://github.com/rhysd/actionlint
actionlint .github/workflows/preview-comment.yml
```

## Option 4: Test in a Fork or Test Repository

1. Create a test repository or use a fork
2. Push workflow changes to the test repo
3. Create a test PR to trigger the workflow
4. Review results without affecting the main repository

## Limitations

- Local testing with `act` may not perfectly replicate GitHub's environment
- Some GitHub-specific features may not work locally
- Secrets and tokens need to be configured separately for local testing

## Best Practice

For critical workflows:
1. Test syntax locally with `actionlint`
2. Test basic functionality with `act`
3. Verify in a test repository before merging to main

