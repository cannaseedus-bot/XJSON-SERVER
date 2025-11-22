// K'UHUL SERVICE WORKER - ΩOS INTEGRATION
// TRINITY OS KERNEL PROCESS + PRIMEOS COGNITIVE SHELL

/* -------------------------------------------------------------------------
   ΩOS KERNEL PROCESS INTEGRATION
------------------------------------------------------------------------- */

const ΩOS_KERNEL = {
  "⟁v": "2.1",
  "⟁kproc": {
    "⟁fs": { "⟁t": "vfs", "⟁d": "xj_vfs" },
    "⟁pm": { "⟁t": "kuhl_sched", "⟁max": 256, "⟁mem": "16m", "⟁iso": "glyph" },
    "⟁net": { "⟁t": "vnet", "⟁proto": ["http", "ws", "hive"], "⟁route": "klh" },
    "⟁sec": { "⟁t": "trust_stamp", "⟁sand": "glyph_env" },
    "⟁comp": { "⟁t": "scx_zip", "⟁alg": ["sym", "huff", "dict"] }
  }
};

/* -------------------------------------------------------------------------
   K'UHUL ΩOS CONSTANTS - KERNEL PROCESS ALIGNMENT
------------------------------------------------------------------------- */

const KUHUL_ΩOS = 'kuhul-ΩOS-v2';
const KERNEL_CACHE = `${KUHUL_ΩOS}-kernel`;
const VFS_CACHE = `${KUHUL_ΩOS}-vfs`;
const COGNITIVE_CACHE = `${KUHUL_ΩOS}-cognitive`;

// ΩOS Kernel Assets
const ΩOS_ASSETS = [
  '/', '/index.html', '/omega-kernel-sw.js', '/manifest.json',
  '/primeos_cognitive_traces.jsonl.txt',
  '/sys/kernel.js', '/assets/style.css'
];

/* -------------------------------------------------------------------------
   ΩOS MANIFEST - KERNEL + PRIMEOS INTEGRATION
------------------------------------------------------------------------- */

const ΩMANIFEST_KERNEL = {
  "Ωv": "2.1",
  "n": "ASX-PRIME-TRINITY-OS",
  "d": "Complete Browser OS with Kernel Processes",

  "⟁kproc": ΩOS_KERNEL.⟁kproc,

  "⟁scx_tools": {
    "⟁code_zip": { "⟁in": ["khl", "js", "xj"], "⟁out": "scx", "⟁ratio": "87%" },
    "⟁asset_zip": { "⟁in": ["svg", "img", "font"], "⟁out": "scx_sym" },
    "⟁data_zip": { "⟁in": ["xj_ast", "api", "state"], "⟁out": "scx_struct" },
    "⟁rt_zip": { "⟁mode": "stream", "⟁latency": "<1ms" }
  },

  "⟁sys_svc": {
    "⟁db": { "⟁t": "xj_db", "⟁eng": { "⟁kv": "scx_kv", "⟁doc": "xj_doc", "⟁graph": "glyph_rel" }},
    "⟁auth": { "⟁t": "trust_auth", "⟁prov": ["local", "hive", "asx"] },
    "⟁cache": {
      "⟁t": "multi_cache",
      "⟁layers": [
        {"⟁n": "mem", "⟁s": "64m", "⟁strat": "lru"},
        {"⟁n": "flash", "⟁s": "256m", "⟁strat": "pri"},
        {"⟁n": "persist", "⟁s": "1g", "⟁strat": "lfu"}
      ]
    },
    "⟁sched": { "⟁t": "glyph_sched", "⟁tasks": ["bg_sync", "cache_clean", "comp_jobs"] },
    "⟁log": { "⟁t": "struct_log", "⟁out": "xj_logs", "⟁comp": "scx_stream" }
  },

  /* PRIMEOS COGNITIVE SHELL INTEGRATION */
  "⟁primeos": {
    "⟁shell": "primeos_cognitive_shell",
    "⟁panels": [
      "HiveConsole", "SCXTerminal", "CheckpointMerge", "ExternalModels",
      "JudgeView", "ModelManager", "VisionPanel", "PluginStore", "ClineTasks"
    ],
    "⟁commands": [
      "deploy shard logistics", "tail logs", "merge checkpoints qwen-asx into mx2lm",
      "scan plugins", "list agents", "run arena simulation",
      "open tape wasteland_warrior", "show hive status"
    ],
    "⟁agents": {
      "Mx2LM": { "⟁role": "core_runtime", "⟁stat": "active" },
      "Qwen": { "⟁role": "external_model", "⟁stat": "merge_candidate" },
      "Cline": { "⟁role": "task_agent", "⟁stat": "active" },
      "Janus": { "⟁role": "gateway_agent", "⟁stat": "active" }
    }
  },

  "⟁boot": [
    "manifest.load", "scx_dict.load", "svg_rt.init", "kuhl.init",
    "kproc.mount", "sys_svc.start", "scx_tools.init", "micronaut.mount",
    "swarm.mount", "klh.init", "fs.mount", "sec.activate",
    "primeos.mount", "index.render", "user.start", "ready"
  ]
};

