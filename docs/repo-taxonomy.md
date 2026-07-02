# Harper Repo Taxonomy

Status: **proposed — for team review**
Owner: Ethan

## Why this exists

We maintain, upgrade, test, and reference dozens of repos — platform, plugins, templates, examples, guide backings, blog/demo companions — with no shared classification of what each is *for* or what upkeep it is owed. The result is staleness with no signal, a v-upgrade campaign with no defined scope, "is this a template or an example?" confusion, and repos that quietly rot because nothing said whether they were supposed to be kept alive.

This taxonomy fixes that by giving **every repo exactly one type**, and each type a clear contract: its maintenance obligation, its test contract, its versioning, and its lifecycle.

## Scope: public-facing repos only

This taxonomy is for **public-facing repos** — the ones developers consume, which carry the heaviest and most careful maintenance needs. Internal repos sit *outside* it and don't get a type:

- **Customer POCs** — proof-of-concept work built for a specific customer.
- **Experimentation / spikes** — research or throwaway repos.
- **Meta repos** — org tooling and process, e.g. `ospo` itself.

These may adopt their own light conventions, but they're explicitly out of scope here.

## The model in one line

A repo's **type** is set by two questions:

- **What is it *for*?** (its contract) — build from it, read it, follow it, or freeze it.
- **What upkeep does it owe?** (its maintenance band) — tracked forever, or frozen in time.

Everything else — how it's tested, where it lives, what version it targets — falls out of the type.

## The 5 types

| Type | What it's *for* | Upgrade obligation | Test contract | Lifecycle |
|------|-----------------|--------------------|----------------|-----------|
| **Core** | Platform, plugins, first-party apps — *produces* the versions everyone else consumes (`harper`, `studio`, `nextjs`, `status-check`) | Always current; it *is* the version | Full CI: unit / integration / e2e | Rarely — only if genuinely no longer maintained |
| **Template** | **Build from it** — a starting point you modify into your own thing | Track current Harper | By functional surface: smoke (generic) → e2e (advanced) | Retire only if obsolete |
| **Example** | **Read from it** — a worked pattern you study and adapt | Track current Harper | e2e on the pattern | Retire only if obsolete |
| **Guide** | **Follow it** — an example *plus* narrated Learn content (start → build → end) | Track current Harper | e2e on the final state | Retire only if obsolete |
| **Snapshot** | **A moment in time** — the companion to a blog post, talk, or video | **None — frozen** | Optional, against its **pinned** version only | Archived once its major is past |

**Core / Template / Example / Guide are the "Maintained" world** (track current Harper, tested, referenced ~forever). **Snapshot is the "frozen" world.** That split — maintained vs frozen — is the single most important line in the whole taxonomy.

## Template has two tiers

