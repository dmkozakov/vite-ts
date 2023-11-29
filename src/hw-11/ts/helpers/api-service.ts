import axios from "axios";

interface Gallery {
  searchQuery: string;
  page: number;
  perPage: number;
  fetchedItemsCounter: number;
}

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "35406729-d8fde4d78194a9b2786209d5b";

const options = {
  baseUrl: BASE_URL,
  params: {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
};

export default class GalleryApi {
  public searchQuery: string;
  public page: number;
  public perPage: number;
  public fetchedItemsCounter: number;

  constructor(perPage = 20) {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = perPage;
    this.fetchedItemsCounter = this.perPage;
  }

  async fetchImages() {
    const response = await axios(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}
`,
      options
    );
    this.incrementPage();

    return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
