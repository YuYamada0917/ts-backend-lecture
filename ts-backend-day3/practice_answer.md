## 練習課題 4 ―― 解答コードと詳解

> **課題のおさらい**
>
> 1. `GET /users/:id` で存在しない ID は **404** を返す。
> 2. `POST /users` で受け取った JSON（`{ name }`）を保存し、新しい **ID** を振って返す。
> 3. **テストデータ** を JSON ファイルに永続化し、直後の `GET` で取得できることを確認。

---

### 1. 追加パッケージは不要

標準モジュール **`fs`** だけでファイル I/O ができます。外部ライブラリは使いません。

```bash
# 追加インストールはなし
```

---

### 2. app.ts ─ 完成例

```ts
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

const app  = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

/* ------- メモリ上のキャッシュ ------- */
let users = loadUsers();

/* -------- GET /users/:id -------- */
app.get('/users/:id', (req: Request, res: Response) => {
  const id   = Number(req.params.id);
  const user = users.find(u => u.id === id);

  return user
    ? res.json(user)
    : res.status(404).json({ detail: 'User not found' });
});

/* -------- POST /users -------- */
app.post('/users', (req: Request, res: Response) => {
  const { name } = req.body as { name: unknown };

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(422).json({ detail: 'name must be a non-empty string' });
  }

  const id      = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, name: name.trim() };

  users = [...users, newUser];   // イミュータブル更新でバグを減らす
  saveUsers(users);              // ディスクへ永続化

  res.status(201).json(newUser);
});

/* -------- サーバー起動 -------- */
app.listen(port, () => console.log(`API up at http://localhost:${port}`));
```

#### 主要ポイント

| 行                                 | 目的                                 | FastAPI との対比                         |
| --------------------------------- | ---------------------------------- | ------------------------------------ |
| **`loadUsers()`/`saveUsers()`**   | 同期 I/O をラップ                        | Python で言う `json.load` / `json.dump` |
| **`existsSync()`**                | 初回起動時にシードデータを書き出す                  | Alembic の seed 処理に近い                 |
| **バリデーション**                       | `typeof name !== 'string'` で簡易チェック | FastAPI なら pydantic が自動で 422 を返す部分   |
| **`users = [...users, newUser]`** | *push* ではなく新配列を代入して意図しない参照を防ぐ      | Python でリストの copy を作るイメージ            |

> 🚩 **同期 I/O で良い？**
>
> * 学習用＆小規模なら OK。
> * 本番では `fs/promises` + `await` か、そもそも DB（SQLite, PostgreSQL など）を使いましょう。

---

### 3. 動作確認シナリオ

```bash
# ① 新規ユーザーを追加
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Carol"}' \
     http://localhost:3000/users
# → {"id":3,"name":"Carol"}

# ② すぐに取得
curl http://localhost:3000/users/3
# → {"id":3,"name":"Carol"}

# ③ サーバー再起動後もデータが残る
npm run dev
curl http://localhost:3000/users/3
# → {"id":3,"name":"Carol"}
```

ファイル `users.json` を開くと次のように保存されています。

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob"   },
  { "id": 3, "name": "Carol" }
]
```

---

### 4. よくある質問

| 質問                             | 回答                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **非同期で書くには？**                  | `import { promises as fs } from 'fs'` → `await fs.readFile()` / `fs.writeFile()` を使います。`app.post` 内部を `async` に。 |
| **同時 POST が走ったら ID が衝突しませんか？** | その通り。同期 I/O + 単一プロセス前提なので、実運用は DB の *auto increment* を利用してください。                                                  |
| **JSON が壊れたらどうなる？**            | try–catch で `JSON.parse` を包み、壊れていたらバックアップを取って初期化するなどのガードが必要です。                                                   |

---

### 5. 仕上げ課題（伸びしろ）

1. `fs/promises` で完全非同期化し、`async/await` に書き直す
2. Zod や class-validator を使って **自動バリデーション** を導入
3. Jest + Supertest で **自動テスト** を 3 本書く (`200`, `404`, `422`)
4. users.json のパスを `.env` で外出しにし、**環境ごとに切り替え**

これらを行うと「メモリ → ファイル → DB」へ移行しやすい堅牢な設計になります。

---

#### まとめ

* **ファイル永続化** は「読み込み → メモリ編集 → 書き戻し」の 3 ステップ。
* 状態を Map/配列で保持しつつ、**ID 採番** と **HTTP ステータス** を正しく返すところが学習の核心です。
* 同期版でまず動かし、後で非同期／DB へリファクタリングするのが学びやすいルートになります。