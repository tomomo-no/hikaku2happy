(function () {
  const BRANDS = ["すべて"].concat([...new Set(MATS.map((m) => m.brand))]);
  const SEASONS = ["すべて", "夏山", "3シーズン", "晩秋・残雪期", "厳冬期"];
  const TYPES = ["すべて", "エア", "フォーム", "インフレーター"];
  const state = { brand: "すべて", season: "すべて", type: "すべて", sort: "r-desc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 季節の目安はR値で分ける（当サイトの目安）
  const seasonOf = (m) => (m.r < 2 ? "夏山" : m.r < 4 ? "3シーズン" : m.r < 6 ? "晩秋・残雪期" : "厳冬期");

  // 商品画像：img/<id>.webp を置くと自動で表示。無い場合はプレースホルダー
  function thumb(item, cls) {
    const src = item.image || "img/" + item.id + ".webp";
    return '<span class="' + cls + '"><img src="' + esc(src) + '" alt="' + esc(item.brand + " " + item.name) + '" loading="lazy" width="400" height="400" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"><span class="ph" aria-hidden="true">🏕️</span></span>';
  }

  const RAKUTEN_AFF_ID = "59502494.8a113493.59502495.49954f2c";
  function rakutenAff(url) {
    if (!RAKUTEN_AFF_ID || url.indexOf("hb.afl.rakuten.co.jp") !== -1) return url;
    return "https://hb.afl.rakuten.co.jp/ichiba/" + RAKUTEN_AFF_ID + "/?pc=" + encodeURIComponent(url) + "&link_type=hybrid_url";
  }

  function buyLinks(item) {
    const q = encodeURIComponent(item.search);
    const amazon = item.links.amazon || "https://www.amazon.co.jp/s?k=" + q;
    const rakuten = rakutenAff(item.links.rakuten || "https://search.rakuten.co.jp/search/mall/" + q + "/");
    let html = '<a class="btn btn-amazon" href="' + esc(amazon) + '" target="_blank" rel="nofollow sponsored noopener">Amazon</a>';
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
    const list = MATS.filter(
      (m) =>
        (state.brand === "すべて" || m.brand === state.brand) &&
        (state.type === "すべて" || m.type === state.type) &&
        (state.season === "すべて" || seasonOf(m) === state.season)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const sorters = {
      "r-desc": (a, b) => b.r - a.r || a.weight - b.weight,
      "weight-asc": (a, b) => a.weight - b.weight,
      "rpw-desc": (a, b) => b.r / b.weight - a.r / a.weight,
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big) || a.weight - b.weight
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  const typeTag = (m) => '<span class="tag tag-' + (m.type === "エア" ? "double" : m.type === "フォーム" ? "single" : "hybrid") + '">' + esc(m.type) + "</span>";
  const sizeText = (m) => m.length + "×" + m.width + "cm";

  function render() {
    const list = filtered();
    const maxR = Math.max(...MATS.map((m) => m.r));
    const maxW = Math.max(...MATS.map((m) => m.weight));
    document.getElementById("count").textContent = list.length + "件のマット";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (m) =>
          "<tr>" +
          '<td><div class="model">' + thumb(m, "thumb") + '<span class="model-name"><span class="brand">' + esc(m.brand) + "</span><strong>" + esc(m.name) + "</strong></span></div></td>" +
          "<td>" + typeTag(m) + "</td>" +
          '<td class="num">R ' + m.r.toFixed(1) + bar(m.r, maxR) + "</td>" +
          "<td>" + esc(seasonOf(m)) + "</td>" +
          '<td class="num">' + m.weight + " g" + bar(m.weight, maxW) + "</td>" +
          '<td class="num">' + m.thick + " cm</td>" +
          '<td class="num">' + sizeText(m) + "</td>" +
          '<td class="wrap-cell">' + esc(m.packed) + "</td>" +
          '<td class="num price">' + yen(m.price) + "</td>" +
          '<td class="buy">' + buyLinks(m) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (m) =>
          '<article class="card">' + thumb(m, "card-img") +
          '<div class="card-head"><span class="brand">' + esc(m.brand) + "</span><h3>" + esc(m.name) + "</h3>" +
          '<div class="tags">' + typeTag(m) + m.tags.map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(m.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>R値</dt><dd>" + m.r.toFixed(1) + "</dd></div>" +
          "<div><dt>季節の目安</dt><dd>" + esc(seasonOf(m)) + "</dd></div>" +
          "<div><dt>重さ</dt><dd>" + m.weight + " g</dd></div>" +
          "<div><dt>厚さ</dt><dd>" + m.thick + " cm</dd></div>" +
          "<div><dt>長さ×幅</dt><dd>" + sizeText(m) + "</dd></div>" +
          "<div><dt>収納サイズ</dt><dd>" + esc(m.packed) + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + yen(m.price) + "</p>" +
          '<div class="buy">' + buyLinks(m) + "</div>" +
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
  chips("typeChips", TYPES, "type");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
