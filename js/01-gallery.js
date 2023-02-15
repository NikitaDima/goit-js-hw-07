import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const wrapperEl = document.querySelector(".gallery");

const galleryListEl = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>
  `;
  })
  .join("");

wrapperEl.innerHTML = galleryListEl;

wrapperEl.addEventListener("click", showClickImg);

function showClickImg(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}" width="800" height="600">`,
    {
      onShow: () => document.addEventListener("keydown", onCloseModal),
      onClose: () => document.removeEventListener("keydown", onCloseModal),
    }
  );

  instance.show();

  function onCloseModal(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
