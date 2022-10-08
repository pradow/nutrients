const productInfoModalContainer = document.querySelector('#productInfoModal');
const productInfoModal = document.querySelector('#productInfo');
const closeModalButton = document.querySelector('#closeModal');

function toggleModal() {
  productInfoModalContainer.classList.toggle('modal-open');
}

closeModalButton.addEventListener('click', toggleModal);

export { productInfoModal, toggleModal };
