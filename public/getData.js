var apiUrl = window.location.origin;

function getNews(){
  getJsonFromApi();
}

function getJsonFromApi() {
  let url = `${apiUrl}/newBeers`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(handleHttpError)
      .then(response => {
        response.json().then((data) => {
          if (!data) {
            console.error('no data');
            document.querySelector('#news').innerHTML = 'error: no data';
            reject('no data');
          }
          handleNewsJsonData(data);
          resolve(data);
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

function handleHttpError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function handleNewsJsonData(apiData) {
  let htmlString = "";
  apiData.release.forEach(function(release, ix){
    var items = release.items;
    items = items.map((item) => {
      //The encoding for https://systembevakningsagenten.se/api/json/2.0/newProducts.json is broken
      //... until they fix it, take a gamble and replace unknown characters with 'ö', because � looks so awful.
      item.name = item.name.replace(/�/g, "ö");
      item.producer = item.producer.replace(/�/g, "ö");
      return item;
    });
    items = items.sort((a,b) => a.price - b.price);
    var headerString = `<header><h2>🍺 new releases: <span style="display:inline-block;">${release.first_sale}</span></h2></header>`;
    var itemString = items.map((x) => renderItemView(x)).join("");
    htmlString += `<section class="group">${headerString} <div class="grid">${itemString}<div></section>`;
  });
  document.querySelector('#news').innerHTML = htmlString;
}

function handleStoreInventoryJsonData(apiData) {
  let htmlString = "";
  var items = apiData.items;
  var store = apiData.store;
  var headerString = `<header><h2>🍺 store: <span style="display:inline-block;">${store.address}</span></h2></header>`;
  var itemString = items.map((x) => renderItemView(x)).join("");
  htmlString += `<section class="group">${headerString} <div class="grid">${itemString}<div></section>`;
  document.querySelector('#store').innerHTML = htmlString;  
}

function getBeersFromStore(storeId) {
  let url = `${apiUrl}/storeInventory?storeId=${storeId}`;
  fetch(url)
  .then(handleHttpError)
  .then(response => {
    response.json().then((data) => {
      if (!data) {
        console.error('no data');
        document.querySelector('#news').innerHTML = 'error: no data';
        hideLoaders();
        return;
      }
      handleStoreInventoryJsonData(data);
      hideLoaders();
    });
  })
  .catch(error => {
    console.log(error);
    hideLoaders();
  });
}


async function getLocation(callback) {
  if (navigator.geolocation) {
      var coords = navigator.geolocation.getCurrentPosition(function(position) {
        callback(position);
      });
      return coords;
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

async function findStoresByCoordinates() {
  document.querySelectorAll(".loader").forEach(x => x.classList.add("hidden"));
  var loaderHtml = generateLoaderHtml("fetching store by gps");
  document.querySelector('#storeList').innerHTML = loaderHtml;
  getLocation(callback);

  function callback(position) {
    if (!position) {
      console.error("no geodata for you");
      document.querySelector('.loader').classList.add('hidden');
      return;
    }
    console.log( position.coords.latitude , position.coords.longitude);
    let coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    let url = `${apiUrl}/findStoresByCoordinates?lat=${coords.lat}&lng=${coords.lng}`;
    fetch(url)
    .then(handleHttpError)
    .then(response => {
      response.json().then((data) => {
        
        document.querySelector('.loader').classList.add('hidden');
        if (!data) {
          console.error('no data');
          document.querySelector('#stores').innerHTML = 'error: no data';
        }
        handleFoundStoresData(data);
      });
    })
    .catch(error => {
      console.log(error);
      document.querySelector('.loader').classList.add('hidden');
    });
  }
}

function handleFoundStoresData(apiData) {
  let htmlString = "";
  apiData.items.forEach(function(item, ix){
    let status = ix === 0 ? `selected` : '';
    let option = `<option ${status} value="${item.id}">${item.address}</option>`;
    htmlString += option;
  });
  document.querySelector('#storeList').innerHTML = `<select class="selectStoreList">${htmlString}</select><input type="button" class="search-selected-store" onClick="javascript: searchSelectedStore()" value="search selected store"/>`;  
}

function searchSelectedStore(){
  var loaderHtml = generateLoaderHtml();
  document.querySelector('#storeList').innerHTML += loaderHtml;
  var val = getSelectedStore();
  getBeersFromStore(val);
}