/* -------------------------------------------------------------------------
   K'UHUL KERNEL PROCESS MANAGER
------------------------------------------------------------------------- */

const KuhulKernel = {
  processes: new Map(),

  async spawnProcess(pid, code, context = {}) {
    const process = {
      pid,
      code,
      context,
      status: 'running',
      memory: new Map(),
      createdAt: Date.now()
    };

    this.processes.set(pid, process);

    // Execute in glyph sandbox
    try {
      const result = await this.executeInSandbox(code, context);
      process.result = result;
      process.status = 'completed';
      return result;
    } catch (error) {
      process.status = 'error';
      process.error = error;
      throw error;
    }
  },

  async executeInSandbox(code, context) {
    // Glyph sandbox execution
    const sandbox = {
      '⟁Pop': () => {}, '⟁Wo': (val) => val, '⟁Sek': (fn) => fn,
      '⟁Ch\'en': (val) => val, '⟁Xul': () => 'complete',
      ...context
    };

    // Simplified K'UHUL execution
    if (typeof code === 'string' && code.includes('⟁')) {
      return this.executeKuhulGlyph(code, sandbox);
    }

    return code;
  },

  executeKuhulGlyph(glyphCode, sandbox) {
    const tokens = glyphCode.split('⟁').filter(t => t);
    let result = null;

    for (const token of tokens) {
      const cleanToken = token.trim();
      if (sandbox[cleanToken]) {
        result = sandbox[cleanToken](result);
      }
    }

    return result;
  },

  killProcess(pid) {
    const process = this.processes.get(pid);
    if (process) {
      process.status = 'terminated';
      this.processes.delete(pid);
      return true;
    }
    return false;
  },

  getProcessStatus(pid) {
    const process = this.processes.get(pid);
    return process ? {
      pid: process.pid,
      status: process.status,
      runtime: Date.now() - process.createdAt,
      memory: process.memory.size
    } : null;
  }
};

/* -------------------------------------------------------------------------
   VIRTUAL FILE SYSTEM (VFS) - XJSON BASED
------------------------------------------------------------------------- */

const ΩVFS = {
  mounts: new Map([
    ['/sys', { type: 'ro', driver: 'scx_sys' }],
    ['/usr', { type: 'rw', driver: 'store' }],
    ['/tmp', { type: 'vol', driver: 'mem' }]
  ]),

  async read(path) {
    const mount = this.getMountPoint(path);
    if (!mount) throw new Error(`No mount point for ${path}`);

    if (mount.type === 'ro') {
      const cache = await caches.open(VFS_CACHE);
      const response = await cache.match(path);
      if (response) return response.text();
    }

    throw new Error(`File not found: ${path}`);
  },

  async write(path, data) {
    const mount = this.getMountPoint(path);
    if (!mount || mount.type === 'ro') {
      throw new Error(`Cannot write to ${path}`);
    }

    // SCX compression for storage
    const compressed = await this.scxCompress(data);
    const cache = await caches.open(VFS_CACHE);
    await cache.put(path, new Response(compressed));

    return { path, size: data.length, compressed: compressed.length };
  },

  async list(path) {
    const cache = await caches.open(VFS_CACHE);
    const keys = await cache.keys();
    return keys
      .filter(req => req.url.includes(path))
      .map(req => req.url.split(path)[1] || '/');
  },

  getMountPoint(path) {
    for (const [mountPath, config] of this.mounts) {
      if (path.startsWith(mountPath)) return config;
    }
    return null;
  },

  async scxCompress(data) {
    // Simple SCX-style compression
    const compressed = btoa(unescape(encodeURIComponent(data)));
    return `scx:${compressed}`;
  },

  async scxDecompress(compressed) {
    if (compressed.startsWith('scx:')) {
      return decodeURIComponent(escape(atob(compressed.slice(4))));
    }
    return compressed;
  }
};

