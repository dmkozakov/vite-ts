type TItemList = NodeListOf<Element>;

const listItemEl: TItemList = document.querySelectorAll(".item");

function getCategoriesInfo(arr: TItemList) {
  console.log(`Number of categories: ${arr.length}`);

  listItemEl.forEach(el => {
    const categoryTitle = el.querySelector("h2");
    const listOfElements = el.querySelectorAll(".item li");

    if (categoryTitle) {
      console.log(`Category: ${categoryTitle.textContent}\nElements: ${listOfElements.length}`);
    }
  });
}
getCategoriesInfo(listItemEl);
