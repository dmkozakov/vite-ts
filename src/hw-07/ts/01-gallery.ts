import { BasicLightBox } from "basiclightbox";
import { galleryItems } from "./gallery-items.js";

const refs = {
  galleryBox: document.querySelector(".gallery") as HTMLDivElement,
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryBox.insertAdjacentHTML("beforeend", galleryMarkup);

refs.galleryBox.addEventListener("click", onGalleryItemClick);

export interface Picture {
  preview: string;
  original: string;
  description: string;
}

function createPictureItemMarkup({ preview, original, description }: Picture) {
  return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
          <img
            loading="lazy"
            class="gallery__image lazyload"
            data-src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
      </a>
    </div>
    `;
}

function createGalleryMarkup(items: Picture[]) {
  return items.map(item => createPictureItemMarkup(item)).join("");
}

function onGalleryItemClick(evt: Event) {
  evt.preventDefault();

  if ((evt.target as HTMLDivElement).nodeName !== "IMG") {
    return;
  }

  const instance: BasicLightBox = basicLightbox.create(
    `<img src="${(evt.target as HTMLImageElement).dataset.source}" alt="${
      (evt.target as HTMLImageElement).alt
    }"/>`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscKeyClose);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscKeyClose);
      },
    }
  );

  instance.show();

  function onEscKeyClose(evt: KeyboardEvent) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
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
