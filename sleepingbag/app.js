(function () {
  const BRANDS = ["すべて"].concat([...new Set(BAGS.map((b) => b.brand))]);
  const SEASONS = ["すべて", "夏山", "3シーズン", "晩秋・残雪期", "厳冬期"];
  const FILLS = ["すべて", "ダウン", "化繊"];
  const state = { brand: "すべて", season: "すべて", fill: "すべて", sort: "weight-asc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const deg = (n) => (n == null ? "—" : (n < 0 ? "−" + -n : n) + "℃");

  // 季節の目安は下限温度（イスカは最低使用温度）で分ける
  const seasonOf = (b) => (b.limit >= 4 ? "夏山" : b.limit >= -5 ? "3シーズン" : b.limit >= -14 ? "晩秋・残雪期" : "厳冬期");

  // 商品画像：img/<id>.webp を置くと自動で表示。無い場合はプレースホルダー
  // （別のファイル名やURLを使うときは data.js に image: "..." を書く）
  function thumb(item, cls) {
    const src = item.image || "img/" + item.id + ".webp";
    return '<span class="' + cls + '"><img src="' + esc(src) + '" alt="' + esc(item.brand + " " + item.name) + '" loading="lazy" width="400" height="400" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"><span class="ph" aria-hidden="true">🛌</span></span>';
  }

  const RAKUTEN_AFF_ID = "59502494.8a113493.59502495.49954f2c";
  // 楽天のURLをアフィリエイトリンクに変換（すでにアフィリエイトリンクならそのまま）
  function rakutenAff(url) {
    if (!RAKUTEN_AFF_ID || url.indexOf("hb.afl.rakuten.co.jp") !== -1) return url;
    return "https://hb.afl.rakuten.co.jp/ichiba/" + RAKUTEN_AFF_ID + "/?pc=" + encodeURIComponent(url) + "&link_type=hybrid_url";
  }

  // アフィリエイトURLが空なら、Amazon・楽天の検索ページを使う
  function buyLinks(item) {
    const q = encodeURIComponent(item.search);
    const amazon = item.links.amazon || "https://www.amazon.co.jp/s?k=" + q;
    const rakuten = rakutenAff(item.links.rakuten || "https://search.rakuten.co.jp/search/mall/" + q + "/");
    let html = '<a class="btn btn-amazon" href="' + esc(amazon) + '" target="_blank" rel="nofollow sponsored noopener">Amazon</a>';
    // 楽天で売っていない商品は楽天ボタンを出さない
    if (!item.noRakuten) {
      html += '<a class="btn btn-rakuten" href="' + esc(rakuten) + '" target="_blank" rel="nofollow sponsored noopener">楽天</a>';
    }
    if (item.links.a8) {
      html += '<a class="btn btn-shop" href="' + esc(item.links.a8) + '" target="_blank" rel="nofollow sponsored noopener">公式ショップ</a>';
    } else if (item.noRakuten && item.official) {
      html += '<a class="btn btn-shop" href="' + esc(item.official) + '" target="_blank" rel="nofollow noopener">公式サイト</a>';
    }
    return html;
  }

  function filtered() {
    const list = BAGS.filter(
      (b) =>
        (state.brand === "すべて" || b.brand === state.brand) &&
        (state.fill === "すべて" || b.fill === state.fill) &&
        (state.season === "すべて" || seasonOf(b) === state.season)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const sorters = {
      "weight-asc": (a, b) => a.weight - b.weight,
      "warm-desc": (a, b) => a.limit - b.limit || (a.comfort ?? big) - (b.comfort ?? big) || a.weight - b.weight,
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big) || a.weight - b.weight
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  const fillTag = (b) => '<span class="tag tag-' + (b.fill === "ダウン" ? "double" : "single") + '">' + esc(b.fill) + "</span>";
  const fillText = (b) =>
    (b.fp ? b.fp + (b.fpPlus ? "+" : "") + "FP" : "") +
    (b.fillNote ? (b.fp ? "・" : "") + esc(b.fillNote) : "");
  const fillCell = (b) =>
    fillTag(b) +
    (fillText(b) ? '<small class="sub">' + fillText(b) + "</small>" : "") +
    (b.fillGrams ? '<small class="sub">中わた' + b.fillGrams + "g</small>" : "");
  const comfortCell = (b) => (b.comfort == null ? "—" : deg(b.comfort));
  const limitCell = (b) => deg(b.limit) + (b.ratingNote ? '<small class="sub">' + esc(b.ratingNote) + "</small>" : "");
  const packedCell = (b) =>
    (b.packed ? esc(b.packed) : b.packedNote ? '<small class="sub">' + esc(b.packedNote) + "</small>" : "—") +
    (b.packed && b.packedL ? '<small class="sub">' + b.packedL + " L</small>" : "");
  const shellCell = (b) => (b.shell ? '<span class="tag tag-charge">' + esc(b.shell) + "</span>" : "—");

  function render() {
    const list = filtered();
    const maxW = Math.max(...BAGS.map((b) => b.weight));
    document.getElementById("count").textContent = list.length + "件の寝袋";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (b) =>
          "<tr>" +
          '<td><div class="model">' + thumb(b, "thumb") + '<span class="model-name"><span class="brand">' + esc(b.brand) + "</span><strong>" + esc(b.name) + "</strong></span></div></td>" +
          '<td class="num">' + b.weight + " g" + bar(b.weight, maxW) + "</td>" +
          '<td class="num">' + comfortCell(b) + "</td>" +
          '<td class="num">' + limitCell(b) + "</td>" +
          "<td>" + esc(seasonOf(b)) + "</td>" +
          '<td class="wrap-cell">' + fillCell(b) + "</td>" +
          '<td class="wrap-cell">' + packedCell(b) + "</td>" +
          "<td>" + shellCell(b) + "</td>" +
          '<td class="num price">' + yen(b.price) + "</td>" +
          '<td class="buy">' + buyLinks(b) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (b) =>
          '<article class="card">' + thumb(b, "card-img") +
          '<div class="card-head"><span class="brand">' + esc(b.brand) + "</span><h3>" + esc(b.name) + "</h3>" +
          '<div class="tags">' + fillTag(b) + b.tags.map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(b.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>重さ</dt><dd>" + b.weight + " g</dd></div>" +
          "<div><dt>季節の目安</dt><dd>" + esc(seasonOf(b)) + "</dd></div>" +
          "<div><dt>快適温度</dt><dd>" + comfortCell(b) + "</dd></div>" +
          "<div><dt>下限温度</dt><dd>" + limitCell(b) + "</dd></div>" +
          "<div><dt>中わた</dt><dd>" + esc(b.fill) + (fillText(b) ? '<small class="sub">' + fillText(b) + "</small>" : "") + (b.fillGrams ? '<small class="sub">中わた' + b.fillGrams + "g</small>" : "") + "</dd></div>" +
          "<div><dt>収納サイズ</dt><dd>" + packedCell(b) + "</dd></div>" +
          "<div><dt>表地</dt><dd>" + (b.shell ? esc(b.shell) : "—") + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + yen(b.price) + "</p>" +
          '<div class="buy">' + buyLinks(b) + "</div>" +
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
  chips("seasonChips", SEASONS, "season");
  chips("fillChips", FILLS, "fill");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
