# Conflict Resolution Report

## 1) Conflict Scenario
The conflict occurred in **README.md** between the **feature/user-authentication** branch and the **feature/api-endpoints** branch. Both branches added a new documentation section in the same location — directly below the Important note block and above the Quick Start section.

The feature/user-authentication branch added an "Authentication" section describing the login system and /api/auth/login endpoint. The feature/api-endpoints branch added an "API Endpoints" section describing the RESTful endpoints for user management and status monitoring. Since both edits targeted the same lines in the file, Git could not automatically merge them.

## 2) What You Saw
When I attempted to merge origin/main into the feature/api-endpoints branch after PR #4 (auth) had already been squash-merged, Git reported a merge conflict in README.md. Opening the file in VS Code revealed the standard three-way conflict markers:

- `<<<<<<< HEAD` marked the beginning of the current branch's changes (API Endpoints section)
- `=======` separated the two conflicting versions
- `>>>>>>> origin/main` marked the end of the incoming changes (Authentication section)

The conflict showed the API Endpoints section from my current branch above the divider and the Authentication section from the already-merged auth branch below it. VS Code highlighted these sections in green and blue, making them easy to identify.

## 3) Resolution Strategy
I chose to **keep both sections** since they describe different features and are not mutually exclusive. I removed all three conflict marker lines and arranged the sections in logical order: Authentication first (since it was merged first), followed by API Endpoints.

After resolving, I verified the fix by:
1. Running `npm test` — passed
2. Running `npm run lint` — passed
3. Running `npm run format:check` — passed
4. Reviewing the rendered README on GitHub to confirm proper Markdown formatting

The resolution commit used the message: `chore(merge): resolve README conflict between auth and api branches`

## 4) Prevention Methods
Several practices can reduce the frequency and severity of merge conflicts:

1. **Smaller, focused PRs**: Merging features quickly reduces the window during which parallel branches can diverge. Large, long-lived branches accumulate more conflicting changes.

2. **Frequent rebasing from main**: Running `git fetch origin && git rebase origin/main` on feature branches regularly incorporates upstream changes early, making conflicts smaller and easier to resolve.

3. **Team communication before refactors**: When a teammate plans to restructure a shared file like README.md or app.js, communicating this in advance allows others to defer their edits or coordinate timing.

4. **Avoiding overlapping edits**: Assigning ownership of specific files or sections to individual developers prevents two people from editing the same lines simultaneously. Feature flags can also help by allowing incomplete features to coexist on main without conflicting.
