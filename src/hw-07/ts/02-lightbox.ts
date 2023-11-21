import { galleryItems } from "./gallery-items.js";
import { Picture } from "./01-gallery";

const galleryMarkup = createGalleryMarkup(galleryItems);

const refs = {
  galleryBox: document.querySelector(".gallery") as HTMLDivElement,
};

refs.galleryBox.innerHTML = galleryMarkup;

interface LightboxOptions {
  captionsPosition: string;
  captionDelay: number;
  captionsData: string;
  close: boolean;
  showCounter: boolean;
}

new SimpleLightbox(".gallery a", {
  captionsPosition: "bottom",
  captionDelay: 250,
  captionsData: "alt",
  close: false,
  showCounter: false,
});

function createGalleryItemMarkup({ preview, original, description }: Picture) {
  return `
    <a class="gallery__item" href="${original}">
      <img loading="lazy" class="gallery__image lazyload" data-src="${preview}" alt="${description}"/>
    </a>`;
}

function createGalleryMarkup(item: Picture[]) {
  return item.map(el => createGalleryItemMarkup(el)).join("");
}

if ("loading" in HTMLImageElement.prototype) {
  const lazyImages = [...document.querySelectorAll('img[loading="lazy"]')] as HTMLImageElement[];

  lazyImages.forEach((img: HTMLImageElement) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");

  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";

  document.body.appendChild(script);
}
