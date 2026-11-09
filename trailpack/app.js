(function () {
  const BRANDS = ["すべて"].concat([...new Set(PACKS.map((p) => p.brand))]);
  const SIZES = ["すべて", "〜7L", "8〜12L", "13L以上"];
  const STYLES = ["すべて", "ベスト型", "ザック型"];
  const state = { brand: "すべて", size: "すべて", style: "すべて", sort: "weight-asc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dash = (v) => (v == null || v === "" ? "—" : esc(v));

  const inSize = (p) =>
    state.size === "すべて" ||
    (state.size === "〜7L" && p.liters <= 7) ||
    (state.size === "8〜12L" && p.liters > 7 && p.liters <= 12) ||
    (state.size === "13L以上" && p.liters > 12);

  // 商品画像：img/<id>.webp を置くと自動で表示。無い場合はプレースホルダー
  // （別のファイル名やURLを使うときは data.js に image: "..." を書く）
  function thumb(item, cls) {
    const src = item.image || "img/" + item.id + ".webp";
    return '<span class="' + cls + '"><img src="' + esc(src) + '" alt="' + esc(item.brand + " " + item.name) + '" loading="lazy" width="400" height="400" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"><span class="ph" aria-hidden="true">🎒</span></span>';
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
    const list = PACKS.filter(
      (p) => (state.brand === "すべて" || p.brand === state.brand) && (state.style === "すべて" || p.style === state.style) && inSize(p)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const sorters = {
      "weight-asc": (a, b) => a.weight - b.weight,
      "liters-desc": (a, b) => b.liters - a.liters || a.weight - b.weight,
      "pockets-desc": (a, b) => b.pockets - a.pockets || a.weight - b.weight,
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big) || a.weight - b.weight
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  const styleTag = (p) => '<span class="tag tag-' + (p.style === "ベスト型" ? "double" : "single") + '">' + esc(p.style) + "</span>";
  const literCell = (p) => p.liters + " L" + (p.sizeNote ? '<small class="sub">' + esc(p.sizeNote) + "</small>" : "") + (p.litersNote ? '<small class="sub">' + esc(p.litersNote) + "</small>" : "");
  const weightCell = (p) => p.weight + " g" + (p.weightNote ? '<small class="sub">' + esc(p.weightNote) + "</small>" : "");

  function render() {
    const list = filtered();
    const maxL = Math.max(...PACKS.map((p) => p.liters));
    document.getElementById("count").textContent = list.length + "件のザック";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (p) =>
          "<tr>" +
          '<td><div class="model">' + thumb(p, "thumb") + '<span class="model-name"><span class="brand">' + esc(p.brand) + "</span><strong>" + esc(p.name) + "</strong></span></div></td>" +
          '<td class="num">' + literCell(p) + bar(p.liters, maxL) + "</td>" +
          '<td class="num">' + weightCell(p) + "</td>" +
          "<td>" + styleTag(p) + "</td>" +
          '<td class="wrap-cell"><strong class="pk">' + p.pockets + "個</strong><small class=\"sub\">" + esc(p.pocketPlaces) + "</small></td>" +
          '<td class="wrap-cell">' + esc(p.open) + "</td>" +
          "<td>" + esc(p.flask) + "</td>" +
          '<td class="wrap-cell">' + dash(p.pole) + "</td>" +
          '<td class="num price">' + yen(p.price) + "</td>" +
          '<td class="buy">' + buyLinks(p) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (p) =>
          '<article class="card">' + thumb(p, "card-img") +
          '<div class="card-head"><span class="brand">' + esc(p.brand) + "</span><h3>" + esc(p.name) + "</h3>" +
          '<div class="tags">' + styleTag(p) + p.tags.map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(p.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>容量</dt><dd>" + literCell(p) + "</dd></div>" +
          "<div><dt>重さ</dt><dd>" + weightCell(p) + "</dd></div>" +
          "<div><dt>ポケット</dt><dd>" + p.pockets + "個</dd></div>" +
          "<div><dt>フラスク</dt><dd>" + esc(p.flask) + "</dd></div>" +
          '<div class="wide"><dt>開け方</dt><dd>' + esc(p.open) + "</dd></div>" +
          '<div class="wide"><dt>ポケットの位置</dt><dd class="light">' + esc(p.pocketPlaces) + "</dd></div>" +
          "<div><dt>水袋（ハイドレーション）</dt><dd>" + dash(p.water) + "</dd></div>" +
          "<div><dt>ポール</dt><dd>" + dash(p.pole) + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + yen(p.price) + "</p>" +
          '<div class="buy">' + buyLinks(p) + "</div>" +
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
      const b = e.target.closest("button");
      if (!b) return;
      state[key] = b.dataset.v;
      el.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
      render();
    });
  }

  chips("brandChips", BRANDS, "brand");
  chips("sizeChips", SIZES, "size");
  chips("styleChips", STYLES, "style");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
