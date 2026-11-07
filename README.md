# ひかくハッピー（hikaku2happy.com）

登山道具の比較サイトです。HTMLだけで動くシンプルなサイトなので、ビルドは不要です。

## ページとファイル
- `index.html` … トップページ（各比較ページへの入口）
- `headlamp/` … 登山用ヘッドランプ比較（https://hikaku2happy.com/headlamp/）
  - `data.js` … ヘッドランプのデータ　`app.js` … 絞り込み・並び替え
- `tent/` … 軽量登山テント比較（https://hikaku2happy.com/tent/）
  - `data.js` … テントのデータ　`app.js` … 絞り込み・並び替え
- `style.css` … 全ページ共通のデザイン
- `about.html` … 運営者情報・免責事項・広告について

## アフィリエイトリンクの入れ方
各ページの `data.js` の各商品にある `links` の `""` の中にURLを貼るだけです。

```js
links: { amazon: "https://amzn.to/xxxx", rakuten: "https://hb.afl.rakuten.co.jp/xxxx", a8: "" }
```

空のままの場合は、Amazon・楽天の検索ページへのリンクが表示されます。

## Cloudflare Pages の設定
- フレームワーク：なし（None）
- ビルドコマンド：空欄
- 出力ディレクトリ：`/`（空欄でも可）
