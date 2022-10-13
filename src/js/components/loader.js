const loaderEl = document.querySelector('#loader');

function toggleLoader() {
    loaderEl.classList.toggle('hide');
}

export {toggleLoader}