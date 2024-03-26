const photosListRef = document.querySelector(".photos__list");
const loadMoreBtnRef = document.querySelector(".load-more__button");
let currentPage = 1;
const searchParams = new URLSearchParams({
  key: "43032297-bb179a9d38920a1e0de24f77d",
  editors_choice: true,
  per_page: 8,
  page: 1,
});

fetch(`https://pixabay.com/api/?${searchParams}`)
  .then((res) => {
    if (!res.ok) {
      console.log("!res.ok");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    data.hits.forEach((elem) => {
      photosListRef.insertAdjacentHTML(
        "beforeend",
        `<li class="photos__item"><img src="${elem.webformatURL}" class="photo"/></li>`
      );
    });
  });

loadMoreBtnRef.addEventListener("click", (evt) => {
  currentPage++;
  const params = new URLSearchParams({
    key: "43032297-bb179a9d38920a1e0de24f77d",
    editors_choice: true,
    per_page: 8,
    page: currentPage,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  fetch(`https://pixabay.com/api/?${params}`)
    .then((res) => {
      if (!res.ok) {
        console.log("!res.ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.hits.forEach((elem) => {
        photosListRef.insertAdjacentHTML(
          "beforeend",
          `<li class="photos__item"><img src="${elem.webformatURL}" class="photo"/></li>`
        );
      });
    });
});
