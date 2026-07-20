# Harper Public Repository Policy

> **Status: work in progress.** This policy is being developed alongside the organization-wide repository cleanup, and refinement is expected. Automated tooling to check and enforce much of what follows is planned; until then, **this document is the human- and agent-readable reference for how Harper's public repositories are managed.** Internal and private repositories are governed by a separate policy defined internally.

## Why this exists

Harper's GitHub organization is approaching 500 repositories with no sustained, org-wide management behind them. That has a real cost:

- **Public repos are AI training surface.** Every public repo is indexed by search engines and ingested by AI models. Stale examples, half-finished implementations, and abandoned demos actively degrade how agents understand and represent Harper.
- **Our repos reflect the engineering organization.** Everything public-facing is exposed surface area that other companies, teams, and developers — human and agentic — evaluate us on.
- **Undefined scope is unmaintainable.** Until we know what each repo is and who owns it, we cannot state our maintenance obligations. The v5 upgrade effort made that painfully clear.

This policy makes the public estate deliberate: every active public repo has a known purpose, a known owner, and a known maintenance contract.

## Scope

This policy applies to **active, public** repositories in the Harper GitHub organization. It does not cover internal or private repositories (separate policy), nor archived repositories — except for the archival process itself (see [Public archived](#public-archived)).

Its companion is the [repository taxonomy](repository-taxonomy.md), which defines the repository *types* referenced throughout.

## Requirements for active public repositories

Every active public repo must meet the following baseline. These are commitments, not suggestions.

### Ownership and a maintenance commitment

Every repo has a clear owning team. Public code is a **standing maintenance commitment**, not a one-time contribution — sharing code with no plan to maintain it is not acceptable. If no team will commit to maintaining a repo, it should be archived rather than left to rot.

Ownership can be transferred, and a creating team need not be the maintaining team — for example, a team ships a repo and OSPO/engineering assumes ongoing maintenance. Any such arrangement must be **explicitly agreed**, not assumed.

### One taxonomy type, declared as a GitHub topic

Every repo is classified as exactly one [taxonomy type](repository-taxonomy.md) and records that type as a **GitHub topic** — one of `product`, `plugin`, `application`, `library`, `template`, `example`, `guide`, `snapshot`, or `meta`. Type is never encoded in the repo name; the topic is the source of truth, so a repo can be re-typed as it matures without a rename.

### Required meta documents

At minimum, every active public repo carries:

- **`LICENSE`** — every public repo is licensed.
- **`README`** — states what the repo is, its taxonomy type, the Harper version it targets, and its current status.

Standard health files (`CONTRIBUTING`, `SECURITY`, `CODE_OF_CONDUCT`) are provided org-wide through the `.github` repo and should not be contradicted per-repo. A fuller required set will be standardized as tooling lands.

### A declared Harper version

Every repo that consumes Harper declares the version it targets using standard, machine-readable package metadata — a **`package.json` `dependencies`/`peerDependencies` entry**, or the **`engines`** field — expressed as a **semver specifier**. This lets both people and tooling answer "what Harper does this support?" without cloning and reading source. See the taxonomy's version-stamping guidance for which types declare a floor, a supported range, or a pinned version.

### Testing and upgrades

Each repo meets the testing and upgrade contract of its taxonomy type. As a rule, active public repos track the latest Harper release and are tested against the latest and upcoming Harper versions as early as possible. `snapshot` (frozen) and `meta` (nothing enforced) are the exceptions.

## Public archived

Archiving is how we retire a repo without erasing it. **Archived is not deleted:** the repo becomes read-only but stays fully readable, its links keep working, and archiving is reversible if we get it wrong.

### When to archive

Archive a public repo when it is no longer worth keeping *active* but is still worth keeping *referenceable*:

- Dormant, with no meaningful recent activity and no owner willing to commit to maintenance.
- Superseded by a newer repo, feature, or first-party capability.
- A `snapshot` whose moment has passed (its Harper major is behind) but which still backs published content.

### Keep public vs. move internal

Default to leaving an archived repo **public** when anything external still references it (marketing posts, talks, docs) or when a running system depends on it being publicly cloneable. Move it internal only when nothing external needs it. When in doubt, keep it public and archived — the cost is low and references stay intact.

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
> For up-to-date guides and reference docs, see the [Harper docs](https://docs.harperdb.io) and join our [Discord](https://discord.com/invite/VzZuaw3Xay).
```

Adapt the wording for non-snapshot repos: drop the "accompany" line, and state what supersedes it with a link.

### Deletion (rare)

Deletion is reserved for repos with **no reference value at all** — empty or unused forks, never-published experiments, repos that were never public. Deleting a fork that was never consumed anywhere is fine; deleting anything that has been public and referenced is not. Prefer archiving in every other case.

## Roadmap

This policy is still being built out. Planned work:

- Automated checks for the requirements above (topic present, license present, Harper version declared, README shape).
- A standardized required meta-document set.
- An ownership registry and a review cadence.
- A separate internal/private repository policy.

Spot a repo that doesn't fit, or a gap in this policy? Raise it — this is expected to evolve.
