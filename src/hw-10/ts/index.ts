import { refs } from "./refs";
import { makeCountryInfoItem, makeCountryListItem, resetMarkup } from "./markup";
import { fetchCountries } from "./fetchCountries";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import debounce from "lodash/debounce";
import "../css/styles.css";
import { Response } from "./types";

const DEBOUNCE_DELAY = 300;

refs.searchInput.addEventListener(
  "input",
  debounce(onSearch, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
  })
);

function onSearch(e: Event) {
  const target = e.target as HTMLInputElement;
  const searchQuery = target.value.toLowerCase().trim();

  resetMarkup();

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery).then(renderCountryInfo).catch(onReject);
}

function renderCountryInfo(data: Response) {
  if (data.length > 10) {
    return Notify.info("Too many matches found. Please enter a more specific name.");
  }
  if (data.length >= 2) {
    const countryListMarkup = data.map(makeCountryListItem).join("");
    return refs.countryList.insertAdjacentHTML("beforeend", countryListMarkup);
  }

  const countryInfoMarkup = makeCountryInfoItem(data);
  refs.countryInfo.insertAdjacentHTML("beforeend", countryInfoMarkup);
}

function onReject() {
  return Notify.failure("Oops, there is no country with that name");
}
