## チェックポイント解説

### 1. `let title: string = 123` がコンパイルエラーになる理由  
| 観点 | 解説 | Python との比較 |
|---|---|---|
| **型注釈** | `: string` と宣言した時点で **「この変数には文字列だけが入る」** と TypeScript コンパイラに約束している。 | `title: str = 123` と書くと *mypy* が怒るのと同じ。 |
| **代入時の型チェック** | 右辺 `123` は `number` 型。宣言と一致しないため **コンパイルエラー**。 | Python は実行時は通るが、TypeScript は **ビルド時に止める**。 |
| **暗黙変換なし** | JS のランタイムでは暗黙で `"123"` に変わる場面もあるが、TypeScript は **暗黙キャストを認めない** 方針。 | — |

> **ポイント**: “型注釈は契約”――違反すればビルドが通らないので、バグがプロダクションに届く前に食い止められる。

---

### 2. `readonly` 修飾子を付けるとどう挙動が変わるか

```ts
interface Book {
  readonly isbn: string;
  title: string;
}

const b: Book = { isbn: "978-0-00", title: "TS 入門" };

b.title = "改訂版";   // ✅ OK
b.isbn  = "999-9-99"; // ❌ Error: Cannot assign to 'isbn' because it is a read-only property.
```

| 観点 | 解説 |
|---|---|
| **目的** | “値を決定後は不変”という **意図を型レベルで保証**。 |
| **適用場所** | - インターフェース/型エイリアスのプロパティ<br>- クラスのフィールド (`readonly private id = 1;`) |
| **ランタイム挙動** | 実行時にプロパティを書き換えると **エラーは出ない**（JS の仕様）。TypeScript が **コンパイル段階で禁止**しているだけ。 |
| **Python 比較** | `@property` で setter を実装しない／`namedtuple` のような不変オブジェクトに近い。 |

---

### 3. `Array<T>` と `T[]` の書き方の違い

| 記法 | 例 | 等価 | 使い分け |
|---|---|---|---|
| **`T[]`** | `number[]` | `Array<number>` | **短く書ける**。読み手に直感的。 |
| **`Array<T>`** | `Array<User>` | `User[]` | **ジェネリックをネスト**するときに読みやすい (`Array<Array<string>>` より `string[][]` が読みにくい場面も)。 |

```ts
type Matrix = number[][];          // 二次元配列
type MatrixAlt = Array<Array<number>>; // 同じ意味
```

> 実質的に **完全なシンタックスシュガー**。好きな方で OK だが、  
> - “一次元配列” → `T[]`  
> - “ネストが深い/ユニオンと組み合わせ” → `Array<T>` の方が崩れにくい  
> という傾向がある。

---

### 4. Python の `Optional` は TypeScript の「`型 | undefined`」

| Python (typing) | TypeScript | 説明 |
|---|---|---|
| `Optional[int]` (`Union[int, None]`) | `number \| undefined` | “値が無いかもしれない”ことを **ユニオン型**で表す。 |
| 例 |  |  |
| def foo(x: Optional[int]) -> None: | function foo(x: number \| undefined): void {}| 両方とも“整数か、無ければ None/undefined”を許容。 |

#### 使いどころ
- **戻り値**: 検索で見つからなければ `undefined` を返す  
  ```ts
  function find<T>(arr: T[], id: number): T | undefined { ... }
  ```
- **引数**: “オプショナル引数”は **`?` シンタックス**の方が簡潔  
  ```ts
  function greet(name?: string) { ... }  // name?: string === name: string | undefined
  ```

> **注意**: JavaScript には `null` もあるので、  
> - “どちらも許す” → `T | null | undefined`  
> - “undefined だけに統一” → ESLint で `no-null` を推奨  
> と **チーム規約**を決めておくと混乱しない。

---

## まとめ

| チェック項目 | 一言まとめ |
|---|---|
| 型注釈違反 (`string = 123`) | **宣言と実値の不一致**をビルド時に検知 |
| `readonly` | **「書き換え禁止」宣言**で意図を守る（実ランタイムは不変化しない点に注意） |
| `Array<T>` vs `T[]` | **意味は同じ**。可読性で好きな方／状況ごとに選択 |
| `Optional` 相当 | **`T \| undefined`**（引数なら `name?: T` シンタックスも） |
