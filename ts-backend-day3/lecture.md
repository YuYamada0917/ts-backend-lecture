### Day 3 授業プラン  
**Node.js + Express で REST API を作ってみよう**

> Python/FastAPI をすでに触ったことがあるあなたが、TypeScript × Express の基本を「似ている点／違う点」を意識しながら１日で体験できるように構成しました。学習時間の目安は 2 時間です。  

---

## 1. 今日の到達目標
1. TypeScript 環境の Node プロジェクトに Express を組み込み、`ts-node` または `ts-node-dev` で即時実行できる。  
2. `GET /`, `GET /hello/:name`, `GET /users/:id`, `POST /users` の４本のエンドポイントを TypeScript で実装し、curl などで疎通確認できる。  
3. FastAPI と Express のアーキテクチャ／開発体験の主な違い（自動ドキュメント、バリデーション、ミドルウェア設計など）を説明できる。  
citeturn0file0  

---

## 2. レクチャー

FastAPI 使いのあなたが **TypeScript × Express** に違和感なく入れるよう、PDF の設計意図を補いながら丁寧に噛み砕きます。

---

### 2-1. プロジェクトセットアップ

| ステップ | コマンド | 目的・ポイント |
|----------|----------|----------------|
| ① プロジェクト生成 | `mkdir ts-express-demo && cd $_`<br>`npm init -y` | `package.json` を作り **npm script** を管理できる状態にする |
| ② ランタイム依存 | `npm i express` | **Express 本体**。ここは prod 依存に入れる |
| ③ Dev 依存 | `npm i -D typescript ts-node-dev @types/express @types/node` | *TypeScript* 本体・ホットリロード用 **ts-node-dev**・型定義パッケージ |
| ④ tsconfig 生成 | `npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --strict` | <ul><li>`rootDir` / `outDir`: **src → dist** へのビルド先分離</li><li>`esModuleInterop`: `import express from 'express'` を有効化</li><li>`strict`: 厳格モードで “Python の mypy 相当”</li></ul> |

> **FastAPI との対比**  
> * `uvicorn --reload` ⇔ `ts-node-dev --respawn --transpile-only src/app.ts` – どちらも**ホットリロード**で快適開発。  
> * Pythony な virtualenv は不要。Node は **per-project** で `node_modules` を抱える。citeturn1file0  

#### フォルダ構成小ネタ
```
ts-express-demo
├── src
│   ├── routes
│   ├── models
│   └── app.ts
├── .env              # 環境変数（dotenv で読み込み）
├── tsconfig.json
└── package.json
```
*バックエンドが大きくなる前に “routes / models / middlewares” で分割しておくと後工程が楽になります。*

---

### 2-2. 最小構成のサーバー

```ts
// src/app.ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

// JSON ボディを自動パース
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
```

* `express()` → **アプリケーションインスタンス**を生成。  
* `express.json()` → `body-parser` の簡易版が標準バンドル。  
* **型付け**：`Request`/`Response` インターフェースで IDE 補完が効く。  
* `listen` に渡すコールバックは **FastAPI の startup イベント**に近い。citeturn1file1  

**npm script 例**
```jsonc
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",
"start": "node dist/app.js"
```
`npm run dev` = TypeScript で実行、`npm run build && npm start` = JavaScript ビルド後に本番実行――という 2 段構えが定番です。

---

### 2-3. ルーティングとレスポンス

#### 1) パスパラメータ
```ts
app.get('/hello/:name', (req: Request, res: Response) => {
  res.json({ message: `Hello, ${req.params.name}` });
});
```
* **FastAPI の `Path`** と同じ概念。  
* Express では自動バリデーションがない → 入力チェックは後述ライブラリで補完。

#### 2) クエリ & ボディ
```ts
app.get('/search', (req: Request, res: Response) => {
  const { q } = req.query;                 // ?q=keyword
  res.send(`query = ${q}`);
});

app.post('/echo', (req: Request, res: Response) => {
  res.json(req.body);                      // JSON をそのまま返す
});
```
* `Request<Params, ResBody, ReqBody, ReqQuery>` の**ジェネリック型**を与えると完全型安全。  

#### 3) レスポンスヘルパ
| メソッド | 用途 | 備考 |
|-----------|------|------|
| `res.send()` | テキスト/HTML/Buffer | コンテンツタイプ自動判定 |
| `res.json()` | JSON レスポンス | FastAPI の `return {"msg": ...}` 相当 |
| `res.status(201)` | ステータスコード変更 | `.json()` 等チェーン可 |

> **自動ドキュメントの差**  
> FastAPI は *Swagger UI / ReDoc* が無料で付属。Express では `swagger-ui-express` や `tsoa` などを追加で組む。学習曲線は上がるが “必要な物だけ足していく” のが Node 流。

---

### 2-4. エンドポイントを増やす（CRUD の種）

