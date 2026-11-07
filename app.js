(function () {
  const BRANDS = ["すべて", "ペツル", "ブラックダイヤモンド", "レッドレンザー", "ナイトコア"];
  const BATTERIES = ["すべて", "充電式", "ハイブリッド"];
  const state = { brand: "すべて", battery: "すべて", sort: "price-asc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // アフィリエイトURLが空なら、Amazon・楽天の検索ページを使う
  function buyLinks(item) {
    const q = encodeURIComponent(item.brand + " " + item.name + " ヘッドランプ");
    const amazon = item.links.amazon || "https://www.amazon.co.jp/s?k=" + q;
    const rakuten = item.links.rakuten || "https://search.rakuten.co.jp/search/mall/" + q + "/";
    let html =
      '<a class="btn btn-amazon" href="' + esc(amazon) + '" target="_blank" rel="nofollow sponsored noopener">Amazon</a>' +
      '<a class="btn btn-rakuten" href="' + esc(rakuten) + '" target="_blank" rel="nofollow sponsored noopener">楽天</a>';
    if (item.links.a8) {
      html += '<a class="btn btn-shop" href="' + esc(item.links.a8) + '" target="_blank" rel="nofollow sponsored noopener">公式ショップ</a>';
    }
    return html;
  }

  function filtered() {
    const list = HEADLAMPS.filter(
      (h) => (state.brand === "すべて" || h.brand === state.brand) && (state.battery === "すべて" || h.battery === state.battery)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const sorters = {
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big),
      "weight-asc": (a, b) => a.weight - b.weight,
      "lumens-desc": (a, b) => b.lumens - a.lumens,
      "water-desc": (a, b) => b.waterLevel - a.waterLevel || a.weight - b.weight
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  function render() {
    const list = filtered();
    const maxL = Math.max(...HEADLAMPS.map((h) => h.lumens));
    document.getElementById("count").textContent = list.length + "件のヘッドランプ";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (h) =>
          "<tr>" +
          '<td><span class="brand">' + esc(h.brand) + "</span><strong>" + esc(h.name) + "</strong></td>" +
          '<td class="num">' + h.lumens.toLocaleString() + " lm" + bar(h.lumens, maxL) + "</td>" +
          '<td class="num">' + h.weight + " g</td>" +
          "<td>" + (h.midRuntime ? esc(h.midRuntime) : "—") + "</td>" +
          "<td>" + esc(h.runtime) + "</td>" +
          '<td><span class="tag tag-' + (h.battery === "充電式" ? "charge" : "hybrid") + '">' + esc(h.battery) + "</span></td>" +
          "<td>" + esc(h.water) + "</td>" +
          '<td class="num price">' + yen(h.price) + "</td>" +
          '<td class="buy">' + buyLinks(h) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (h) =>
          '<article class="card">' +
          '<div class="card-head"><span class="brand">' + esc(h.brand) + "</span><h3>" + esc(h.name) + "</h3>" +
          '<div class="tags">' + h.tags.map((t) => '<span class="tag">' + esc(t) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(h.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>明るさ</dt><dd>" + h.lumens.toLocaleString() + " lm</dd></div>" +
          "<div><dt>重さ</dt><dd>" + h.weight + " g</dd></div>" +
          "<div><dt>防水</dt><dd>" + esc(h.water) + "</dd></div>" +
          "<div><dt>点灯時間（中間）</dt><dd>" + (h.midRuntime ? esc(h.midRuntime) : "—") + "</dd></div>" +
          "<div><dt>点灯時間（最長）</dt><dd>" + esc(h.runtime) + "</dd></div>" +
          "</dl>" +
          '<p class="battery-note">電池：' + esc(h.batteryNote) + "</p>" +
          '<p class="card-price">' + yen(h.price) + "</p>" +
          '<div class="buy">' + buyLinks(h) + "</div>" +
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
  chips("batteryChips", BATTERIES, "battery");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
