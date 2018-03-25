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

  var frontCard = `
    <a class="card__part card__part-2" href="${card.magnetLink}">
    <div class="card__part__side m--back">
      <div class="card__part__inner card__face">
        <div class="card__face__colored-side"></div>
        <h3 class="card__face__price">${card.rating_rb_overall}</h3>
        <div class="card__face__divider"></div>
        <div class="card__face__path"></div>
        <div class="card__face__from-to">
          <p>${card.name}</p>
          <p>${card.producer}</p>
        </div>
        <div class="card__face__deliv-date">
          Rated  
          <p>${card.rating_rb_count}</p>
        </div>
        <div class="card__face__stats card__face__stats--req">
          Country
          <p>${card.country}</p>
        </div>
        <div class="card__face__stats card__face__stats--pledge">
          Alcohol
          <p class="card__face__stats__weight">
            <span>${card.alcohol_vol}</span>
          </p>
        </div>
        <div class="card__face__stats card__face__stats--weight">
        Size
          <p>${card.size}</p>
        </div>
      </div>
    </div>
    <div class="card__part__side m--front">
      <div class="card__sender">
        <h4 class="card__sender__heading">Sender</h4>
        <div class="card__sender__img-cont">
          <div class="card__sender__img-cont__inner">
            <img src="${card.senderImg}" class="card__sender__img" />
          </div>
        </div>
        <div class="card__sender__name-and-rating">
          <p class="card__sender__name">${card.sender}</p>
          <p class="card__sender__rating card__sender__rating-${card.rating}">
            <span class="card__sender__rating__star">&#9733;</span>
            <span class="card__sender__rating__star">&#9733;</span>
            <span class="card__sender__rating__star">&#9733;</span>
            <span class="card__sender__rating__star">&#9733;</span>
            <span class="card__sender__rating__star">&#9733;</span>
            <span class="card__sender__rating__count">${card.ratingCount}</span>
          </p>
          <p class="card__sender__address">
            ${card.title}
          </p>
        </div>
        <div class="card__receiver">
          <div class="card__receiver__inner">
            <div class="card__sender__img-cont">
              <div class="card__sender__img-cont__inner">
                <img src="${card.senderImg}" class="card__sender__img" />
              </div>
            </div>
            <div class="card__sender__name-and-rating">
              <p class="card__sender__name">${card.sender}</p>
              <p class="card__sender__address">
                ${card.category}
              </p>
            </div>
          </div>
        </div>
        <div class="card__path-big"></div>
      </div>
      <div class="card__from-to">
        <div class="card__from-to__inner">
          <div class="card__text card__text--left">
            <p class="card__text__heading">From</p>
            <p class="card__text__middle">${card.fromStreet}</p>
            <p class="card__text__bottom">${card.title}</p>
          </div>
          <div class="card__text card__text--right">
            <p class="card__text__heading">To</p>
            <p class="card__text__middle">${card.toStreet}</p>
            <p class="card__text__bottom">${card.category}</p>
          </div>
        </div>
      </div>
      <section class="card__part card__part-3">
        <div class="card__part__side m--back"></div>
        <div class="card__part__side m--front">
          <div class="card__timings">
            <div class="card__timings__inner">
              <div class="card__text card__text--left">
                <p class="card__text__heading">Delivery Date</p>
                <p class="card__text__middle">${card.month}</p>
                <p class="card__text__bottom">${card.month}</p>
              </div>
              <div class="card__text card__text--right">
                <p class="card__text__heading">Request Deadline</p>
                <p class="card__text__middle">${card.reqDl}</p>
              </div>
            </div>
          </div>
          <div class="card__timer">60 min 00 sec</div>
          <section class="card__part card__part-4">
            <div class="card__part__side m--back"></div>
            <div class="card__part__side m--front">
              <button type="button" class="card__request-btn">
                <span class="card__request-btn__text-1">Request</span>
                <span class="card__request-btn__text-2">Start</span>
              </button>
              <p class="card__counter">${card.requests} people have sent a request</p>
            </div>
          </section>
        </div>
      </section>
    </div>
  </a>
  `;

  return `
     <section class="card theme-${card.themeColor}">
          <div class="card__map">
            <div class="card__map__inner"></div>
          </div>
          <section class="card__part card__part-1">
            <div class="card__part__inner">
              <!--<header class="card__header">
                <div class="card__header__close-btn"></div>
                <span class="card__header__id"># ${card.id}</span>
                <span class="card__header__price">${card.rating_rb_overall}</span>
              </header>-->
              <div class="card__stats" style="background-image: url(${card.bgImgUrl}">
                <div class="card__stats__item card__stats__item--req">
                 <p class="card__stats__type">Price</p>
                  <span class="card__stats__value">${card.price}</span>
                </div>
                <div class="card__stats__item card__stats__item--pledge">
                  <p class="card__stats__type">Land</p>
                  <span class="card__stats__value">${card.country}</span>
                </div>
                <div class="card__stats__item card__stats__item--weight">
                <p class="card__stats__type">Procent</p>
                  <span class="card__stats__value">${card.alcohol_vol}</span>
                </div>
              </div>
            </div>
          </section>
          ${frontCard}
        </section>
    `;
}

function renderAllCards1(data) {
  var htmlString = '';
  data.forEach((item) => {
    htmlString += renderCard1(item);
  });
  return htmlString;
}