```ts
interface User { id: number; name: string; }
const users: Map<number, User> = new Map([
  [1, { id: 1, name: 'Alice' }],
  [2, { id: 2, name: 'Bob' }],
]);

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.get(Number(req.params.id));
  return user
    ? res.json(user)
    : res.status(404).json({ detail: 'User not found' });
});

// POST /users
app.post('/users', (req, res) => {
  const { name } = req.body as { name: string };
  const id = Math.max(...users.keys()) + 1;
  const newUser = { id, name };
  users.set(id, newUser);
  res.status(201).json(newUser);
});
```

* **Map vs 配列**：lookup `O(1)`。サンプル規模ならどちらも可。  
* **HTTP ステータス**：存在しない ID は 404、作成成功は 201。  
* FastAPI の `HTTPException(status_code=404)` に相当するのが **res.status(404).json(...)**。  

#### エラーハンドリングへの布石
```ts
// 末尾に追加
app.use((err: Error, _req: Request, res: Response, _next: unknown) => {
  console.error(err);
  res.status(500).json({ detail: 'Internal Server Error' });
});
```
Express では **4 引数**でエラーミドルウェア。FastAPI で言う「exception handler を追加」イメージ。

---

## 3. ハンズオン（60 分）

| ステップ | やること | 完了の目印 |
|----------|----------|-----------|
| 1 | セットアップコマンドを実行。`ts-node-dev` でサーバー起動 | `Server listening on ...` が表示 |
| 2 | `/hello/:name` を実装 | `curl http://localhost:3000/hello/Taro` が JSON で返る |
| 3 | `/users/:id` と `/users` を実装 | `curl` / Postman で CRUD 動作 |
| 4 | **オプション**: ESLint & Prettier を導入 | 保存時にコードが整形される |

> **ゴール**
> *自分のローカルで TypeScript + Express の API を立ち上げ、4 本のエンドポイントを「書く→走らせる→確かめる」まで一気に体験する*。
> *所要時間* は実作業 40 分 + 調整・質問 20 分 を想定しています。

---

## 3-1. スタートラインをつくる（10 分）

1. **プロジェクトフォルダを用意**

   ```bash
   mkdir ts-express-demo && cd ts-express-demo
   npm init -y       # package.json が出来る
   ```

2. **依存パッケージをインストール**

   ```bash
   # 実行時に必要
   npm i express

   # 開発専用
   npm i -D typescript ts-node-dev @types/express @types/node
   ```

3. **TypeScript 初期化**

   ```bash
   npx tsc --init --rootDir src --outDir dist \
           --esModuleInterop --resolveJsonModule --strict
   ```

   *`src` → `dist` のビルド先分離* と *`strict` で型チェック厳格* がポイント。

4. **フォルダ構造を作成**

   ```bash
   mkdir -p src/routes src/models
   touch src/app.ts
   ```

> ✅ *チェックポイント*
> `package.json`, `tsconfig.json`, `src/app.ts` が存在する。ここまで 5 分程度。

---

## 3-2. 最小サーバーを走らせる（5 分）

`src/app.ts` に以下をコピペして保存 ⌘S/CTRL-S：

```ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());                    // ← JSON ボディを自動パース

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`🚀 Server running: http://localhost:${port}`);
});
```

**npm script を追加**（`package.json` 内 `"scripts"` を編集）：

```jsonc
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}
```

起動してみる：

```bash
npm run dev
```

ブラウザまたはターミナルで

```bash
curl http://localhost:3000/
```

➡ **Hello World!** が返れば成功。

> ✅ *チェックポイント*
> ターミナルに “🚀 Server running …” が表示。Hello World 応答を確認。

---

## 3-3. `/hello/:name` エンドポイントを追加（5 分）

1. `src/app.ts` の `app.get('/', …)` のすぐ下に次を追記↓

   ```ts
   // GET /hello/Taro → {"message":"Hello, Taro"}
   app.get('/hello/:name', (req: Request, res: Response) => {
     const { name } = req.params;
     res.json({ message: `Hello, ${name}` });
   });
   ```

2. 保存すると **ts-node-dev** が自動リロード。
   ターミナルで：

   ```bash
   curl http://localhost:3000/hello/Taro
   ```

   → `{"message":"Hello, Taro"}` が返る。

> **なぜ動く?**
> *Path Parameter* は `:` で宣言され、`req.params.name` で取り出す。FastAPI の `@app.get("/hello/{name}")` と 1-to-1 の概念。

---

## 3-4. 疑似データストアを作り CRUD POC（15 分）

### 3-4-1. ユーザーモデル定義

`src/models/user.ts` を新規作成：

```ts
export interface User {
  id: number;
  name: string;
}
```

### 3-4-2. メモリ上のデータ（Map）を用意

`src/app.ts` のインポート群の下に追加：

```ts
import { User } from './models/user';

