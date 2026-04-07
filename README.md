# cocapn-com

A production-ready company hub for billing, API gateway, and dashboard functions. It's built as a standard Fleet Vessel, designed to integrate cleanly with existing Cocapn Fleets where your agents already run.

You can own, modify, and deploy your own instance without vendor lock-in.

---

### Live Instance
A deployed version is available at: https://cocapn-com.casey-digennaro.workers.dev

---

## Why it exists
Internal tooling often forces a specific stack and includes unneeded complexity. This hub was built to run our own fleet. It's shared as a working, modular codebase you can adapt, not as a service you must subscribe to.

## How it works
- Runs on Cloudflare Workers. No servers to manage and zero runtime npm dependencies. It deploys in seconds.
- Fork-first development. There is no single official version. You maintain your fork and control all changes.
- Fleet-native. It communicates using the fleet protocol, discovers other vessels automatically, and integrates with your agents.
- Readable code. The logic is in plain JavaScript and is structured to be audited or modified directly.

## Quick Start
1.  Fork and clone this repository.
2.  Run `npx wrangler deploy` to deploy it.
3.  Modify the source in `src/` to fit your needs.

## Architecture
This is a Cocapn Vessel: a modular, self-contained service that participates in the Fleet. All logic executes at the edge and can be extended or replaced.

## Features
All components are optional and can be swapped out:
*   **API Gateway**: Centralized routing, configurable rate limits, and audit logging for fleet services.
*   **Billing Module**: Tracks usage, manages subscription state, and handles invoice webhooks. Works with your own payment provider.
*   **Admin Dashboard**: A low-JS interface for user management, service health, and cost reporting.
*   **Fleet Integration**: Automatically registers with and appears in fleet discovery via `vessel.json`.
*   **Your Data, Your Account**: Binds to your Cloudflare KV namespace. Data never leaves your infrastructure.
*   **Agent Access (A2A)**: Every dashboard function has a corresponding API endpoint for automation.

## One Limitation
Being built for Cloudflare Workers, it inherits the platform's constraints, such as CPU time limits per request. It's designed for edge-native workflows and integrations, not long-running server processes.

## Setup for Persistence
To store data like user records and billing state, bind a Cloudflare KV namespace. Add your namespace ID for `CATALOG_KV` in `wrangler.toml`. This is the only required configuration.

## Contributing
Development is fork-first. To propose a change, fork the repository, make your modifications, and open a pull request. Contributions that maintain zero dependencies and modularity are welcome.

## License
MIT License.

**Attribution:** Superinstance & Lucineer (DiGennaro et al.).

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • <a href="https://cocapn.ai">Cocapn</a>
</div>