"""build-bundle.py — produce viewer-bundled.html: a single self-contained HTML
that opens cleanly from file:// (incl. on phones) with zero external file
dependencies. Inlines data.js, shlokas.js, concepts.js, and positions.js
into the viewer in place of the <script src="..."> tags.

Run:  python3 build-bundle.py            # public bundle (default)
      python3 build-bundle.py --private  # also inlines local bhat_kn_private.js
                                         # and writes viewer-bundled-private.html

The --private mode is a maintainer-only convenience: it produces a self-contained
HTML with the gitignored Bhat commentary inlined. The output file is itself
gitignored. The public 'viewer-bundled.html' is never touched in --private mode.
"""
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PRIVATE = '--private' in sys.argv[1:]

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

# Handle the optional private script tag. In public mode, strip the tag entirely
# so the bundled file makes no HTTP request to a missing local file. In private
# mode, inline the file's contents.
private_tag = '<script src="bhat_kn_private.js" onerror="window.BHAT_KN_PRIVATE = null;"></script>'
private_path = os.path.join(ROOT, 'bhat_kn_private.js')

if PRIVATE:
    if not os.path.exists(private_path):
        raise SystemExit('--private requested but bhat_kn_private.js not found at ' + private_path)
    if private_tag not in bundle:
        raise SystemExit('could not find private script tag in viewer.html')
    private_src = read('bhat_kn_private.js')
    private_block = ('<script>\n/* === inlined from bhat_kn_private.js (PRIVATE — DO NOT REDISTRIBUTE) === */\n'
                     + private_src + '\n</script>')
    bundle = bundle.replace(private_tag, private_block, 1)
else:
    # Strip the loader tag entirely in public bundles — the public bundle is a
    # single file with no external deps, so a missing local script is meaningless.
    # Replace with an inline no-op that sets the flag to null so render logic
    # short-circuits cleanly.
    public_stub = '<script>window.BHAT_KN_PRIVATE = null;</script>'
    if private_tag in bundle:
        bundle = bundle.replace(private_tag, public_stub, 1)

for src_name in ['data.js', 'shlokas.js', 'concepts.js', 'positions.js']:
    inline = strip_cjs_export(read(src_name))
    bundle = replace_tag(bundle, src_name, inline)

assert '<meta charset="utf-8"' in bundle, 'missing utf-8 charset meta'

out_name = 'viewer-bundled-private.html' if PRIVATE else 'viewer-bundled.html'
out = os.path.join(ROOT, out_name)
with open(out, 'w', encoding='utf-8') as f:
    f.write(bundle)

size = os.path.getsize(out)
tag = ' [PRIVATE]' if PRIVATE else ''
print('wrote ' + out + ' (' + str(size) + ' bytes, ' + ('%.1f' % (size/1024)) + ' KiB)' + tag)
