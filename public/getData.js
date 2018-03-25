var apiUrl = window.location.origin + '/search';

function getJsonFromApi() {
  var url = `${apiUrl}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(handleHttpError)
      .then(response => {
        console.log("ok");
        response.json().then((data) => {
          if (!data) {
            console.error('no data');
            document.querySelector('#main').innerHTML = 'error: no data';
            reject('no data');
          }
          handleJsonData(data);
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

function handleJsonData(apiData) {

  let htmlString = "";
  apiData.release.forEach(function(release, ix){
    var items = release.items;
    items = items.sort((a,b) => a.price - b.price);
    var headerString = `<header><h2>new releases: ${release.first_sale}</h2></header>`;
    var itemString = items.map((x) => renderCard(x)).join("");
    htmlString += `<section class="group">${headerString} <div class="grid">${itemString}<div></section>`;
  });
  document.querySelector('#main').innerHTML = htmlString;  
}