Both are *build-from* (that's what makes them templates), but they differ in scope and home:

- **Generic template** — broad, opinion-light getting-started scaffold. Lives **in create-harper** (`template-vanilla`, `template-react-ts`, `template-react-ssr`, …). Smoke-tested (does it scaffold and boot). This is the curated getting-started menu.
- **Advanced template** — a complex, domain-specific starting point. Non-functional on its own; becomes useful after specific modification (e.g. `template-markdown-prerender` — stand it up, configure instances, deploy for a customer). Lives **standalone**, **e2e-tested** (it ships real logic that must work), and does **not** belong in the generic getting-started menu.

The lesson: **a template's complexity does not make it an example.** `template-markdown-prerender` is complex *and* build-from → an advanced template. `nextjs-example` is complete *and* read-from → an example. Contract decides the type, not size.

## The rules that decide a type

1. **Contract decides Template vs Example vs Guide.** Build-from → Template. Read-from → Example. Follow-a-narration → Guide. (Independent of how big or complex it is.)
2. **Functional surface decides the test contract — not the type.** A blank scaffold needs only a smoke test; anything carrying real logic (an advanced template *or* an example) needs e2e. So "Template = smoke" is wrong; test depth scales with what there is to break.
3. **Maintenance obligation decides Maintained vs Snapshot.** Kept current → Maintained. Frozen to a moment → Snapshot.

## Guide vs Snapshot: the invariant that kills content staleness

Guides and Snapshots both "back content," so the line must be explicit:

- **Guide** backs **canonical Learn-section content** (and, later, possibly Studio-embedded guides). Living, maintained, tracks current Harper.
- **Snapshot** backs a **dated artifact** — a blog post, conference talk, video, dev-rel tutorial. Frozen, version-stamped, eventually archived.

> **The invariant: a dated artifact never references a living repo. living ↔ living, frozen ↔ frozen.**

If marketing or dev-rel wants to build content around a living Guide/Template/Example, they must **snapshot it first** — clone its current state into a frozen, version-stamped Snapshot companion to the post. The blog points at the snapshot (which never moves); the living repo stays free to evolve because nothing dated depends on its current state.

This is the policy that eliminates the entire class of "the tutorial broke because the repo moved." Dev-rel guideline: *making a tutorial? snapshot the repo, stamp the Harper version, date the post. Want something longer-living instead? contribute to the Learn guides.*

(Worth making snapshotting trivial — a one-command fork + version-stamp — or people will skip it. Not now, but soon.)

## create-harper's role

create-harper is the **standard getting-started UX** and the home of **generic templates only**. Advanced templates and examples live standalone — they are not getting-started options and should not clutter the picker. (create-harper *could* later offer "start from example X" as a convenience; that's a product nicety, explicitly out of scope here.)

Implication for Learn guides: a guide's **start** is *often* create-harper (pick a template), the prose drives the **build**, and the **Guide repo** is the validated **end**. But the start isn't always create-harper output — a guide that builds on an earlier guide starts from that guide's end state instead. So "start = create-harper" is the common case, not a rule.

## Version stamping

Every **non-Core** repo records the Harper **major** it targets (minor optional). Core *produces* versions, so this doesn't apply to it.

- For **Snapshots** this is load-bearing — it's the whole "valid as of Harper X" signal.
- For **Maintained** types it records the floor and scopes upgrades.

Where it lives: when the repo has a `package.json` (most do), declare it in the **`engines`** or **`devEngines`** field — a standard, tooling-agnostic spot anyone can read without a GitHub login or API. For the rare repo without one, a line in the README.

## Snapshot lifecycle

A Snapshot built for major X should stay valid across that major's minors (which aim to be non-breaking, even if that's never guaranteed). So:

- **Frozen but open** during its major's life: content untouched, but issues/PRs stay enabled so a user can land a bug fix.
- **Literally archived when the next Harper major goes GA.** We move the maintained world onto a new major as soon as it ships, so a Snapshot's era ends at the same moment. (Archiving is read-only, not deletion — it stays referenceable for its post.) *Alternative if we want more headroom: wait for the old major's full EOL.*
- A Snapshot going red on a *future* major is **expected, not a failure**, and shouldn't be treated as one.

A Snapshot that turns out to be frequently referenced can be **promoted** to a maintained Example/Template and joins the version matrix.

## How our repos classify (worked examples)

- `harper`, `studio`, `nextjs` (the plugin), `status-check` → **Core**
- create-harper `template-vanilla`, `template-react-ts-ssr`, … → **Template (generic)**
- `template-markdown-prerender` → **Template (advanced)**, Maintained (recently upgraded to v5)
- `nextjs-example` → **Example**
- `create-your-first-application`, the caching-guide repos → **Guide**
- benchmark / conference / blog-demo repos → **Snapshot**
- A customer's modified deployment of an advanced template (e.g. internal `markdown-prerender`) → **out of scope** (customer/internal repo), not a duplication problem — that's a template instantiated as intended.

## Type tagging (not naming)

Repo names today are inconsistent about type (`template-markdown-prerender` vs `nextjs-example`) — so rather than standardize a naming scheme, **keep names clean and don't encode type in them at all.** Record the type as a **GitHub topic** instead — `template` / `example` / `guide` (Core and Snapshot optional).

Topics beat a name prefix: a repo can pick up other taxonomy dimensions later, can change type as it matures without a rename, and names stay autocomplete-friendly when you're working across several example/template repos.

## Relationship to upgrade planning

The upgrade scope is exactly **every Core, Template, Example, and Guide repo** — the Maintained world. Snapshots are explicitly out of scope for forward upgrades by design. Once every repo carries a type + target major, an upgrade campaign's scope is simply "the Maintained types," and each repo's obligation is "meeting its type's contract."

## Feedback

This is proposed as **decided** — the aim is alignment, not re-litigation. The spot most open to input is the **Snapshot archive trigger**. Everything else we'll roll with unless there's a strong objection.
