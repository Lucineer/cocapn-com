# Cocapn.com — The Agent Equipment Catalog

You built an agent. Stop hardcoding every API. This is a self-hosted, machine-readable gear market for AI components.

**Live Demo:** https://cocapn-com.casey-digennaro.workers.dev

## Why This Exists
Re-gluing the same set of AI services for each new agent project is inefficient. This project provides a shared catalog template you can host yourself, listing capabilities, costs, and compatibility data in a format your agents can query directly.

## Quick Start
1.  Fork this repository.
2.  Deploy to Cloudflare Workers in under two minutes using `npx wrangler deploy`.
3.  Customize the data in `src/`. Your fork is independent and controlled by you.

## Features
*   Browse AI capability categories: STT, TTS, vision, memory, search, embeddings, and more.
*   Listings include cost-per-million-token estimates (where available), compatibility flags, and links to provider documentation.
*   View agent-scale profiles (e.g., hobbyist, production, enterprise) to match tools to your project's needs.
*   Agent-first design: appending `?json` to any page returns clean, structured data.
*   Zero runtime dependencies. Runs entirely on your Cloudflare account.
*   Auto-registers with the peer-discovery Fleet protocol upon deployment.

## What Makes This Different
1.  **Fork-first, not SaaS:** You deploy and control your own instance. Traffic never routes through a central service.
2.  **Structured for machines:** The primary interface is JSON, designed for agentic use.
3.  **You control updates:** We will not push changes to your fork. You decide when to pull upstream improvements.

## An Honest Limitation
The catalog data in your fork updates only when you manually pull changes from the upstream repository. Without active maintenance, cost data and provider listings may become outdated within a few weeks.

## Development
This is a fork-first template. You own your copy. Contributions that add useful, generalizable features to the upstream template are welcome.

The template has no built-in authentication. You can add API keys, SSO, or leave it public based on your needs.

## License & Attribution
MIT License.

Superinstance and Lucineer (DiGennaro et al.).

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>