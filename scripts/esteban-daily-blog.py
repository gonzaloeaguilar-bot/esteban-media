import os
import sys
import json
import logging
from datetime import datetime
import re
import subprocess

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

BRIEF_FILE = os.path.expanduser("~/.local/share/esteban-media/daily-blog-brief.json")
OUTPUT_DIR = os.path.expanduser("~/obsidian-wiki/client-esteban-media/wiki")

def generate_blog():
    if not os.path.exists(BRIEF_FILE):
        # The brief is produced by the daily-signals script. No brief, no blog.
        logging.error(f"Brief file not found: {BRIEF_FILE}")
        return 1
        
    with open(BRIEF_FILE, 'r') as f:
        brief = json.load(f)
        
    topic = brief.get("topic", "Media Production Topic")
    date_str = datetime.now().strftime("%Y-%m-%d")
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')
    if not slug:
        slug = f"blog-post-{int(datetime.now().timestamp())}"
        
    # Format the prompt
    prompt_template = """You are the Lead Content Writer for Esteban Media.
Write a comprehensive, highly-engaging blog post outline and draft ideas based on the daily signals brief.
The content should be professional, insightful, and optimized for SEO.
Include a catchy title, headings, and key points to cover.
"""
        
    full_prompt = f"{prompt_template}\n\nDAILY BRIEF JSON:\n{json.dumps(brief, indent=2)}\n\nGenerate the blog ideas now for topic: {topic}"
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, "esteban-blog-ideas.md")
    
    tmp_spec = f"/tmp/esteban-cto-spec-{slug}.md"
    with open(tmp_spec, 'w') as f:
        f.write(full_prompt)
        
    bash_cmd = f'''
    ~/.claude/durable/cto-dispatch.sh \\
        --lead cto-dev-lead \\
        --verifier cto-qa-lead \\
        --project esteban-media \\
        --cwd ~/code/esteban-media \\
        --intent "Generate daily blog post about {slug}" \\
        --evidence "cat {BRIEF_FILE}::topic is {topic}" \\
        --acceptance "Valid blog ideas generated" \\
        --provider free \\
        --spec {tmp_spec}
    '''
    
    logging.info(f"Running CTO dispatch for topic: {topic}")
    result = subprocess.run(["bash", "-c", bash_cmd], capture_output=True, text=True)
    
    if result.returncode != 0:
        # Do NOT write anything on failure. A previous version logged the error
        # and returned normally, so launchd recorded exit=0 while the job had
        # actually failed -- the loop looked green for days while producing
        # nothing. Fail loudly instead.
        logging.error("CTO dispatch failed (rc=%s): %s", result.returncode,
                      (result.stderr or result.stdout or "")[-800:])
        return 1

    # cto-dispatch prints gate banners on stdout alongside the model output.
    # Writing stdout verbatim put "CTO-GATE:" / "CTO record updated" lines into
    # the wiki as if they were content. Strip them.
    lines = [l for l in result.stdout.splitlines()
             if not l.startswith(("CTO-GATE", "CTO-FAILOVER", "CTO record", "CTO-GATE-ENFORCED"))]
    mdx_content = "\n".join(lines).strip()
    if not mdx_content:
        logging.error("CTO dispatch returned no usable content after stripping gate output")
        return 1

    with open(out_path, 'w') as f:
        f.write(mdx_content + "\n")
    logging.info(f"Generated blog ideas at {out_path}")
    print(out_path)
    return 0

if __name__ == "__main__":
    sys.exit(generate_blog() or 0)
