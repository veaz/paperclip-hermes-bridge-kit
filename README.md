# Paperclip Hermes Bridge Kit

Clean starter kit for connecting Hermes-style automation to a self-hosted Paperclip API.

This repo is meant to be shared without private credentials. It contains:

- a small Node.js Paperclip API client,
- CLI examples for health, agents, projects, and issue creation,
- a Hermes-compatible skill/runbook,
- `.env.example` with placeholders only,
- a short API cheatsheet.

## What this is

Paperclip is the control plane where agents, projects, issues, routines, and runs live. Hermes or any external orchestrator can talk to Paperclip through its API to inspect state, create work, and keep humans informed.

The intended pattern is:

```txt
Human / Hermes / Orchestrator
  -> Paperclip API
  -> Paperclip project + agent
  -> GitHub PR / report / result
```

## Requirements

- Node.js 20+
- Access to a self-hosted Paperclip instance
- A Paperclip company/workspace ID
- Optional API key if the instance requires authentication

## Setup

```bash
git clone <this-repo-url>
cd paperclip-hermes-bridge-kit
cp .env.example .env
# edit .env with your own local values
npm run doctor
```

## Usage

```bash
npm run health
npm run projects
npm run agents
npm run create-issue -- "Example issue" "Instructions for the Paperclip agent"
```

Or use the CLI directly:

```bash
node src/cli.mjs health
node src/cli.mjs agents
node src/cli.mjs create-issue "Example issue" "Do a safe read-only check"
```

## Environment variables

See `.env.example`.

Important: never commit the real `.env` file.

## Installing the skill in Hermes

Copy or symlink `skills/paperclip-bridge/` into your Hermes skills folder, then restart Hermes or run a fresh session.

Typical location:

```bash
mkdir -p ~/.hermes/skills/local
cp -R skills/paperclip-bridge ~/.hermes/skills/local/
```

Then ask Hermes to load `paperclip-bridge`.

## Security notes

This kit intentionally does not include:

- API keys,
- `.env` files,
- Paperclip databases,
- logs,
- customer data,
- private project IDs beyond placeholders.

Use your own credentials and IDs in your local `.env` only.
