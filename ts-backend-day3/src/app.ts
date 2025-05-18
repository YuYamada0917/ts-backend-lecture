import express, { Request, Response } from 'express';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { User } from './models/user';

const DATA_PATH = join(__dirname, '..', 'users.json');

function loadUsers(): User[] {
    if (!existsSync(DATA_PATH)) {
      // 初回起動時にダミーデータを生成
      writeFileSync(DATA_PATH, JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob'   },
      ], null, 2));
    }
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8')) as User[];
}

function saveUsers(users: User[]): void {
    writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

/* ------- メモリ上のキャッシュ ------- */
let users: User[] = loadUsers();

/* -------- GET /users/:id -------- */
app.get('/users/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    return user
        ? res.json(user)
        : res.status(404).json({ detail: 'User not found' });
});

/* -------- POST /users -------- */
app.post('/users', (req: Request, res: Response) => {
    const { name } = req.body as { name: unknown };

    if (typeof name !== 'string' || !name.trim()) {
        return res.status(422).json({ detail: 'name is required' });
    }

    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id, name: name.trim() };

    users = [...users, newUser]; // イミュータブル更新でバグを減らす
    saveUsers(users); // ディスクへ永続化

    res.status(201).json(newUser);
});

/* -------- サーバー起動 -------- */
app.listen(port, () => console.log(`API up at http://localhost:${port}`));