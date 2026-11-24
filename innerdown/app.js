(function () {
  const BRANDS = ["すべて"].concat([...new Set(INNERS.map((j) => j.brand))]);
  const FORMS = ["すべて", "ジャケット", "ベスト", "カーディガン"];
  const NECKS = ["すべて", "丸首", "Vネック", "そのほか"];
  const state = { brand: "すべて", form: "すべて", neck: "すべて", sort: "price-asc" };

  const yen = (n) => (n == null ? "未確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const RAKUTEN_AFF_ID = "59502494.8a113493.59502495.49954f2c";
  // 楽天のURLをアフィリエイトリンクに変換（すでにアフィリエイトリンクならそのまま）
  function rakutenAff(url) {
    if (!RAKUTEN_AFF_ID || url.indexOf("hb.afl.rakuten.co.jp") !== -1) return url;
    return "https://hb.afl.rakuten.co.jp/ichiba/" + RAKUTEN_AFF_ID + "/?pc=" + encodeURIComponent(url) + "&link_type=hybrid_url";
  }
  const rakutenUrl = (item) => rakutenAff(item.links.rakuten || "https://search.rakuten.co.jp/search/mall/" + encodeURIComponent(item.search) + "/");

  // 商品画像：img/<id>.webp を置くと自動で表示。無い場合はアイコン
  function thumb(item, cls) {
    const src = item.image || "img/" + item.id + ".webp";
    const img = '<img src="' + esc(src) + '" alt="' + esc(item.brand + " " + item.name) + '" loading="lazy" width="400" height="400" onerror="this.closest(\'.' + cls + '\').classList.add(\'noimg\');this.remove()">';
    const ph = '<span class="ph" aria-hidden="true">🧥</span>';
    // 楽天の画像は楽天のアフィリエイトリンクで囲む（楽天の画像を使うときのルール）
    if (item.image && /(^|\/\/)[^/]*\.rakuten\.co\.jp\//.test(item.image)) {
      return '<a class="' + cls + '" href="' + esc(rakutenUrl(item)) + '" target="_blank" rel="nofollow sponsored noopener">' + img + ph + "</a>";
    }
    return '<span class="' + cls + '">' + img + ph + "</span>";
  }

  function buyLinks(item) {
    let html = "";
    if (!item.noRakuten) {
      html += '<a class="btn btn-rakuten" href="' + esc(rakutenUrl(item)) + '" target="_blank" rel="nofollow sponsored noopener">楽天</a>';
    }
    if (!item.noAmazon) {
      const amazon = item.links.amazon || "https://www.amazon.co.jp/s?k=" + encodeURIComponent(item.search);
      html += '<a class="btn btn-amazon" href="' + esc(amazon) + '" target="_blank" rel="nofollow sponsored noopener">Amazon</a>';
    }
    if (item.noRakuten && item.official) {
      html += '<a class="btn btn-shop" href="' + esc(item.official) + '" target="_blank" rel="nofollow noopener">公式サイト</a>';
    }
    return html;
  }

  const neckGroup = (j) => (j.neck.indexOf("丸首") !== -1 ? "丸首" : j.neck.indexOf("Vネック") !== -1 ? "Vネック" : "そのほか");
  const nameWithGender = (j) => esc(j.name) + '<small class="sub">' + esc(j.gender) + "</small>";
  const weightCell = (j) => (j.weight == null ? "未確認" : j.weight + " g");
  const fpCell = (j) => (j.fp ? (j.fpNote || j.fp) + " FP" : "未確認");
  const priceCell = (j) => yen(j.price) + (j.priceNote ? '<small class="sub">' + esc(j.priceNote) + "</small>" : "");
  const formTag = (j) => '<span class="tag tag-' + (j.form === "ジャケット" ? "double" : j.form === "ベスト" ? "single" : "hybrid") + '">' + esc(j.form) + "</span>";

  function filtered() {
    const list = INNERS.filter(
      (j) =>
        (state.brand === "すべて" || j.brand === state.brand) &&
        (state.form === "すべて" || j.form === state.form) &&
        (state.neck === "すべて" || neckGroup(j) === state.neck)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const p = (j) => (j.price ?? big);
    const sorters = {
      "price-asc": (a, b) => p(a) - p(b),
      "weight-asc": (a, b) => (a.weight ?? big) - (b.weight ?? big) || p(a) - p(b),
      "fp-desc": (a, b) => (b.fp ?? 0) - (a.fp ?? 0) || p(a) - p(b)
    };
    return list.sort(sorters[state.sort]);
  }

  function render() {
    const list = filtered();
    document.getElementById("count").textContent = list.length + "件";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (j) =>
          "<tr>" +
          '<td><div class="model">' + thumb(j, "thumb") + '<span class="model-name"><span class="brand">' + esc(j.brand) + '</span><strong><a href="#' + esc(j.id) + '">' + nameWithGender(j) + "</a></strong></span></div></td>" +
          "<td>" + formTag(j) + "</td>" +
          "<td>" + esc(j.neck) + "</td>" +
          '<td class="num">' + weightCell(j) + "</td>" +
          '<td class="num">' + fpCell(j) + "</td>" +
          '<td class="wrap-cell">' + (j.packed ? esc(j.packed) : "未確認") + "</td>" +
          '<td class="num price">' + priceCell(j) + "</td>" +
          '<td class="buy">' + buyLinks(j) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (j) =>
          '<article class="card">' + thumb(j, "card-img") +
          '<div class="card-head"><span class="brand">' + esc(j.brand) + "</span><h3>" + nameWithGender(j) + "</h3>" +
          '<div class="tags">' + formTag(j) + '<span class="tag">' + esc(j.neck) + "</span></div></div>" +
          '<dl class="specs">' +
          "<div><dt>重さ</dt><dd>" + weightCell(j) + "</dd></div>" +
          "<div><dt>フィルパワー</dt><dd>" + fpCell(j) + "</dd></div>" +
          "<div><dt>表地</dt><dd>" + esc(j.shell) + "</dd></div>" +
          "<div><dt>収納</dt><dd>" + (j.packed ? esc(j.packed) : "未確認") + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + priceCell(j) + "</p>" +
          '<p class="small"><a href="#' + esc(j.id) + '">くわしく見る ↓</a></p>' +
          '<div class="buy">' + buyLinks(j) + "</div>" +
          "</article>"
      )
      .join("");
  }

  // 各商品のくわしい説明（並びはデータの順＝メーカーごと）
  function renderDetails() {
    document.getElementById("items").innerHTML = INNERS.map(
      (j) =>
        '<article class="item" id="' + esc(j.id) + '">' +
        '<div class="item-head">' + thumb(j, "thumb") + '<div><span class="brand">' + esc(j.brand) + "</span><h3>" + nameWithGender(j) + "</h3>" +
        '<p class="item-spec">' + esc(j.form) + "・" + esc(j.neck) + "・重さ " + weightCell(j) + "・" + fpCell(j) + "・" + yen(j.price) + "</p></div></div>" +
        '<div class="pc-grid">' +
        '<div class="pros"><p class="pc-title">よいところ</p><ul>' + j.pros.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></div>" +
        '<div class="cons"><p class="pc-title">気になるところ</p><ul>' + j.cons.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></div>" +
        "</div>" +
        '<p class="for-who"><strong>こんな人におすすめ：</strong>' + esc(j.forWho) + "</p>" +
        '<p class="small">出典：' + j.sources.map((s) => '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>").join("、") + "（" + CHECKED + "確認）" + (j.priceNote ? "。価格：" + esc(j.priceNote) : "") + "</p>" +
        (j.shopNote ? '<p class="small">' + esc(j.shopNote) + "。価格は変わることがあります。最新の価格はリンク先で確認してください。</p>" : "") +
        '<div class="buy">' + buyLinks(j) + "</div>" +
        "</article>"
    ).join("");
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
  chips("formChips", FORMS, "form");
  chips("neckChips", NECKS, "neck");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
  renderDetails();
})();
