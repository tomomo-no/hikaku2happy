(function () {
  const BRANDS = ["すべて"].concat([...new Set(TENTS.map((t) => t.brand))]);
  const CAPS = ["すべて", "1人用", "2人用"];
  const WALLS = ["すべて", "ダブルウォール", "シングルウォール"];
  const state = { brand: "すべて", cap: "すべて", wall: "すべて", sort: "weight-asc" };

  const yen = (n) => (n == null ? "要確認" : "約" + n.toLocaleString("ja-JP") + "円");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dash = (v) => (v == null || v === "" ? "—" : esc(v));
  const kg = (g) => (g >= 1000 ? (g / 1000).toFixed(2).replace(/0$/, "") + " kg" : g + " g");

  // 床の広さ（㎡）。足元が細い形は頭側と足側の平均幅で計算
  const area = (t) => (t.length * (t.widthFoot ? (t.width + t.widthFoot) / 2 : t.width)) / 10000;
  function floorText(t) {
    if (t.floorNote) return esc(t.floorNote);
    const w = t.widthFoot ? t.width + "〜" + t.widthFoot : t.width;
    return t.length + "×" + w + " cm";
  }

  // アフィリエイトURLが空なら、Amazon・楽天の検索ページを使う
  function buyLinks(item) {
    const q = encodeURIComponent(item.search + " テント");
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
    const list = TENTS.filter(
      (t) =>
        (state.brand === "すべて" || t.brand === state.brand) &&
        (state.cap === "すべて" || t.cap + "人用" === state.cap) &&
        (state.wall === "すべて" || t.wall + "ウォール" === state.wall)
    );
    const big = Number.MAX_SAFE_INTEGER;
    const sorters = {
      "weight-asc": (a, b) => a.weight - b.weight,
      "price-asc": (a, b) => (a.price ?? big) - (b.price ?? big) || a.weight - b.weight,
      "height-desc": (a, b) => b.height - a.height || a.weight - b.weight,
      "floor-desc": (a, b) => area(b) - area(a) || a.weight - b.weight
    };
    return list.sort(sorters[state.sort]);
  }

  function bar(value, max) {
    return '<span class="bar"><span style="width:' + Math.round((value / max) * 100) + '%"></span></span>';
  }

  const wallTag = (t) => '<span class="tag tag-' + (t.wall === "シングル" ? "single" : "double") + '">' + esc(t.wall) + "</span>";
  const weightCell = (t) => kg(t.weight) + (t.weightNote ? '<small class="sub">' + esc(t.weightNote) + "</small>" : "");
  const priceCell = (t) => yen(t.price) + (t.priceNote ? '<small class="sub">' + esc(t.priceNote) + "</small>" : "");

  function render() {
    const list = filtered();
    const maxW = Math.max(...TENTS.map((t) => t.weight));
    document.getElementById("count").textContent = list.length + "件のテント";

    document.getElementById("tableBody").innerHTML = list
      .map(
        (t) =>
          "<tr>" +
          '<td><span class="brand">' + esc(t.brand) + "</span><strong>" + esc(t.name) + "</strong></td>" +
          "<td>" + t.cap + "人用</td>" +
          "<td>" + wallTag(t) + "</td>" +
          '<td class="num">' + weightCell(t) + bar(t.weight, maxW) + "</td>" +
          '<td class="num">' + t.height + " cm</td>" +
          '<td class="num">' + floorText(t) + '<small class="sub">約' + area(t).toFixed(2) + "㎡</small></td>" +
          "<td>" + dash(t.vestibule) + "</td>" +
          "<td>" + dash(t.standing) + "</td>" +
          '<td class="num price">' + priceCell(t) + "</td>" +
          '<td class="buy">' + buyLinks(t) + "</td>" +
          "</tr>"
      )
      .join("");

    document.getElementById("cards").innerHTML = list
      .map(
        (t) =>
          '<article class="card">' +
          '<div class="card-head"><span class="brand">' + esc(t.brand) + "</span><h3>" + esc(t.name) + "</h3>" +
          '<div class="tags">' + wallTag(t) + t.tags.map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</div></div>" +
          '<p class="point">' + esc(t.point) + "</p>" +
          '<dl class="specs">' +
          "<div><dt>重さ</dt><dd>" + weightCell(t) + "</dd></div>" +
          "<div><dt>人数</dt><dd>" + t.cap + "人用</dd></div>" +
          "<div><dt>室内の高さ</dt><dd>" + t.height + " cm</dd></div>" +
          "<div><dt>床の広さ</dt><dd>" + floorText(t) + "</dd></div>" +
          "<div><dt>前室</dt><dd>" + dash(t.vestibule) + "</dd></div>" +
          "<div><dt>自立</dt><dd>" + dash(t.standing) + "</dd></div>" +
          "</dl>" +
          '<p class="card-price">' + priceCell(t) + "</p>" +
          '<div class="buy">' + buyLinks(t) + "</div>" +
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
  chips("capChips", CAPS, "cap");
  chips("wallChips", WALLS, "wall");
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  render();
})();
