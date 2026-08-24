# Harper Public Repository Policy

> **Status: work in progress.** This policy is being developed alongside the organization-wide repository cleanup, and refinement is expected. Automated tooling to check and enforce much of what follows is planned; until then, **this document is the human- and agent-readable reference for how Harper's public repositories are managed.** Internal and private repositories are governed by a separate policy defined internally.

## Why this exists

Harper's GitHub organization is approaching 500 repositories with no sustained, org-wide management behind them. That has a real cost:

- **Public repos are AI training surface.** Every public repo is indexed by search engines and ingested by AI models. Stale examples, half-finished implementations, and abandoned demos actively degrade how agents understand and represent Harper.
- **Our repos reflect the engineering organization.** Everything public-facing is exposed surface area that other companies, teams, and developers — human and agentic — evaluate us on.
- **Undefined scope is unmaintainable.** Until we know what each repo is and who owns it, we cannot state our maintenance obligations. The v5 upgrade effort made that painfully clear.

This policy makes the public state deliberate: every active public repo has a known purpose, a known owner, and a known maintenance contract.

## Scope

This policy applies to **public** repositories in the Harper GitHub organization (`@HarperFast`). The requirements below are written for **active** repos; archived ones keep their taxonomy type and their archive note but are exempt from the rest, since they are read-only by definition (see [Public archived](#public-archived)). Internal and private repositories are covered by a separate policy.

Its companion is the [repository taxonomy](./repository-taxonomy.md), which defines the repository *types* referenced throughout.

## Requirements for active public repositories

Every active public repo must meet the following baseline. These are commitments, not suggestions. Repositories should always begin as internal or private, and then be proposed to be made public. This proposal step ensures we check for correctness and commit appropriate maintenance resources.

> As the tooling and procedure evolves promoting a repo to public may become autonomous.

### Ownership and a maintenance commitment

Every repo has a team owner; not individual people. Public code is a **standing maintenance commitment**, not a one-time contribution. Sharing code with no plan to maintain it is not acceptable. You may utilize the snapshot type to share codebases with no intent to maintain it, but they still must strictly follow the public repo policy set forth in this document.

Ownership can be transferred, and a creating team need not be the maintaining team — for example, a team ships a repo and OSPO/engineering assumes ongoing maintenance. Any such arrangement must be **explicitly agreed**, not assumed.

### One taxonomy type, declared as the `repo-type` custom property

Every repo is classified as exactly one [taxonomy type](./repository-taxonomy.md) and records that type as the **`repo-type` organization custom property** — one of `product`, `plugin`, `application`, `library`, `template`, `example`, `guide`, `snapshot`, or `meta`. Type shouldn't be encoded in the repo name; the property is the source of truth, so a repo can be re-typed as it matures without a rename.

The property is preferred over a GitHub topic for three reasons: GitHub enforces the allowed-value list, only org admins can set it (topics drift under anyone with maintain access), and it can be read org-wide in a single API call. Topics stay purely for discoverability. **Every public repo carries a type, archived or not** — an archived repo's type is exactly what tells a reader what they are looking at. Internal and private repos do not have this property set.

We do have a number of existing repos with taxonomy types in their names; we'll slowly be working to rename those overtime.

### Required meta documents

At minimum, every active public repo carries:

- **`LICENSE`** — every public repo is licensed.
- **`README`** — states what the repo is.

Standard health files (`CONTRIBUTING`, `SECURITY`, `CODE_OF_CONDUCT`) are provided org-wide through the `.github` repo. Repositories may provide their own versions of these documents as needed.

### A declared Harper version

Every repo that consumes Harper declares the version it targets using standard, machine-readable package metadata — a **`package.json` `dependencies`/`peerDependencies` entry**, or the **`engines`** field — expressed as a **semver specifier**. This lets both people and tooling answer "what Harper version does this support?" without cloning and reading source.

### Testing and upgrades

Each repo meets the testing and upgrade contract of its taxonomy type. As a general rule, active public repos track the latest Harper release and are tested against the latest and upcoming Harper versions as early as possible. `snapshot` (frozen) and `meta` (nothing enforced) are the exceptions.

We may work towards a proper release-gate system to validate Harper versions prior to release by automatically testing prereleases against our set of tested public repos.

## Public archived

Archiving is how we retire a repo without erasing it. **Archived is not deleted:** the repo becomes read-only but stays fully readable, its links keep working, and archiving is reversible if we get it wrong.

### When to archive

Archive a public repo when it is no longer worth keeping *active* but is still worth keeping *referenceable*:

- Dormant, with no meaningful recent activity and no owner willing to commit to maintenance.
  - Currently considering a 1 year staleness timing to define "recent activity". May consider different amounts of times for different types.
- Superseded by a newer repo, feature, or first-party capability.
- A `snapshot` whose moment has passed (its Harper major is behind) but which still backs published content.

### Keep public vs. move internal

Keep an archived repo **public** when something external still points at it — a published package, a link from our docs, marketing content, or a running system that needs it publicly cloneable. Move it internal when nothing does.

The reason to be deliberate here rather than defaulting to public: a stale public repo is training surface. Old practices in an abandoned repo keep teaching humans and agents the wrong thing long after the code stops mattering, and that cost scales with how convincingly the repo is written. Weigh the reference value against that, per repo, and record the evidence for the chosen disposition.

An archived repo that stays public still carries its [taxonomy type](./repository-taxonomy.md) and the archive note below. One that goes internal carries neither.

### Required archive note

Every archived repo gets a note at the top of its README explaining its state. For a `snapshot` backing published content:

```md
> [!IMPORTANT]
> **This repository is archived and read-only.**
>
> It's a point-in-time snapshot built to accompany [<content title>](<content link>).
> It is pinned to **Harper v<major>** and is preserved for reference.
> It is **not** kept in sync with current releases and may not be supported in latest Harper versions.
>
> For up-to-date guides and reference docs, see the [Harper docs](https://docs.harper.fast) and join our [Discord](https://harper.fast/discord).
```

Use the `harper.fast` forms above for the docs and Discord links, not the underlying `docs.harperdb.io` and `discord.com/invite/...` URLs they resolve to.

Adapt the middle of the note per repo: a `snapshot` names the content it accompanies; anything superseded states what replaced it with a link; a repo that produced a published package names the package. Drop the "pinned to" line when a version was never the point. If the README is AsciiDoc or another format, render the same content in that format's admonition syntax rather than pasting Markdown that won't render.

### Snapshots declare their backing content

A `snapshot` sets the repo's **`homepage` field** to the URL of the content it backs, and links that same content in its archive note. The `homepage` is what tooling reads, so the link survives independently of README prose.

This is also the check for whether something is a snapshot at all: if no dated artifact backs it, it isn't a snapshot — classify it as whatever it actually is, or archive it without a type claim it can't support.

### Deletion (rare)

Deletion is reserved for repos with **no reference value at all** — empty or unused forks, never-published experiments, repos that were never public. Deleting a fork that was never consumed anywhere is fine; deleting anything that has been public and referenced is not. Prefer archiving by default.

## Roadmap

This policy is still being built out. Planned work:

- Automated checks for the requirements above (`repo-type` set, license present, Harper version declared, README shape).
- A standardized required meta-document set.
- An ownership registry and a review cadence.
- A separate internal/private repository policy.

Spot a repo that doesn't fit, or a gap in this policy? Raise it — this is expected to evolve.
