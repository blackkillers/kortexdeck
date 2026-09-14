import os, json, re, shutil, zipfile

# 1. Load existing commandsData.json
data_path = '/Users/ilan/.gemini/antigravity/scratch/omnicommand-hub/src/data/commandsData.json'
with open(data_path, 'r', encoding='utf-8') as f:
    existing_skills = json.load(f)

print(f"Loaded {len(existing_skills)} existing skills.")

# 2. Define the new elite skills requested by user
new_specialized_skills = [
    # --- FRONTEND & DESIGN INTELLIGENCE ---
    {
        "id": "ui-ux-pro-max",
        "title": "UI/UX Pro Max Design Intelligence",
        "command": "skill:ui-ux-pro-max",
        "platform": "universal",
        "category": "Frontend & UI",
        "type": "Design Intelligence",
        "summary": "Elite design reasoning system enforcing modern color palettes, typography scale, micro-interactions, responsive grids, and strict WCAG A11y standards.",
        "description": "Transforms generic AI code into human-crafted, premium user interfaces. Injects cohesive 8pt spacing grids, modern glassmorphism/dark-mode aesthetics, fluid typography hierarchies, accessible contrast ratios (minimum 4.5:1), and deliberate micro-interactions.",
        "syntax": "/ui-ux-pro-max --theme=dark-glass --layout=responsive-grid --a11y=strict",
        "arguments": ["--theme", "--layout", "--a11y", "--palette"],
        "example": "/ui-ux-pro-max Create a high-conversion SaaS analytics dashboard with interactive metrics cards, custom SVG mini-charts, and keyboard-navigable tabs.",
        "icon": "Palette",
        "gradient": "from-cyan-500 to-blue-600",
        "tags": ["frontend", "ui-ux", "design-system", "tailwind", "accessibility", "a11y"],
        "difficulty": "Expert",
        "author": "KortexDeck & NextLevelBuilder",
        "popular": True
    },
    {
        "id": "code-impeccable",
        "title": "Code Impeccable (Zero AI-Slop)",
        "command": "skill:code-impeccable",
        "platform": "universal",
        "category": "Frontend & UI",
        "type": "Quality & Audit",
        "summary": "Paul Bakaus-style design language and code auditor eliminating visual inconsistencies, low-contrast text, bad gradients, and structural sloppiness.",
        "description": "Performs deterministic static analysis and aesthetic auditing on frontend code. Enforces crisp typography ratios, clean DOM hierarchies, semantic HTML5 landmarks, and consistent spacing variables.",
        "syntax": "/impeccable audit --strict --fix",
        "arguments": ["--strict", "--fix", "--brand-voice"],
        "example": "/impeccable audit Check the entire landing page for contrast violations, layout shifts, unstyled state fallbacks, and generic placeholder text.",
        "icon": "CheckCircle2",
        "gradient": "from-emerald-500 to-teal-600",
        "tags": ["code-quality", "frontend", "impeccable", "design-audit", "clean-code"],
        "difficulty": "Expert",
        "author": "Paul Bakaus / Impeccable",
        "popular": True
    },
    {
        "id": "react-19-server-actions",
        "title": "React 19 Server Actions & Optimistic UI",
        "command": "skill:react-19-pro",
        "platform": "universal",
        "category": "Frontend & UI",
        "type": "Architecture",
        "summary": "Mastery of React 19 useActionState, useOptimistic, Server Component boundaries, and streaming suspense architecture.",
        "description": "Builds zero-waterfall full-stack interfaces using native React 19 primitives. Implements optimistic UI rollbacks on mutation failure, non-blocking form handling, and progressive hydration.",
        "syntax": "import { useActionState, useOptimistic } from 'react'",
        "arguments": ["action", "initialState", "permalink"],
        "example": "const [state, formAction, isPending] = useActionState(updateProfileMutation, initialState);",
        "icon": "Atom",
        "gradient": "from-cyan-400 to-indigo-600",
        "tags": ["react19", "server-actions", "frontend", "optimistic-ui", "nextjs"],
        "difficulty": "Advanced",
        "author": "React Core Team",
        "popular": True
    },
    {
        "id": "framer-motion-60fps",
        "title": "Framer Motion 60FPS Micro-Interactions",
        "command": "skill:framer-motion-wizard",
        "platform": "universal",
        "category": "Frontend & UI",
        "type": "Animation Engine",
        "summary": "Spring-physics layout animations, exit transitions, drag gestures, and scroll-linked timeline sequences.",
        "description": "Architects butter-smooth 60fps GPU-accelerated UI animations using Framer Motion and Motion One. Eliminates layout thrashing by animating transform and opacity properties exclusively.",
        "syntax": "<motion.div layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300 }} />",
        "arguments": ["initial", "animate", "exit", "transition", "layout"],
        "example": "Implement shared layout morphing transitions between product grid cards and the modal preview with spring physics.",
        "icon": "Sparkles",
        "gradient": "from-purple-500 to-pink-500",
        "tags": ["framer-motion", "animation", "micro-interactions", "frontend", "ui"],
        "difficulty": "Intermediate",
        "author": "Motion Division",
        "popular": True
    },

    # --- BACKEND & PERFORMANCE FREAK ---
    {
        "id": "performance-freak",
        "title": "Performance Freak (Low-Latency & Zero-Alloc)",
        "command": "skill:performance-freak",
        "platform": "universal",
        "category": "Backend & API",
        "type": "Optimization Protocol",
        "summary": "Hyper-optimization engine targeting sub-millisecond p99 latencies, zero-allocation memory loops, CPU cache locality, and flamegraph bottlenecks.",
        "description": "Audits backend services for hidden allocations, garbage collection pauses, N+1 query patterns, and connection contention. Injects sync.Pool memory reuse, SIMD optimizations, and kernel TCP tuning.",
        "syntax": "/performance-freak analyze --p99 --flamegraph --memory-profile",
        "arguments": ["--p99", "--allocs", "--flamegraph", "--target-ms"],
        "example": "/performance-freak Profile the high-throughput payment webhook handler and reduce memory allocations per request to 0 bytes.",
        "icon": "Zap",
        "gradient": "from-amber-500 to-red-600",
        "tags": ["performance", "low-latency", "backend", "memory-optimization", "profiling"],
        "difficulty": "Expert",
        "author": "High-Performance Systems Group",
        "popular": True
    },
    {
        "id": "fastapi-async-master",
        "title": "FastAPI 0.115+ Async Production Architect",
        "command": "skill:fastapi-async-pro",
        "platform": "universal",
        "category": "Backend & API",
        "type": "Framework Rule",
        "summary": "High-concurrency Python backend engineering with Pydantic v2 schemas, asyncpg connection pooling, dependency injection, and OpenAPI 3.1.",
        "description": "Constructs asynchronous REST and WebSocket microservices in Python. Enforces strict schema validations, lifespan context managers, custom security middlewares, and background tasks.",
        "syntax": "@app.post('/v1/events', response_model=EventOut, status_code=201)",
        "arguments": ["response_model", "status_code", "dependencies"],
        "example": "Create an async endpoint accepting batched telemetry data, validating against Pydantic models, and pipeline-inserting into PostgreSQL via asyncpg.",
        "icon": "Cpu",
        "gradient": "from-emerald-500 to-green-600",
        "tags": ["fastapi", "python", "backend", "async", "pydantic"],
        "difficulty": "Intermediate",
        "author": "Tiangolo / FastAPI",
        "popular": True
    },
    {
        "id": "go-high-concurrency",
        "title": "Go High-Concurrency Service Engine",
        "command": "skill:go-concurrency",
        "platform": "universal",
        "category": "Backend & API",
        "type": "Architecture",
        "summary": "Idiomatic Go concurrency design with worker pools, bounded channels, context cancellation, and zero-allocation JSON streaming.",
        "description": "Architects production Go services handling 100k+ req/sec. Prevents goroutine leaks with context propagation, errgroup parallel execution, and race detector compliance.",
        "syntax": "g, ctx := errgroup.WithContext(ctx)",
        "arguments": ["context", "errgroup", "sync.Pool"],
        "example": "Implement a fan-out worker pool processing 10,000 scraping jobs concurrently with bounded concurrency of 50 workers and graceful SIGTERM shutdown.",
        "icon": "Activity",
        "gradient": "from-cyan-500 to-blue-500",
        "tags": ["golang", "concurrency", "backend", "goroutines", "high-throughput"],
        "difficulty": "Advanced",
        "author": "Go Systems Architecture",
        "popular": True
    },
    {
        "id": "rust-axum-titan",
        "title": "Rust Axum Zero-Overhead Backend",
        "command": "skill:rust-axum-titan",
        "platform": "universal",
        "category": "Backend & API",
        "type": "Framework Rule",
        "summary": "Memory-safe, blazingly fast asynchronous web microservices powered by Tokio, Tower middlewares, and type-safe state extractors.",
        "description": "Builds mission-critical microservices in Rust. Leverages zero-copy deserialization, SQLx compile-time checked queries, and robust error enum handling without panics.",
        "syntax": "async fn handler(State(pool): State<PgPool>, Json(payload): Json<CreateUser>) -> Result<Json<User>, AppError>",
        "arguments": ["State", "Json", "Path", "Extension"],
        "example": "Create a type-safe Axum route with JWT validation middleware, Postgres connection pool extraction, and structured JSON responses.",
        "icon": "ShieldCheck",
        "gradient": "from-orange-600 to-red-600",
        "tags": ["rust", "axum", "tokio", "backend", "zero-overhead"],
        "difficulty": "Expert",
        "author": "Tokio-rs",
        "popular": True
    },

    # --- ALGORITHMIQUE & DATA STRUCTURES ---
    {
        "id": "algo-ast-graph-traversal",
        "title": "AST Code Analysis & Dependency Graph Traversal",
        "command": "skill:algo-ast-graph",
        "platform": "universal",
        "category": "Algorithmique",
        "type": "Algorithm",
        "summary": "Abstract Syntax Tree parsing, cyclic dependency detection with Tarjan's SCC, and topological sort execution.",
        "description": "Navigates codebases using AST visitor patterns. Identifies dead code, builds cross-module dependency DAGs, computes cyclomatic complexity, and verifies architectural boundaries.",
        "syntax": "/algo-ast analyze --target=src --detect-cycles --toposort",
        "arguments": ["--target", "--detect-cycles", "--max-depth"],
        "example": "Parse all TypeScript files in the monorepo, construct the dependency graph, detect any circular imports, and output the topological build order.",
        "icon": "Network",
        "gradient": "from-blue-600 to-indigo-600",
        "tags": ["algorithms", "ast", "graph-theory", "toposort", "refactoring"],
        "difficulty": "Expert",
        "author": "Compilers & Static Analysis Group",
        "popular": True
    },
    {
        "id": "algo-probabilistic-structures",
        "title": "Probabilistic Data Structures (Bloom & HyperLogLog)",
        "command": "skill:algo-bloom-hll",
        "platform": "universal",
        "category": "Algorithmique",
        "type": "Algorithm",
        "summary": "Implementation of space-efficient Bloom Filters, Counting Bloom Filters, HyperLogLog, and Count-Min Sketch.",
        "description": "Solves massive scale stream counting and membership problems in $O(1)$ memory. Configures optimal bit-array size and hash function counts based on false positive tolerance $\\epsilon$.",
        "syntax": "m = - (n * ln(p)) / (ln(2)^2); k = (m / n) * ln(2)",
        "arguments": ["capacity", "error_rate", "hash_count"],
        "example": "Implement an in-memory Bloom filter in TypeScript checking URL deduplication for 10 million crawled pages with a 0.1% false positive rate.",
        "icon": "Binary",
        "gradient": "from-violet-600 to-purple-600",
        "tags": ["algorithms", "bloom-filter", "hyperloglog", "probabilistic", "streaming"],
        "difficulty": "Advanced",
        "author": "Algorithmic Systems Lab",
        "popular": False
    },
    {
        "id": "algo-spatial-indexing",
        "title": "Spatial Indexing (Quadtrees, R-Tree & Geohash)",
        "command": "skill:algo-spatial-r-tree",
        "platform": "universal",
        "category": "Algorithmique",
        "type": "Algorithm",
        "summary": "Hierarchical spatial partitioning for 2D/3D collision detection, geographic bounding-box queries, and k-Nearest Neighbors.",
        "description": "Accelerates spatial range searches from $O(N)$ to $O(\\log N)$. Implements dynamic Quadtrees, Hilbert curve spatial hashing, and R-Tree bounding polygon intersections.",
        "syntax": "quadtree.insert({ x, y, data }); quadtree.queryRange(boundingBox);",
        "arguments": ["boundary", "capacity", "depth"],
        "example": "Build a Quadtree index for 50,000 real-time moving delivery drivers and query all drivers within a 3km radius in under 2 milliseconds.",
        "icon": "Compass",
        "gradient": "from-teal-500 to-emerald-600",
        "tags": ["algorithms", "spatial-indexing", "quadtree", "geo", "r-tree"],
        "difficulty": "Advanced",
        "author": "Geospatial Compute Lab",
        "popular": False
    },

    # --- ARCHITECTURE ---
    {
        "id": "arch-hexagonal-clean",
        "title": "Hexagonal Architecture (Ports & Adapters)",
        "command": "skill:arch-hexagonal",
        "platform": "universal",
        "category": "Architecture",
        "type": "Architectural Pattern",
        "summary": "Strict decoupling of core business logic from databases, external APIs, and UI layers using Dependency Inversion.",
        "description": "Defines explicit input and output ports (interfaces). Isolates domain models from framework dependencies, allowing trivial unit testing with mock adapters and hot-swappable databases.",
        "syntax": "Domain -> Ports (Interfaces) <- Adapters (DB / HTTP / CLI)",
        "arguments": ["--domain", "--in-port", "--out-port", "--adapter"],
        "example": "Design an Order Processing domain service implementing the PaymentPort and NotificationPort with Stripe and SendGrid adapters.",
        "icon": "Boxes",
        "gradient": "from-indigo-500 to-purple-600",
        "tags": ["architecture", "hexagonal", "clean-architecture", "ports-and-adapters", "ddd"],
        "difficulty": "Expert",
        "author": "Alistair Cockburn / Architecture Guild",
        "popular": True
    },
    {
        "id": "arch-event-driven-outbox",
        "title": "Event-Driven & Transactional Outbox Pattern",
        "command": "skill:arch-outbox-pattern",
        "platform": "universal",
        "category": "Architecture",
        "type": "Distributed Systems",
        "summary": "Guaranteed at-least-once event delivery and microservice consistency without distributed two-phase commit locks.",
        "description": "Saves state modifications and outbound domain events in a single atomic database transaction. An asynchronous background poller (CDC / Debezium) publishes events to Kafka / RabbitMQ reliably.",
        "syntax": "BEGIN; UPDATE accounts SET balance = balance - 100; INSERT INTO outbox_events (event_name, payload) VALUES (...); COMMIT;",
        "arguments": ["event_type", "aggregate_id", "payload", "processed_at"],
        "example": "Implement a transactional outbox table in Postgres with an async worker relaying events to Apache Kafka with exponential backoff retries.",
        "icon": "Repeat",
        "gradient": "from-amber-600 to-orange-600",
        "tags": ["architecture", "event-driven", "outbox-pattern", "kafka", "distributed-systems"],
        "difficulty": "Expert",
        "author": "Enterprise Integration Patterns",
        "popular": True
    },

    # --- DATABASE ---
    {
        "id": "db-postgres-index-surgeon",
        "title": "PostgreSQL 16 Index Surgeon & Query Optimizer",
        "command": "skill:db-postgres-optimizer",
        "platform": "universal",
        "category": "Database",
        "type": "Performance Tuning",
        "summary": "Precision indexing strategies (Partial B-Tree, GIN JSONB, BRIN time-series) and deep EXPLAIN (ANALYZE, BUFFERS) query surgery.",
        "description": "Eliminates sequential scans on multi-million row tables. Detects index bloat, creates covering indexes with INCLUDE clauses, tunes autovacuum parameters, and eliminates deadlock hazards.",
        "syntax": "EXPLAIN (ANALYZE, BUFFERS, SETTINGS) SELECT ...",
        "arguments": ["EXPLAIN", "ANALYZE", "BUFFERS", "CREATE INDEX CONCURRENTLY"],
        "example": "Optimize a slow multi-tenant query by creating a composite partial B-tree index on (tenant_id, created_at DESC) WHERE status = 'active'.",
        "icon": "Database",
        "gradient": "from-blue-500 to-cyan-600",
        "tags": ["database", "postgres", "indexing", "sql-tuning", "performance"],
        "difficulty": "Expert",
        "author": "PostgreSQL Performance Guild",
        "popular": True
    },
    {
        "id": "db-pgvector-semantic-store",
        "title": "pgvector Hybrid Semantic Search Engine",
        "command": "skill:db-pgvector-pro",
        "platform": "universal",
        "category": "Database",
        "type": "AI Vector Search",
        "summary": "High-performance vector embedding storage and retrieval using HNSW indexing and Reciprocal Rank Fusion (RRF) hybrid search.",
        "description": "Stores high-dimensional AI vectors directly inside PostgreSQL. Combines BM25 full-text search (tsvector) with HNSW cosine distance vector matching for state-of-the-art RAG retrieval.",
        "syntax": "CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);",
        "arguments": ["m", "ef_construction", "vector_cosine_ops", "ts_rank"],
        "example": "Write a SQL query performing hybrid RAG retrieval combining full-text search and vector cosine similarity with Reciprocal Rank Fusion.",
        "icon": "Search",
        "gradient": "from-purple-600 to-pink-600",
        "tags": ["database", "pgvector", "postgres", "vector-search", "rag", "embeddings"],
        "difficulty": "Advanced",
        "author": "pgvector Community",
        "popular": True
    },
    {
        "id": "db-clickhouse-olap-titan",
        "title": "ClickHouse Realtime Analytics & MergeTree Engine",
        "command": "skill:db-clickhouse-titan",
        "platform": "universal",
        "category": "Database",
        "type": "OLAP Analytics",
        "summary": "Sub-second analytical queries over billions of event rows using columnar storage, partitioning keys, and Materialized Views.",
        "description": "Designs high-throughput analytics pipelines. Configures ReplacingMergeTree and AggregatingMergeTree engines, data skip indexes, and real-time Kafka engine ingestion tables.",
        "syntax": "ENGINE = ReplacingMergeTree(version) PARTITION BY toYYYYMM(event_date) ORDER BY (tenant_id, event_type, event_time)",
        "arguments": ["ENGINE", "PARTITION BY", "ORDER BY", "PRIMARY KEY"],
        "example": "Create a ClickHouse analytics schema with a Materialized View calculating 5-minute rolling averages across 500 million clickstream events.",
        "icon": "BarChart3",
        "gradient": "from-amber-500 to-yellow-500",
        "tags": ["database", "clickhouse", "olap", "big-data", "analytics"],
        "difficulty": "Expert",
        "author": "ClickHouse Architecture",
        "popular": False
    },

    # --- FRAMEWORK ---
    {
        "id": "framework-nextjs-15-pro",
        "title": "Next.js 15 App Router & Partial Prerendering (PPR)",
        "command": "skill:nextjs-15-pro",
        "platform": "universal",
        "category": "Framework",
        "type": "Full-Stack Framework",
        "summary": "Mastery of Next.js 15 Partial Prerendering, async Request APIs, Server Actions, and granular cache controls.",
        "description": "Architects high-speed production Next.js 15 applications. Leverages React Server Components for instant shell delivery while streaming dynamic personalized content via Suspense boundaries.",
        "syntax": "export const experimental_ppr = true;",
        "arguments": ["ppr", "server-actions", "unstable_cache", "parallel-routes"],
        "example": "Implement a product page with static SEO-optimized product details and a streaming Suspense cart widget with optimistic updates.",
        "icon": "Layers",
        "gradient": "from-gray-700 to-black",
        "tags": ["nextjs", "react", "framework", "app-router", "ppr"],
        "difficulty": "Advanced",
        "author": "Vercel Next.js Team",
        "popular": True
    },
    {
        "id": "framework-svelte-5-runes",
        "title": "Svelte 5 Runes & Fine-Grained Reactivity",
        "command": "skill:svelte-5-runes",
        "platform": "universal",
        "category": "Framework",
        "type": "Modern Frontend",
        "summary": "Deep integration of Svelte 5 $state, $derived, $effect, and snippet composition patterns.",
        "description": "Builds ultra-lightweight web applications with zero virtual DOM overhead. Leverages universal signals across components, typed runes, and declarative event handlers.",
        "syntax": "let count = $state(0); let doubled = $derived(count * 2); $effect(() => console.log(count));",
        "arguments": ["$state", "$derived", "$effect", "$props", "$bindable"],
        "example": "Refactor a complex stateful shopping cart component into Svelte 5 runes with reactive derived totals and localStorage synchronization.",
        "icon": "Flame",
        "gradient": "from-orange-500 to-red-500",
        "tags": ["svelte5", "runes", "signals", "framework", "frontend"],
        "difficulty": "Intermediate",
        "author": "Svelte Core Team",
        "popular": True
    },

    # --- SECURITY ---
    {
        "id": "sec-owasp-bulletproof",
        "title": "OWASP Top 10 Bulletproof Web Defense",
        "command": "skill:sec-owasp-bulletproof",
        "platform": "universal",
        "category": "Security",
        "type": "Application Security",
        "summary": "Hardened application security auditing for injection flaws, broken access control, XSS, CSRF, and cryptographic failures.",
        "description": "Applies zero-trust security controls across backend and frontend codebases. Enforces strict Content Security Policy (CSP), parameterized SQL queries, DOMPurify sanitization, and timing-safe comparisons.",
        "syntax": "/sec-audit --owasp --strict-csp --auth-matrix",
        "arguments": ["--owasp", "--strict-csp", "--sanitize", "--audit-rbac"],
        "example": "/sec-audit Audit all user input entry points, verify parameterized query enforcement, and generate strict CSP headers with nonce support.",
        "icon": "ShieldAlert",
        "gradient": "from-red-600 to-rose-700",
        "tags": ["security", "owasp", "appsec", "xss", "csrf", "infosec"],
        "difficulty": "Expert",
        "author": "OWASP Foundation / AppSec",
        "popular": True
    },
    {
        "id": "sec-zero-trust-agent",
        "title": "Zero-Trust Agent Sandbox & Token Sentinel",
        "command": "skill:sec-agent-sentinel",
        "platform": "universal",
        "category": "Security",
        "type": "AI Security",
        "summary": "Prompt injection defense, secret redacting proxy, and isolated tool execution boundary for autonomous AI agents.",
        "description": "Protects environments against adversarial prompt injections and indirect payload hijacking. Intercepts tool calls, redacts environment credentials (API keys, SSH keys), and enforces filesystem read-only chroots.",
        "syntax": "/agent-sentinel --sandbox=strict --redact-secrets --firewall",
        "arguments": ["--sandbox", "--redact", "--prompt-firewall"],
        "example": "Configure the agent execution environment to automatically block any prompt attempting to exfiltrate .env variables or execute unauthorized system calls.",
        "icon": "Lock",
        "gradient": "from-slate-700 to-zinc-900",
        "tags": ["security", "ai-security", "prompt-injection", "zero-trust", "sanitization"],
        "difficulty": "Expert",
        "author": "LLM Security Alliance",
        "popular": True
    },

    # --- SCRAPING & WEB AUTOMATION ---
    {
        "id": "scraping-playwright-stealth",
        "title": "Playwright & Puppeteer Stealth Scraper Pro",
        "command": "skill:scraping-stealth",
        "platform": "universal",
        "category": "Scraping",
        "type": "Web Automation",
        "summary": "Headless browser automation bypassing Cloudflare Turnstile, browser fingerprinting, and behavioral bot detection.",
        "description": "Constructs undetectable web scrapers. Injects randomized mouse Bézier curves, realistic typing cadences, WebGL/Canvas noise spoofing, and rotating residential proxy pools.",
        "syntax": "const browser = await playwright.chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] });",
        "arguments": ["--stealth", "--proxy-pool", "--random-useragent", "--human-delay"],
        "example": "Scrape dynamically rendered single-page application data with automated infinite scroll, custom wait-for-selector guards, and CAPTCHA evasion.",
        "icon": "Globe",
        "gradient": "from-cyan-600 to-teal-600",
        "tags": ["scraping", "playwright", "puppeteer", "stealth", "automation"],
        "difficulty": "Advanced",
        "author": "Web Automation Guild",
        "popular": True
    },
    {
        "id": "scraping-cheerio-fast-stream",
        "title": "Cheerio & Streaming HTML Extractor",
        "command": "skill:scraping-cheerio",
        "platform": "universal",
        "category": "Scraping",
        "type": "Data Extraction",
        "summary": "Ultra-fast, low-memory server-side DOM parsing and structured microdata (JSON-LD / OpenGraph) extraction.",
        "description": "Parses megabytes of raw HTML in single-digit milliseconds. Extracts product schemas, canonical URLs, meta tags, and tabular data using jQuery-like CSS selectors without spawning browser instances.",
        "syntax": "const $ = cheerio.load(htmlChunk); const data = $('script[type=\"application/ld+json\"]').text();",
        "arguments": ["selector", "extract-json-ld", "strip-scripts"],
        "example": "Download and extract structured product details, price variants, and high-res image URLs from 500 static e-commerce pages in 2 seconds.",
        "icon": "FileCode2",
        "gradient": "from-amber-500 to-orange-600",
        "tags": ["scraping", "cheerio", "html-parser", "fast-extract", "json-ld"],
        "difficulty": "Intermediate",
        "author": "Cheerio.js Community",
        "popular": False
    },

    # --- VIDEO & MULTIMEDIA ---
    {
        "id": "video-ffmpeg-matrix-pro",
        "title": "FFmpeg Transcoder & Complex Filter Matrix",
        "command": "skill:video-ffmpeg-pro",
        "platform": "universal",
        "category": "Video",
        "type": "Media Processing",
        "summary": "Mastery of FFmpeg CLI filtergraphs, H.264/H.265/AV1 two-pass compression, audio normalization (EBU R128), and video concatenation.",
        "description": "Constructs advanced video rendering pipelines. Programmatically generates subtitles, dynamic overlays, split-screen layouts, frame rate conversions, and lossless video slicing.",
        "syntax": "ffmpeg -i input.mp4 -filter_complex '[0:v]scale=1920:1080,fps=60[v];[0:a]loudnorm=I=-16:TP=-1.5[a]' -map '[v]' -map '[a]' -c:v libx264 -crf 18 output.mp4",
        "arguments": ["-filter_complex", "-c:v", "-crf", "-preset", "-loudnorm"],
        "example": "Combine a video stream with custom background music, auto-ducking during voiceovers, and burned-in animated subtitles using a single FFmpeg filtergraph.",
        "icon": "Video",
        "gradient": "from-purple-600 to-pink-600",
        "tags": ["video", "ffmpeg", "transcoding", "multimedia", "filtergraph"],
        "difficulty": "Advanced",
        "author": "FFmpeg Engineering",
        "popular": True
    },
    {
        "id": "video-generative-ai-director",
        "title": "Generative AI Video Director (Sora / Runway / Kling)",
        "command": "skill:video-ai-director",
        "platform": "universal",
        "category": "Video",
        "type": "Prompt Engineering",
        "summary": "Cinematic text-to-video prompt architecture for Runway Gen-3, OpenAI Sora, Kling 1.5, and Google Veo 2.",
        "description": "Constructs structured cinematic prompts specifying camera focal length (35mm / 85mm), lighting (golden hour / cyberpunk neon / volumetric fog), camera movement vectors, and physics consistency.",
        "syntax": "[Subject Description] + [Camera Motion] + [Lighting & Style] + [Resolution & Frame Details]",
        "arguments": ["--camera-motion", "--lens", "--lighting", "--aspect-ratio"],
        "example": "Generate a 5-second cinematic trailer prompt with macro lens tracking, anamorphic lens flares, and hyper-detailed cybernetic particle effects.",
        "icon": "Clapperboard",
        "gradient": "from-rose-500 to-red-600",
        "tags": ["video", "generative-ai", "sora", "runway", "kling", "prompt-engineering"],
        "difficulty": "Intermediate",
        "author": "AI Cinematography Guild",
        "popular": True
    },

    # --- IMAGE & GRAPHICS ---
    {
        "id": "image-flux-prompt-sculptor",
        "title": "Midjourney & Flux.1 Prompt Sculptor",
        "command": "skill:image-flux-sculptor",
        "platform": "universal",
        "category": "Image",
        "type": "Generative AI",
        "summary": "High-fidelity text-to-image prompt engineering with parameter tuning (--ar, --stylize, LoRA weights, negative prompts).",
        "description": "Creates breathtaking photorealistic and vector digital art prompts. Balances compositional weight, texture detail, color harmony, and typographic legibility inside generative image models.",
        "syntax": "[Core Subject] --style [Photorealistic/Cyberpunk] --lighting [Rim Lighting/Chiaroscuro] --ar 16:9 --v 6.1",
        "arguments": ["--ar", "--stylize", "--chaos", "--v", "--no"],
        "example": "Sculpt a prompt for a high-end luxury dark-mode web landing page hero graphic with floating holographic glass cards and volumetric cyan lighting.",
        "icon": "Image",
        "gradient": "from-pink-500 to-rose-500",
        "tags": ["image", "midjourney", "flux", "generative-ai", "prompting"],
        "difficulty": "Beginner",
        "author": "Prompt Design Studio",
        "popular": True
    },
    {
        "id": "image-sharp-optimizer-pro",
        "title": "Sharp High-Speed Image Engine (WebP / AVIF)",
        "command": "skill:image-sharp-pro",
        "platform": "universal",
        "category": "Image",
        "type": "Image Processing",
        "summary": "High-performance Node.js image transformation, responsive srcset generation, metadata stripping, and lossless AVIF encoding.",
        "description": "Processes thousands of images per minute with native libvips C bindings. Automatically resizes, crops with smart entropy detection, strips EXIF privacy data, and compresses to modern AVIF/WebP formats.",
        "syntax": "await sharp(buffer).resize(1200, 630, { fit: 'cover' }).avif({ quality: 80 }).toFile('output.avif');",
        "arguments": ["resize", "avif", "webp", "metadata", "composite"],
        "example": "Generate responsive multi-resolution WebP and AVIF assets (320w, 640w, 1280w) from raw user upload images on the fly.",
        "icon": "FileImage",
        "gradient": "from-green-500 to-emerald-600",
        "tags": ["image", "sharp", "webp", "avif", "optimization", "performance"],
        "difficulty": "Intermediate",
        "author": "Lovell Fuller / Sharp",
        "popular": False
    },

    # --- LOGO & BRANDING ---
    {
        "id": "logo-minimalist-vector-master",
        "title": "Minimalist Tech Vector Logo Generator",
        "command": "skill:logo-vector-master",
        "platform": "universal",
        "category": "Logo & Branding",
        "type": "Brand Design",
        "summary": "Vector logo geometry generator based on golden ratio proportions, negative space harmony, and multi-scale legibility.",
        "description": "Designs modern, memorable tech brand marks. Produces clean SVG code, defines strict monochrome fallbacks, minimum sizing limits (16px favicon to billboard), and dark/light adaptive versions.",
        "syntax": "/logo-gen --name='KortexDeck' --style='minimal-geometric' --format=svg",
        "arguments": ["--name", "--style", "--palette", "--glyph"],
        "example": "/logo-gen Create a sleek, geometric hexagonal logo for an AI developer platform with electric cyan and neon violet gradient accents in pure SVG.",
        "icon": "Hexagon",
        "gradient": "from-cyan-400 to-blue-600",
        "tags": ["logo", "branding", "vector", "svg", "design-system", "iconography"],
        "difficulty": "Intermediate",
        "author": "Vector Branding Lab",
        "popular": True
    },
    {
        "id": "logo-app-icon-matrix",
        "title": "Favicon & App Icon Multi-Format Generator",
        "command": "skill:logo-app-icon-matrix",
        "platform": "universal",
        "category": "Logo & Branding",
        "type": "Asset Generation",
        "summary": "Automated generation of web manifest icons, Apple touch icons (180x180), Android adaptive icons, and multi-resolution .ico files.",
        "description": "Transforms a single source SVG into a complete web and mobile icon asset package. Generates site.webmanifest, browserconfig.xml, and HTML link tags with pixel-perfect rounding.",
        "syntax": "/icon-matrix generate --source=logo.svg --output=public/",
        "arguments": ["--source", "--output", "--maskable", "--theme-color"],
        "example": "Generate all standard icon sizes (16x16, 32x32, 180x180, 192x192, 512x512) and update index.html meta tags automatically.",
        "icon": "Smartphone",
        "gradient": "from-violet-500 to-indigo-600",
        "tags": ["logo", "favicon", "app-icon", "pwa", "branding"],
        "difficulty": "Beginner",
        "author": "Web Standards Group",
        "popular": False
    },

    # --- NAMEDOMAIN & BRANDING ---
    {
        "id": "namedomain-saas-brand-namer",
        "title": "AI SaaS Brand Namer & Phonetic Coining",
        "command": "skill:namedomain-brand-namer",
        "platform": "universal",
        "category": "Name & Domain",
        "type": "Naming & Brand Strategy",
        "summary": "Creative algorithm generating punchy, memorable tech brand names, portmanteaus, phonetic rhymes, and verb-ready product titles.",
        "description": "Generates brandable company and product names tailored to tech sectors. Evaluates pronounceability across international languages, memorability score, and syllable cadence.",
        "syntax": "/name-brand --sector='AI Developer Tools' --vibe='futuristic, crisp' --syllables=2",
        "arguments": ["--sector", "--vibe", "--syllables", "--keywords"],
        "example": "/name-brand Generate 10 crisp, two-syllable brand names for an autonomous AI command center with available .dev / .ai / .com extensions.",
        "icon": "Tag",
        "gradient": "from-amber-400 to-orange-500",
        "tags": ["domain", "branding", "naming", "saas", "marketing"],
        "difficulty": "Beginner",
        "author": "Brand Strategy Lab",
        "popular": True
    },
    {
        "id": "namedomain-whois-dns-auditor",
        "title": "WHOIS, DNS & Email Security Record Auditor",
        "command": "skill:namedomain-dns-auditor",
        "platform": "universal",
        "category": "Name & Domain",
        "type": "Infrastructure Audit",
        "summary": "Comprehensive DNS configuration verification: A/AAAA, CNAME, MX, SPF, DKIM, DMARC, and CAA SSL records.",
        "description": "Inspects domain DNS propagation and email security posture. Detects subdomain takeover vulnerabilities, dangling CNAMEs, missing SPF/DMARC policies, and DNSSEC validation errors.",
        "syntax": "/dns-audit check --domain=example.com --email-sec --takeover-scan",
        "arguments": ["--domain", "--email-sec", "--nameservers", "--dnssec"],
        "example": "Audit the DNS records for cohenwebstudio.com, verifying valid SPF, DKIM, and DMARC enforcement policies and fast TTL propagation.",
        "icon": "Server",
        "gradient": "from-blue-600 to-indigo-700",
        "tags": ["domain", "dns", "whois", "security", "dmarc", "spf"],
        "difficulty": "Intermediate",
        "author": "DNS & Network Security Guild",
        "popular": False
    }
]

