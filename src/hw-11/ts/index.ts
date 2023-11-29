import { refs } from "./helpers/refs";
import GalleryApi from "./helpers/api-service";
import { renderCardsMarkup } from "./helpers/render-cards";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ICard } from "./interfaces/ICard";
//@ts-ignore
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

type Response = {
  hits: ICard[];
  total: number;
  totalHits: number;
};

const gallery = new GalleryApi(40);

// var lightbox = new SimpleLightbox(".gallery a", {
//   close: false,
//   showCounter: false,
// });

const infiniteObserver = new IntersectionObserver(entry => onEntry(entry), {
  rootMargin: "150px",
});

refs.searchForm.addEventListener("submit", onSubmit);

async function onSubmit(evt: Event) {
  evt.preventDefault();
  const form = evt.currentTarget as HTMLFormElement;

  const searchQuery = (form.children as HTMLFormControlsCollection).searchQuery.value
    .toLowerCase()
    .trim();

  if (gallery.query && gallery.query === searchQuery) {
    return Notify.info("Please, enter a new query");
  }

  gallery.query = searchQuery;

  if (!gallery.query) {
    return Notify.info("Please, enter a query");
  } else {
  }

  gallery.resetPage();

  try {
    const data = await gallery.fetchImages();

    clearGallery();
    onSearchFailure(data);
    onSearchSuccess(data);
    showTotalHits(data);
    checkOnEndSearchResults(data);
    addObserverOnLastCard(data);
  } catch (error) {
    console.log(error);
  }
}

function showTotalHits(data: Response) {
  if (data.hits.length) {
    return Notify.info(`Hooray! We found ${data.totalHits} images.`);
  }
}

function clearGallery() {
  refs.galleryBox.innerHTML = "";
}

// Варіант з Infinite Scroll
async function onLoadMore() {
  try {
    const data = await gallery.fetchImages();
    onSearchSuccess(data);
    checkOnEndSearchResults(data);
    addObserverOnLastCard(data);
  } catch (error) {
    console.log(error);
  }
}

function addObserverOnLastCard(data: Response) {
  const lastCard = document.querySelector(".photo-card:last-child");

  if (gallery.perPage * (gallery.page - 1) >= data.totalHits) {
    infiniteObserver.unobserve(lastCard);
    return;
  }

  if (lastCard) {
    infiniteObserver.observe(lastCard);
  }
}

function onEntry([entry]: any) {
  if (entry.isIntersecting) {
    infiniteObserver.unobserve(entry.target);

    onLoadMore();
  }
}

function onSearchFailure(data: Response) {
  if (!data.hits.length) {
    return Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }
}

function onSearchSuccess(data: Response) {
  const galleryMarkup = renderCardsMarkup(data.hits);

  refs.galleryBox.insertAdjacentHTML("beforeend", galleryMarkup);

  // lightbox.refresh();
}

function checkOnEndSearchResults(data: Response) {
  if (gallery.perPage * (gallery.page - 1) >= data.totalHits) {
    return Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
