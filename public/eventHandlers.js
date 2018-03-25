function activateSearchbox(el) {
    el.classList.add('searchbox--active')
}
function deactivateSearchbox(el) {
    el.classList.remove('searchbox--active')
}
function onFocus() {
    activateSearchbox(document.querySelector('.searchbox'));
}
function onBlur() {
    deactivateSearchbox(document.querySelector('.searchbox'));
}
function search(event, el) {
    if (event.keyCode == 13 && el.value && getJsonFromApi) {
        getJsonFromApi(el.value).then((data) => {
            hideLoaders();
            document.querySelector('.searchbox-input').classList.remove('error');
        }).catch((ex) => {
            hideLoaders();
            document.querySelector('.searchbox-input').classList.add('error');
        })
        showLoaders();
    }
}

function getSelectedStore(){
    var e = document.querySelector('.selectStoreList');
    var selectedValue = e.options[e.selectedIndex].value;
    return selectedValue;
}

function generateAllStoresSelector() {
    console.error("not implemented");
}

function generateLoaderHtml(){
    return `<div class="loader">
        <span>fetching ...</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
    </div>`;
}

function hideLoaders() {
    Array.from(document.querySelectorAll('.loader')).forEach(x => x.classList.add('hidden'));    
}
function showLoaders() {
    Array.from(document.querySelectorAll('.loader')).forEach(x => x.classList.remove('hidden'));    
}

(function () {
    showLoaders();
    document.querySelector('.btn-store-by-gps').addEventListener('click', (ev) => findStoresByCoordinates())
    document.querySelector('.btn-news').addEventListener('click', (ev) => getNews())

    // document.querySelector('.searchbox-input').addEventListener('keypress', (ev) => search(ev, ev.target), false);
    var loader = document.querySelector('.loader');

    getJsonFromApi().then((data) => {
        hideLoaders();
        // document.querySelector('.searchbox-input').classList.remove('error');
    }).catch((ex) => {
        hideLoaders();
        // document.querySelector('.searchbox-input').classList.add('error');
    })
    showLoaders();
})();
