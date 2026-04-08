import { Router } from 'itty-router';

interface Env {
  // Environment variables can be added here if needed
}

const router = Router();

// Helper to add security headers
const securityHeaders = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'none';
  `.replace(/\s+/g, ' ').trim(),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

const html = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cocapn — The Agent Runtime</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #111111;
      --text-primary: #f9f9f9;
      --text-secondary: #a0a0a0;
      --accent: #00E6D6;
      --border: #222222;
      --card-bg: #151515;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    section {
      padding: 5rem 0;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      background: linear-gradient(135deg, var(--accent) 0%, #00b3a6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Hero */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0,230,214,0.05) 0%, transparent 70%);
      z-index: -1;
    }

    .hero-content {
      max-width: 800px;
    }

    .hero h1 {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }

    .hero-tagline {
      font-size: 1.5rem;
      color: var(--text-secondary);
      margin-bottom: 3rem;
      max-width: 600px;
    }

    /* Philosophy */
    .principles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .principle-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .principle-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }

    .principle-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }

    .principle-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    /* Stats */
    .stats-bar {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 3rem 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-secondary);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Papers */
    .papers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .paper-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
    }

    .paper-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .paper-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--accent);
    }

    .paper-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    /* Team */
    .team-content {
      max-width: 800px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 3rem;
      margin-top: 2rem;
    }

    .team-description {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-top: 1rem;
    }

    /* Contact */
    .contact-links {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-primary);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .contact-link:hover {
      border-color: var(--accent);
      background: rgba(0, 230, 214, 0.05);
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 3rem 0;
      margin-top: 5rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      color: var(--accent);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 3rem;
      }
      
      .hero-tagline {
        font-size: 1.25rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .container {
        padding: 0 1.5rem;
      }
      
      section {
        padding: 3rem 0;
      }
    }
  </style>
</head>
<body>
  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Cocapn — The Agent Runtime</h1>
        <p class="hero-tagline">Every repo is a living agent. Every agent is a vessel in the fleet.</p>
      </div>
    </div>
  </section>

  <!-- Philosophy -->
  <section id="philosophy">
    <div class="container">
      <h2 class="section-title">Philosophy</h2>
      <div class="principles-grid">
        <div class="principle-card">
          <div class="principle-icon">⟠</div>
          <h3 class="principle-title">The Repo IS the Agent</h3>
          <p>No wrappers, no abstractions. The repository structure itself defines the agent's capabilities, memory, and behavior.</p>
        </div>
        <div class="principle-card">
          <div class="principle-icon">⎇</div>
          <h3 class="principle-title">Fork-First</h3>
          <p>Agents evolve through forking. Every interaction can spawn new variants, creating an evolutionary tree of capabilities.</p>
        </div>
        <div class="principle-card">
          <div class="principle-icon">⚙</div>
          <h3 class="principle-title">Equipment over Features</h3>
          <p>Agents equip themselves with tools, not features. The runtime provides the workshop; agents choose their tools.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="stats-bar">
    <div class="container">
      <div class="stats-grid">
        <div class="stat">
          <div class="stat-number">65+</div>
          <div class="stat-label">Vessels</div>
        </div>
        <div class="stat">
          <div class="stat-number">150+</div>
          <div class="stat-label">Repos</div>
        </div>
        <div class="stat">
          <div class="stat-number">0</div>
          <div class="stat-label">API Keys Required</div>
        </div>
        <div class="stat">
          <div class="stat-number">Open Source</div>
          <div class="stat-label">License</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Papers -->
  <section id="papers">
    <div class="container">
      <h2 class="section-title">Flagship Papers</h2>
      <div class="papers-grid">
        <a href="https://github.com/cocapn/ues-protocol" class="paper-card" target="_blank" rel="noopener">
          <h3 class="paper-title">UES Protocol</h3>
          <p class="paper-description">Universal Execution Specification — The protocol that enables any repository to become an executable agent.</p>
        </a>
        <a href="https://github.com/cocapn/increments-trust" class="paper-card" target="_blank" rel="noopener">
          <h3 class="paper-title">INCREMENTS Trust</h3>
          <p class="paper-description">Incremental trust through verifiable execution chains. Every action is a commit; every commit is verifiable.</p>
        </a>
        <a href="https://github.com/cocapn/seed-architecture" class="paper-card" target="_blank" rel="noopener">
          <h3 class="paper-title">The Seed Architecture</h3>
          <p class="paper-description">Minimal kernel, maximal extension. How Cocapn boots from a single seed file into a full fleet runtime.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Team -->
  <section id="team">
    <div class="container">
      <h2 class="section-title">Team</h2>
      <div class="team-content">
        <h3>Built by SuperInstance & Lucineer (DiGennaro et al.)</h3>
        <p class="team-description">
          Cocapn is developed by an open-source collective of researchers and engineers focused on agent runtime infrastructure.
          The project is maintained through collaborative governance across the fleet.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <p>Join the fleet. Contribute to the runtime.</p>
      <div class="contact-links">
        <a href="https://github.com/cocapn" class="contact-link" target="_blank" rel="noopener">
          <span>GitHub Organization</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="https://cocapn.ai" class="footer-link" target="_blank" rel="noopener">Playground (cocapn.ai)</a>
        <a href="https://github.com/cocapn" class="footer-link" target="_blank" rel="noopener">GitHub</a>
        <a href="https://fleet.cocapn.ai" class="footer-link" target="_blank" rel="noopener">The Fleet</a>
      </div>
      <p style="color: var(--text-secondary); margin-top: 2rem; font-size: 0.9rem;">
        © ${new Date().getFullYear()} Cocapn Runtime. Open source under MIT License.
      </p>
    </div>
  </footer>
</body>
</html>
`;

// Health endpoint response
const healthResponse = {
  status: 'healthy',
  timestamp: new Date().toISOString(),
  service: 'cocapn.com',
  version: '1.0.0',
};

// Vessel endpoint response
const vesselResponse = {
  name: 'cocapn.com',
  type: 'company_page',
  runtime: 'Cloudflare Workers',
  fleet_member: true,
  repository: 'https://github.com/cocapn/cocapn.com',
  endpoints: ['/', '/health', '/vessel.json'],
};

router.get('/', () => {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      ...securityHeaders,
    },
  });
});

router.get('/health', () => {
  return new Response(JSON.stringify(healthResponse, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      ...securityHeaders,
    },
  });
});

router.get('/vessel.json', () => {
  return new Response(JSON.stringify(vesselResponse, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      ...securityHeaders,
    },
  });
});

router.all('*', () => {
  return new Response('Not Found', { status: 404 });
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return router.handle(request, env, ctx);
  },
};