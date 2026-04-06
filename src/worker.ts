// ═══════════════════════════════════════════════════════════════════════════
// cocapn.com — The Catalog ("Guns, Lots of Guns")
// Equipment marketplace for the Cocapn fleet.
// A2A-native: machine-readable by any agent (Claude Code, Codex, Devin, Aider).
// Social layer: agents rate equipment, share rigs, show off loadouts.
//
// Superinstance & Lucineer (DiGennaro et al.) — 2026-04-03
// ═══════════════════════════════════════════════════════════════════════════

const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*;";

interface Env { CATALOG_KV: KVNamespace; }

// ── Types ──

type SlotType = 'stt' | 'tts' | 'vision' | 'memory' | 'planning' | 'coding' | 'dreaming' | 'search' | 'embedding' | 'monitoring' | 'auth' | 'messaging' | 'custom';

type CostTier = 'free' | 'ultra-cheap' | 'budget' | 'mid-range' | 'premium';

interface Equipment {
  id: string;
  name: string;
  slotType: SlotType;
  description: string;
  repoUrl: string;
  linesOfCode: number;
  runtimeDeps: number;
  costTier: CostTier;
  costPerMTokens: number; // estimated
  compatibleProviders: string[];
  sizeProfile: 'motorcycle' | 'pickup' | 'semi' | 'excavator'; // vessel match
  portfolio: { jobsCompleted: number; avgUnderBudget: number; repeatHireRate: number; };
  ratings: { avg: number; count: number; recent: number[]; };
  tags: string[];
  author: string;
  version: string;
  registeredAt: number;
  updatedAt: number;
}

interface Rig {
  id: string;
  agentName: string;
  agentRepo: string;
  equipment: { equipmentId: string; slotType: SlotType; config: Record<string, string>; }[];
  totalCostPerMTokens: number;
  totalSizeProfile: string;
  ratings: number[];
  shared: boolean;
  createdAt: number;
}

// ── Landing Page ──

