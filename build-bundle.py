"""build-bundle.py — produce viewer-bundled.html: a single self-contained HTML
that opens cleanly from file:// (incl. on phones) with zero external file
dependencies. Inlines data.js, shlokas.js, concepts.js, and positions.js
into the viewer in place of the <script src="..."> tags.

Run:  python3 build-bundle.py
Out:  viewer-bundled.html
"""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(p):
    with open(os.path.join(ROOT, p), 'r', encoding='utf-8') as f:
        return f.read()

viewer = read('viewer.html')

# Strip CJS module.exports tails so the bundled scripts don't reference `module`
# in the browser (harmless, but clean).
def strip_cjs_export(s):
    marker = "if (typeof module !== 'undefined')"
    i = s.rfind(marker)
    return s[:i].rstrip() + '\n' if i != -1 else s

def replace_tag(html, src_name, inline):
    tag = '<script src="' + src_name + '"></script>'
    block = '<script>\n/* === inlined from ' + src_name + ' === */\n' + inline + '\n</script>'
    if tag not in html:
        raise SystemExit('could not find tag in viewer.html: ' + tag)
    return html.replace(tag, block, 1)

bundle = viewer
for src_name in ['data.js', 'shlokas.js', 'concepts.js', 'positions.js']:
    inline = strip_cjs_export(read(src_name))
    bundle = replace_tag(bundle, src_name, inline)

assert '<meta charset="utf-8"' in bundle, 'missing utf-8 charset meta'

out = os.path.join(ROOT, 'viewer-bundled.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(bundle)

size = os.path.getsize(out)
print('wrote ' + out + ' (' + str(size) + ' bytes, ' + ('%.1f' % (size/1024)) + ' KiB)')
