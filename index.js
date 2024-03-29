const photosListRef = document.querySelector(".photos__list");
const loadMoreBtnRef = document.querySelector(".load-more__button");
const searchPhotosInputRef = document.querySelector(".search-photos__input");
let currentPage = 1;
let searchPhotosCurrentPage = 1;
const searchParams = new URLSearchParams({
  key: "43032297-bb179a9d38920a1e0de24f77d",
  editors_choice: true,
  per_page: 8,
  page: 1,
});
let isSearchMode = false;

fetch(`https://pixabay.com/api/?${searchParams}`)
  .then((res) => {
    if (!res.ok) {
      console.log("!res.ok");
    }
    return res.json();
  })
  .then((data) => {
    data.hits.forEach((photo) => {
      photosListRef.insertAdjacentHTML(
        "beforeend",
        `<li class="photos__item"><img src="${photo.webformatURL}" class="photo"/></li>`
      );
    });
  });

loadMoreBtnRef.addEventListener("click", () => {
  if (!isSearchMode) {
    currentPage++;
    const params = new URLSearchParams({
      key: "43032297-bb179a9d38920a1e0de24f77d",
      editors_choice: true,
      per_page: 8,
      page: currentPage,
    });
    fetch(`https://pixabay.com/api/?${params}`)
      .then((res) => {
        if (!res.ok) {
          console.log("!res.ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.hits.length < 1) {
          alert("Нажаль більше немає зображень");
          currentPage = 1;
        }
        data.hits.forEach((elem) => {
          photosListRef.insertAdjacentHTML(
            "beforeend",
            `<li class="photos__item"><img src="${elem.webformatURL}" class="photo"/></li>`
          );
        });
      });
  } else {
    searchPhotosCurrentPage++;
    const params = new URLSearchParams({
      key: "43032297-bb179a9d38920a1e0de24f77d",
      editors_choice: true,
      per_page: 8,
      page: searchPhotosCurrentPage,
      q: searchPhotosInputRef.value,
    });
    fetch(`https://pixabay.com/api/?${params}`)
      .then((res) => {
        if (!res.ok) {
          console.log("!res.ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.hits.length === 0) {
          alert("Нажаль ми не знайшли зображень");
          loadMoreBtnRef.setAttribute("disabled", true);
        }
        data.hits.forEach((elem) => {
          photosListRef.insertAdjacentHTML(
            "beforeend",
            `<li class="photos__item"><img src="${elem.webformatURL}" class="photo"/></li>`
          );
        });
      });
  }
});

searchPhotosInputRef.addEventListener("input", (evt) => {
  isSearchMode = true;
  photosListRef.innerHTML = ``;
  searchPhotosCurrentPage = 1;
  const params = new URLSearchParams({
    key: "43032297-bb179a9d38920a1e0de24f77d",
    editors_choice: true,
    per_page: 8,
    page: searchPhotosCurrentPage,
    q: evt.target.value,
  });
  fetch(`https://pixabay.com/api/?${params}`)
    .then((res) => {
      if (!res.ok) {
        console.log("!res.ok");
      }
      return res.json();
    })
    .then((data) => {
      if (data.hits.length < 1) {
        alert("Нажаль ми не знайшли зображень");
      }
      data.hits.forEach((elem) => {
        photosListRef.insertAdjacentHTML(
          "beforeend",
          `<li class="photos__item"><img src="${elem.webformatURL}" class="photo"/></li>`
        );
      });
    });
});
