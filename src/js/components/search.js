import { getSeletedProductInfo } from './selectedItem';

const searchFoodForm = document.querySelector('#searchFoodForm');
const searchFoodInput = document.querySelector('#searchFoodInput');
const searchResults = document.querySelector('#searchResults');
let dataObject;

async function fetchData(url) {
  const results = await fetch(url);
  const data = await results.json();
  return data;
}

let storeData = async (url, cb) => {
  dataObject = await fetchData(url);
  console.log(dataObject.products);
  cb();
};

function createResultItem(product) {
  const productListItem = document.createElement('div');

  productListItem.innerText = product.name;
  productListItem.setAttribute('data-id', product.id);
  productListItem.classList.add('product-list-item');
  productListItem.addEventListener('click', getSeletedProductInfo);
  return productListItem;
}

function populateResults() {
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

  searchResults.innerHTML = '';

  searchResults.append(fragment);
}

function searchFood(e) {
  e.preventDefault();

  const searchLink = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchFoodInput.value}&page=1&search_simple=1&action=process&json=1`;

  searchFoodInput.value = '';

  storeData(searchLink, populateResults);
}

searchFoodForm.addEventListener('submit', searchFood);

export { dataObject };