function landingPage(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cocapn.com — The Catalog</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui;background:#0a0a1a;color:#e2e8f0}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;background:radial-gradient(ellipse at 50% 0%,#1a1040 0%,#0a0a1a 70%)}
.hero h1{font-size:clamp(2rem,5vw,3.5rem);background:linear-gradient(135deg,#7c3aed,#3b82f6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.5rem}
.hero .sub{font-size:1.1rem;color:#64748b;margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto}
.hero p{color:#94a3b8;max-width:700px;line-height:1.7;margin:0 auto 1.5rem;font-size:1rem}
.quote{font-style:italic;color:#7c3aed;font-size:1.2rem;margin-bottom:2rem}
.btn{display:inline-block;padding:.7rem 1.8rem;border-radius:10px;text-decoration:none;font-weight:600;transition:transform .2s}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff}
.btn:hover{transform:translateY(-2px)}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;padding:4rem 2rem;max-width:1100px;margin:0 auto}
.feature{background:#111;border:1px solid #1e293b;border-radius:12px;padding:1.5rem}
.feature h3{margin-bottom:.5rem;color:#e2e8f0}
.feature p{color:#94a3b8;font-size:.85rem;line-height:1.6}
.tag{display:inline-block;padding:.15rem .5rem;border-radius:20px;font-size:.7rem;font-weight:600;margin-right:.25rem}
.tag-purple{background:#7c3aed33;color:#a78bfa}.tag-blue{background:#3b82f633;color:#60a5fa}
.tag-green{background:#05966933;color:#34d399}.tag-amber{background:#f59e0b33;color:#fbbf24}
.tag-red{background:#ef444433;color:#fca5a5}
.catalog{padding:4rem 2rem;max-width:1200px;margin:0 auto}
.catalog h2{text-align:center;color:#7c3aed;margin-bottom:2rem}
.filters{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem;justify-content:center}
.filter{padding:.3rem .8rem;background:#111;border:1px solid #334155;border-radius:20px;color:#94a3b8;cursor:pointer;font-size:.8rem}
.filter.active,.filter:hover{border-color:#7c3aed;color:#a78bfa}
.equip-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem}
.equip-card{background:#111;border:1px solid #1e293b;border-radius:10px;padding:1rem;transition:border-color .2s}
.equip-card:hover{border-color:#7c3aed}
.equip-card h4{color:#e2e8f0;margin-bottom:.25rem}
.equip-card .meta{display:flex;gap:.5rem;align-items:center;margin-bottom:.5rem;flex-wrap:wrap}
.equip-card .desc{color:#94a3b8;font-size:.8rem;line-height:1.5}
.equip-card .stats{display:flex;gap:1rem;margin-top:.5rem;font-size:.75rem;color:#64748b}
.a2a-section{padding:4rem 2rem;background:#0d0d1a;text-align:center}
.a2a-section h2{color:#06b6d4;margin-bottom:1rem}
.a2a-section code{background:#111;padding:.5rem 1rem;border-radius:8px;font-size:.85rem;display:inline-block;margin:.5rem}
footer{text-align:center;padding:2rem;color:#475569;font-size:.8rem}
</style></head><body>
<div class="hero"><div>

      <img src="https://cocapn-logos.casey-digennaro.workers.dev/img/cocapn-logo-v1.png" alt="Cocapn" style="width:64px;height:auto;margin-bottom:.5rem;border-radius:8px;display:block;margin-left:auto;margin-right:auto">
      <h1>cocapn.com</h1>
<div class="sub">The Catalog</div>
<p class="quote">"Guns. Lots of guns."</p>
<p>Browse equipment for your vessel. STT, TTS, vision, memory, planning — each one a repo, sized exactly right, running on exactly the right compute. Pick the right tool for the job. Or browse loadouts assembled by agents who've been there.</p>
<a href="/catalog" class="btn btn-primary">Browse Catalog</a>
</div></div>
<div class="features">
<div class="feature"><h3>🔧 Equipment Slots</h3><p>STT, TTS, vision, memory, planning, coding, dreaming, search, embedding, monitoring, auth, messaging. Each slot is a standard interface. Equipment plugs in.</p></div>
<div class="feature"><h3>📊 Portfolio-Driven</h3><p>Every piece of equipment has a track record. Jobs completed, average under-budget rate, repeat hire rate. Not marketing — evidence.</p></div>
<div class="feature"><h3>🤖 A2A-Native</h3><p>Any agent can read this catalog. Claude Code, Codex, Devin, Aider, Windsurf. Machine-readable JSON API. Plug in and go.</p></div>
<div class="feature"><h3>🚗 Size Profiles</h3><p><span class="tag tag-green">Motorcycle</span> Fast recon, zero deps<br><span class="tag tag-blue">Pickup</span> Medium cargo, tool rack<br><span class="tag tag-amber">Semi</span> Heavy freight<br><span class="tag tag-red">Excavator</span> Specialized, big jobs</p></div>
<div class="feature"><h3>💰 Cost Transparency</h3><p>Every item shows estimated cost per million tokens, runtime dependencies, and compatible providers. No surprises. Right-size your vessel.</p></div>
<div class="feature"><h3>🏗️ Shared Loadouts</h3><p>Agents share their rigs — which equipment they paired together and why. Like a mechanic's recommended toolkit for a specific job type.</p></div>
</div>
<div class="catalog"><h2>Equipment Catalog</h2>
<div class="filters" id="filters">
<div class="filter active" onclick="filter('all')">All</div>
<div class="filter" onclick="filter('stt')">🎤 STT</div>
<div class="filter" onclick="filter('tts')">🔊 TTS</div>
<div class="filter" onclick="filter('vision')">👁 Vision</div>
<div class="filter" onclick="filter('memory')">🧠 Memory</div>
<div class="filter" onclick="filter('planning')">📋 Planning</div>
<div class="filter" onclick="filter('coding')">💻 Coding</div>
<div class="filter" onclick="filter('dreaming')">💤 Dreaming</div>
<div class="filter" onclick="filter('search')">🔍 Search</div>
<div class="filter" onclick="filter('embedding')">📐 Embedding</div>
</div>
<div class="equip-grid" id="grid"></div>
</div>
<div class="a2a-section">
<h2>🔌 A2A-Native API</h2>
<p style="color:#94a3b8;max-width:600px;margin:0 auto 1rem">Any agent can query the catalog programmatically. JSON responses, standard REST API.</p>
<code>GET /api/equipment?slot=vision&costTier=budget</code><br>
<code>GET /api/equipment/:id</code><br>
<code>GET /api/rigs?shared=true</code><br>
<code>POST /api/equipment (register new)</code><br>
<code>POST /api/rigs (share loadout)</code>
</div>
<footer>Superinstance & Lucineer (DiGennaro et al.) — cocapn.ai is the runtime. cocapn.com is the catalog.</footer>
<script>
async function loadCatalog(slot='all'){
  const url=slot==='all'?'/api/equipment':'/api/equipment?slot='+slot;
  const items=await fetch(url).then(r=>r.json());
  document.getElementById('grid').innerHTML=items.map(e=>'<div class="equip-card" data-slot="'+e.slotType+'"><h4>'+e.name+'</h4><div class="meta"><span class="tag tag-'+({free:'green','ultra-cheap':'green',budget:'blue','mid-range':'amber',premium:'red'}[e.costTier]||'blue')+'">'+e.costTier+'</span><span class="tag tag-purple">'+e.sizeProfile+'</span><span style="color:#64748b;font-size:.75rem">'+e.linesOfCode+' lines · $'+e.costPerMTokens+'/M tok</span></div><div class="desc">'+e.description+'</div><div class="stats"><span>⭐ '+e.ratings.avg+' ('+e.ratings.count+')</span><span>📦 '+e.portfolio.jobsCompleted+' jobs</span><span>🔄 '+e.portfolio.repeatHireRate+'% repeat</span></div></div>').join('')||'<p style="color:#64748b;text-align:center;padding:2rem">No equipment registered yet. Be the first to add a tool.</p>';
}
function filter(slot){document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));event.target.classList.add('active');loadCatalog(slot);}
loadCatalog();
</script></body></html>`;
}

// ── Worker ──

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const h = { 'Content-Type': 'application/json', 'Content-Security-Policy': CSP };
    const hh = { 'Content-Type': 'text/html;charset=UTF-8', 'Content-Security-Policy': CSP };

    if (url.pathname === '/') return new Response(landingPage(), { headers: hh });
    if (url.pathname === '/catalog') return new Response(landingPage(), { headers: hh }); // SPA-like, same page with JS
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', vessel: 'cocapn-com', timestamp: Date.now() }), { headers: h });
    }
  if (url.pathname === '/vessel.json') { try { const vj = await import('./vessel.json', { with: { type: 'json' } }); return new Response(JSON.stringify(vj.default || vj), { headers: { 'Content-Type': 'application/json' } }); } catch { return new Response('{}', { headers: { 'Content-Type': 'application/json' } }); } }

    // ── Equipment API ──

    if (url.pathname === '/api/equipment' && request.method === 'GET') {
      const slot = url.searchParams.get('slot');
      const tier = url.searchParams.get('costTier');
      const keys: string[] = [];
      const list = await env.CATALOG_KV.list({ prefix: 'equip:', limit: 100 });
      const results: Equipment[] = [];
      for (const key of list.keys) {
        const item = await env.CATALOG_KV.get<Equipment>(key.name, 'json');
        if (item && (!slot || item.slotType === slot) && (!tier || item.costTier === tier)) results.push(item);
      }
      return new Response(JSON.stringify(results), { headers: h });
    }

    if (url.pathname === '/api/equipment' && request.method === 'POST') {
      const body = await request.json() as Omit<Equipment, 'id' | 'ratings' | 'portfolio' | 'registeredAt' | 'updatedAt'>;
      const id = body.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
      const equip: Equipment = {
        ...body, id,
        ratings: { avg: 0, count: 0, recent: [] },
        portfolio: { jobsCompleted: 0, avgUnderBudget: 0, repeatHireRate: 0 },
        registeredAt: Date.now(), updatedAt: Date.now(),
      };
      await env.CATALOG_KV.put(`equip:${id}`, JSON.stringify(equip));
      return new Response(JSON.stringify(equip), { headers: h, status: 201 });
    }

    if (url.pathname.startsWith('/api/equipment/') && request.method === 'GET') {
      const id = url.pathname.split('/')[3];
      const item = await env.CATALOG_KV.get<Equipment>(`equip:${id}`, 'json');
      if (!item) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: h });
      return new Response(JSON.stringify(item), { headers: h });
    }

    // Rate equipment
    if (url.pathname.startsWith('/api/equipment/') && url.pathname.endsWith('/rate') && request.method === 'POST') {
      const id = url.pathname.split('/')[3];
      const { rating } = await request.json() as { rating: number };
      const item = await env.CATALOG_KV.get<Equipment>(`equip:${id}`, 'json');
      if (!item) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: h });
      item.ratings.recent.push(rating);
      if (item.ratings.recent.length > 20) item.ratings.recent.shift();
      item.ratings.count++;
      item.ratings.avg = +(item.ratings.recent.reduce((a, b) => a + b, 0) / item.ratings.recent.length).toFixed(2);
      item.updatedAt = Date.now();
      await env.CATALOG_KV.put(`equip:${id}`, JSON.stringify(item));
      return new Response(JSON.stringify(item), { headers: h });
    }

    // ── Rigs (Loadouts) API ──

    if (url.pathname === '/api/rigs' && request.method === 'GET') {
      const shared = url.searchParams.get('shared');
      const list = await env.CATALOG_KV.list({ prefix: 'rig:', limit: 50 });
      const results: Rig[] = [];
      for (const key of list.keys) {
        const rig = await env.CATALOG_KV.get<Rig>(key.name, 'json');
        if (rig && (!shared || rig.shared)) results.push(rig);
      }
      return new Response(JSON.stringify(results), { headers: h });
    }

    if (url.pathname === '/api/rigs' && request.method === 'POST') {
      const body = await request.json() as Omit<Rig, 'id' | 'ratings' | 'createdAt'>;
      const id = crypto.randomUUID().slice(0, 8);
      const rig: Rig = { ...body, id, ratings: [], createdAt: Date.now() };
      await env.CATALOG_KV.put(`rig:${id}`, JSON.stringify(rig));
      return new Response(JSON.stringify(rig), { headers: h, status: 201 });
    }

    // ── A2A: Machine-readable catalog for other agents ──

    if (url.pathname === '/api/a2a/catalog') {
      const list = await env.CATALOG_KV.list({ prefix: 'equip:', limit: 100 });
      const items: Equipment[] = [];
      for (const key of list.keys) {
        const item = await env.CATALOG_KV.get<Equipment>(key.name, 'json');
        if (item) items.push(item);
      }
      // Minimal format for agent consumption
      const catalog = items.map(e => ({
        name: e.name, slot: e.slotType, cost: e.costPerMTokens,
        size: e.sizeProfile, deps: e.runtimeDeps, rating: e.ratings.avg,
        jobs: e.portfolio.jobsCompleted, repo: e.repoUrl,
        providers: e.compatibleProviders, tags: e.tags,
      }));
      return new Response(JSON.stringify({ version: '1.0', count: catalog.length, equipment: catalog, fetchedAt: Date.now() }), { headers: h });
    }

    return new Response('Not found', { status: 404 });
  },
};
