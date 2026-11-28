// 登山用スリーピングマットのデータ
// ・基本はレギュラーサイズ（長さ180〜186cm）の値です。山と道は175cm。ニーモはレギュラーマミー、エクスペドはM、シートゥサミットはレギュラー。
// ・weight は本体の重さ（g）。収納袋は含みません。メーカー公表値です。
// ・r は R値（地面からの冷えを防ぐ力。数字が大きいほど暖かい）。ASTM規格の値です。
// ・type は "エア"（空気で膨らませる）/ "フォーム"（ウレタンなどの折りたたみ・ロール）/ "インフレーター"（バルブを開けると自動で膨らむ）。
// ・length × width × thick は使うときのサイズ（cm）。packed は収納サイズ。
// ・価格は2026年11月時点の国内の参考価格（税込・目安）。わからないものは null（表では「要確認」）。
// ・アフィリエイトリンクを取得したら、links の "" の中にURLを貼ってください。空なら検索ページへのリンクが出ます。
const MATS = [
  // ===== サーマレスト (THERMAREST) =====
  {
    id: "thermarest-neoair-xlite-nxt-r",
    brand: "サーマレスト",
    name: "ネオエアー Xライト NXT レギュラー",
    search: "サーマレスト ネオエアー Xライト NXT レギュラー",
    type: "エア",
    r: 4.5,
    weight: 370,
    length: 183, width: 51, thick: 7.6,
    packed: "23×10cm",
    price: 36900,
    point: "軽さと暖かさのバランスで選ぶならまずこれ。370gでR値4.5、1Lボトルほどの大きさにたためます。",
    tags: ["定番", "軽量"],
    links: { amazon: "", rakuten: "", a8: "" }
  },
  {
    id: "thermarest-neoair-xtherm-nxt-r",
    brand: "サーマレスト",
    name: "ネオエアー Xサーモ NXT レギュラー",
    search: "サーマレスト ネオエアー Xサーモ NXT レギュラー",
    type: "エア",
    r: 7.3,
    weight: 440,
    length: 183, width: 51, thick: 7.6,
    packed: "23×11cm",
    price: 46200,
    point: "雪の上でのテント泊の定番。R値7.3でも440gと軽く、冬山で寝袋の暖かさを生かしきれます。",
    tags: ["冬山", "定番"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：46,200円（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a131bc0.0fd37eb2.5a131bc1.0030c87f/?me_id=1212891&item_id=10056868&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsportsx%2Fcabinet%2F2026%2F04%2F30383_1.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a131bc0.0fd37eb2.5a131bc1.0030c87f/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsportsx%2F30383%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "thermarest-neoair-uberlite-r",
    brand: "サーマレスト",
    name: "ネオエアー ウーバーライト レギュラー",
    search: "サーマレスト ネオエアー ウーバーライト レギュラー",
    type: "エア",
    r: 2.3,
    weight: 250,
    length: 183, width: 51, thick: 6.4,
    packed: "15×9cm",
    price: 34320,
    point: "250gの超軽量モデル。夏山や、荷物を少しでも軽くしたい縦走向け。生地が薄いので下にシートを敷くと安心です。",
    tags: ["夏山", "最軽量クラス"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：34,320円（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a131b21.36a16804.5a131b22.ec672381/?me_id=1214860&item_id=10031230&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fmoose%2Fcabinet%2Fdefault%2F1581933541.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a131b21.36a16804.5a131b22.ec672381/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmoose%2Fm30d-20ss-30052%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "thermarest-zlite-sol-r",
    brand: "サーマレスト",
    name: "Zライト ソル レギュラー",
    search: "サーマレスト Zライトソル レギュラー",
    type: "フォーム",
    r: 2.0,
    weight: 410,
    length: 183, width: 51, thick: 2,
    packed: "51×13×14cm",
    price: 11550,
    point: "パンクの心配がない折りたたみ式。休憩中のイスにもなり、冬はエアマットの下に重ねると暖かさが足し算できます。",
    tags: ["パンクしない", "重ね使い"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：9,999円（税込、送料別)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a131a8a.8047c23c.5a131a8b.5f1376dd/?me_id=1273157&item_id=21248304&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsupersportsxebio%2Fcabinet%2F1%2F5600304%2F8881230_m.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a131a8a.8047c23c.5a131a8b.5f1376dd/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsupersportsxebio%2F108881230011%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  // ===== ニーモ (NEMO) =====
  {
    id: "nemo-tensor-allseason-rm",
    brand: "ニーモ",
    name: "テンサー オールシーズン レギュラーマミー",
    search: "ニーモ テンサー オールシーズン レギュラーマミー",
    type: "エア",
    r: 5.4,
    weight: 400,
    length: 183, width: 51, thick: 9,
    packed: "25.5×10cm",
    price: 33000,
    point: "厚さ9cmで寝心地がよく、R値5.4で晩秋から残雪期までこなせます。足元が細いマミー型で軽量。",
    tags: ["寝心地", "オールシーズン"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：33,000円（税込、送料別)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a1317ca.1ec587cb.5a1317cb.408a76f4/?me_id=1300791&item_id=10202143&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fcrosscamper%2Fcabinet%2Fcoupon%2F1058%2Fnem419-004025-lgy055.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a1317ca.1ec587cb.5a1317cb.408a76f4/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fcrosscamper%2Fnem419-004025-lgy055%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "nemo-tensor-extreme-rm",
    brand: "ニーモ",
    name: "テンサー エクストリームコンディションズ レギュラーマミー",
    search: "ニーモ テンサー エクストリームコンディションズ レギュラーマミー",
    type: "エア",
    r: 8.5,
    weight: 472,
    length: 183, width: 51, thick: 9,
    packed: "25.5×10cm",
    price: 38500,
    point: "この表でいちばん暖かいR値8.5。厳冬期の雪の上でも、このマット1枚で地面からの冷えをしっかり防げます。",
    tags: ["冬山", "いちばん暖かい"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：36,575円～（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a13172f.3daba7f9.5a131730.6a9759c9/?me_id=1213895&item_id=10018029&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fshugakuso%2Fcabinet%2F10489845%2F12332862%2Fimgrc0112881951.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a13172f.3daba7f9.5a131730.6a9759c9/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshugakuso%2Fnem419-001025-002025%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "nemo-tensor-elite-rm",
    brand: "ニーモ",
    name: "テンサー エリート レギュラーマミー",
    search: "ニーモ テンサーエリート レギュラーマミー",
    type: "エア",
    r: 2.4,
    weight: 240,
    length: 183, width: 51, thick: 7.6,
    packed: "14×8cm",
    price: null,
    point: "240gでこの表の最軽量。厚さ7.6cmあるので、軽さのわりに寝心地を落としたくない夏山向け。",
    tags: ["夏山", "最軽量クラス"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：35,200円（税込、送料別)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a1317ca.1ec587cb.5a1317cb.408a76f4/?me_id=1300791&item_id=10202159&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fcrosscamper%2Fcabinet%2Fcoupon%2F1058%2Fnem419-010025-lgy055.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a1317ca.1ec587cb.5a1317cb.408a76f4/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fcrosscamper%2Fnem419-010025-lgy055%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "nemo-switchback-r",
    brand: "ニーモ",
    name: "スイッチバック レギュラー",
    search: "ニーモ スイッチバック レギュラー",
    type: "フォーム",
    r: 2.0,
    weight: 415,
    length: 183, width: 51, thick: 2.3,
    packed: "51×13×14cm",
    price: 10450,
    point: "Zライトソルと並ぶ折りたたみ式の定番。凹凸が深めでクッション性が高く、値段も手ごろです。",
    tags: ["パンクしない", "コスパ"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：9,927円（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a13172f.3daba7f9.5a131730.6a9759c9/?me_id=1213895&item_id=10017757&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fshugakuso%2Fcabinet%2F10489845%2F12332862%2Fswitchback1.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a13172f.3daba7f9.5a131730.6a9759c9/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshugakuso%2Fnm-swb-r%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  // ===== モンベル (mont-bell) =====
  {
    id: "montbell-ul-airpad-180",
    brand: "モンベル",
    name: "U.L.エアパッド 180",
    search: "モンベル U.L.エアパッド 180",
    type: "エア",
    r: 1.4,
    weight: 504,
    length: 180, width: 50, thick: 7,
    packed: "Φ11×20cm",
    price: 17100,
    point: "付属のポンプバッグで約2分でふくらむ手軽さが人気。R値1.4なので、夏山や山小屋泊、ほかのマットとの重ね使い向け。",
    tags: ["夏山", "手軽"],
    official: "https://webshop.montbell.jp/goods/disp.php?product_id=1134278",
    links: { amazon: "", rakuten: "", a8: "" }
  },
  {
    id: "montbell-ul-thermo-airpad-180",
    brand: "モンベル",
    name: "U.L.サーモ エアパッド 180",
    search: "モンベル U.L.サーモ エアパッド 180",
    type: "エア",
    r: 4.9,
    weight: 563,
    length: 180, width: 50, thick: 8,
    packed: "Φ11×20cm",
    price: 21000,
    point: "R値4.9で2万円台前半。海外ブランドの同じくらいの暖かさのマットより1万円以上安く、晩秋のテント泊にちょうどいい1枚。",
    tags: ["コスパ", "晩秋"],
    official: "https://webshop.montbell.jp/goods/disp.php?product_id=1134369",
    links: { amazon: "", rakuten: "", a8: "" }
  },
  {
    id: "montbell-alpinepad25-180",
    brand: "モンベル",
    name: "U.L.コンフォートシステム アルパインパッド25 180",
    search: "モンベル アルパインパッド25 180",
    type: "インフレーター",
    r: 3.2,
    weight: 664,
    length: 180, width: 50, thick: 2.5,
    packed: "Φ16×25cm",
    price: null,
    point: "バルブを開けると中のウレタンが自分でふくらむタイプ。穴があいても少しはクッションが残るので、岩場の多いテント場でも安心です。",
    tags: ["インフレーター", "丈夫"],
    official: "https://webshop.montbell.jp/goods/disp.php?product_id=1124659",
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：16,730円（税込、送料別)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a131366.0c91a8f0.5a131367.c52f8203/?me_id=1402242&item_id=10122773&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsaino%2Fcabinet%2Fkimigayopic%2Fsystempic371%2Fb06y28jw6w-00.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a131366.0c91a8f0.5a131367.c52f8203/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsaino%2F5506y28jw6w%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  // ===== シートゥサミット (SEA TO SUMMIT) =====
  {
    id: "seatosummit-etherlight-xr-r",
    brand: "シートゥサミット",
    name: "イーサーライト XR マット レギュラー",
    search: "シートゥサミット イーサーライト XR マット レギュラー",
    type: "エア",
    r: 4.1,
    weight: 470,
    length: 183, width: 55, thick: 10,
    packed: "20.5×11cm",
    price: null,
    point: "厚さ10cm・幅55cmと、XRプロと並んでこの表でいちばん厚く、幅も広め。横向きで寝る人や、寝心地を重視する人に。",
    tags: ["寝心地", "幅広"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：30,910円～（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a13123b.a8be27ba.5a13123c.ec1c153d/?me_id=1277977&item_id=10080295&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fe-lodge-2%2Fcabinet%2Fod-bls-st1%2Fbls2-st81090.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a13123b.a8be27ba.5a13123c.ec1c153d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fe-lodge-2%2Fbls2-st81090%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  {
    id: "seatosummit-etherlight-xr-pro-r",
    brand: "シートゥサミット",
    name: "イーサーライト XR プロ マット レギュラー",
    search: "シートゥサミット イーサーライト XR プロ マット レギュラー",
    type: "エア",
    r: 7.4,
    weight: 560,
    length: 183, width: 55, thick: 10,
    packed: "21×12cm",
    price: null,
    point: "厚さ10cmの寝心地のまま、R値7.4の冬山対応。少し重くても、雪の上でぐっすり眠りたい人向け。",
    tags: ["冬山", "寝心地"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：38,830円（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a131135.3a3d3052.5a131136.ad042f49/?me_id=1421497&item_id=10006009&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbasecamp-saga%2Fcabinet%2Fgoods25%2Fdir1%2F27003sts2501.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a131135.3a3d3052.5a131136.ad042f49/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbasecamp-saga%2F27003sts2501%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  // ===== 山と道 (Yamatomichi) =====
  {
    id: "yamatomichi-ulpad-plus-175",
    brand: "山と道",
    name: "UL Pad+ 175cm",
    search: "山と道 UL Pad+",
    type: "フォーム",
    r: 2.0,
    weight: 198,
    length: 175, width: 50, thick: 1.3,
    packed: "丸めて収納（カッターで好きな長さに切れる）",
    price: null,
    point: "198gでR値2.0。フォームマットでは飛びぬけて軽く、パンクの心配もありません。カッターで切って好きな長さにでき、ザックの背面パッドとしても使えます。",
    tags: ["パンクしない", "最軽量クラス", "日本製"],
    official: "https://www.yamatomichi.com/en/products/ul-pad-plus",
    noRakuten: true,
    links: { amazon: "", rakuten: "", a8: "" }
  },
  // ===== ネイチャーハイク (Naturehike) =====
  {
    id: "naturehike-tuye-r65",
    brand: "ネイチャーハイク",
    name: "TuYe R6.5 エアマット（186cm）",
    search: "ネイチャーハイク R6.5 エアマット",
    type: "エア",
    r: 6.5,
    weight: 480,
    length: 186, width: 58, thick: 10,
    packed: "Φ10×20cm",
    price: 20600,
    point: "R値6.5・厚さ10cmで約2万円。冬用クラスの暖かさとしては、この表でいちばん安い1枚です。R値はメーカー公表値で、測り方（ASTM規格かどうか）は公表されていません。",
    tags: ["コスパ", "冬山", "幅広"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：19,990円～（税込、送料無料)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a130cc9.0366a257.5a130cca.586f7c06/?me_id=1409896&item_id=10001672&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fnaturehike-direct%2Fcabinet%2F08949947%2F08960363%2F11367101%2F1.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a130cc9.0366a257.5a130cca.586f7c06/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnaturehike-direct%2Fcnk2450ws038%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  },
  // ===== エクスペド (EXPED) =====
  {
    id: "exped-ultra-3r-m",
    brand: "エクスペド",
    name: "ウルトラ 3R M",
    search: "エクスペド ウルトラ 3R M",
    type: "エア",
    r: 2.9,
    weight: 465,
    length: 183, width: 52, thick: 7,
    packed: "23×11cm",
    price: 29150,
    point: "春から秋の3シーズン用。スイス生まれのブランドで、ポンプ袋がスタッフバッグを兼ねるので荷物が増えません。",
    tags: ["3シーズン"],
    // 楽天の「商品リンク」から取り出したリンクと画像。リンク先ショップの価格：21,680円（税込、送料別)（2026/11/28時点）
    image: "https://hbb.afl.rakuten.co.jp/hgb/5a130a29.9926dba2.5a130a2a.4ee25e8e/?me_id=1191175&item_id=10075197&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fmitsuyoshi%2Fcabinet%2Ftop%2Frkyan%2F1130-1%2Fexd00000000196.jpg%3F_ex%3D300x300&s=300x300&t=picttext",
    links: { amazon: "", rakuten: "https://hb.afl.rakuten.co.jp/ichiba/5a130a29.9926dba2.5a130a2a.4ee25e8e/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmitsuyoshi%2Fexd00000000196%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D", a8: "" }
  }
];
