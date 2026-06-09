# Repo Taxonomy, Template/Example Separation, and Learn Guide Plan

Status: draft for group review
Owner: Ethan
Related: HarperFast/v5-upgrade (upgrade plan), HarperFast/ospo, create-harper

## Purpose

Settle three things that have been circling:

1. The canonical separation between templates and examples, documented so it stops being re-litigated.
2. An organization scheme for the repos we have to maintain, upgrade, and test, classified by maintenance obligation rather than by surface type.
3. A concrete plan for the Learn section guide repos, including the move off `git clone` and onto create-harper, and how those guides stay correct over time.

## Core principle

Maintain a small canonical source of truth, derive or generate everything else, and scale a thing's correctness obligation to how much depends on it downstream.

Two failure modes are distinct and must be solved separately:

- **Code rot.** The code no longer runs on current Harper. Mechanically detectable. Caught by version-matrix CI. No human required.
- **Prose rot.** The code runs but the surrounding prose, config snippets, or expected outputs no longer match it. No test catches this by default. This is the failure mode that killed the old Learn system, and tagged commits never addressed it.

Most of the maintenance burden we have been dreading is prose rot. The fix is to stop hand-copying code and outputs into prose and instead bind prose to the canonical code so drift breaks a build.

## Templates vs Examples: the canonical definition

The boundary is the **contract**, not the amount of code. Volume follows from purpose; it does not define the category.

### Template

- **You build from it.** Its code exists to be extended.
- **Success condition:** you can start editing immediately with nothing to delete.
- **Permitted content:** scaffolding, project layout, config, optionally one naive homepage and one trivial data route or table. Nothing opinionated that a user would have to tear out.
- **Purpose:** a starting point across a matrix of choices (language, framework).

### Example

- **You learn from it.** Its code exists to be read.
- **Success condition:** one pattern shown working correctly.
- **Permitted content:** real endpoints, opinionated choices (TypeScript over JS, Next over Astro), whatever the pattern needs.
- **Purpose:** demonstrate a feature or development pattern.

### Consequences of the cut

- A blog-post demo and the generic Next.js example are the **same species**: both are examples. There is no third category for "content."
- We do **not** maintain examples across the full framework and language matrix. We maintain a few **seeds**, meaning one strong example per genuinely distinct pattern, not one per framework. The long tail is produced on demand by agents extrapolating from the seeds, the skills, and reference docs. An on-demand Svelte caching app is only as trustworthy as the canonical caching example and the caching skill it draws from. Those seeds are the substrate; that is why they are maintained and the matrix is not.
- Test obligation falls out of the contract: templates get a smoke test (does it scaffold and boot); examples get a correctness test (does the pattern actually work), because people copy them as truth.

## Repo taxonomy by maintenance tier

Classify every non-core, non-customer repo into one tier. The tier defines its test contract and its upgrade obligation. This is what the repo-health dashboard should encode: not "is it green" but "is it meeting its tier's contract."

| Tier | What it is | Test contract | Upgrade obligation | Ongoing cost |
|------|-----------|----------------|--------------------|--------------|
| **Template** | Build-from starting point | Smoke test: scaffolds and boots, on every Harper release | Track current Harper | Low |
| **Example (seed)** | Maintained canonical pattern | End-to-end suite on final state, on the version matrix | Track current Harper | Medium |
| **Guide repo (step-by-step)** | Backs a Learn guide | End-to-end suite on final state + prose binding (see Learn plan) | Track current Harper | Medium, mostly automated |
| **Example (one-off / pinned)** | Blog/demo tied to a moment in time | Suite runs on its **pinned** Harper version only | None. Pinned and frozen | Near zero |

### The key move on one-off examples

Not every example deserves equal upkeep, and trying to keep all of them green forever is the maintenance tax we keep hitting. A demo written to make a point at a moment in time should be **pinned and allowed to age**:

- Stamp it "written for Harper 5.x."
- Pin its dependencies.
- Run its suite against its pinned version only.
- Do not chase it forward.

A pinned demo going red on a future major is **expected**, not a failure. The dashboard must treat it that way or the green/red signal becomes noise.

Promotion path: a one-off that turns out to be frequently referenced gets **promoted** into the seed tier and joins the version matrix. The long tail stays frozen.

### How this relates to the v5-upgrade plan

The v5-upgrade effort is the **upgrade workflow for the Template and Seed tiers**. Those are the repos that must track current Harper, so they are the ones an upgrade campaign targets. Pinned one-offs are explicitly out of scope for forward upgrades by design. Once each repo carries a tier label, the upgrade plan's scope is just "every repo in Template and Seed tiers," and the dashboard can report upgrade status per tier.

## Learn guide plan

### Decision: clone becomes create-harper (settled)

The old guides do two git jobs. Both change, but differently:

- **The clone** (`git clone create-your-first-application`) is the starting state. On the first-app page it is barely a clone at all: the learner hand-creates `schema.graphql` and `config.yaml` in the next sections, so the repo is really just scaffolding. This becomes `npm create harper@latest <name>` selecting a near-blank **template**. The prose body continues unchanged ("open `schema.graphql`, add...").
- **The checkpoints** (the `checkout 01-create-table` callouts) are stage validation. These become create-harper recovery verbs against resolved-tree snapshots, not raw git for the learner. Branches stay in the canonical repo as the maintainer source; the learner never types git.

