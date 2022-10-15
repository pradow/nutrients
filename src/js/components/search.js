import { getSeletedProductInfo } from './selectedItem';
import { populatePagination } from './pagination';
import { toggleLoader } from './loader';

const searchFoodForm = document.querySelector('#searchFoodForm');
const searchFoodInput = document.querySelector('#searchFoodInput');
const searchResults = document.querySelector('#searchResults');
const searchTerm = document.querySelector('#searchTerm');
let dataObject;
let currentSearchedItem;

async function fetchData(url) {
  const results = await fetch(url);
  const data = await results.json();
  return data;
}

let storeData = async (url, cb) => {
  dataObject = await fetchData(url);
  console.log(dataObject.products);
  cb({currentPage: dataObject.page});
};

function createResultItem(product) {
  const productListItem = document.createElement('div');

  productListItem.innerText = product.name;
  productListItem.setAttribute('data-id', product.id);
  productListItem.classList.add('product-list-item');
  productListItem.addEventListener('click', getSeletedProductInfo);
  return productListItem;
}

function disabledForm(isDisabled) {
  Array.prototype.forEach.call(searchFoodForm.elements, (element) => {
    element.disabled = isDisabled;
});
}

function populateResults(options) {
  const results = [];
  const fragment = document.createDocumentFragment();

  dataObject.products.forEach((item) => {
    const productInfo = {
      name: item.product_name,
      id: item.id,
      image: item.image_url,
      ingredients: item.ingredients_text,
      nutrients: item.nutriments,
    };
    results.push(productInfo);
  });

  results.forEach((item) => {
    fragment.append(createResultItem(item));
  });

  if(options.currentPage === 1) {
    populatePagination();
  }

  searchResults.innerHTML = '';

  searchResults.append(fragment);

  toggleLoader();

  disabledForm(false);
}

function searchFood(e, options) {
  e.preventDefault();

  toggleLoader();

  disabledForm(true);

  if(!options) {
    currentSearchedItem = searchFoodInput.value;

    searchTerm.innerHTML = `Results for <span class="searched-term">${currentSearchedItem}</span>`;

    searchTerm.classList.remove('hide');


  }

  const searchLink = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${options ? options.searchedItem : currentSearchedItem}&page=${options ? options.page : '1'}&search_simple=1&action=process&json=1`;

  storeData(searchLink, populateResults);
}

searchFoodForm.addEventListener('submit', searchFood);

export { dataObject, searchFood, currentSearchedItem };
