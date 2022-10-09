import { dataObject } from './search';
import { toggleModal, productInfoModal } from './modal.js';

function populateSelectedItemInfo(data) {
  productInfoModal.innerHTML = `<div class="product-name">${data[0]['product_name']}</div>
    <div class="product-ingredients">${data[0]['ingredients_text'] || ''}</div>
    <div class="product-container">
      <div class="product-image">
        <img src="${data[0]['image_url'] || ''}" alt="${data[0]['image_url'] ? data[0]['product_name'] : ''}">
      </div>
      <div class="product-nutrients">
        <div class="nutrient-container">
          <div class="nutrient-name">kcal / 100g</div>
          <div class="nutrient-amount">
            ${data[0].nutriments['energy-kcal_100g'] || ''}
          </div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Carbohydrates / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['carbohydrates_100g'] || ''}</div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Fat / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['fat_100g'] || ''}</div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Protein / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['proteins_100g'] || ''}</div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Fiber / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['fiber_100g'] || ''}</div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Sodium / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['sodium_100g'] || ''}</div>
        </div>
        <div class="nutrient-container">
          <div class="nutrient-name">Sugars / 100g</div>
          <div class="nutrient-amount">${data[0].nutriments['sugars_100g'] || ''}</div>
        </div>
      </div>
    </div>`;
  toggleModal();
}

function getSeletedProductInfo(e) {
  const selectedItem = e.currentTarget;
  const selectedItemInfo = dataObject.products.filter(
    (item) => item.id === selectedItem.dataset.id
  );

  populateSelectedItemInfo(selectedItemInfo);
}

export { populateSelectedItemInfo, getSeletedProductInfo };
