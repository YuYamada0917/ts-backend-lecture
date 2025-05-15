### ユニオン型（Union Type）って何？

> **ひと言でいうと**  
> “**この変数（引数・戻り値）は **A** か **B** のどちらか**” と宣言する仕組みです。  

---

#### 1. ざっくりイメージ  
- Python で `Union[int, str]` と書くのと同じ発想ですが、TypeScript では **実行前に** 間違いを弾いてくれます。  
- セット論で考えると、  
  \[
  \text{string} \cup \text{number}
  \]  
  の“どちらでも可”という型を作るイメージ。

#### 2. 実際のコード  

```ts
// A. 宣言
let id: number | string;   // “number **か** string” と読める

// B. 正しい代入
id = 42;
id = "abc123";

// C. 間違い → 即コンパイルエラー
id = true;   // ❌ boolean は許可していない
```

##### 分岐時は「絞り込み」  
ユニオン型は if 文などで **絞り込み（type narrowing）** が起こります。

```ts
function formatId(id: number | string): string {
  if (typeof id === "number") {
    // ここでは id は number 型だと確定
    return id.toFixed(0);
  }
  // ここでは id は string 型だと確定
  return id.toUpperCase();
}
```

> ✅ **ポイント**  
> - **型安全**：想定外の型が混入した瞬間にエラー。  
> - **補完が賢い**：narrowing 後は IDE が自動で適切なメソッド候補を出してくれる。  

---

### ジェネリクス（Generics）って何？

> **ひと言でいうと**  
> “**中身の型に依存しないロジック**を、**使う側が好きな型で再利用**できる仕組み” です。  

---

#### 1. ざっくりイメージ  
- **型パラメータ <T>** で“箱のラベル”を後から貼る感じ。  
- Python の `TypeVar("T")` と近いですが、Python は実行時に型情報が消える（＝型安全は保証されない）のに対し、TypeScript は **コンパイル時から厳しくチェック**されます。

#### 2. 実際のコード（関数編）

```ts
// 汎用的な「最初の要素を返す」関数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 使う側：T を自動推論または明示指定
const n = first([10, 20, 30]);          // n: number | undefined
const s = first<string>(["a", "b"]);    // s: string | undefined
```

- `T` に **number** が入れば `number[]` → `number` が返る。  
- `T` に **string** が入れば `string[]` → `string` が返る。  
- 間違って `first([true, false])` と書くと `T` は **boolean** と推論され、以降 **boolean** 以外を扱おうとするとエラー。

#### 3. 実際のコード（クラス編）

```ts
// ジェネリック Stack
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}

// number 専用の Stack
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const v = numberStack.pop();   // v: number | undefined

// string 専用の Stack
const stringStack = new Stack<string>();
stringStack.push("x");
// stringStack.push(3);  // ❌ number は拒否される
```

> ✅ **ポイント**  
> - **再利用性**：型をパラメタ化することで「同じロジック」を何度も書かなくて済む。  
> - **型安全**：Stack に入る型は **コンストラクタ呼び出し時に決定**し、以降は 100% その型で統一。  

---

### ユニオン型 vs ジェネリクス ― いつ使う？

| シチュエーション | 選ぶ型機能 | 理由 |
|---|---|---|
| **入力が“数値 or 文字列”など、決まった選択肢から変動する** | **ユニオン型** | “列挙的に限られた複数型”を扱うときに最適 |
| **処理ロジックは同じで、中に入る型だけを可変にしたい**<br>（リスト、APIレスポンスのラッパー、リポジトリなど） | **ジェネリクス** | “箱の中身の型”を抽象化して再利用できる |

---

### Python と対比してみると…

| 機能 | TypeScript | Python (typing) | 違いの本質 |
|---|---|---|---|
| **Union** | `number \| string` | `Union[int, str]` | TS は実行**前**に強制; Py は別ツール (mypy) が後追い |
| **Generics** | `function<T>(arg: T): T` | `def func[T](arg: T) -> T:` (PEP 695)／`TypeVar` | TS は IDE 補完・リファクタ時点で厳格チェック |

---

### もっと手を動かす練習

1. **ユニオン型**  
   - `type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"` を定義し、誤った文字列を入れた瞬間にエラーになることを確認。
2. **ジェネリック関数**  
   - “配列をシャッフルして返す `shuffle<T>(arr: T[]): T[]`” を実装し、`number[]` と `string[]` 双方で動くことをテスト。
3. **ジェネリック + ユニオン**  
   - `Result<T>` 型を作り、`{ ok: true; value: T }` と `{ ok: false; error: string }` のユニオンでエラーハンドリングするパターンを試す。

---

### つまずきがちなポイント

| 症状 | 原因 | 対処 |
|---|---|---|
| ジェネリックを書いたのに **any に推論**される | 型パラメータが推論できず暗黙 any | 呼び出し側で `<Foo>` と明示する |
| ユニオン型で **共通でないプロパティにアクセス**できない | 安全性のため | `if ("foo" in obj)` や `type predicate` で絞り込み |
| `T extends keyof U` などの**高度な制約** | 型パズルが難解 | 初心者はまず単純な “<T>” だけで十分 |

---

## まとめ

- **ユニオン型**＝「**A か B**」。型の**選択肢を列挙**し、分岐で**絞り込み**。  
- **ジェネリクス**＝「**箱の中身の型はあとから決める**」。**再利用性**と**型安全**を両立。  
- Python での経験を活かしつつ、“**コンパイル時点で守ってくれる保険**”が TypeScript の強み。