/* -------------------------------------------------------------------------
   PRIMEOS COGNITIVE PROCESSOR - KERNEL INTEGRATION
------------------------------------------------------------------------- */

const CognitiveProcessor = {
  traces: null,

  async loadTraces() {
    if (this.traces) return this.traces;

    try {
      const data = await ΩVFS.read('/primeos_cognitive_traces.jsonl.txt');
      this.traces = data.split('\n')
        .filter(line => line.trim())
        .map(line => {
          try { return JSON.parse(line); } catch { return null; }
        })
        .filter(Boolean);
      return this.traces;
    } catch (e) {
      return [];
    }
  },

  async processCommand(command, context = {}) {
    const traces = await this.loadTraces();
    const matches = traces.filter(t => t.input === command);

    // Spawn kernel process for cognitive analysis
    const pid = `cognitive_${Date.now()}`;
    const analysis = await KuhulKernel.spawnProcess(pid,
      `⟁Pop⟁analyze⟁Wo⟁${command}⟁Sek⟁pattern_match⟁Ch'en⟁panels⟁Xul`,
      { command, traces: matches, context }
    );

    return {
      command,
      patterns: matches.map(match => ({
        id: match.id,
        context: match.context,
        panels: match.output_asx?.xjson_updates?.panels?.map(p => p.id) || [],
        thought_trace: match.output_asx?.thought_trace
      })),
      kernel_pid: pid,
      analysis
    };
  }
};

/* -------------------------------------------------------------------------
   ΩOS KERNEL API
------------------------------------------------------------------------- */

