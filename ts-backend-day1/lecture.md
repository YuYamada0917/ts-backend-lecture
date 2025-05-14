## Day 1 – TypeScript 概要と開発環境のセットアップ

こんにちは！  
これから 10 日間ロードマップの **Day 1** を一緒に進めていきましょう。Python + FastAPI 経験を活かしながら TypeScript（以下 TS）と Node.js の基礎を固めます。今日は「言語そのものを理解する」「すぐに動かせる環境を整える」がゴールです。PDF で示されている到達点は **“TS ファイルをコンパイル／直接実行して Hello World を出力できること”** ですね。 citeturn0file0  

---

### 1. 学習目標

| 今日のゴール | 具体的チェックポイント |
|--------------|------------------------|
| TypeScript の役割を説明できる | “JS に静的型付けを持たせ、コンパイル時にエラー検出できる” など |
| Node.js + npm + ts-node が動くプロジェクトを初期化できる | `node -v`, `npm init -y`, `npx ts-node src/index.ts` が通る |
| `tsconfig.json` の基本オプションを理解する | `target`, `module`, `strict`, `esModuleInterop` など |
| Hello World + 簡単な関数を書き、型チェックを体験する | 意図的に型ミスを入れて `tsc` エラーを確認 |

---

### 2. TypeScript の全体像

- **静的型付け**: Python の型ヒント + MyPy に近いですが、TS は公式コンパイラ (`tsc`) が型チェックとトランスパイルを一括で行います。  
- **トランスパイル**: `.ts` → `.js` へ変換してから V8 (Node) で実行。ブラウザ向けの JS も同じ仕組み。  
- **開発体験**: 型情報がエディタ補完に反映されるので、関数シグネチャやプロパティ名のタイポを早期に防げます。

> “TypeScript は『JavaScript に静的言語の特性を付与した言語』で、コンパイルすると通常の JavaScript になります” citeturn0file0

---

### 3. 環境構築ステップ

> 以下は **macOS/Linux + Node.js v22 LTS** 前提ですが、Windows でも同様です。

1. **Node.js をインストール**  
   ```bash
   # nvm 推奨
   nvm install --lts
   nvm use --lts
   node -v   # v22.x.x など
   ```
2. **プロジェクト初期化**  
   ```bash
   mkdir ts-backend-demo && cd $_
   npm init -y         # package.json 生成
   ```
3. **開発用依存パッケージを追加**  
   ```bash
   npm install -D typescript ts-node @types/node
   ```
   - `typescript`: コンパイラ (`tsc`)  
   - `ts-node`: コンパイルせず TS を直接実行（学習に便利）  
   - `@types/node`: Node.js の型定義（補完用）

4. **tsconfig.json を生成**  
   ```bash
   npx tsc --init --rootDir src --outDir dist --strict --esModuleInterop
   ```
   主要オプションだけ覚えましょう。

   | オプション        | 役割 (ざっくり) |
   |-------------------|-----------------|
   | `target`          | 出力 JS の ECMA バージョン |
   | `module`          | モジュール解決方式 (`commonjs`, `es2022` など) |
   | `strict`          | 型チェックを厳格に |
   | `esModuleInterop` | `import fs from 'fs'` 形式を許可 |

5. **フォルダ構成例**

   ```
   ts-backend-demo/
   ├─ src/
   │  └─ index.ts
   ├─ dist/           # 自動生成
   ├─ package.json
   └─ tsconfig.json
   ```

---

### 4. Hello World とコンパイル体験

```ts
// src/index.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

- **直接実行（開発用）**  
  ```bash
  npx ts-node src/index.ts
  ```
- **コンパイル → 実行（本番想定）**  
  ```bash
  npx tsc           # dist/index.js が生成
  node dist/index.js
  ```

#### 型チェックを試す
```ts
// src/index.ts
// 間違い: number を渡してみる
console.log(greet(42));
```
`tsc` で  
```
Argument of type 'number' is not assignable to parameter of type 'string'.
```
と怒られるのを確認してください。**ここが TS の強み**です。

---

### 5. Python との違いを意識しよう

| 観点            | Python (FastAPI) | TypeScript (Node) |
|-----------------|------------------|-------------------|
| 型チェック      | 実行前に MyPy などで任意 | `tsc` で必須（設定次第） |
| インデント       | スコープ決定      | `{}` ブロック明示 |
| 非同期 I/O      | `async def` + `await` | `async function` + `await`（同じ感覚） |
| 実行ファイル    | `.py` そのまま    | `.ts` → `.js` へビルド or ts-node |

---

### 6. VS Code セットアップ

1. **Extensions**  
   - ESLint  
   - Prettier‑Code Formatter  
   - TypeScript Hero / Path Intellisense（任意）
2. **設定例** `.vscode/settings.json`
   ```json
   {
     "editor.formatOnSave": true,
     "typescript.tsdk": "node_modules/typescript/lib"
   }
   ```

補完が効かなければ `Cmd/Ctrl+Shift+P → TypeScript: Select TypeScript Version → Use Workspace Version`。

---

### 7. 演習課題

> PDF の練習課題に沿いつつ、FastAPI 経験を踏まえて少し拡張してみましょう。 citeturn0file0  

1. **`User` 型を定義してみる**  
   ```ts
   interface User {
     name: string;
     age?: number;
   }
   const alice: User = { name: "Alice", age: 25 };
   ```
2. **挨拶関数を実装**  
   ```ts
   const greetUser = (user: User): string =>
     `Hi ${user.name}! You are ${user.age ?? "unknown"} years old.`;

   console.log(greetUser(alice));
   ```
3. **型エラーを体験**  
   `user.name = 123` のような誤りを入れて `tsc` エラーを読んでみる。
4. **NPM スクリプトを整える**  
   `package.json` に  
   ```json
   "scripts": {
     "dev": "ts-node src/index.ts",
     "build": "tsc",
     "start": "node dist/index.js"
   }
   ```
   を追加。今後の各日で `npm run dev` → `build` → `start` を使い回せるように。

---

### 8. 明日までにやっておくと良いこと

- GitHub リポジトリを作って今日のコードを push 🚀  
- **Optional**: nvm をまだ導入していない場合は入れておく  
- VS Code のショートカット（`F2` でリネーム、`Alt+Click` で複数カーソルなど）を覚えて開発速度を上げる

---

### Wrap‑up

今日は **TypeScript を「動かす」準備**を整えました。静的型のメリットや、Python との思想的ギャップを意識しながら進めると理解が深まります。  

明日 Day 2 では **型システムと文法** を掘り下げ、ユニオン型・ジェネリクスなど TS ならではの表現力を体験します。引き続きよろしく！