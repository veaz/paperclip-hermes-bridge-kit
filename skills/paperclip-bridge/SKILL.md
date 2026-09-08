---
name: paperclip-bridge
description: Operate a self-hosted Paperclip instance from Hermes or another automation agent using a clean API/CLI bridge.
version: 0.1.0
author: WISD
license: UNLICENSED
metadata:
  hermes:
    tags: [paperclip, hermes, api, agents, automation]
---

# Paperclip Bridge

Use this skill when you need an agent to inspect or orchestrate a self-hosted Paperclip control plane.

## Safe setup

1. Copy `.env.example` to `.env`.
2. Fill `PAPERCLIP_API_BASE`, `PAPERCLIP_COMPANY_ID`, and optionally `PAPERCLIP_API_KEY` locally.
3. Never commit `.env`, logs, database files, or Paperclip data folders.
4. Run `npm run doctor` before creating issues.

## Common commands

```bash
npm run health
npm run projects
npm run agents
npm run create-issue -- "Short title" "Clear instructions for the agent"
```

## Operating model

- Hermes or your orchestrator decides what should happen.
- Paperclip agents execute work inside projects/workspaces.
- GitHub remains the source of truth for code changes.
- Human review is required before destructive actions, merges, deploys, or real-money operations.

## Security rules

- Redact credentials in logs and reports.
- Use `.env.example` for documentation, never real `.env` files.
- Prefer board/operator API keys for orchestration; agent-scoped keys can only act as that agent.
- Do not copy another company's Paperclip data directory.
