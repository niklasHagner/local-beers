/* 
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
function renderCard(item) {
  var card = item;

  var isExpensive = Number(card.price) > 40;
  // card.id = 0;
  card.themeColor = isExpensive ? 'red' : 'green';
  // card.bg = 'http://www.wemakenice.org/media/DarkGradient-0x500.jpg';
  // card.rating = 1; card.ratingCount = 40;
  // card.reqDl = 'abc';
  // card.fromStreet = 'X-street';
  // card.toStreet = 'Y-Street';
  // card.price = Number(item.seeders) + Number(item.leechers)
  // if (card.price > 999) {
  //   card.price = Math.floor(card.price / 1000) + 'K';
  // }

  var view = `
    <article class="item">
      <header>
      <p class="title">🍺 ${card.name}</p>
      </header>
          <p class="rating">⭐ ${card.rating_rb_overall} rating <span>(${card.rating_rb_count} reviews)</span></p>
          <p>${card.producer}</p>
          <p>${card.country}</p>
      <p>${card.price} <span>kr</span></p>
      <p>${card.alcohol_vol} <span>%</span></p>
    </article>
  `;

  return view;
}

function renderAllCards1(data) {
  var htmlString = '';
  data.forEach((item) => {
    htmlString += renderCard1(item);
  });
  return htmlString;
}