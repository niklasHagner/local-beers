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
  const data = apiData.release[0].items;

  data = data.sort((a,b) => a.price - b.price);

  var htmlString = data.map((x) => renderCard(x)).join("");
  document.querySelector('#main').innerHTML = htmlString;
}