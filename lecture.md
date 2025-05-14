# Python/FastAPI経験者のためのTypeScriptバックエンド開発 10日間学習ロードマップ

**前提:** Python + FastAPIでバックエンド開発をしたことがある方向けに、TypeScript（TS）を使ってバックエンド開発ができるようになるための10日間ロードマップです。1日2時間の学習ペースで、REST API構築、非同期処理、データベース接続、型の扱い、認証、エラーハンドリング、テストなどバックエンド全般を広く浅くカバーします。各日ごとに学習テーマ、内容とゴール、推奨リソース、簡単な練習課題を示します。

## Day 1: TypeScript概要と開発環境のセットアップ

**学習テーマ:** TypeScriptの基本概念とNode.js開発環境の構築  
**内容とゴール:** TypeScriptは「JavaScriptに静的言語の特性を付与した言語」で、コンパイルすると通常のJavaScriptになります ([TypeScript基礎まとめ #JavaScript - Qiita](https://qiita.com/kenRp01/items/e4a5b08d7968aba855e1#:~:text=JavaScript%E3%81%AB%E9%9D%99%E7%9A%84%E8%A8%80%E8%AA%9E%E3%81%AE%E7%89%B9%E6%80%A7%E3%82%92%E4%BB%98%E4%B8%8E%E3%81%97%E3%81%9F%E8%A8%80%E8%AA%9E%E3%80%82%20%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%A7Javascript%E3%81%AB%E3%81%AA%E3%82%8B%E3%80%82%20%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%80%9D%E8%80%83%E3%81%AE%E7%89%B9%E6%80%A7%E3%82%92%E6%B4%BB%E3%81%8B%E3%81%97%E5%AE%9F%E8%A3%85%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AB%E3%82%88%E3%82%8A%E3%80%81%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E5%BD%B9%E5%89%B2%E3%82%92%E6%9E%9C%E3%81%9F%E3%81%9B%E3%81%9F%E3%82%8A%E3%80%81%E3%83%86%E3%82%B9%E3%83%88%E3%81%AE%E5%B7%A5%E6%95%B0%E3%82%92%E6%B8%9B%E3%82%89%E3%81%99%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8B%E3%80%82))。まずはTypeScriptの特徴を把握しましょう。Pythonとの違いとして、**静的型付け**によるコンパイル時のエラー検出（開発中に型エラーを発見できる）や、エディタ補完の強力さがあります ([Node.js — Introduction to TypeScript](https://nodejs.org/en/learn/typescript/introduction#:~:text=TypeScript%20is%20an%20open,maintained%20and%20developed%20by%20Microsoft))。TypeScriptコードはトランスパイル（変換）してNode.js上で実行されます ([TypeScript for Python Developers. A quick introduction to TypeScript for… | by Anton De Meester | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/typescript-for-python-developers-a16e50a5acb2#:~:text=TypeScript%20is%20a%20superset%20of,executor%2C%20a%20browser%20or%20NodeJS))。この日は開発に必要な環境を準備します。具体的には最新の**Node.js**とパッケージマネージャ（npmなど）をインストールし、`npm init`でプロジェクトを初期化、`npm install -D typescript ts-node @types/node`でTypeScriptコンパイラ等を導入します。TypeScript用設定ファイル`tsconfig.json`を作成し、簡単な**「Hello World」**プログラム（例: `console.log("Hello World");`）を書いてみましょう。**ゴール:** コマンドでTypeScriptファイルをコンパイル(`tsc`)してJavaScriptを実行、または`ts-node`で直接実行し、コンソールにメッセージを表示できること。これによりTypeScript開発サイクルに慣れます。Pythonとは異なりブロックを波括弧 `{}` で囲むこと、文末にセミコロンを付ける習慣などJSの文法にも触れておきます。VSCodeなどエディタのセットアップも行い、TypeScriptならではの型に基づく補完を試してみましょう。  

**推奨リソース:**  
- Node.js公式サイト: 「Introduction to TypeScript (Node.js)」 ([Node.js — Introduction to TypeScript](https://nodejs.org/en/learn/typescript/introduction#:~:text=TypeScript%20is%20an%20open,maintained%20and%20developed%20by%20Microsoft))（TypeScriptで型チェックを行い、エラーを早期に検出できることが説明されています）  
- TypeScript公式ハンドブック: 「Getting Started」ガイド ([TypeScript: Documentation - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#:~:text=The%20Basics))（TypeScriptプロジェクトの初歩的な始め方がまとまっています）  

**練習課題:** NodeとTypeScriptのプロジェクトを新規作成し、`index.ts`に簡単な関数（例：文字列を受け取って挨拶メッセージを返す関数）を書いてみてください。その関数を呼び出してコンソールに結果を表示し、`tsc`でコンパイル & 実行して正しく動作することを確認しましょう。

## Day 2: TypeScriptの基礎文法と型システム

**学習テーマ:** TypeScriptの文法ルールと型定義の方法  
**内容とゴール:** この日はTypeScriptの基本文法と型システムに慣れることが目標です。Pythonとの大きな違いは**静的型定義**をコード中に書ける点です。例えば変数宣言は`let 変数名: 型 = 初期値;`のように行います ([TypeScript基礎まとめ #JavaScript - Qiita](https://qiita.com/kenRp01/items/e4a5b08d7968aba855e1#:~:text=))（Pythonの型ヒントに似ていますが、TypeScriptではコンパイル時に厳密にチェックされます）。基本のプリミティブ型には`string`, `number`, `boolean`があり、Pythonの`int`と`float`の区別はなく数値はすべて`number`型になります ([TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#:~:text=,false))。型注釈は省略可能で、代入された値からコンパイラが型を推論してくれる場合も多いです ([TypeScript基礎まとめ #JavaScript - Qiita](https://qiita.com/kenRp01/items/e4a5b08d7968aba855e1#:~:text=))。オブジェクトや配列の型定義方法（オブジェクトはインターフェースや型エイリアスで定義、配列は`string[]`のように表記）を学びましょう。また、TypeScriptでは**インターフェース**や**クラス**を使ったオブジェクト指向的な記述も可能です。Pythonのクラスに相当しますが、コンストラクタやメソッドの書き方、アクセス修飾子（public/private）などの違いに注意してください。さらに**ユニオン型**(`string | number`のように複数の型許容)や**ジェネリクス**（型パラメータを持つ関数/クラス）といった言語機能も触れてみてください。  
- **ゴール:** TypeScriptの基本的な型（プリミティブ型、オブジェクト型、配列、タプル、enumなど）を使った変数宣言ができる。簡単なクラスや関数をTypeScriptで定義し、型エラーが出た場合に修正できる。PythonコードをTypeScriptで書き直す練習を通じて、型システムのメリットを実感する。

**推奨リソース:**  
- TypeScript公式ハンドブック: 「Everyday Types（基本的な型）」 ([TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#:~:text=We%E2%80%99ll%20start%20by%20reviewing%20the,blocks%20of%20more%20complex%20types)) ([TypeScript: Documentation - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#:~:text=,false))（文字列や数値など基本型の解説。JavaScriptでおなじみの型に対応するTypeScriptの型について学べます）  
- Medium記事: "TypeScript for Python Developers" ([TypeScript for Python Developers. A quick introduction to TypeScript for… | by Anton De Meester | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/typescript-for-python-developers-a16e50a5acb2#:~:text=TypeScript%20is%20a%20superset%20of,executor%2C%20a%20browser%20or%20NodeJS)) ([TypeScript for Python Developers. A quick introduction to TypeScript for… | by Anton De Meester | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/typescript-for-python-developers-a16e50a5acb2#:~:text=Like%20most%20other%20languages%2C%20TypeScript,))（Python経験者向けにTypeScriptの文法を紹介した記事。PythonのコードとTypeScriptのコードを対比しながら、構文やスタイルの違いを解説しています）  

**練習課題:** 簡単なデータモデルをTypeScriptで作ってみましょう。例えば「ユーザ」オブジェクトに`name: string`と`age: number`を持たせるとします。インターフェース`User`を定義し、その型のオブジェクトを作成してコンソール出力してみてください。また、そのユーザオブジェクトを受け取って挨拶メッセージを返す関数を実装し、型付けされた引数や戻り値を確認しましょう（例えば引数に誤った型を渡すとコンパイルエラーになることを確認します）。

## Day 3: Node.jsとExpressによるREST API入門

**学習テーマ:** Expressフレームワークを使った基本的なREST APIサーバー構築  
**内容とゴール:** この日はNode.js上で動くWebフレームワーク**Express**を使って、シンプルなREST APIを構築してみます。ExpressはNode.jsで最も普及しているフレームワークで、**シンプルで柔軟なルーティング**を提供し、必要な機能はミドルウェアで拡張する設計になっています ([Express - Node.js web application framework](https://expressjs.com/#:~:text=Express%20is%20a%20lightweight%20and,use%20of%20Express%20middleware%20modules))。FastAPIに慣れている方は、ExpressはFastAPIやFlaskに近い立ち位置（軽量で自由度が高い）と考えてよいでしょう。ただし、TypeScriptでExpressを使う場合は型定義（`@types/express`）を導入することで、リクエストやレスポンスオブジェクトの型補完が効くようになります。  
  - **まず**: Expressをプロジェクトにインストールし（`npm install express @types/express`）、シンプルなサーバーを立ち上げます。例えば`app.ts`に以下のような基本コードを書くことで、HTTPサーバーが起動できます ([Express "Hello World" example](https://expressjs.com/en/starter/hello-world.html#:~:text=const%20express%20%3D%20require,const%20port%20%3D%203000)) ([Express "Hello World" example](https://expressjs.com/en/starter/hello-world.html#:~:text=This%20app%20starts%20a%20server,with%20a%20404%20Not%20Found))。  
    ```ts
    import express, { Request, Response } from 'express';
    const app = express();
    const port = 3000;
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    ```  
    上記はルート`/`にアクセスしたとき「Hello World!」を返す最も簡単なExpressアプリです。  
  - **次に**: ルーティングの追加方法やJSONの返し方を学びます。`app.get('/hello/:name', ...)`のようにルートパラメータを受け取ったり、`res.json({ message: 'Hello, ' + name })`でJSONレスポンスを返すことができます。Python/FastAPIでやっていたように、GET/POSTなどHTTPメソッドごとのハンドラ関数を定義してみましょう。ExpressではデフォルトでOpenAPIドキュメント生成やバリデーションが自動では行われない点に注意してください（これらは追加ライブラリで対応可能ですが、まずはシンプルに動作を確認します）。  
- **ゴール:** Expressサーバーを起動し、ブラウザやcurlでエンドポイントにアクセスすると期待したJSONやメッセージが返ってくること。具体的には、「Hello, 名前」を返すGET APIや、クエリパラメータ/パスパラメータを処理する簡単なエンドポイントを実装できるようになります。FastAPIでの経験と対比しながら、Node/Expressでの実装パターンに慣れるのが目的です。

**推奨リソース:**  
- Express公式サイト: 「Hello world」チュートリアル ([Express "Hello World" example](https://expressjs.com/en/starter/hello-world.html#:~:text=const%20express%20%3D%20require,const%20port%20%3D%203000)) ([Express "Hello World" example](https://expressjs.com/en/starter/hello-world.html#:~:text=This%20app%20starts%20a%20server,with%20a%20404%20Not%20Found))（最小限のExpressアプリの例。ルーティングとサーバー起動の基本が示されています）  
- LogRocketブログ: 「How to set up Node.js and Express with TypeScript」 ([How to set up TypeScript with Node.js and Express - LogRocket Blog](https://blog.logrocket.com/express-typescript-node/#:~:text=Creating%20a%20minimal%20server%20with,Express)) ([How to set up TypeScript with Node.js and Express - LogRocket Blog](https://blog.logrocket.com/express-typescript-node/#:~:text=environment%20variables))（TypeScriptでExpressプロジェクトを構築する手順を解説した記事。プロジェクト初期化から基本的なCRUDルートの実装まで網羅しており、ベストプラクティスも紹介されています）  

**練習課題:** 簡単なREST APIエンドポイントを2つ実装してみましょう。1つはGETエンドポイントで、たとえば`GET /users/:id`にアクセスするとサンプルのユーザ情報(JSON)を返すようにします。もう1つはPOSTエンドポイントで、例えば`POST /users`でユーザ情報を受け取りコンソールにログ出力する（実際のDB保存はしない）処理を書いてみます。実装後、実際にブラウザやHTTPクライアントからリクエストを送り、正しいレスポンスが返ることを確認してください。

## Day 4: Expressのミドルウェア、非同期処理とエラーハンドリング

**学習テーマ:** Expressを用いたバックエンド開発の中級トピック（ミドルウェア処理、非同期処理、エラー対応）  
**内容とゴール:** Expressで本格的なAPI開発をするには、**ミドルウェア**の活用と**非同期処理**への対応、そして**エラーハンドリング**が重要です。この日はそれらを学びましょう。  
  - **ミドルウェア:** Expressの強力な仕組みで、リクエスト処理の共通ロジックを関数として挟み込めます。例えば、リクエストログを出力するミドルウェアや、リクエストに認証情報を埋め込むミドルウェアなどがあります。`app.use(...)`でグローバルに適用したり、特定ルートにだけ適用することも可能です。シンプルな例として、全リクエストのたびにコンソールログを出すミドルウェアを自作して`app.use`で使ってみてください。これはPythonのFastAPIでいう**Depends**やイベントフックに近い感覚です。  
  - **非同期処理:** Node.jsはシングルスレッドのイベントループ上で動作し、非同期I/Oを得意とします。Expressのルートハンドラ内でデータベース呼び出しや外部API呼び出しを行う際は**Promise**や`async/await`で非同期処理を行います。Pythonの`asyncio`と同様に、Node.jsでも`async/await`を使えば直感的に非同期コードを書けます。例えば、ルートハンドラ関数を`async function`にして内部で`const data = await fetchData();`のように書き、処理完了後にレスポンスを返すことができます。ただし、古くはコールバックやPromiseチェーンで書くスタイルもありました。**ゴール:** 非同期処理でレスポンスを待たせる方法を理解し、`setTimeout`で疑似的に遅延を入れたりして挙動を確認すること。  
  - **エラーハンドリング:** バックエンドでは予期せぬエラーが発生します。Expressではエラーハンドリング用のミドルウェアを定義できます（関数のシグネチャが`(err, req, res, next)`のもの） ([Error Handling in Express (FCC Youtube course) - Clarifications](https://forum.freecodecamp.org/t/error-handling-in-express-fcc-youtube-course-clarifications/586908#:~:text=Clarifications%20forum.freecodecamp.org%20%20Error,handling%20middleware%20function))。これを`app.use`の最後に登録しておけば、ルート処理中に`next(err)`や例外が発生した場合にキャッチして適切なレスポンスを返せます。自作のエラーミドルウェアを用意し、スタックトレースをログに出力しつつクライアントには汎用的なエラーレスポンス（例: HTTP 500とエラーメッセージJSON）を返す実装をしてみましょう。また、`async/await`内で例外をキャッチするために`try/catch`を使う点にも注意します。Express 5以降では`async`関数中のエラーも自動で上記エラーミドルウェアに渡されますが、バージョンによってはパッケージ（`express-async-errors`）が必要な場合があります。**ゴール:** 入力のバリデーションを行い、不正な入力にはHTTP 400エラーを返す処理や、存在しないルートへのアクセスに対してHTTP 404を返す処理を組み込むこと。これにより、堅牢なAPIの基礎が身につきます。  

**推奨リソース:**  
- Express公式ガイド: 「Error Handling（エラーハンドリング）」 ([Express error handling](https://expressjs.com/en/guide/error-handling.html#:~:text=Error%20Handling%20refers%20to%20how,comes%20with%20a%20default%20error))（Expressにおけるエラー処理の基本について。エラーミドルウェアの書き方と仕組みが説明されています）  
- Dev.to記事: "TypeScript Express: Building Robust APIs" ([TypeScript Express: Building Robust APIs with Node.js - DEV Community](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln#:~:text=TypeScript%2C%20a%20statically%20typed%20superset,TypeScript%20brings%20to%20the%20table)) ([TypeScript Express: Building Robust APIs with Node.js - DEV Community](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln#:~:text=1,Express%20Project))（TypeScript + Expressで堅牢なAPIを構築する方法を解説した記事。非同期処理やエラーハンドリング、プロジェクト構成について触れられており参考になります）  

**練習課題:** Day3で作成したAPIに対し、いくつか改善を加えてみましょう。(1) リクエストのたびに時刻やパスをログ出力する**ミドルウェア**を実装する。(2) 適当な非同期処理を導入する。例えば、`/users`一覧を返すエンドポイントで`setTimeout`を使って0.5秒遅れてレスポンスを返すようにしてみる。（将来はここでデータベース問い合わせをするイメージ）。(3) 明示的にエラーを発生させるパスを1つ作り（例: `/error`にアクセス時に例外をthrowする）、カスタムエラーミドルウェアでエラーをキャッチしてHTTP 500を返すことを確認する。これらによりExpressのミドルウェアチェーンの理解が深まります。

## Day 5: データベース接続とORMの基本

**学習テーマ:** TypeScriptを用いたデータベース操作とORMの利用  
**内容とゴール:** バックエンド開発にはデータの永続化（データベース操作）が欠かせません。PythonではSQLAlchemyやPeewee、Django ORMなどを使うことがありますが、TypeScript/Node.jsの世界にもORMやクエリビルダがあります。この日は代表的なTypeScript向けORMである**TypeORM**を使った基本を学びます（他にもPrismaやSequelizeなどがありますが、ここではTypeORMを例にします）。  
  - **環境準備:** データベースとしては手軽に試せるSQLiteやPostgreSQLを使用します。例えばSQLiteならファイルベースで動作しインストールが容易です。TypeORMをプロジェクトに導入し（`npm install typeorm reflect-metadata @types/node`など）、TypeORMの設定ファイル（`ormconfig.json`もしくはデータソース設定）を用意します。TypeORMはエンティティ（テーブルに対応するクラス）定義にデコレータを使用するため、`tsconfig.json`で`experimentalDecorators`と`emitDecoratorMetadata`を有効にする必要があります ([Example using TypeORM with Express | typeorm](https://orkhan.gitbook.io/typeorm/docs/example-with-express#:~:text=%7B%20,true))。  
  - **エンティティ定義:** PythonのSQLAlchemyでクラスを定義するのと同様に、TypeORMでもエンティティクラスを作ります。例えば「User」エンティティを`User.ts`として以下のように定義します。  
    ```ts
    import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
    @Entity()
    export class User {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      name: string;
      @Column({ nullable: true })
      age?: number;
    }
    ```  
    これでTypeORMがこのクラスをもとにテーブルを作成・操作できるようになります。  
  - **データベース接続:** アプリケーション起動時にTypeORMの`DataSource`や`createConnection`でデータベースに接続します。TypeORM CLIを使うとExpressと統合したプロジェクトテンプレートを作成できます（例：`typeorm init --express --name projectName --database mysql`） ([TypeORM with Express](https://www.tutorialspoint.com/typeorm/typeorm_with_express.htm#:~:text=TypeORM%20CLI%20provides%20an%20easy,application%20is%20as%20follows%20%E2%88%92))。今回は手動設定でも良いですが、CLIを試してプロジェクト雛形を眺めてみるのも勉強になります。  
  - **CRUD操作:** リポジトリ経由で基本的なCRUD操作を実装します。例えばユーザの作成: `userRepository.save(newUser)`, 取得: `userRepository.find()` といった具合です。これらをExpressのルートに組み込み、実際にDBと連携する簡単なAPIに拡張してみましょう。PythonのORMと同様に、非同期処理で結果を待つ必要があることに注意します。**ゴール:** TypeORMなどのORMを使ってデータベースと接続し、テーブルにレコードを作成・読み取りできること。TypeScriptでモデル（エンティティ）クラスを定義し、それを通じてDB操作できる流れを理解します。  

**推奨リソース:**  
- TypeORM公式ドキュメント: Expressとの統合サンプル ([Example using TypeORM with Express | typeorm](https://orkhan.gitbook.io/typeorm/docs/example-with-express#:~:text=Initial%20setup))（ユーザ情報を保存・取得するシンプルなアプリケーションの例。エンティティ定義からExpressとの連携までの流れが解説されています）  
- Tutorialspoint: 「TypeORM with Express」 ([TypeORM with Express](https://www.tutorialspoint.com/typeorm/typeorm_with_express.htm#:~:text=TypeORM%20CLI%20provides%20an%20easy,application%20is%20as%20follows%20%E2%88%92))（TypeORMのCLIを使ってExpressアプリケーションを初期化する手順を紹介しています。自動生成されるプロジェクト構成を見ることで、ORM統合の全体像をつかめます）  

**練習課題:** 簡単なデータベース操作の練習として、「Todoリスト」APIを実装してみましょう。まず`Todo`というエンティティ（`id`, `title`, `completed`フィールド等）をTypeORMで定義します。次に、以下のようなRESTエンドポイントをExpressに追加してください: **①** 全Todoを取得するGET `/todos`、**②** 新しいTodoを追加するPOST `/todos`（リクエストボディからタイトルを受け取って保存）、**③** 特定IDのTodoを完了済みにするPATCH `/todos/:id`。TypeORMを使って実際にSQLiteファイルにデータが保存・更新され、エンドポイント経由で正しく操作できることを確認しましょう。複雑なバリデーションはこの際省略し、ORMを使ったCRUDの流れに集中してください。

## Day 6: 認証と認可（JWTによる認証）

**学習テーマ:** JSON Web Tokenを用いたユーザ認証とアクセス制御の基礎  
**内容とゴール:** セキュアなAPIにはユーザ認証（Authentication）と認可（Authorization）が必要です。Python/FastAPIでもOAuth2やJWTを使った認証の経験があるかもしれませんが、Node.js/TypeScriptでも代表的な方法は**JWT（JSON Web Token）**を用いたトークン認証です。JWTは**署名付きのトークン**で、ユーザを識別する情報を安全にクライアントとサーバ間でやり取りできます ([How to implement JWT Authentication Using Node, Express, TypeScript ? 2023 - DEV Community](https://dev.to/cristain/how-to-implement-jwt-authentication-using-node-express-typescript-app-2023-2c5o#:~:text=JSON%20web%20token,be%20used%20for%20information%20exchange))。この日は簡単なJWT認証の仕組みを実装してみます。  
  - **JWTの発行:** ユーザがログインすると想定し、例えば`POST /login`エンドポイントでユーザ名・パスワードを受け取ります（今回は簡略化して固定のユーザ名/パスワードをチェックするなど）。認証情報が正しければ、サーバ側で`jsonwebtoken`ライブラリを使いJWTを生成します（例: `jwt.sign({ userId: xxx }, SECRET_KEY, { expiresIn: '1h' })`）。このトークンをレスポンスとしてクライアントに返します。  
  - **認可（保護されたルート）:** クライアントは以降のリクエストでJWTをHTTPヘッダ（通常は`Authorization: Bearer <token>`）に載せて送ります。サーバ側では受け取ったJWTを検証し（`jwt.verify(token, SECRET_KEY)`）、有効であればリクエストを処理、無効または未提供であれば401 Unauthorizedを返すようにします。これをミドルウェアとして実装し、保護したいルートに適用します。例えば、`/profile`というユーザプロフィール取得APIはJWT検証ミドルウェアを通過した後に処理を行うようにします。  
  - **Passportの紹介:** Node.jsには**Passport.js**という有名な認証ミドルウェアもあります ([Passport.js](https://www.passportjs.org/#:~:text=Passport%20is%20authentication%20middleware%20for,Twitter%20%2C%20and%20%204))。Passportを使うと様々な認証戦略（JWTはもちろん、OAuthログインなども）を統一的なインターフェースで導入できます ([Passport.js](https://www.passportjs.org/#:~:text=Passport%20is%20authentication%20middleware%20for,Twitter%20%2C%20and%20%204))。今回はJWTの基本を自前で実装しましたが、規模が大きくなればPassportの導入も検討してください（Passportには`passport-jwt`というJWT認証用のStrategyがあります ([passport-jwt](https://www.passportjs.org/packages/passport-jwt/#:~:text=A%20Passport%20strategy%20for%20authenticating,using%20a%20JSON%20web%20token))）。  
- **ゴール:** JWTの原理を理解し、自前のAPIに認証の概念を組み込めるようになること。具体的には、**(1)** ログイン用エンドポイントで正しい資格情報の場合にJWTを発行できる、**(2)** JWTをヘッダから受け取り検証するミドルウェアを実装できる、**(3)** JWTの有効期限切れや不正なJWTに対して適切に401エラーを返せる、といった基本実装を行います。

**推奨リソース:**  
- Dev.to記事: 「How to implement JWT Authentication (Node, Express, TypeScript) ([How to implement JWT Authentication Using Node, Express, TypeScript ? 2023 - DEV Community](https://dev.to/cristain/how-to-implement-jwt-authentication-using-node-express-typescript-app-2023-2c5o#:~:text=JSON%20web%20token,be%20used%20for%20information%20exchange))」（JWTの基礎説明から、Node/Expressでの実装手順が段階的に書かれています。トークン発行・検証のコード例もあり実践的です）  
- DigitalOcean解説: 「API Authentication with JSON Web Tokens and Passport」 ([How To Implement API Authentication with JSON Web Tokens and Passport | DigitalOcean](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport#:~:text=Many%20web%20applications%20and%20APIs,access%20only%20to%20verified%20users)) ([How To Implement API Authentication with JSON Web Tokens and Passport | DigitalOcean](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport#:~:text=This%20guide%20will%20walk%20you,an%20authentication%20middleware%20for%20Node))（Passport.jsを用いたJWT認証の包括的チュートリアル。Passportの導入方法やセッション vs JWTの比較など参考になります）  

**練習課題:** **疑似的なログイン認証フローを構築**してみましょう。（実際のユーザ登録は省略して）固定のユーザ名・パスワード（例えば user: alice, pass: password123）をサーバに用意し、**①** `POST /login` で認証情報を受け取ってチェックする。合致すればJWTを生成して返し、異なれば401エラーを返す。**②** 認証が必要な保護ルートとして `GET /profile` を用意する。このルートはJWT認証ミドルウェアを通過した場合のみユーザ情報を返し、認証されていない場合は拒否する。実際に`/login`で取得したトークンを`Authorization`ヘッダに付与して`/profile`にアクセスし、正しくユーザ情報を取得できることを確認してください。トークン無しや不正なトークンでアクセスした場合に401エラーとなることもテストしましょう。

## Day 7: NestJSフレームワーク入門

**学習テーマ:** 次世代フレームワークNestJSの基本とプロジェクト構造  
**内容とゴール:** Expressで基礎を掴んだところで、TypeScript製のフレームワーク**NestJS**にも触れてみます。NestJSは「効率的でスケーラブルなNode.jsサーバーサイドアプリケーションを構築するためのフレームワーク」です ([NestJSとは？使うべき理由やおすすめの学習方法を初心者向けに解説 | NEUTRAL](https://saas.n-works.link/programming/type-script/what_is_nestjs#:~:text=NestJS%E3%81%AFNode))。Angularに着想を得た構造（依存性注入やデコレータを多用）で、大規模開発向けの堅牢なプロジェクト構成を提供します。TypeScriptを前提としているため型の恩恵を最大限に受けられるのも特徴です。  
  - **プロジェクト作成:** NestJS公式CLIを使って新規プロジェクトを作成します（`npm i -g @nestjs/cli`でCLIインストール後、`nest new myapp`で雛形プロジェクト生成） ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=Setting%20up%20a%20new%20project,commands%20in%20your%20OS%20terminal))。生成されたプロジェクトにはコントローラやサービスの例、およびテストファイルが含まれています ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=main))。この構造を確認しましょう。`main.ts`にはアプリをブートストラップするコードが既に書かれており、Expressと違ってHTTPサーバーの立ち上げ等はNestが内部で処理してくれます ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=import%20,from%20%27.%2Fapp.module))。  
  - **基本コンセプト:** NestJSは**モジュール**, **コントローラ**, **プロバイダ(サービス)**という3つの主要コンポーネントで構成されます。簡単に言うと、**コントローラ**はルーティングとリクエスト受け取りを担当し、**サービス**（プロバイダ）はビジネスロジックやデータアクセスを担当、それらを束ねる単位が**モジュール**です。`app.module.ts`を見ると`AppController`と`AppService`が登録されているのが分かります。これはFastAPIで言えば**ルーターや依存関数**をまとめているようなイメージで、機能ごとにモジュールを分割できます。  
  - **デコレータとDI:** NestJSではクラスやメソッドにデコレータ（`@Controller`, `@Get`, `@Injectable`など）を付けて、フレームワークがそれらを自動的にスキャン・実行します。例えば、新しいコントローラを作るには`nest generate controller cats`のようなCLIコマンドを使うこともできます。依存性注入（DI）も組み込まれており、サービスクラスをコントローラのコンストラクタにinjectして使う、といったことが可能です。  
- **ゴール:** NestJSのプロジェクトをローカルで起動し、デフォルトのエンドポイント（例: HTTP GET `/`が"Hello World!"を返す）にアクセスして動作確認すること ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=JS%20%20TS))。プロジェクト構造の各ファイルが何をしているか理解し、Expressで行っていた処理がNestではどの部分で担われているか把握すること。たとえば、Expressの`app.get`で定義したルートはNestではコントローラ内のメソッド（@Getデコレータ付き）として定義されている等、対応関係を掴みます。

**推奨リソース:**  
- NestJS公式ドキュメント: 「First Steps（はじめの一歩）」 ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=Setting%20up%20a%20new%20project,commands%20in%20your%20OS%20terminal)) ([First steps | NestJS - A progressive Node.js framework](https://docs.nestjs.com/first-steps#:~:text=main))（NestCLIでのプロジェクト作成方法から、生成されるファイル構成の説明まで丁寧に解説されています）  
- n-works記事: 「NestJSとは？使うべき理由や学習方法」 ([NestJSとは？使うべき理由やおすすめの学習方法を初心者向けに解説 | NEUTRAL](https://saas.n-works.link/programming/type-script/what_is_nestjs#:~:text=NestJS%E3%81%AFNode))（NestJSの特徴を日本語でまとめた記事。メリット・デメリットや学習リソースについて触れられており、NestJSの全体像をつかむのに役立ちます）  

**練習課題:** NestJSプロジェクトにおいて、簡単な**新規モジュールとコントローラ**を追加してみましょう。たとえば「Cats」モジュールを作成し、その中に`CatsController`を定義します。`CatsController`には`GET /cats`で"Meow!"という文字列を返すハンドラを実装してください（ヒント: `@Controller('cats')`と`@Get()`デコレータを用います）。Nest CLIを使わず手動でクラスを作成しても構いませんが、CLIコマンド（`nest g module cats`, `nest g controller cats`）を使うと自動生成してくれます。新しいモジュールを`AppModule`にインポートし、サーバを再起動して実際に`/cats`にアクセスして期待通りのレスポンスが返ることを確認しましょう。

## Day 8: NestJSでのCRUD開発とデータベース統合

**学習テーマ:** NestJSを使った実践的なCRUD API構築とデータベース連携  
**内容とゴール:** NestJSの基礎構造に慣れたら、より実践的なCRUD処理とデータベース接続を試します。Day5で扱ったTypeORMをNestJSに組み込んでみましょう。NestJSはデータベースに対して**アグノスティック（特定のDBに依存しない）**で、TypeORMやPrismaなど様々なORM/ODMを簡単に統合できます ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=Nest%20is%20database%20agnostic%2C%20allowing,would%20with%20Express%20or%20Fastify))。公式に`@nestjs/typeorm`モジュールが提供されており、これを使うとTypeORMの接続をNest流に管理できます ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=For%20convenience%2C%20Nest%20provides%20tight,your%20chosen%20database%20even%20easier)) ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=For%20integrating%20with%20SQL%20and,well%20with%20the%20Nest%20framework))。  
  - **TypeORMモジュール導入:** `npm install @nestjs/typeorm typeorm mysql2`（MySQLを使う場合）等で必要パッケージを追加し、`app.module.ts`で`TypeOrmModule.forRoot({...})`をインポートします ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=%24%20npm%20install%20,typeorm%20mysql2)) ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=import%20,nestjs%2Ftypeorm))。設定オブジェクトにデータベースの種類や接続情報、エンティティの一覧を渡します。SQLiteなら`type: 'sqlite'`として`database: 'sample.db'`のようにファイルパスを指定します。`forRoot`でグローバルに接続を設定したら、各機能モジュールでも`TypeOrmModule.forFeature([Entity])`を使ってエンティティごとのリポジトリを提供できます。  
  - **エンティティとリポジトリのNest流利用:** 例えばユーザエンティティをDay5で定義したのと同様に用意し、NestJSプロジェクト内の`entities`ディレクトリに配置します。`UsersModule`を作成し、その中で`TypeOrmModule.forFeature([User])`をインポートすると、Nestの依存性注入で`UserRepository`（または`Repository<User>`）を他のサービスで利用できます ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=TypeORM%20Integration))。これにより、UsersService内でTypeORMのリポジトリを使ってCRUD操作を実装できます。PythonのFastAPIでSQLAlchemyセッションをDependsで受け取るのに似た仕組みです。  
  - **CRUD API実装:** NestJSでユーザCRUD APIを作ってみましょう。`UsersService`に`findAll`, `findOne`, `create`, `update`, `remove`といったメソッドを実装し、それを呼び出す`UsersController`を用意します。例えば`POST /users`はDTO（Data Transfer Object）クラスでバリデーション付きの入力を受け取り（Nestにはクラスバリデーションを行う仕組みもありますがここでは簡易に）、Service経由でTypeORMリポジトリの`save`を呼び出してDBに保存します。`GET /users`は単に`find()`で全件取得した結果を返します。NestJSの例外フィルターにより、エラー時には自動的に適切なHTTPステータスコードが返されます（例えば`EntityNotFound`例外が投げられた場合404にマッピングされる等）。必要に応じて自分で`HttpException`をthrowしてエラー制御も可能です。  
- **ゴール:** NestJS上でエンドツーエンドにデータベースと連携したAPIが動作すること。具体的には、**ユーザエンティティのCRUD API**を完成させ、実際にHTTPリクエストでデータを作成・取得・更新・削除できることを確認します。Expressで行った実装と比較して、NestJSではボイラープレートが多いものの、コードが整理され見通し良く書けることを感じ取ってください。また、NestJSの公式ドキュメントにはこのようなCRUDアプリのチュートリアルがあるので適宜参照し、ベストプラクティス（例えばDTOとパイプによる入力検証など）も意識できると尚良いです。

**推奨リソース:**  
- NestJS公式ドキュメント: 「Techniques - Database」 ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=Nest%20is%20database%20agnostic%2C%20allowing,would%20with%20Express%20or%20Fastify)) ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=TypeORM%20Integration))（NestJSとTypeORMの統合方法を解説した章。TypeORMを用いたDB接続設定やエンティティの提供方法などが詳しく書かれています）  
- NestJS公式ドキュメント: 「SQL (TypeORM)」 ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=For%20integrating%20with%20SQL%20and,well%20with%20the%20Nest%20framework)) ([Database | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database?ref=the-full-stack-engineer#:~:text=%24%20npm%20install%20,typeorm%20mysql2))（TypeORMを利用した具体例。MySQLへの接続設定や`forFeature`の使い方、リポジトリパターンによるエンティティ操作などの説明があります）  

**練習課題:** NestJSで**「書籍管理」API**を作成してみましょう。`Book`エンティティ（タイトル、著者、出版年など）を定義し、`BooksModule/Service/Controller`をNest CLIで生成します。データベースはSQLite等で構いませんので、TypeORM経由で`Book`のCRUDを実装してください。具体的には、**①** `GET /books`（全書籍取得）、**②** `GET /books/:id`（IDで書籍取得）、**③** `POST /books`（書籍追加）、**④** `PUT /books/:id`（書籍情報更新）、**⑤** `DELETE /books/:id`（書籍削除）の5つのエンドポイントを作ります。NestJSのサービスクラス内でTypeORMのリポジトリを使い、それぞれ適切なCRUDメソッド（find, findOneBy, save, update, delete 等）を呼んでください。最後にHTTPクライアントから各APIを呼び出し、期待通りデータベースの内容が変化し、正しいレスポンスが返ることを確認しましょう。

## Day 9: テストとデバッグ（Jestによる自動テスト）

**学習テーマ:** TypeScriptバックエンドのテスト手法とデバッグテクニック  
**内容とゴール:** バックエンド開発ではコードの品質を保つために**自動テスト**を導入することが重要です。Pythonではpytestなどを使いますが、Node/TypeScriptでは**Jest**というテストフレームワークがデファクトスタンダードです。NestJSプロジェクトでは最初からJestがセットアップされており、サンプルのテストファイルも含まれていました。  
  - **Jest概要:** Jestは「どんなJavaScript/TypeScriptコードベースの正しさも担保できるよう設計されたテスティングフレームワーク」で、馴染みやすいAPI（`describe`, `it`, `expect`など）でテストを書くことができます ([Jest ·  Delightful JavaScript Testing](https://jestjs.io/#:~:text=Jest%20is%20a%20JavaScript%20testing,that%20gives%20you%20results%20quickly))。初期設定なしでも動作し、スナップショットテストやモック機能も内蔵するなど、総合的なテストツールです。  
  - **単体テスト:** まずは純粋な関数のテストを書いてみます。たとえばDay2で作成したユーティリティ関数（文字列を加工する関数など）があるなら、それに対するテストを書きます。Jestでは`*.spec.ts`または`*.test.ts`というファイル名でテストコードを書き、`expect()`を使って期待値をアサートします。`npm test`（NestJSなら`npm run test`）でテストを実行し、グリーンになることを確認しましょう。TypeScriptでもJestはトランスパイルを内部で処理できるので、特別な設定なくTSのまま書けます。  
  - **APIの統合テスト:** 次に、ExpressやNestJSのAPIエンドポイントをテストする方法です。**Supertest**というライブラリを使うと、HTTPサーバを起動せずにエンドポイントを呼び出すテストができます ([Testing Express Api with Jest and Supertest - DEV Community](https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf#:~:text=So%20we%27re%20going%20to%20use,doing%20http%20testing%2C%20called%20supertest))。Expressの場合は`app`オブジェクトを読み込んでおき、`request(app).get('/path')...`のようにリクエストを発行し、ステータスコードやレスポンスボディを検証できます。NestJSでは`TestingModule`を使ってアプリケーションを起動し、同様にSupertestでエンドポイントを叩くことができます。これにより、コントローラからサービス、DBアクセスまで含めた**エンドツーエンドテスト**が可能です。  
  - **デバッグ方法:** テストとは異なりますが、開発中にデバッグする方法も確認しましょう。Node.jsは`console.log`デバッグが多用されますが、VSCodeのデバッガを使ってブレークポイントを貼ることもできます。ts-nodeやNest CLIの`--debug`オプションを使うか、コンパイルしたJSを直接デバッグする設定を行います。バグ調査の際には、TypeScriptの型エラーに助けられることも多いですが、実行時エラーには従来通りのデバッグ手法が有効です。  
- **ゴール:** 少なくとも1つ以上のユニットテストを作成し実行できていること。また、エンドポイントに対する統合テストを書き、開発中に変更を加えてもテストでリグレッション（機能の後退）を検知できる体制の基本を理解します。テスト実行方法（Jestのコマンドやウォッチモード）、カバレッジ出力方法（`--coverage`オプション）なども試してみてください ([Jest ·  Delightful JavaScript Testing](https://jestjs.io/#:~:text=Code%20coverage))。  

**推奨リソース:**  
- Jest公式サイト: 「Getting Started（はじめ方）」 ([Jest ·  Delightful JavaScript Testing](https://jestjs.io/#:~:text=Jest%20is%20a%20JavaScript%20testing,that%20gives%20you%20results%20quickly))（Jestの哲学と基本的な使い方が書かれています。シンプルなテストコードの例や、Jestが設定なしで動作すること、豊富なAPIについて紹介されています）  
- Dev.to記事: 「Testing Express API with Jest and Supertest」 ([Testing Express Api with Jest and Supertest - DEV Community](https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf#:~:text=So%20we%27re%20going%20to%20use,doing%20http%20testing%2C%20called%20supertest)) ([Testing Express Api with Jest and Supertest - DEV Community](https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf#:~:text=The%20idea%20of%20today%27s%20application,behavior%20of%20those%20same%20endpoints))（Jest＋Supertestを使ったAPIテストの解説記事。自動テストの必要性から始まり、簡単なExpressアプリを用意してテストケースを書く手順が示されています）  

**練習課題:** **ユーザサービスのユニットテスト**を実装してみましょう。Day8でNestJS上にUsersService（またはDay5/6でExpress用にユーザ機能を実装していればそれでも可）を作成していれば、そのビジネスロジック部分を単体テストします。例えば、UsersServiceの`findOne(id)`メソッドに対して、存在しないIDを渡したときに適切な例外が throw されるか、またはnullが返るかをテストします。リポジトリをモックする必要があればJestのモック機能を使ってください。また、**統合テスト**として保護されたルートの認可をテストしてみます。JWTなしで`/profile`にアクセスした場合401になること、JWTありでアクセスした場合200が返ることをSupertestで検証してみましょう。これらのテストを実行し、全てグリーンになることを確認してください。テスト駆動でバグを発見・修正する流れも体験できれば理想的です。

## Day 10: 総合演習と次のステップ

**学習テーマ:** 学んだ内容の総復習と小規模プロジェクトの構築、そして今後の学習指針  
**内容とゴール:** 最終日はこれまで習得した技術を総動員して、一つのミニプロジェクトを完成させましょう。また、今後さらにTypeScriptバックエンド開発者としてスキルアップするための指針を整理します。  
  - **総合演習プロジェクト:** テーマは自由ですが、例えば「簡易ブログAPI」を構築してみるのはいかがでしょうか。ユーザ登録・ログイン（JWT認証）、記事の投稿・取得・削除といった一連の機能を持つREST APIを、ExpressまたはNestJSで実装します。2時間で全てを作り込むのは難しい場合、**認証＋記事CRUD**程度の範囲で構いません。データベースはSQLiteなどファイルDBを使い、ORM経由で操作します。ディレクトリ構成も意識して、Expressならルートやサービスクラスをモジュール化する、NestJSならモジュール分割をきちんと行う、などプロジェクト構造を整理しましょう。**ポイント:** 今まで各日に学んだベストプラクティス（例えば環境変数管理に`dotenv`を使う、エラー処理をきちんと行う、型定義を漏れなく書く、など）を盛り込み、「10日間で作れるバックエンド」の完成形を目指します。  
  - **動作確認とデプロイ検討:** ローカルで作ったAPIを実際に動かし、様々なテストケースで正しく動作するか確認します。時間に余裕があれば、クラウドサービス（RailwayやHerokuなどNodeアプリを手軽にデプロイできるプラットフォーム）にデプロイしてみるのも良い経験です。デプロイまでは行わなくとも、READMEにプロジェクトのセットアップ方法やAPI仕様を書き出してみることで、自分の成果物をまとめる練習になります。  
  - **次のステップ:** 10日間の学習でTypeScriptバックエンド開発の土台ができたはずです。今後はさらに深掘りと応用を進めましょう。例えば、**高度なトピック:** (1)NestJSの中級機能（ガード、インターセプター、カスタムデコレータ、マイクロサービス機能など）、(2)GraphQL（Apollo ServerとNestJSによるGraphQL API構築）、(3)Webソケット（Socket.ioを使ったリアルタイム通信）やキューベースの非同期処理、(4)認証の高度化（Refresh TokenやOAuth認証統合）、(5)テストの高度化（自動テストのカバレッジ向上やCI/CD導入）など。さらに、実プロジェクトを見るのも勉強になります。オープンソースのTypeScript製バックエンドを読んでみたり、GitHub上のプロジェクトに触れてみましょう ([GitHub - RaoofJM/nodejs-typescript-realworld-backend: RealWorld Example of a NodeJS Rest API using TypeScript, MongoDB, Redis and Docker](https://github.com/RaoofJM/nodejs-typescript-realworld-backend#:~:text=This%20repository%20contains%20a%20sample,solid%20foundation%20for%20backend%20development))。TypeScript/Nodeエコシステムは進化が速いので公式ブログやコミュニティ（Qiitaやdev.toなど）の最新記事にもアンテナを張ると良いでしょう。  
- **ゴール:** 自分で決めたテーマのバックエンドを0から実装し、GitHubにコードを公開してみること。コードを書き上げる中で、10日間の各トピック（環境構築、言語仕様、フレームワーク、DB、認証、テスト）が統合的に理解できたことを実感できるでしょう。また、今後何を学ぶべきかの道筋が見え、継続してTypeScriptバックエンド開発スキルを伸ばしていける状態になることが目標です。

**推奨リソース:**  
- GitHubリポジトリ: 「nodejs-typescript-realworld-backend」 ([GitHub - RaoofJM/nodejs-typescript-realworld-backend: RealWorld Example of a NodeJS Rest API using TypeScript, MongoDB, Redis and Docker](https://github.com/RaoofJM/nodejs-typescript-realworld-backend#:~:text=This%20repository%20contains%20a%20sample,solid%20foundation%20for%20backend%20development))（TypeScript + Nodeで実装された実践的なREST APIのサンプルプロジェクト。MongoDBやRedis、Dockerを用いた本格的な構成ですが、ベストプラクティスに沿ったコード構成は非常に参考になります）  
- GitHubリポジトリ: 「REST API with Node/TypeScript Example」 ([GitHub - nmanikiran/rest-api-node-typescript: This is a simple REST API with node and express with typescript](https://github.com/nmanikiran/rest-api-node-typescript#:~:text=REST%20API%20with%20Node%20using,Typescript))（シンプルなNode+Express+TypeScriptのREST API例。基本的なプロジェクト構造やコードがコンパクトにまとまっており、学習のまとめに自分の実装と比較するのに役立ちます）  

**練習課題:** **ポートフォリオ用バックエンドサービスの構築:** 自身の興味のある題材でバックエンドAPIを設計・実装してください。例えば、「タスク管理API」「書籍レビューAPI」「チャットサービスAPI」など何でも構いません。一から設計し、**エンドポイント設計→スキーマ定義（モデル/エンティティ）→実装（必要なら認証も）→テスト**の流れを踏みましょう。可能な範囲でドキュメントも整備し、他の人がREADMEを読めばセットアップして試せる状態にします。この演習によって、実践的な開発プロセスを一通り経験でき、TypeScriptバックエンド開発者として自信を持って次のプロジェクトに臨めるようになるでしょう。

