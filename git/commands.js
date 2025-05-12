// Below is the solution Roy...

// You're working in a team using Git, so you'll regularly encounter commands related to collaboration, fixing conflicts, reviewing code, managing branches, and syncing work. Here's a complete list of team-based Git commands with super simple examples, assuming you're working on a shared project repo.

// ✅ DAILY USAGE COMMANDS
// git clone <repo-url>
// 🔹 Copy the entire repo to your local machine.

// 🗣️ “I want to download the project from GitHub so I can start working.”

// git pull
// 🔹 Bring the latest changes from the remote repo.

// 🗣️ “Let me get the latest work done by my teammates.”

// git add .
// 🔹 Add all changed files to be saved (staged).

// 🗣️ “These are the files I want Git to remember.”

// git commit -m "message"
// 🔹 Save a snapshot of your changes locally.

// 🗣️ “Save my work with a message like ‘Added login feature’.”

// git push
// 🔹 Send your saved work to GitHub/Bitbucket.

// 🗣️ “Upload my work so others can see and use it.”

// 👥 BRANCHING (Team Collaboration)
// git branch
// 🔹 List all branches.

// 🗣️ “Show me what versions (branches) are there.”

// git branch branch-name
// 🔹 Create a new branch.

// 🗣️ “Start a new version of the project so I don’t disturb the main one.”

// git checkout branch-name
// 🔹 Switch to another branch.

// 🗣️ “Move to my teammate’s version or my own.”

// git checkout -b new-branch
// 🔹 Create and switch to a new branch in one go.

// 🗣️ “Create my own space to work on the login feature.”

// git push --set-upstream origin branch-name
// 🔹 Link a new local branch with the remote.

// 🗣️ “Tell Git to connect this new branch with GitHub.”

// 🔄 MERGING & REBASING
// git merge branch-name
// 🔹 Combine another branch into your current one.

// 🗣️ “Add your work into mine.”

// git rebase branch-name
// 🔹 Put your changes on top of another branch’s changes.

// 🗣️ “Make my work look like it was done after the main branch's latest updates.”

// git pull --rebase
// 🔹 Rebase instead of merge during pull.

// 🗣️ “Update my code in a cleaner way without a merge commit.”

// 🧹 CLEANUPS & FIXES
// git stash
// 🔹 Save unfinished work temporarily.

// 🗣️ “Hide my work so I can fix something urgent.”

// git stash pop
// 🔹 Bring back the hidden work.

// 🗣️ “I’m back. Let me continue from where I left off.”

// git reset --hard HEAD
// 🔹 Discard all changes and go back to last commit.

// 🗣️ “Throw away all unsaved work.”

// git clean -fd
// 🔹 Remove untracked files/folders.

// 🗣️ “Clean up junk that Git isn’t tracking.”

// 🔍 REVIEWING & DEBUGGING
// git status
// 🔹 See what has changed and what is staged.

// 🗣️ “What have I changed so far?”

// git diff
// 🔹 See exact line-by-line changes.

// 🗣️ “Show me what I modified.”

// git log
// 🔹 Show commit history.

// 🗣️ “Let’s look at the full project history.”

// git blame filename
// 🔹 Find out who wrote each line of a file.

// 🗣️ “Who added this bug? 😂”

// 🛠️ ERROR FIXING
// git revert <commit-id>
// 🔹 Undo a commit by creating a new one.

// 🗣️ “Fix a bad change but keep history clean.”

// git cherry-pick <commit-id>
// 🔹 Apply a specific commit from another branch.

// 🗣️ “Copy just that fix from another teammate’s branch.”

// git fetch
// 🔹 Get latest branches and history from remote (but don’t apply).

// 🗣️ “What’s new on GitHub? Let me just check.”

// 🔐 REMOTE COMMANDS
// git remote -v
// 🔹 Show connected repo URLs.

// 🗣️ “Where am I pushing and pulling from?”

// git remote add origin <url>
// 🔹 Link your local repo to GitHub.

// 🗣️ “Connect my local folder to GitHub.”

// git push origin --delete branch-name
// 🔹 Delete a branch from remote.

// 🗣️ “Remove that outdated version from GitHub.”

// BONUS: CONFLICT RESOLUTION (TEAM WORK REALITY)
// Merge conflict happens when:
// 🔹 Two people edit the same line/file and push.

// 🗣️ “We both wrote on the same sentence — Git is confused.”

// How to fix:
// Git will show a conflict in the file like:

// plaintext
// Copy
// Edit
// <<<<<<< HEAD
// My change
// =======
// Teammate’s change
// >>>>>>> branch-name
// Edit the file, keep the correct version.

// Save and run:

// bash
// Copy
// Edit
// git add .
// git commit