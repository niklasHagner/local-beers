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
    var loader = document.querySelector('.loader');
    if (event.keyCode == 13 && el.value && getJsonFromApi) {
        getJsonFromApi(el.value).then((data) => {
            loader.classList.add('hidden');
            document.querySelector('.searchbox-input').classList.remove('error');
        }).catch((ex) => {
            loader.classList.add('hidden');
            document.querySelector('.searchbox-input').classList.add('error');
        })
        loader.classList.remove('hidden');
    }
}

(function () {
    var searchBox = document.querySelector('.searchbox-input');
    searchBox.addEventListener('keypress', (ev) => search(ev, ev.target), false);

    getJsonFromApi().then((data) => {
        loader.classList.add('hidden');
        document.querySelector('.searchbox-input').classList.remove('error');
    }).catch((ex) => {
        loader.classList.add('hidden');
        document.querySelector('.searchbox-input').classList.add('error');
    })
    loader.classList.remove('hidden');
})();