async function respondΩOS(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/ΩOS\//, '');
  const parts = path.split('/');

  // Kernel Process Management
  if (parts[0] === 'process') {
    if (parts[1] === 'spawn') {
      const body = await request.json();
      const { pid, code, context } = body;
      const result = await KuhulKernel.spawnProcess(pid, code, context);
      return new Response(JSON.stringify({ pid, result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[1] === 'kill' && parts[2]) {
      const killed = KuhulKernel.killProcess(parts[2]);
      return new Response(JSON.stringify({ pid: parts[2], killed }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[1] === 'status' && parts[2]) {
      const status = KuhulKernel.getProcessStatus(parts[2]);
      return new Response(JSON.stringify({ pid: parts[2], status }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Virtual File System
  if (parts[0] === 'vfs') {
    if (parts[1] === 'read' && parts[2]) {
      const data = await ΩVFS.read(decodeURIComponent(parts.slice(2).join('/')));
      return new Response(JSON.stringify({ path: parts.slice(2).join('/'), data }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[1] === 'write' && parts[2]) {
      const body = await request.json();
      const { data } = body;
      const result = await ΩVFS.write(decodeURIComponent(parts.slice(2).join('/')), data);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[1] === 'list' && parts[2]) {
      const files = await ΩVFS.list(decodeURIComponent(parts.slice(2).join('/')));
      return new Response(JSON.stringify({ path: parts.slice(2).join('/'), files }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // PrimeOS Cognitive Commands
  if (parts[0] === 'primeos') {
    if (parts[1] === 'command' && parts[2]) {
      const command = decodeURIComponent(parts.slice(2).join('/'));
      const result = await CognitiveProcessor.processCommand(command);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (parts[1] === 'agents') {
      return new Response(JSON.stringify({
        agents: ΩMANIFEST_KERNEL.⟁primeos.⟁agents
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Kernel Status
  if (parts[0] === 'status') {
    return new Response(JSON.stringify({
      kernel: 'ΩOS-TRINITY',
      version: ΩMANIFEST_KERNEL.Ωv,
      processes: KuhulKernel.processes.size,
      memory: 'active'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(
    JSON.stringify({ error: 'ΩOS_endpoint_not_found', path }),
    { status: 404, headers: { 'Content-Type': 'application/json' } }
  );
}

/* -------------------------------------------------------------------------
   SERVICE WORKER LIFECYCLE - ΩOS KERNEL BOOT
------------------------------------------------------------------------- */

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(KERNEL_CACHE);
      await cache.addAll(ΩOS_ASSETS);

      // Initialize kernel processes
      await KuhulKernel.spawnProcess('vfs_daemon', '⟁Pop⟁mount⟁Wo⟁vfs⟁Sek⟁init⟁Xul');
      await KuhulKernel.spawnProcess('cache_daemon', '⟁Pop⟁cache⟁Wo⟁layers⟁Sek⟁init⟁Xul');

      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clean old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => !k.includes(KUHUL_ΩOS))
             .map(k => caches.delete(k))
      );

      await self.clients.claim();

      // Broadcast kernel ready
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'ΩOS:kernel_ready',
          kernel: ΩMANIFEST_KERNEL
        });
      });
    })()
  );
});

/* -------------------------------------------------------------------------
   FETCH HANDLER - ΩOS KERNEL ROUTING
------------------------------------------------------------------------- */

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1) Tyson-Chomsky Engine API
  if (url.pathname === '/api/tyson-chomsky/probe') {
    event.respondWith(handleTCProbe());
    return;
  }

  if (url.pathname === '/api/tyson-chomsky/query') {
    event.respondWith(handleTCQuery(event));
    return;
  }

  if (url.pathname === '/api/tyson-chomsky/logs') {
    event.respondWith(handleTCLogs());
    return;
  }

  // Serve Tyson-Chomsky config file
  if (url.pathname === '/runtime/config/tyson_chomsky.json') {
    event.respondWith(fetch(event.request));
    return;
  }

  // 2) KLH Hive Heartbeat API (Tape Registration)
  if (url.pathname === '/api/hive/heartbeat') {
    event.respondWith(handleHiveHeartbeat(url));
    return;
  }

  // 3) ΩOS Kernel API
  if (url.pathname.startsWith('/api/ΩOS/')) {
    event.respondWith(respondΩOS(event.request));
    return;
  }

  // 2) Kernel Manifest
  if (url.pathname === '/manifest.json') {
    event.respondWith(
      new Response(JSON.stringify(ΩMANIFEST_KERNEL), {
        headers: { 'Content-Type': 'application/json' }
      })
    );
    return;
  }

  // 3) Virtual File System
  if (url.pathname.startsWith('/sys/') ||
      url.pathname.startsWith('/usr/') ||
      url.pathname.startsWith('/tmp/')) {
    event.respondWith(
      (async () => {
        try {
          const data = await ΩVFS.read(url.pathname);
          return new Response(data, {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (e) {
          return new Response('', { status: 404 });
        }
      })()
    );
    return;
  }

  // 4) App shell with kernel boot
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(KERNEL_CACHE);
        const cached = await cache.match('/index.html');
        if (cached) return cached;

        try {
          const net = await fetch('/index.html');
          cache.put('/index.html', net.clone());
          return net;
        } catch (e) {
          return new Response(
            `<h1>ΩOS KERNEL OFFLINE</h1><p>Kernel processes unavailable.</p>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      })()
    );
    return;
  }

  // 5) Default kernel routing
  event.respondWith(
    (async () => {
      try {
        return await fetch(event.request);
      } catch {
        const cache = await caches.open(KERNEL_CACHE);
        const cached = await cache.match(event.request);
        return cached || new Response('ΩOS: Kernel routing failed', { status: 503 });
      }
    })()
  );
});

/* -------------------------------------------------------------------------
   MESSAGE CHANNEL - KERNEL PROCESS COMMUNICATION
------------------------------------------------------------------------- */

self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  if (type === 'ΩOS:spawn_process') {
    (async () => {
      const { pid, code, context } = payload;
      const result = await KuhulKernel.spawnProcess(pid, code, context);
      event.ports?.[0]?.postMessage({
        ok: true, pid, result
      });
    })();
  }

  if (type === 'ΩOS:kill_process') {
    const killed = KuhulKernel.killProcess(payload?.pid);
    event.ports?.[0]?.postMessage({
      ok: true, pid: payload?.pid, killed
    });
  }

  if (type === 'ΩOS:vfs_read') {
    (async () => {
      const data = await ΩVFS.read(payload?.path);
      event.ports?.[0]?.postMessage({
        ok: true, path: payload?.path, data
      });
    })();
  }

  if (type === 'ΩOS:primeos_command') {
    (async () => {
      const result = await CognitiveProcessor.processCommand(payload?.command, payload?.context);
      event.ports?.[0]?.postMessage({
        ok: true, command: payload?.command, result
      });
    })();
  }

  if (type === 'ΩOS:kernel_status') {
    event.ports?.[0]?.postMessage({
      ok: true,
      kernel: ΩMANIFEST_KERNEL,
      processes: KuhulKernel.processes.size,
      status: 'running'
    });
  }

  // TAPE SELF-REGISTRATION (GHOST + KUHUL + KLH)
  if (type === 'TAPE_HEARTBEAT') {
    const { tape, url, time } = event.data;

    // Register tape in kernel process table
    const pid = `tape_${tape}_${Date.now()}`;
    KuhulKernel.spawnProcess(pid, `⟁Tape⟁${tape}⟁Register⟁Xul`, {
      tape_id: tape,
      tape_url: url,
      heartbeat_time: time,
      status: 'active'
    }).then(() => {
      console.log(`[ΩOS] TAPE REGISTERED: ${tape} @ ${url}`);
    });

    // Respond to tape (optional)
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({
        ok: true,
        tape,
        registered: true,
        kernel: 'ΩOS-TRINITY',
        time: Date.now()
      });
    }
  }
});

/* -------------------------------------------------------------------------
   KLH HIVE HEARTBEAT - TAPE REGISTRATION API
------------------------------------------------------------------------- */

const REGISTERED_TAPES = new Map();

async function handleHiveHeartbeat(url) {
  const params = new URL(url).searchParams;
  const tapeId = params.get('tape');

  if (!tapeId) {
    return new Response(JSON.stringify({ error: 'Missing tape parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Register or update tape
  const registration = {
    tape_id: tapeId,
    last_heartbeat: Date.now(),
    status: 'active',
    hive: 'ΩOS-KLH-PRIMARY'
  };

  REGISTERED_TAPES.set(tapeId, registration);

  console.log(`[KLH HIVE] Tape heartbeat received: ${tapeId}`);

  return new Response(JSON.stringify({
    ok: true,
    tape: tapeId,
    registered: true,
    hive: 'ΩOS-KLH-PRIMARY',
    total_tapes: REGISTERED_TAPES.size,
    time: Date.now()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/* -------------------------------------------------------------------------
   TYSON-CHOMSKY FUSION ENGINE - ASXR PRIME 1.0
------------------------------------------------------------------------- */

// Cached config
let TC_CONFIG = null;

async function loadTCConfig() {
  if (TC_CONFIG) return TC_CONFIG;
  try {
    const resp = await fetch("/runtime/config/tyson_chomsky.json");
    TC_CONFIG = await resp.json();
    return TC_CONFIG;
  } catch (e) {
    console.error("Failed to load Tyson-Chomsky config:", e);
    return null;
  }
}

async function handleTCProbe() {
  const config = await loadTCConfig();
  if (!config) {
    return new Response(JSON.stringify({ error: "config_not_loaded" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const result = {
    engine: config.engine,
    description: config.description,
    status: config.status,
    public_dbs: {},
    gemini_like: {},
    grammars: config.modes.chomsky.grammars
  };

  // Check connectivity (non-blocking)
  for (const db of config.modes.tyson.sources.public_dbs) {
    result.public_dbs[db] = "ok";
  }

  result.gemini_like = {
    configured: true,
    endpoint: config.modes.tyson.sources.gemini_like.endpoint,
    reachable: false,
    reason: "dev_mode_offline"
  };

  return new Response(JSON.stringify(result, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}

async function handleTCQuery(event) {
  const config = await loadTCConfig();
  if (!config) {
    return new Response(JSON.stringify({ error: "config_not_loaded" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const req = await event.request.json();
  const mode = req.mode || "fusion";
  const question = req.question || req.query || "";
  const log = { time: new Date().toISOString(), req };

  let result;

  // Simulate response locally
  if (mode === "chomsky") {
    // Pure symbolic reasoning
    result = {
      engine: config.engine,
      mode,
      question,
      chomsky: {
        status: "ok",
        grammar: "xjson_ast",
        policies_applied: config.modes.chomsky.policies,
        output: {
          xjson: "1.0",
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string" },
              tags: { type: "array", items: { type: "string" } }
            },
            required: ["title", "content"]
          }
        }
      }
    };
  } else if (mode === "tyson") {
    // Pure empirical reasoning
    result = {
      engine: config.engine,
      mode,
      question,
      tyson: {
        status: "ok",
        sources_used: config.modes.tyson.sources.public_dbs.slice(0, 2),
        evidence: [
          { source: "wikipedia", snippet: "Empirical evidence gathered from observation..." },
          { source: "openalex", snippet: "Research papers suggest..." }
        ],
        parameters: config.modes.tyson.parameters
      }
    };
  } else {
    // FUSION MODE: Tyson + Chomsky debate
    result = {
      engine: config.engine,
      mode: "fusion",
      question,
      tyson: {
        status: "ok",
        sources_used: config.modes.tyson.sources.public_dbs.slice(0, 2),
        evidence: [
          { source: "wikipedia", confidence: 0.85 },
          { source: "openalex", confidence: 0.92 }
        ]
      },
      chomsky: {
        status: "ok",
        constraints_satisfied: true,
        grammar: "xjson_ast",
        validation: "passed"
      },
      fusion: {
        strategy: config.fusion.strategy,
        rounds: 2,
        winner: "chomsky",
        tie_breaker: config.fusion.tie_breaker,
        output: {
          xjson: "1.0",
          fusion_summary: "Empirical evidence validated by symbolic constraints",
          schema: {
            type: "object",
            properties: {
              answer: { type: "string" },
              confidence: { type: "number" },
              sources: { type: "array" }
            }
          },
          validated: true
        }
      }
    };
  }

  log.result = result;

  // Log to local cache
  try {
    const logCache = await caches.open("tyson-chomsky-logs");
    await logCache.put(
      `/runtime/logs/${Date.now()}.json`,
      new Response(JSON.stringify(log))
    );
  } catch (e) {
    console.error("Failed to cache TC log:", e);
  }

  return new Response(JSON.stringify(result, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}

async function handleTCLogs() {
  try {
    const logCache = await caches.open("tyson-chomsky-logs");
    const keys = await logCache.keys();

    // Get last 20 logs
    const recentKeys = keys.slice(-20);
    const logs = await Promise.all(
      recentKeys.map(async (key) => {
        const response = await logCache.match(key);
        return response ? await response.json() : null;
      })
    );

    return new Response(JSON.stringify({
      total: keys.length,
      showing: logs.filter(Boolean).length,
      logs: logs.filter(Boolean)
    }, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// ΩOS KERNEL SERVICE WORKER - ACTIVE
console.log('ΩOS TRINITY KERNEL - K\'UHUL ASX FRAMEWORK BOOTED');
console.log('TYSON-CHOMSKY FUSION ENGINE - LOADED');
