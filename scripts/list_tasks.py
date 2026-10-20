import sqlite3, os, glob

paths = []
for p in [os.path.expanduser('~/.hermes/kanban.db')] + glob.glob(os.path.expanduser('~/.hermes/kanban/boards/*/kanban.db')):
    if os.path.exists(p):
        paths.append(p)

for p in paths:
    try:
        c = sqlite3.connect(p)
        c.row_factory = sqlite3.Row
        rows = c.execute("select id,assignee,status,title,created_at from tasks order by created_at").fetchall()
    except Exception as e:
        print(p, 'ERR', e)
        continue
    print('=== DB', p, 'tasks:', len(rows))
    for r in rows:
        print(r['id'], '|', r['assignee'], '|', r['status'], '|', r['title'])
