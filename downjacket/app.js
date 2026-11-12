(function () {
  // 楽天の「商品リンク」で作ったHTMLを data.js の rakutenHtml に貼ると、
  // そこから商品ページへのリンクと商品画像を取り出して使う（image・links.rakuten が空のときだけ）
  JACKETS.forEach((j) => {
    if (!j.rakutenHtml) return;
    const href = (j.rakutenHtml.match(/href="(https:\/\/hb\.afl\.rakuten\.co\.jp\/[^"]+)"/) || [])[1];
    const img = (j.rakutenHtml.match(/<img[^>]+src="(https:\/\/hbb\.afl\.rakuten\.co\.jp\/[^"]+)"/) || [])[1];
    const unescape = (s) => s.replace(/&amp;/g, "&");
    if (href && !j.links.rakuten) j.links.rakuten = unescape(href);
    if (img && !j.image) j.image = unescape(img);
  });

  const BRANDS = ["すべて"].concat([...new Set(JACKETS.map((j) => j.brand))]);
  const TYPES = ["すべて", "薄手", "標準", "厚手"];
  const HOODS = ["すべて", "フードあり", "フードなし"];
  const FILLS = ["すべて", "ダウン", "化繊"];
  const state = { brand: "すべて", type: "すべて", hood: "すべて", fill: "すべて", sort: "weight-asc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TYPE_LABEL = { 薄手: "薄手（行動中・インナー）", 標準: "標準（山小屋・テント場）", 厚手: "厚手（冬山・冬キャンプ）" };

  const RAKUTEN_AFF_ID = "59502494.8a113493.59502495.49954f2c";
  // 楽天のURLをアフィリエイトリンクに変換（すでにアフィリエイトリンクならそのまま）
  function rakutenAff(url) {
    if (!RAKUTEN_AFF_ID || url.indexOf("hb.afl.rakuten.co.jp") !== -1) return url;
    return "https://hb.afl.rakuten.co.jp/ichiba/" + RAKUTEN_AFF_ID + "/?pc=" + encodeURIComponent(url) + "&link_type=hybrid_url";
  }
  const rakutenUrl = (item) => rakutenAff(item.links.rakuten || "https://search.rakuten.co.jp/search/mall/" + encodeURIComponent(item.search) + "/");
  const isRakutenImage = (src) => /(^|\/\/)[^/]*\.rakuten\.co\.jp\//.test(src) || /(^|\/\/)[^/]*\.r10s\.jp\//.test(src);

  // 商品画像：img/<id>.webp を置くと自動で表示。無い場合はプレースホルダー
  // data.js に image: "..." を書けばそちらを使う（楽天の商品画像URLもOK）。
  // 楽天の画像は楽天のアフィリエイトリンクで囲む（楽天の画像を使うときのルール）
  function thumb(item, cls) {
    const src = item.image || "img/" + item.id + ".webp";
    const img = '<img src="' + esc(src) + '" alt="' + esc(item.brand + " " + item.name) + '" loading="lazy" width="400" height="400" onerror="this.closest(\'.' + cls + '\').classList.add(\'noimg\');this.remove()">';
    const ph = '<span class="ph" aria-hidden="true">🧥</span>';
    if (item.image && isRakutenImage(item.image)) {
      return '<a class="' + cls + '" href="' + esc(rakutenUrl(item)) + '" target="_blank" rel="nofollow sponsored noopener">' + img + ph + "</a>";
    }
    return '<span class="' + cls + '">' + img + ph + "</span>";
  }

  function reviewLink(item) {
    return item.review ? '<a class="review-link" href="' + esc(item.review) + '">使ってみたレビューを読む →</a>' : "";
  }

  // アフィリエイトURLが空なら、Amazon・楽天の検索ページを使う
  function buyLinks(item) {
    const q = encodeURIComponent(item.search);
    const amazon = item.links.amazon || "https://www.amazon.co.jp/s?k=" + q;
    let html = '<a class="btn btn-amazon" href="' + esc(amazon) + '" target="_blank" rel="nofollow sponsored noopener">Amazon</a>';
    if (!item.noRakuten) {
      html += '<a class="btn btn-rakuten" href="' + esc(rakutenUrl(item)) + '" target="_blank" rel="nofollow sponsored noopener">楽天</a>';
    }
    if (item.links.a8) {
      html += '<a class="btn btn-shop" href="' + esc(item.links.a8) + '" target="_blank" rel="nofollow sponsored noopener">公式ショップ</a>';
    } else if (item.noRakuten && item.official) {
      html += '<a class="btn btn-shop" href="' + esc(item.official) + '" target="_blank" rel="nofollow noopener">公式サイト</a>';
    }
    return html;
  }

  function filtered() {
    const list = JACKETS.filter(
      (j) =>
        (state.brand === "すべて" || j.brand === state.brand) &&
        (state.type === "すべて" || j.type === state.type) &&
        (state.hood === "すべて" || (state.hood === "フードあり") === j.hood) &&
        // 「ダウン＋化繊」はどちらで絞っても出す
        (state.fill === "すべて" || j.insul.indexOf(state.fill) !== -1)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const w = (j) => (j.weight ?? big);
    const sorters = {
      "weight-asc": (a, b) => w(a) - w(b),
      "fp-desc": (a, b) => (b.fp ?? 0) - (a.fp ?? 0) || w(a) - w(b),
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big) || w(a) - w(b)
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  const weightCell = (j) =>
    (j.weight == null ? "要確認" : j.weight + " g") + (j.weightNote ? '<small class="sub">' + esc(j.weightNote) + "</small>" : "");
  const fpCell = (j) => (j.fp ? j.fp + " FP" : "—");
  const fillCell = (j) =>
    (j.fillGrams ? j.fillGrams + " g" : "—") + (j.fillNote ? '<small class="sub">' + esc(j.fillNote) + "</small>" : "");
  const insulTag = (j) => '<span class="tag tag-' + (j.insul === "ダウン" ? "double" : j.insul === "化繊" ? "charge" : "single") + '">' + esc(j.insul) + "</span>";
  const hoodCell = (j) => (j.hood ? "あり" : "なし");
  const packedCell = (j) =>
    (j.packed ? esc(j.packed) : "—") + (j.packed && j.packedL ? '<small class="sub">' + j.packedL + " L</small>" : "");

  function render() {
    const list = filtered();
    const maxW = Math.max(...JACKETS.map((j) => j.weight || 0));
    document.getElementById("count").textContent = list.length + "件のジャケット";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (j) =>
          "<tr>" +
          '<td><div class="model">' + thumb(j, "thumb") + '<span class="model-name"><span class="brand">' + esc(j.brand) + "</span><strong>" + esc(j.name) + "</strong>" + reviewLink(j) + "</span></div></td>" +
          '<td class="num">' + weightCell(j) + (j.weight ? bar(j.weight, maxW) : "") + "</td>" +
          '<td class="num">' + fpCell(j) + "</td>" +
          '<td class="num">' + fillCell(j) + "</td>" +
          "<td>" + insulTag(j) + "</td>" +
          "<td>" + hoodCell(j) + "</td>" +
          "<td>" + esc(j.type) + "</td>" +
          '<td class="wrap-cell">' + packedCell(j) + "</td>" +
          '<td class="num price">' + yen(j.price) + "</td>" +
          '<td class="buy">' + buyLinks(j) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (j) =>
          '<article class="card">' + thumb(j, "card-img") +
          '<div class="card-head"><span class="brand">' + esc(j.brand) + "</span><h3>" + esc(j.name) + "</h3>" + reviewLink(j) +
          '<div class="tags">' + insulTag(j) + j.tags.map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(j.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>重さ</dt><dd>" + weightCell(j) + "</dd></div>" +
          "<div><dt>タイプ</dt><dd>" + esc(TYPE_LABEL[j.type]) + "</dd></div>" +
          "<div><dt>フィルパワー</dt><dd>" + fpCell(j) + "</dd></div>" +
          "<div><dt>中わた量</dt><dd>" + fillCell(j) + "</dd></div>" +
          "<div><dt>フード</dt><dd>" + hoodCell(j) + "</dd></div>" +
          "<div><dt>収納サイズ</dt><dd>" + packedCell(j) + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + yen(j.price) + "</p>" +
          '<div class="buy">' + buyLinks(j) + "</div>" +
          "</article>"
      )
      .join("");
  }

  function chips(id, values, key) {
    const el = document.getElementById(id);
    el.innerHTML = values
      .map((v) => '<button type="button" class="chip' + (state[key] === v ? " on" : "") + '" data-v="' + esc(v) + '">' + esc(v) + "</button>")
      .join("");
    el.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      state[key] = btn.dataset.v;
      el.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === btn));
      render();
    });
  }

  chips("brandChips", BRANDS, "brand");
  chips("typeChips", TYPES, "type");
  chips("hoodChips", HOODS, "hood");
  chips("fillChips", FILLS, "fill");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
