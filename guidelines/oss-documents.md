# OSS Document Guidelines

These guidelines cover the purpose, scope, and authorship recommendations for standard documentation files in open source projects. They apply to both humans and agents.

Many of these documents should be considered "living"; they should be frequently updated as the repository evolves.

## README.md

The primary entrypoint for any project. It answers _what is this?_, _how do I use it?_, and _where do I go next?_.

Everyone reads the README: users, contributors, evaluators, agents, etc.

Every project should have a README.md

### What belongs here

- Project summary and purpose
- Installation and usage instructions
- Public API reference (if not documented elsewhere)
- Links to CONTRIBUTING, LICENSE, and community spaces (Slack, Discord, forums, etc.)
- Links to external documentation (hosted docs, changelogs, blog/marketing)
- Badge/status indicators if relevant

### What does not belong here

- Internal development workflows
- Contributor onboarding
- Agent-specific instructions
- In-depth usage guides (consider dedicated guides or posts instead)

### Template

```md
TODO
```

## CONTRIBUTING.md

The **internal** guide for anyone working on the project. It answers _how is this project developed, tested, and maintained?_.

Only maintainers and contributors (humans and agents) generally read this document. 

Every project should have a CONTRIBUTING.md, even if just to say that contributions are not accepted.

### What belongs here

- Repository structure overview
- Development environment setup
- Contribution workflow (branching, PRs, commit conventions)
- Build process
  - Build command(s)
  - Relevant configuration
- Release process
  - Manual vs automated steps
- Testing guide
  - How tests are structured
  - How to add new ones
  - How to execute them
  - Known flakiness
  - Manual local testing
- Code style and formatting rules
  - Linter and formatting commands
  - Relevant configuration
- CI environment
- Internal documentation
  - Particularly useful APIs for development
  - Scripts necessary for development/testing

### What does not belong here

- Public interface documentation (API, scripts, etc.)
- Usage information
- Agent specific instructions

### Template

```md
TODO
```

## AGENTS.md

A minimal, agent-specific document _complementary_ to the `README.md` and `CONTRIBUTING.md`. It answers _what does an agent need to know that it **cannot reliably infer** from existing documentation?_. Furthermore, it does **not replace or duplicate** existing documentation.

The audience for this document is strictly agents. While humans may read it too, the primary utility of this document is meant to be purely for agents. Any information relevant to a human should exist within another document (likely `README.md` or `CONTRIBUTING.md`). It should accelerate the agent's comprehension of the code base without excessive file reads and token usage.

### What belongs here

- Facts or instructions that may seem obvious to a human, but would require the agent to read and understand specific project files
- Specific instructions to- or not-to- do such as commands to execute or file paths to interact with
- Preferences for agentic workflows such as specific ways to attribute or sign-off commits or particular headers to include in requests

### What does not belong here

- Project description or summary (README.md)
- Contribution workflows (CONTRIBUTING.md)
- Anything a human contributor would also benefit from reading (should go in any other document)

### Template

```md
# AGENTS.md

Review `README.md` and `CONTRIBUTING.md` for all relevant repository information.

## Development Tips

- Use `npm install` to install dependencies.
- Use `npm run build` to compile `src/` to `dist/`.
- Do not edit files in `dist/`; it is compiled output.
- Do not run `npm version` or `npm publish`; these commands are for humans only.
- [Any file/extension constraints specific to this repo's module system.]

## Code Style

- [Language and module system in use: ESM, CJS, TypeScript, etc.]
- [Any enforced syntax restrictions, e.g. erasable-only TypeScript.]
- [Formatter command if one exists, or note that none exists.]

## Testing

- [How to run the test suite.]
- [Any required setup steps before first run, and when to re-run them.]
- [Known slow operations that should not be interpreted as failure.]
- [Any test files or areas that are intentionally skipped or work-in-progress;
  note what an agent should not do with them.]
- [Note if there are currently no tests.]

## CI

- [Status of CI and any known disabled conditions.]
- [Where to find logs or artifacts on failure.]
```

## CODE_OF_CONDUCT.md

TODO

_Copy the [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) from this repo_

## SECURITY.md

TODO

_Copy the [SECURITY.md](../SECURITY.md) from this repo_

## SUPPORT.md

TODO

_Copy the [SUPPORT.md](../SUPPORT.md) from this repo_