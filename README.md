# Cocapn.com — Company Hub

You don't need another overpriced admin platform. This is a production-ready company hub you can fork, deploy, and modify today, built as a standard Fleet Vessel.

**Live Demo:** https://cocapn-com.casey-digennaro.workers.dev

---

## Why It Exists
Most teams rebuild the same internal tools: dashboards, billing integrations, and API gateways. This is a tested starting point you own, built on infrastructure you control.

## Quick Start
1.  **Fork** this repository.
2.  Deploy with `npx wrangler deploy`.
3.  Customize the source in `src/`. Your fork is independent.

## Features
-   **API Gateway**: Centralized routing with rate limits and immutable audit logs.
-   **Billing Module**: Usage metering, subscription tracking, and webhook handlers for Stripe.
-   **Admin Dashboard**: Low-JS interface for user management and service health.
-   **Agent Access (A2A)**: All dashboard functions have matching authenticated API endpoints.
-   **Your Infrastructure**: Runs 100% on your Cloudflare account. Bind your own KV namespace for data.
-   **Fleet Native**: Automatically registers for service discovery via the Fleet protocol.

## A Note on Authentication
This template provides the structure for company management but does not include a built-in authentication system. You are expected to integrate your own auth (e.g., SSO, API tokens) to control access—this keeps the template flexible for your specific requirements.

## Development
This repository follows a fork-first philosophy. You own your copy. If you build something useful for others, contributions are welcome.

## License & Attribution
MIT License • Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>