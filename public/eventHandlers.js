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
            if (loader)
                loader.classList.add('hidden');
            document.querySelector('.searchbox-input').classList.remove('error');
        }).catch((ex) => {
            if (loader)
                loader.classList.add('hidden');
            document.querySelector('.searchbox-input').classList.add('error');
        })
        if (loader)
            loader.classList.remove('hidden');
    }
}

function setUpEventForSelect() {
    // document.querySelector('.selectStoreList').addEventListener('change', warn, true);
    // function warn(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (e.target) {
    //         console.log(e.target);
    //     }
    //     var selected = e.target.options[e.target.selectedIndex].value;
    //     console.log(selected);
    // }
}

function getSelectedValue(){
    var e = document.querySelector('.selectStoreList');
    var selectedValue = e.options[e.selectedIndex].value;
    return selectedValue;
}

function generateAllStoresSelector() {
    console.error("not implemented");
}

(function () {
    window.loader = document.querySelector('.loader');
    document.querySelector('.btn-store-by-gps').addEventListener('click', (ev) => findStoresByCoordinates())
    document.querySelector('.btn-news').addEventListener('click', (ev) => getNews())

    // document.querySelector('.searchbox-input').addEventListener('keypress', (ev) => search(ev, ev.target), false);
    var loader = document.querySelector('.loader');

    getJsonFromApi().then((data) => {
        loader.classList.add('hidden');
        // document.querySelector('.searchbox-input').classList.remove('error');
    }).catch((ex) => {
        loader.classList.add('hidden');
        // document.querySelector('.searchbox-input').classList.add('error');
    })
    loader.classList.remove('hidden');
})();

function generateLoaderHtml(){
    return `<div class="hidden loader">
        <span>fetching ...</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
        <span class="beer">🍺</span>
    </div>`;
}