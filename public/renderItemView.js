/* built for https://systembevakningsagenten.se/api/json/2.0/newProducts.json
  EXAMPLE ITEM
  {
    "id": 4252,
    "sysid": 1124112,
    "name": "I Like To Moob It Moob IT",
    "alcohol_vol": "8.8",
    "price": "49.9",
    "producer": "Northern Monk Brew Co",
    "country": "Storbritannien",
    "rating_rb_overall": 100,
    "rating_rb_style": 100,
    "rating_rb_count": 76,
    "latest": 4252,
    "yesterday": 4838,
    "trend": "+4252"
  }
*/
function renderItemView(item) {
  item.price = Number(item.price).toFixed(2);

  // var ratebeerLinkEl =  item.sysid ? `<a target="_blank" href="https://www.ratebeer.com/beer/${item.sysid}">Ratebeer</a>` : '';
  // var ratingIcon = item.rating_rb_overall && Number(item.rating_rb_overall) < 50 ? '👎' : '⭐';
  // var rating = item.rating_rb_overall ? `<p class="rating">${ratingIcon} ${item.rating_rb_overall} <span>(${item.rating_rb_count} reviews)</span></p>` : '';
  var producer = item.producer ? `<p>${item.producer}</p>` : '';
  var country = item.country ? `<p>${item.country}</p>` : '';
  var alcohol = item.alcohol_vol ? ` , <span>${item.alcohol_vol}<span class="percentage-char">%</span></span>` : '';
  var price = item.price ? `<span>${item.price} <span class="kr">kr</span></span>` : '';
  var price_and_alcohol = price != '' ? `<p>${price} ${alcohol}</p>` : '';
  var systembolagetUrl =  item.id ? ` https://www.systembolaget.se/${item.sysid}` : '';
  var img = item.id ? `<img src="https://systembevakningsagenten.se/assets/images/product/id/${item.id}.png" onerror="this.style.display='none'">` : '';
  
  /*
    Systembolaget codes for sales conditions
      used in systembevakningsagenten objects as propname 'class'
    ----
    FSN = Fast sortiment valt av Systembolaget. 
    FSB = Fast sortiment som kvalat in från beställningssortimentet på grund av efterfrågan.
    BS = Beställningssortimentet 
    TSE = Tillfälligt sortiment exklusiv, hette tidigare små partier. 
    TST = Tillfälligt sortiment tid, säljs bara under en begränsad tid.
    TSV = Tillfälligt sortiment volym, säljs i begränsad mängd.
    TSLS = Tillfälligt sortiment lokalt och småskaligt.
    TSS = Tillfälligt sortiment säsong, exempelvis påsköl
  */
  let salesInfo = "";
  switch(item.class) {
    case "BS": salesInfo = "beställningssortiment"; break;
    // case "TSE": salesInfo = "exklusivt sortiment"; break;
    case "TST": salesInfo = "begränsad mängd"; break;
    case "TSV": salesInfo = "begränsad tid"; break;
    case "TSLS": salesInfo = "lokalt och småksaligt"; break;
    case "TSS": salesInfo = "säsongsprodukt"; break;
  }
 
  var view = `
    <article class="item">
      <header>
        <a href="${systembolagetUrl}">${item.name}</a>
      </header>
      ${img}
      ${producer}
      ${country}
      ${price_and_alcohol}
      ${salesInfo}
    </article>`;

  return view;
}