### Decision: default to end-only checkpoints (settled, with an escape hatch)

A green template start and a green final suite **bound the middle**. Intermediate steps have no independent failure mode: if start boots and end passes and the prose is accurate, an intermediate stage cannot be silently broken in a way the endpoints do not already catch. Testing N tagged commits pays N setups to verify what 2 already prove.

So: guides start from a template and build through to a single end snapshot. The only sacrifice is that a learner who diverges mid-guide can ask "is my final state correct," not "is my step-3 state correct." On the first-app page this costs almost nothing, since the back half (create/read/query) are runtime API calls with no file-state checkpoint anyway; we were only ever offering checkpoints for 2 of 6 steps.

**Escape hatch:** make checkpoint granularity a property of the guide, not a global rule. Default end-only. Add intermediate checkpoints only where assembly is long enough that mid-flight recovery earns its maintenance (the caching guides may qualify; the dog-table page does not).

### Decision: bind prose to code (the prose-rot fix)

Code blocks, config snippets, and expected outputs in a guide must not be hand-copied. They drift silently. Bind them to the canonical repo so drift breaks the docs build:

- **Mechanism to prototype first:** a test in the guide repo asserts that the doc's code/output blocks match the repo's files and recorded test output. Given Docusaurus docs and separate repos, assert-in-CI is less invasive than a transclusion include directive to start. The guide keeps its blocks; a check fails when they drift; an agent repairs the break and opens a PR; a human approves.
- This is the single open decision worth resolving before scaling to the caching guides: **assert-in-CI** (docs and repo live apart, coupled by a check) vs **include directive** (repo is source, docs are a view). Prototype assert-in-CI on the first-app page.

### Decision: collapse Local/Fabric tabs to one flow (settled)

The first-app page repeats Local/Fabric tabs per section, but they differ only at the edges: same schema, same config, same dev loop. The real divergence is auth headers, the localhost-to-cluster URL swap, and the deploy step. This confirms it is **one flow with two deploy targets**, not two flows.

- Collapse the per-section tabs.
- Surface the Fabric delta once (base URL + Authorization).
- Keep the "Bonus: Deploy to Fabric" section as the single genuine fork.

Any difference deeper than the deploy command is a product signal to raise, not a docs problem to write around.

### Decision: keep the human step-by-step guide (settled)

Do not collapse guides into pure tool output. The step-explained guide is where the **why** lives: the rationale for extending a table in a custom resource, the assembly logic, the correctness reasoning. Offline users, enterprise evaluators, and security reviewers need it, and current agents lean on exactly this kind of human explanation because they learn from it. Keep the existing content split: **reference for facts, guide for assembly.** Change only the orientation so the guide names the tooling (run create-harper, pick a template, then add this).

## Concrete next steps

Order matters. The tooling is worth nothing until there is a tested canonical sequence to publish.

1. **Label every repo with a tier.** Template, Seed, Guide, or Pinned. This unblocks the dashboard and scopes the v5-upgrade plan. Cheap, do first.
2. **Pin and freeze the one-off tier.** Stamp Harper version, pin deps, point their CI at the pinned version, stop chasing them. Removes the bulk of the perceived maintenance tax immediately.
3. **Pick the seed set.** Decide what counts as a genuinely distinct pattern that earns a maintained example. Everything downstream (test load, doc priority, what create-harper defaults to, what generation extrapolates from) hangs off this list. This is the decision still unsettled and it should be made next.
4. **Pilot the Learn rewrite on the first-app page.** It is the thinnest target: near-blank template, two file-state steps, end-only snapshot. Rewrite clone to create-harper, collapse the tabs, and prototype assert-in-CI prose binding here before touching caching.
5. **Build the create-harper recovery verbs** against the piloted snapshot format, then the snapshot-publishing pipeline (version-keyed tarballs).
6. **Stand up the version-matrix CI** for Template and Seed tiers. This is the v5-upgrade plan's mechanical engine.
7. **Layer agentic upkeep last.** Once the documented best practice is solid (the catch-up work with Austin is the spec-gathering for this), add triggers: a release reds a build, an agent diffs old vs new output, rewrites the affected blocks and surrounding prose, opens a PR, human approves. Then add the weekly sweep and dependabot/major-version triggers.

## Open decisions

- **The seed set.** What patterns earn a maintained example. Blocks step 3 above. Settle next.
- **Prose-binding mechanism.** Assert-in-CI vs include directive. Prototype assert-in-CI on the first-app page, then commit.
- **create-harper verb ownership.** Does create-harper own resume/check/verify, or does recovery live in a separate tool. Owning them unifies the getting-started story (avoids the sprawl we are removing); versioning the snapshot fetch separately keeps the CLI's release cadence decoupled from tutorial edits.
- **Runtime-step affordance.** Steps that are API calls (create/read/query) have no file snapshot to diff. Decide whether they get a `--verify` that hits the endpoint and checks the response, or stay prose-only.
