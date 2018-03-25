var apiUrl = window.location.origin;

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
          getBeersFromStore(); //get more data!
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
    items = items.sort((a,b) => a.price - b.price);
    var headerString = `<header><h2>new releases: ${release.first_sale}</h2></header>`;
    var itemString = items.map((x) => renderCard(x)).join("");
    htmlString += `<section class="group">${headerString} <div class="grid">${itemString}<div></section>`;
  });
  document.querySelector('#news').innerHTML = htmlString;  
}

function handleStoreInventoryJsonData(apiData) {
  let htmlString = "";
  var items = apiData.items;
  var store = apiData.store;
  items = items.sort((a,b) => a.price - b.price);
  var headerString = `<header><h2>store: ${store.address}</h2></header>`;
  var itemString = items.map((x) => renderCard(x)).join("");
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
      }
      handleStoreInventoryJsonData(data);
    });
  })
  .catch(error => {
    console.log(error);
  });
}


function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log( position.coords.latitude , position.coords.longitude);
        return { lat: position.coords.latitude, lng: position.coords.longitude };
      });
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function findStoresByCoordinates() {

  var coords = getLocation();
  if (!coords) return;
  
  let url = `${apiUrl}/findStoresByCoordinates?lat=${lat}&lng=${lng}`;
  fetch(url)
  .then(handleHttpError)
  .then(response => {
    response.json().then((data) => {
      if (!data) {
        console.error('no data');
        document.querySelector('#news').innerHTML = 'error: no data';
      }
      handleFoundStoresData(data);
    });
  })
  .catch(error => {
    console.log(error);
  });
}

function handleFoundStoresData(apiData) {
  let htmlString = "";
  apiData.items.forEach(function(item, ix){
    let option = `<option value="${item.id}">${item.adress}</option>`;
    htmlString += option;
  });
  document.querySelector('#storeList').innerHTML = `<select class="selectStoreList">${htmlString}</select>`;  
}