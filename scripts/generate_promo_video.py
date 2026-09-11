import os, sys, math, subprocess
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1920, 1080
FPS = 30
DURATION = 28
TOTAL_FRAMES = FPS * DURATION

FFMPEG_PATH = "/Users/ilan/.local/bin/ffmpeg"
OUTPUT_MP4 = os.path.abspath("public/videos/kortexdeck_promo.mp4")

# Load Fonts
def get_font(size, bold=False):
    font_paths = [
        "/System/Library/Fonts/SFNSMono.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf"
    ]
    for p in font_paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

font_title = get_font(64, bold=True)
font_subtitle = get_font(32)
font_body = get_font(24)
font_mono = get_font(22)
font_badge = get_font(18)
font_large = get_font(84, bold=True)

print("Starting video generation pipeline...")

# ffmpeg process with pipe input
ffmpeg_cmd = [
    FFMPEG_PATH,
    "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "rgb24",
    "-r", str(FPS),
    "-i", "-",  # Video from stdin
    # Synthwave Audio Soundtrack input
    "-f", "lavfi",
    "-i", "aevalsrc=sin(2*PI*55*t)*(1-0.8*abs(sin(2*PI*2*t)))*0.35+sin(2*PI*110*t+sin(2*PI*440*t))*0.12+sin(2*PI*(220+sin(2*PI*0.5*t)*40)*t)*0.1+sin(2*PI*880*t)*0.06:s=44100:d=28",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "19",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    OUTPUT_MP4
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / FPS
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(7, 10, 18))
    draw = ImageDraw.Draw(img)

    # 1. Background Cyber Grid
    grid_size = 60
    grid_offset = int((t * 20) % grid_size)
    for x in range(0, WIDTH, grid_size):
        draw.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42), width=1)
    for y in range(grid_offset, HEIGHT, grid_size):
        draw.line([(0, y), (WIDTH, y)], fill=(15, 23, 42), width=1)

    # Ambient Top Scanning Light Beam
    scan_y = int((t * 120) % HEIGHT)
    draw.line([(0, scan_y), (WIDTH, scan_y)], fill=(6, 182, 212), width=2)

    # Top Brand Header
    draw.text((80, 50), "KORTEXDECK v2.5 PRO", fill=(6, 182, 212), font=font_badge)
    draw.text((WIDTH - 380, 50), "COHEN WEB STUDIO", fill=(245, 158, 11), font=font_badge)
    draw.line([(80, 78), (WIDTH - 80, 78)], fill=(30, 41, 59), width=1)

    # SCENE 1: (0.0s - 5.5s) - HERO REVEAL
    if t < 5.5:
        pulse = math.sin(t * 4) * 10
        center_x, center_y = WIDTH // 2, HEIGHT // 2 - 40
        draw.ellipse([center_x - 120 - pulse, center_y - 120 - pulse, center_x + 120 + pulse, center_y + 120 + pulse], outline=(6, 182, 212), width=4)
        draw.ellipse([center_x - 90, center_y - 90, center_x + 90, center_y + 90], outline=(245, 158, 11), width=3)
        draw.text((center_x - 28, center_y - 45), "⚡", fill=(255, 255, 255), font=font_large)

        draw.text((center_x - 240, center_y + 160), "KORTEXDECK", fill=(255, 255, 255), font=font_large)
        draw.text((center_x - 380, center_y + 260), "THE NEURAL COMMAND STATION FOR AI AGENTS", fill=(6, 182, 212), font=font_subtitle)
        draw.text((center_x - 420, center_y + 320), "500 Curated Skills • Google Antigravity • Claude • Cursor • Codex • MCP", fill=(148, 163, 184), font=font_body)

    # SCENE 2: (5.5s - 11.5s) - 500 AI TOOLS SHOWCASE
    elif t < 11.5:
        st = t - 5.5
        draw.text((80, 120), "⚡ 500 CURATED SKILLS & MCP DIRECTIVES", fill=(255, 255, 255), font=font_title)
        draw.text((80, 195), "Instant client-side fuzzy search (< 1ms latency) with zero external API dependencies.", fill=(148, 163, 184), font=font_body)

        cards = [
            {"title": "Google Antigravity SDK", "cmd": "/goal & /schedule", "desc": "Autonomous persistent agent task execution and background cron.", "color": (6, 182, 212)},
            {"title": "Anthropic Claude 3.7", "cmd": "/review & /compact", "desc": "Structural XML prompting, token optimization & thinking mode.", "color": (245, 158, 11)},
            {"title": "Cursor IDE Composer", "cmd": "@codebase & .cursorrules", "desc": "Strict TypeScript, OWASP security and semantic vector lookup.", "color": (16, 185, 129)},
            {"title": "MCP Server Ecosystem", "cmd": "mcp://postgres & mcp://docker", "desc": "Universal model context protocol with 100+ native connectors.", "color": (168, 85, 247)}
        ]

        for i, card in enumerate(cards):
            card_y = 260 + i * 160
            slide = min(1.0, max(0.0, (st - i * 0.2) * 3))
            card_x = int(80 + (1.0 - slide) * 300)
            draw.rectangle([card_x, card_y, card_x + 1760, card_y + 130], fill=(15, 23, 42), outline=card["color"], width=2)
            draw.text((card_x + 30, card_y + 25), card["title"], fill=card["color"], font=font_subtitle)
            draw.text((card_x + 30, card_y + 75), card["cmd"], fill=(255, 255, 255), font=font_mono)
            draw.text((card_x + 600, card_y + 75), card["desc"], fill=(148, 163, 184), font=font_body)

    # SCENE 3: (11.5s - 17.5s) - MULTI-PLATFORM NEURAL ROUTER
    elif t < 17.5:
        st = t - 11.5
        draw.text((80, 120), "🔄 MULTI-PLATFORM NEURAL SIGNAL ROUTER", fill=(255, 255, 255), font=font_title)
        draw.text((80, 195), "Simultaneous real-time configuration convergence across 4 major AI reasoning runtimes.", fill=(148, 163, 184), font=font_body)

        hub_x, hub_y = 350, 560
        draw.rectangle([hub_x - 180, hub_y - 120, hub_x + 180, hub_y + 120], fill=(15, 23, 42), outline=(6, 182, 212), width=3)
        draw.text((hub_x - 120, hub_y - 60), "⚡ KORTEXDECK", fill=(255, 255, 255), font=font_subtitle)
        draw.text((hub_x - 140, hub_y + 10), "500 DIRECTIVES CORE", fill=(6, 182, 212), font=font_mono)

        endpoints = [
            {"name": "Google Antigravity 2.0", "target": "~/.gemini/antigravity/rules", "color": (6, 182, 212), "y": 340},
            {"name": "Anthropic Claude Code", "target": "~/.claude/CLAUDE.md", "color": (245, 158, 11), "y": 480},
            {"name": "Cursor IDE Composer", "target": "~/.cursorrules", "color": (16, 185, 129), "y": 620},
            {"name": "OpenAI Codex & Copilot", "target": "system_prompt.json", "color": (168, 85, 247), "y": 760},
        ]

        for ep in endpoints:
            ey = ep["y"]
            draw.line([(hub_x + 180, hub_y), (1100, ey + 40)], fill=ep["color"], width=3)
            pulse_progress = (st * 1.5 + (ey % 100) / 100.0) % 1.0
            px = int((hub_x + 180) + pulse_progress * (1100 - (hub_x + 180)))
            py = int(hub_y + pulse_progress * (ey + 40 - hub_y))
            draw.ellipse([px - 8, py - 8, px + 8, py + 8], fill=(255, 255, 255))

            draw.rectangle([1100, ey, 1760, ey + 90], fill=(15, 23, 42), outline=ep["color"], width=2)
            draw.text((1130, ey + 15), ep["name"], fill=ep["color"], font=font_subtitle)
            draw.text((1130, ey + 52), ep["target"], fill=(148, 163, 184), font=font_mono)

    # SCENE 4: (17.5s - 23.0s) - 1-CLICK TERMINAL SYNC
    elif t < 23.0:
        st = t - 17.5
        draw.text((80, 120), "⚡ 1-CLICK LOCAL SYNCHRONIZATION", fill=(255, 255, 255), font=font_title)
        draw.text((80, 195), "Automated safety backups (.bak) generated before instant directive injection.", fill=(148, 163, 184), font=font_body)

        term_x, term_y = 120, 280
        draw.rectangle([term_x, term_y, term_x + 1680, term_y + 540], fill=(11, 16, 29), outline=(30, 41, 59), width=2)
        draw.rectangle([term_x, term_y, term_x + 1680, term_y + 50], fill=(15, 23, 42))
        draw.ellipse([term_x + 20, term_y + 18, term_x + 34, term_y + 32], fill=(239, 68, 68))
        draw.ellipse([term_x + 44, term_y + 18, term_x + 58, term_y + 32], fill=(245, 158, 11))
        draw.ellipse([term_x + 68, term_y + 18, term_x + 82, term_y + 32], fill=(16, 185, 129))
        draw.text((term_x + 120, term_y + 16), "kortexdeck-cli — zsh (80x24)", fill=(100, 116, 139), font=font_badge)

        lines = [
            ("➜ kortexdeck sync --dest ~/.cursorrules ~/.claude/CLAUDE.md", (56, 189, 248), 0.2),
            ("[1/4] Verifying destination directories: ~/.claude and ~/.cursorrules...", (148, 163, 184), 0.8),
            ("[2/4] Safety backup created: ~/.cursorrules.bak_20260911_152500", (245, 158, 11), 1.6),
            ("[3/4] Injected 500 AI directives into target configurations [0.8ms]", (16, 185, 129), 2.4),
            ("✨ Your Cursor IDE and Claude Code environments are now synchronized!", (34, 211, 238), 3.2),
            ("➜ Ready for next prompt.", (56, 189, 248), 3.8)
        ]

        for j, (ltext, lcol, trigger_t) in enumerate(lines):
            if st >= trigger_t:
                draw.text((term_x + 40, term_y + 80 + j * 65), ltext, fill=lcol, font=font_mono)

    # SCENE 5: (23.0s - 28.0s) - GRAND OUTRO
    else:
        st = t - 23.0
        center_x, center_y = WIDTH // 2, HEIGHT // 2 - 30
        draw.ellipse([center_x - 140, center_y - 140, center_x + 140, center_y + 140], outline=(6, 182, 212), width=4)
        draw.text((center_x - 30, center_y - 50), "⚡", fill=(255, 255, 255), font=font_large)

        draw.text((center_x - 260, center_y + 170), "KORTEXDECK", fill=(255, 255, 255), font=font_large)
        draw.text((center_x - 340, center_y + 260), "https://cohenwebstudio.com/kortexdeck", fill=(34, 211, 238), font=font_title)
        draw.text((center_x - 290, center_y + 340), "GitHub: github.com/blackkillers/kortexdeck", fill=(148, 163, 184), font=font_subtitle)
        draw.text((center_x - 240, center_y + 400), "Designed & Developed by Cohen Web Studio", fill=(245, 158, 11), font=font_body)

    proc.stdin.write(img.tobytes())

proc.stdin.close()
proc.wait()

print("Video generation finished successfully!")
