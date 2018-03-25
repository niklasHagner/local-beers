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
  var card = item;
  card.price = Number(card.price).toFixed(2);

  var isExpensive = Number(card.price) > 40;
  card.themeColor = isExpensive ? 'red' : 'green';

  var rating = card.rating_rb_overall ? `<p class="rating">⭐ ${card.rating_rb_overall} <span>(${card.rating_rb_count} reviews)</span></p>` : '';
  var producer = card.producer ? `<p>${card.producer}</p>` : '';
  var country = card.country ? `<p>${card.country}</p>` : '';
  var price = card.price ? `<p>${card.price} <span>kr</span></p>` : '';
  var alcohol = card.alcohol_vol ? `<p>${card.alcohol_vol} <span>%</span></p>` : '';
  var systembolagetlink =  card.sysid ? `<a target="_blank" href="https://www.ratebeer.com/beer/${item.sysid}">bolaget</a>` : '';
  
  var view = `
    <article class="item">
      <header>
        <p class="title">🍺 ${card.name}</p>
      </header>
      ${rating}
      ${producer}
      ${country}
      ${price}
      ${alcohol}
    </article>`;

  return view;
}