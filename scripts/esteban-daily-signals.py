import os
import sys
import json
import logging
from datetime import datetime
import subprocess

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

OUTPUT_FILE = os.path.expanduser("~/.local/share/esteban-media/daily-blog-brief.json")
REPORT_FILE = os.path.expanduser("~/obsidian-wiki/client-esteban-media/wiki/esteban-signals-daily.md")

def gather_signals():
    signals = {
        "date": datetime.now().isoformat(),
        "sources": {},
        "target_keywords": [],
    }
    
    # Placeholders for GSC + GA4 signals for estebanmedia.com
    signals["sources"]["gsc"] = "needs API access"
    signals["sources"]["ga4"] = "needs API access"
    
    # Determine the topic
    topic = "The Future of Digital Media Production"
    signals["topic"] = topic
    
    # Output brief
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(signals, f, indent=2)
        
    logging.info(f"Daily signals generated and saved to {OUTPUT_FILE}")
    
    # Dual attestation analysis
    os.makedirs(os.path.dirname(REPORT_FILE), exist_ok=True)
    
    models = ["google/gemini-2.0-flash-001:free", "meta-llama/llama-3.2-3b-instruct:free"]
    analyses = []
    
    failures = []
    for model in models:
        tmp_spec = f"/tmp/esteban-signals-spec-{model.replace('/', '-')}.md"
        with open(tmp_spec, 'w') as f:
            f.write(f"Analyze these signals for estebanmedia.com and propose 3 content themes:\\n{json.dumps(signals, indent=2)}")
            
        bash_cmd = f'''
        ~/.claude/durable/cto-dispatch.sh \\
            --lead cto-dev-lead \\
            --verifier cto-qa-lead \\
            --project esteban-media \\
            --cwd ~/code/esteban-media \\
            --intent "Analyze daily signals with {model}" \\
            --evidence "cat {OUTPUT_FILE}::signals" \\
            --acceptance "Valid analysis generated" \\
            --provider free \\
            --openrouter-model {model} \\
            --spec {tmp_spec}
        '''
        
        logging.info(f"Running CTO dispatch for analysis with {model}")
        result = subprocess.run(["bash", "-c", bash_cmd], capture_output=True, text=True)
        if result.returncode == 0:
            # Strip cto-dispatch gate banners so they do not land in the report
            # as if they were analysis.
            body = "\n".join(
                l for l in result.stdout.splitlines()
                if not l.startswith(("CTO-GATE", "CTO-FAILOVER", "CTO record", "CTO-GATE-ENFORCED"))
            ).strip()
            if body:
                analyses.append((model, body))
            else:
                logging.error("%s returned no usable content after stripping gate output", model)
                failures.append(model)
        else:
            # Record the failure; do NOT write the stderr into the report as if
            # it were analysis, and do not let the script exit 0 afterwards.
            logging.error("CTO dispatch failed for %s (rc=%s): %s", model,
                          result.returncode, (result.stderr or "")[-400:])
            failures.append(model)
            
    with open(REPORT_FILE, 'w') as f:
        f.write(f"# Daily Signals Analysis for estebanmedia.com ({datetime.now().strftime('%Y-%m-%d')})\\n\\n")
        for model, analysis in analyses:
            f.write(f"## Analysis by {model}\\n\\n{analysis}\\n\\n---\\n\\n")
            
    logging.info(f"Analysis saved to {REPORT_FILE}")

    if not analyses:
        logging.error("every model failed (%s) — nothing usable was produced", ", ".join(failures))
        return 1
    if failures:
        logging.warning("partial run: %d of %d models failed (%s)",
                        len(failures), len(models), ", ".join(failures))
    return 0

if __name__ == "__main__":
    sys.exit(gather_signals() or 0)
