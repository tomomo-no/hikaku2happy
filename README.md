# ひかくハッピー（hikaku2happy.com）

登山用ヘッドランプの比較サイトです。HTMLだけで動くシンプルなサイトなので、ビルドは不要です。

## ファイル
- `index.html` … トップページ（比較表）
- `data.js` … ヘッドランプのデータ（スペック・価格・購入リンク）
- `app.js` … 絞り込み・並び替えの動き
- `style.css` … デザイン
- `about.html` … 運営者情報・免責事項・広告について

## アフィリエイトリンクの入れ方
`data.js` の各商品にある `links` の `""` の中にURLを貼るだけです。

```js
links: { amazon: "https://amzn.to/xxxx", rakuten: "https://hb.afl.rakuten.co.jp/xxxx", a8: "" }
```

空のままの場合は、Amazon・楽天の検索ページへのリンクが表示されます。

## Cloudflare Pages の設定
- フレームワーク：なし（None）
- ビルドコマンド：空欄
- 出力ディレクトリ：`/`（空欄でも可）
