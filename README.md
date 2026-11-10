# ひかくハッピー（hikaku2happy.com）

登山道具の比較サイトです。HTMLだけで動くシンプルなサイトなので、ビルドは不要です。

## ページとファイル
- `index.html` … トップページ（各比較ページへの入口）
- `headlamp/` … 登山用ヘッドランプ比較（https://hikaku2happy.com/headlamp/）
  - `data.js` … ヘッドランプのデータ　`app.js` … 絞り込み・並び替え
- `tent/` … 軽量登山テント比較（https://hikaku2happy.com/tent/）
  - `data.js` … テントのデータ　`app.js` … 絞り込み・並び替え
- `sleepingbag/` … 登山用寝袋（シュラフ）比較（https://hikaku2happy.com/sleepingbag/）
  - `data.js` … 寝袋のデータ　`app.js` … 絞り込み・並び替え　`guide.html` … 選び方
- `trailpack/` … トレランザック比較（https://hikaku2happy.com/trailpack/）
  - `data.js` … ザックのデータ　`app.js` … 絞り込み・並び替え　`guide.html` … 選び方
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

## 商品画像の入れ方
`headlamp/img/`・`tent/img/`・`sleepingbag/img/`・`trailpack/img/` に `<商品id>.webp`（例：`nitecore-ut27.webp`）を置くと、比較表とスマホ用カードに自動で表示されます。画像がない商品は薄いアイコンが出ます。
- おすすめ：正方形 800×800px、WebP、1枚100KB以下
- メーカーやショップの写真は無断で使わない（自分で撮った写真、楽天・Amazonの公式リンクツールの画像、自分で生成した画像を使う）

## 楽天アフィリエイト
`headlamp/app.js`・`tent/app.js`・`sleepingbag/app.js`・`trailpack/app.js` の `RAKUTEN_AFF_ID` にIDが入っています。楽天ボタンはすべて自動でアフィリエイトリンクになります。`data.js` の `links.rakuten` に商品ごとのリンクを貼った場合はそちらが優先されます。
楽天で取り扱いのない商品は `noRakuten: true` と `official`（公式サイトURL）を設定すると、楽天ボタンの代わりに「公式サイト」ボタンが出ます。
