import os, struct, glob, json

root = '/home/rioovs/project/omah-keboen-web'

def jpeg_size(path):
    with open(path, 'rb') as f:
        d = f.read(300000)
    i = 2
    while i < len(d) - 9:
        if d[i] != 0xFF:
            i += 1
            continue
        m = d[i + 1]
        if m in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            h, w = struct.unpack('>HH', d[i + 5:i + 9])
            return w, h
        if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
            i += 2
            continue
        seglen = struct.unpack('>H', d[i + 2:i + 4])[0]
        i += 2 + seglen
    return 0, 0

files = []
for dirpath, dirnames, filenames in os.walk(root):
    if '.git' in dirpath:
        continue
    for fn in filenames:
        p = os.path.join(dirpath, fn)
        files.append(p)

for p in sorted(files):
    rel = os.path.relpath(p, root)
    size = os.path.getsize(p)
    extra = ''
    if p.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        w, h = jpeg_size(p) if p.lower().endswith(('.jpg', '.jpeg')) else (0, 0)
        extra = f' {w}x{h}'
    print(f'{rel} | {size} bytes{extra}')