const users: Map<number, User> = new Map([
  [1, { id: 1, name: 'Alice' }],
  [2, { id: 2, name: 'Bob' }],
]);
```

### 3-4-3. GET /users/\:id

```ts
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.get(id);
  if (!user)
    return res.status(404).json({ detail: 'User not found' });

  res.json(user);
});
```

### 3-4-4. POST /users

```ts
app.post('/users', (req, res) => {
  const { name } = req.body as { name: string };

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(422).json({ detail: 'name is required' });
  }

  const id = Math.max(...users.keys()) + 1;
  const newUser: User = { id, name };
  users.set(id, newUser);

  res.status(201).json(newUser);
});
```

#### テスト手順

1. **作成**

   ```bash
   curl -X POST -H "Content-Type: application/json" \
        -d '{"name":"Carol"}' \
        http://localhost:3000/users
   ```

   → `{ "id": 3, "name": "Carol" }`

2. **取得**

   ```bash
   curl http://localhost:3000/users/3
   ```

   → `{ "id": 3, "name": "Carol" }`

3. **存在しない ID**

   ```bash
   curl -i http://localhost:3000/users/999
   ```

   → `HTTP/1.1 404 Not Found` & JSON エラーメッセージ

> **Point**
> *Map* を使うと `.get()` は O(1)。一次学習用なので永続化は不要。
> ステータスコード 201 と 404 を正しく返す習慣がテストで役立つ。

---

## 3-5. （オプション）ESLint & Prettier で品質ゲート（10 分）

1. **導入**

   ```bash
   npm i -D eslint prettier eslint-config-prettier eslint-plugin-import \
          @typescript-eslint/parser @typescript-eslint/eslint-plugin
   npx eslint --init
   ```

   *質問プロンプト*:

   * → To check syntax, find problems, and enforce code style
   * → JavaScript modules (import/export)
   * → TypeScript
   * → Node
   * → Yes, use a popular style guide → Airbnb (or your choice)
   * → JSON   (config format)

2. **Prettier 設定**（`prettier.config.cjs`）

   ```js
   module.exports = {
     semi: true,
     singleQuote: true,
     trailingComma: 'all',
     printWidth: 100,
   };
   ```

3. **VS Code 拡張** *ESLint* / *Prettier* を入れ
   `settings.json` に：

   ```jsonc
   "editor.formatOnSave": true,
   "eslint.validate": ["typescript"],
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   }
   ```

保存時に自動整形＋Lint が走るようになり、PR レビューが楽に。

> **学びの核心**
> TypeScript プロジェクトでは *ESLint が型情報を参照* できるため、シンタックスエラーも自動検知。FastAPI + Black + mypy の組み合わせで感じた「保存で安心」の開発体験を Node でも再現できます。

---

## 3-6. 詰まったときの TIPS

| 症状                                       | よくある原因                                  | 解決策                               |
| ---------------------------------------- | --------------------------------------- | --------------------------------- |
| `Cannot find module 'express'`           | npm install を忘れた                        | `npm i express`                   |
| `TypeError: users.get is not a function` | users を `User[]` で宣言したのに `.get` 呼び出し    | `users.find` か Map に変更            |
| POST で 404 が返る                           | `app.use(express.json())` を書き忘れ Body が空 | 行を確認し middleware 順序を守る            |
| 変更が反映されない                                | ts-node-dev が監視していない                    | 起動コマンドに `--respawn` 付与・VS Code 保存 |

---

## 3-7. まとめと次へのブリッジ

* **セットアップ → 実装 → curl 検証** の最短ループを “身体で” 覚えた。
* FastAPI との対比で「自動生成されない部分」を肌で感じられたはず。（ドキュメント生成・バリデーションなど）
* 明日（Day 4）はこのコードベースを土台に **ミドルウェア**・**エラーハンドリング**・**非同期 I/O** へと進み、本番環境を意識した設計を学びます。

---

## 4. 練習課題（30 分）

PDF に記載の課題を少し拡張し、**テストデータを JSON ファイルに保存**するところまで挑戦してください。  

1. `GET /users/:id` — ID が存在しない場合は 404 を返す。  
2. `POST /users` — 受け取ったボディを配列に push し、新しい ID を発番して返す。  
3. 完成後、下記２点を確認  
   * `curl -X POST -H "Content-Type: application/json" -d '{"name":"Carol"}' http://localhost:3000/users`  
   * 直後に `curl http://localhost:3000/users/3` で追加済みデータが取得できる  

> **Tips**  
> * TypeScript でも非同期処理は `async/await`。DB を使わない今は同期コードで十分。  
> * 配列の代わりに `Map<number, User>` を使うと高速に検索できます。  

---

## 5. 追加リソース（空き時間にどうぞ）

* Express 公式 “Hello world” ガイド（英語）  
* LogRocket Blog: *How to set up Node.js and Express with TypeScript*  
* TypeScript × Express のベストプラクティス記事（DEV Community）  
参考箇所はすべて PDF と同じものなのでリンクは割愛します。citeturn0file0  

---

## 6. まとめ & 次のステップ
今日で **“TypeScript で書いた Express サーバー”** を自力で立ち上げ、基本の CRUD まで確認できました。  

明日（Day 4）は **ミドルウェア・非同期処理・エラーハンドリング** に進み、より実践的で堅牢な API を作っていきます。  
