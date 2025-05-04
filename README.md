# MD Editor

マークダウンエディタアプリケーションです。Electron、React、styled-componentsを使用して構築されています。

## 機能

- リアルタイムプレビュー：入力したMarkdownが即座にプレビューとして表示されます
- 幅広いMarkdown要素をサポート：ヘッダー、リスト、リンク、画像、コードブロック、表など
- テーマ設定：ライト、ダーク、セピアの3つのテーマから選択可能
- ファイル管理：Markdownファイルの新規作成、開く、保存、名前を付けて保存
- エクスポート機能：HTML、PDFへのエクスポートをサポート

## 開発環境のセットアップ

### 前提条件

- Node.js (v14以上)
- npm または yarn

### インストール

リポジトリをクローンした後、以下のコマンドを実行して依存関係をインストールします：

```bash
npm install
# または
yarn install
```

### 開発モードでの実行

開発モードでアプリケーションを起動するには：

```bash
npm run dev
# または
yarn dev
```

このコマンドは、Webpackの開発サーバーとElectronアプリケーションを同時に起動します。

### ビルド

配布用のパッケージを作成するには：

```bash
npm run build
# または
yarn build
```

ビルドされたアプリケーションは `dist` ディレクトリに生成されます。

## プロジェクト構造

```
md-editor/
  ├── build/              # ビルドされたファイル
  ├── src/                # ソースコード
  │   ├── components/     # Reactコンポーネント
  │   ├── contexts/       # Reactコンテキスト
  │   ├── themes/         # テーマ設定
  │   ├── index.html      # HTMLテンプレート
  │   └── index.js        # アプリケーションのエントリーポイント
  ├── main.js             # Electronのメインプロセス
  ├── preload.js          # Electronのプリロードスクリプト
  ├── package.json        # プロジェクト設定
  └── webpack.config.js   # Webpack設定
```

## 今後の改善予定

- 検索・置換機能
- スペルチェック
- 分割表示モード（エディターとプレビューの横並び／縦並びの切り替え）
- 画像のドラッグ＆ドロップサポート
- 自動保存機能
- カスタムCSSのサポート 