# 3. Merge new specialized skills (update if exists, append if new)
existing_ids = {s['id']: i for i, s in enumerate(existing_skills)}
added_count = 0
updated_count = 0

for n_skill in new_specialized_skills:
    if n_skill['id'] in existing_ids:
        idx = existing_ids[n_skill['id']]
        existing_skills[idx] = n_skill
        updated_count += 1
    else:
        existing_skills.insert(0, n_skill) # Add at top
        added_count += 1

print(f"Merged specialized skills: {added_count} added, {updated_count} updated. Total skills now: {len(existing_skills)}")

# Save updated commandsData.json
with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(existing_skills, f, indent=2, ensure_ascii=False)

# 4. Regenerate all 500+ individual SKILL.md files and the master ZIP archive
catalog_dir = '/Users/ilan/.gemini/antigravity/scratch/skills_catalog'
if os.path.exists(catalog_dir):
    shutil.rmtree(catalog_dir)
os.makedirs(catalog_dir, exist_ok=True)

index_md = [
    "# 🧠 KortexDeck 500+ Curated SKILL.md Master Index",
    f"**Total Registered Skills**: {len(existing_skills)}",
    "",
    "| ID | Title | Platform | Category | Type | Command |",
    "|---|---|---|---|---|---|"
]

for s in existing_skills:
    s_id = s.get('id', 'skill')
    s_id = re.sub(r'[^a-zA-Z0-9_-]', '_', s_id).lower()
    
    skill_folder = os.path.join(catalog_dir, s_id)
    os.makedirs(skill_folder, exist_ok=True)
    skill_file = os.path.join(skill_folder, 'SKILL.md')
    
    title = s.get('title', 'Skill')
    command = s.get('command', '')
    platform = s.get('platform', 'universal')
    category = s.get('category', 'General')
    type_name = s.get('type', 'Autonomous Rule')
    summary = s.get('summary', '').replace('\n', ' ')
    desc = s.get('description', summary)
    example = s.get('example', '')
    tags = ', '.join([f'"{t}"' for t in s.get('tags', [])])
    syntax = s.get('syntax', command)
    difficulty = s.get('difficulty', 'Advanced')
    
    content = f"""---
name: {s_id}
description: "{summary}"
category: "{category}"
platform: "{platform}"
type: "{type_name}"
difficulty: "{difficulty}"
tags: [{tags}]
---

# {title}

> **Platform**: `{platform.upper()}` | **Category**: `{category}` | **Type**: `{type_name}` | **Difficulty**: `{difficulty}`

## 1. Executive Summary & Purpose
{desc}

## 2. Activation Syntax & Command Line
```bash
{syntax}
```

## 3. Core Behavioral Directives & Execution Protocol
1. **Context Initialization**: Prioritize zero-latency client-side execution, defensive boundaries, and strict type safety.
2. **Autonomous Execution**: When triggered via `{command}`, execute all sub-tasks systematically until complete verification.
3. **Safety & Privacy**: Sanitize all inputs. Never log or transmit authentication credentials, private tokens, or sensitive user environment data.
4. **Error Handling**: Gracefully recover from network or parsing anomalies with actionable diagnostic logs.

## 4. Practical Implementation Example
```markdown
{example}
```

## 5. Multi-Platform Agent Compatibility Matrix
- **Google Antigravity**: Native support via `/goal`, `/schedule`, and rule sidecars.
- **Anthropic Claude Code**: Integrated into `CLAUDE.md` and XML system prompt blocks.
- **Cursor IDE**: Direct compilation into `.cursorrules` and semantic index queries.
- **Windsurf / Codex / Cline / Roo Code**: Universal MCP and system prompt compatible.
"""
    with open(skill_file, 'w', encoding='utf-8') as sf:
        sf.write(content)
        
    index_md.append(f"| `{s_id}` | **{title}** | `{platform}` | {category} | `{type_name}` | `{command}` |")

# Write Index README
with open(os.path.join(catalog_dir, 'README.md'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(index_md))

# Create updated ZIP archive
zip_path = os.path.join(catalog_dir, 'kortexdeck_500_skills.zip')
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(catalog_dir):
        for file in files:
            if file != 'kortexdeck_500_skills.zip':
                abs_f = os.path.join(root, file)
                rel_f = os.path.relpath(abs_f, catalog_dir)
                zipf.write(abs_f, rel_f)

# Copy to web public directory
web_public_zip = '/Users/ilan/.gemini/antigravity/scratch/omnicommand-hub/public/kortexdeck_500_skills.zip'
shutil.copyfile(zip_path, web_public_zip)

print(f"Catalog rebuilt with {len(existing_skills)} skills!")
print(f"Zip created: {zip_path} ({os.path.getsize(zip_path)} bytes)")
