import {dataObject, searchFood, currentSearchedItem} from './search';

const searchResultsContainer = document.querySelector('#searchResultsContainer');
const paginationContainer = document.querySelector('#paginationContainer');
const pageSelectorEl = document.querySelector('#pageSelector');

function pageSelected(e) {
    e.preventDefault();

    const options = {
        page: e.currentTarget.value,
        searchedItem: currentSearchedItem
    }

   searchFood(e, options);
}

function populatePagination() {
    pageSelectorEl.innerHTML = '';
    
    for(let i = 1; i <= dataObject['page_count']; i++) {
        let pageOption = document.createElement('option');
        pageOption.innerText = i;
        pageOption.setAttribute('value', i);

        pageSelector.appendChild(pageOption);
    }

    pageSelectorEl.addEventListener('change', pageSelected);

    paginationContainer.classList.remove('hide');
}

export {populatePagination}