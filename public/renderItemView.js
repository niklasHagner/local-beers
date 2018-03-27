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

  var ratingIcon = card.rating_rb_overall && Number(card.rating_rb_overall) < 50 ? '👎' : '⭐';
  var rating = card.rating_rb_overall ? `<p class="rating">${ratingIcon} ${card.rating_rb_overall} <span>(${card.rating_rb_count} reviews)</span></p>` : '';
  var producer = card.producer ? `<p>${card.producer}</p>` : '';
  var country = card.country ? `<p>${card.country}</p>` : '';
  var price = card.price ? `<span>${card.price} <span>kr</span></span>` : '';
  var alcohol = card.alcohol_vol ? ` , <span>${card.alcohol_vol} <span>%</span></span>` : '';
  var price_and_alcohol = price != '' ? `<p>${price} ${alcohol}</p>` : '';
  var systembolagetlink =  card.sysid ? `<a target="_blank" href="https://www.ratebeer.com/beer/${item.sysid}">bolaget</a>` : '';
  var img = card.id ? `<img src="https://systembevakningsagenten.se/images/product/id/${card.id}.jpg" onerror="this.style.display='none'">` : '';

  var view = `
    <article class="item">
      <header>
        <p class="title">${card.name}</p>
      </header>
      ${img}
      ${rating}
      ${producer}
      ${country}
      ${price_and_alcohol}
    </article>`;

  return view;
}