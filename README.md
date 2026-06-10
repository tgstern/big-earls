# big-earls

A small React + Vite app whose only job is to be installed into, over and over,
by an integration tool that has no uninstall yet. "Uninstall" = reset the repo
to a tagged clean state.

## The app

A Vite + React SPA for **Big Earl's Discount Auto Barn** — a deliberately
shabby, tacky used-vehicle dealership (cars, trucks, motorcycles, jet skis,
one former ice cream truck). Integration installs get realistic targets:

- Dashboard (`/`): internal-only lot stats, weekly Sales-O-Meter™ trend chart,
  featured inventory, recent sales
- Inventory (`/inventory`): full vehicle table with a type filter
- A "Logged in as" dropdown in the header (`#user-select`) switches the active
  persona from `src/user.js` — visitor/account-style identity changes without
  real auth. Internal personas (owner, sales, finance) get the dashboard; the
  Walk-In Customer persona is routed straight to inventory and gets a
  sticky-note testimonial sidebar instead.
- Sale dates and chart weeks are derived from the current date so the lot
  always looks freshly busy
- Stable element ids for targeting: `#nav-inventory`, `#filter-type`,
  `#inventory-table`, `#btn-financing` (flips to an "APPROVED! READY FOR
  PURCHASE" state for 5 seconds when clicked), …

```sh
npm install
npm run dev      # auto-opens http://localhost:5173
```

## Reset workflow

The annotated tag `baseline` marks the clean, pre-install state. Resetting is:

```sh
git reset --hard baseline                  # undo everything committed or tracked
git clean -fd                              # delete files the installer added
git push --force-with-lease origin main    # once a remote exists
```

`npm run reset` (→ `scripts/reset-to-baseline.sh`) runs exactly those commands.

Notes:

- If the push is rejected, the tool pushed commits to GitHub that you don't
  have locally: `git pull`, then re-run.
- `git clean -fd` leaves ignored files alone (so `node_modules/` survives).
  For a deep scrub: `git clean -fdx -e node_modules`.
- To keep a record of an attempt before wiping it, tag it first:

  ```sh
  git add -A && git commit -m "attempt: agent v2 first run"
  git tag attempt-1
  ```

  Then reset as usual. Later, `git diff baseline attempt-1` shows exactly what
  that install changed.
- To intentionally evolve the base app: commit, then re-point the anchor with
  `git tag -f baseline` (and `git push -f origin baseline` once a remote exists).

## Connecting to GitHub

One-time setup, from the repo root:

```sh
# 1. Create the remote repo and push main
gh repo create <owner>/big-earls --private --source=. --push
#    …or with a repo created in the GitHub UI:
# git remote add origin git@github.com:<owner>/big-earls.git
# git push -u origin main

# 2. Push the baseline tag
git push origin baseline

# 3. Verify both arrived
git ls-remote --heads --tags origin
```

Then:

- Leave branch protection **off** for `main` (or explicitly allow force
  pushes) — the reset flow rewrites `main` every cycle.
- From now on `npm run reset` also force-pushes the remote back to baseline.
- When the baseline moves (`git tag -f baseline`), push it with
  `git push -f origin baseline`.
- After a reset, any other clone resyncs with
  `git fetch && git reset --hard origin/main`.
- If the integration opens a PR instead of committing to `main`: merge it and
  then reset, or just close the PR and delete its branch.
