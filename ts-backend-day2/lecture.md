## Day 2 ― TypeScriptの基礎文法と型システム

### 1. 今日のゴール  
- **静的型付けの“感覚”を掴む**  
- **基本型・複合型・ユニオン型・ジェネリクスを使って簡単なモデルを書ける**  
- **PythonコードをTypeScriptに書き直してみて、型エラーを自分で潰せる** 

---

### 2. 理論パート （40 分）

| トピック | 押さえるポイント | Python経験者向け対比 |
|---|---|---|
| **変数宣言** | `let` / `const` に **型注釈**<br>`let age: number = 30;` | Python の型ヒントと似ているが **実行前に型チェック** される |
| **プリミティブ型** | `number`, `string`, `boolean` しかない（`int` と `float` の区別は不要） | `int`/`float` ➜ `number` に一本化 |
| **配列 & タプル** | `string[]` / `[number, string]` | `List[str]`, `Tuple[int, str]` 相当 |
| **オブジェクト型** | `interface` / `type` で宣言<br>`interface User { name: string; age?: number }` | `TypedDict` や `pydantic.BaseModel` の感覚 |
| **ユニオン型** | `string | number` で複数型許容 | `typing.Union[str, int]` |
| **ジェネリクス** | `<T>` パラメータ付き関数・クラス | `TypeVar` と同じ発想 |
| **クラス** | `public / private / readonly` など修飾子あり | アクセス修飾子は Python には無い概念 |  
| **型推論** | 注釈を省いてもコンパイラが推論 | mypy の「推論あり」よりも厳格 |  

> *メモ*: まずは **プリミティブ型＋配列＋インターフェース** の３点セットを確実に使えるようにしましょう。ユニオン型・ジェネリクスは “便利な拡張” という位置付けでOK。 citeturn1file3

---

### 3. コード例 （20 分）

```ts
// ① プリミティブ型と型推論
let score: number = 90;
const greeting = "こんにちは";  // string と推論される

// ② インターフェース
interface User {
  name: string;
  age?: number;          // ? で「なくてもよい」フィールド
}
const taro: User = { name: "太郎" };

// ③ 関数 + ユニオン型
function formatId(id: number | string): string {
  return `user-${id}`;
}

// ④ ジェネリック関数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ⑤ クラスとアクセス修飾子
class Counter {
  private _value = 0;
  increment(): void {
    this._value += 1;
  }
  get value(): number {
    return this._value;
  }
}
```

*Python 版との比較練習*  
```python
from typing import Union, List, TypeVar, Optional

def format_id(id: Union[int, str]) -> str:
    return f"user-{id}"

T = TypeVar("T")
def first(arr: List[T]) -> Optional[T]:
    return arr[0] if arr else None
```

---

### 4. ハンズオン課題 （45 分）

1. **ローカル環境を準備**  
   ```bash
   npm init -y
   npm i -D typescript ts-node @types/node
   npx tsc --init
   ```
2. `src/models/user.ts` を作成し、次を実装  
   - `interface User { id: number; name: string; email: string }`
3. `src/services/userService.ts`  
   - 配列を簡易DBとして `addUser`, `getUserById` を実装（戻り値・引数にすべて型を付ける）
4. `src/index.ts`  
   - 上記サービスを呼び出し、結果を `console.log`  
5. **型エラー実験**  
   - `addUser({ id: "abc", name: 123 })` のようにわざと誤った型を渡し、`ts-node` 実行時にエラーになることを確認。

> PDF の練習課題「User インターフェースと挨拶関数」を一段深掘りし、**サービス層を分離** してみるとより“バックエンドらしい”構成になります。 citeturn1file8

---

### 5. チェックポイント （15 分）

- [ ] `let title: string = 123` がコンパイルエラーになる理由を説明できる  
- [ ] `readonly` 修飾子を付けるとどう挙動が変わるか実験した  
- [ ] `Array<T>` と `T[]` の書き方の違いを説明できる  
- [ ] Python で頻出の `Optional` は TypeScript だと「`型 | undefined`」で表せると理解した  

---

### 6. 明日への準備

- **疑問リストを作成**: 「型推論で困った例」「Union で書きにくかった例」などをメモ  
- **Node/Express を global にインストール** (`npm i -g express-generator` など)  
  → Day 3 で最小 REST API を立ち上げます。  

---

### 7. 推奨リソース（復習用）

- TypeScript公式ハンドブック *The Basics* / *Everyday Types*  
- Medium: *TypeScript for Python Developers*  
- Qiita: *TypeScript基礎まとめ* (日本語での概要整理) 