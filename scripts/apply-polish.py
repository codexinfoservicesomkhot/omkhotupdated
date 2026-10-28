"""
Replaces the f / t / q (and optionally m) lines of entries in src/data/content/*.js
with polished data from scripts/polish/*.json. Run once; idempotent.
"""
import json, glob, re, os
root = os.path.join(os.path.dirname(__file__), "..", "src", "data", "content")
polish = {}
for p in sorted(glob.glob(os.path.join(os.path.dirname(__file__), "polish", "*.json"))):
    polish.update(json.load(open(p)))
files = {f: open(f).read().split("\n") for f in glob.glob(os.path.join(root, "*.js"))}
done = set()
for path, lines in files.items():
    out, cur = [], None
    for line in lines:
        m = re.match(r'^  "?([a-z0-9-]+)"?: \{$', line)
        if m: cur = m.group(1)
        k = re.match(r'^    (f|t|q|m): \[', line)
        if cur in polish and k and k.group(1) in polish[cur]:
            out.append("    %s: %s," % (k.group(1), json.dumps(polish[cur][k.group(1)], ensure_ascii=False)))
            done.add((cur, k.group(1)))
        else:
            out.append(line)
    open(path, "w").write("\n".join(out))
missing = [(i, k) for i, v in polish.items() for k in v if (i, k) not in done]
print("polished entries:", len(polish), "| unmatched:", missing)
