let linkBooks = "https://striveschool-api.herokuapp.com/books";

const getData = async () => {
  try {
    let resultRaw = await fetch(linkBooks);
    let result = await resultRaw.json();
    console.log(result);
    let container = document.querySelector("#row");

    result.forEach((book) => {
      container.innerHTML += `
          <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="card">
                  <img class="card-img-top" src="${book.img}" alt="picture">
                  <div class="card-body">
                  <h5 class="card-title text-center">${book.title}</h5>
                  <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary addBtn")
                  >
                    ADD TO CART
                  </button>
                  <button  type="button"
                    class="btn btn-sm btn-outline-secondary removeBTN"
                  >
                    skip
                  </div>
              </div>
              </div>
          `;
    });
    addToList(result);
    removeCard();
  } catch (error) {
    console.log(error);
  }
};

const addToList = (book) => {
  const addBTN = document.querySelectorAll(".addBtn");
  const list = document.querySelector("#drop-list");
  for (let i = 0; i < addBTN.length; i++) {
    const element = addBTN[i];
    element.addEventListener("click", () => {
      element.classList.add("btn-success");
      list.innerHTML += `<li>${book[i].title}</li>`;
    });
  }
};

const removeCard = () => {
  let removeBtn = document.querySelectorAll(".removeBTN");
  for (const iterator of removeBtn) {
    iterator.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.parentElement.remove();
    });
  }
};

function search(event) {
  console.log(event);
  // let characters = event.value.split();
  const result = event.value.filter(() => word.length > 3);
  console.log(result);
}
// if (characters > 3) {
//   let searchWindow = document.querySelector(".form-control");
//   let value = searchWindow.value;
//   let searchButton = document.querySelector(".search-button");
//   searchButton.addEventListener("click", getData(value));
// }

window.onload = getData();
window.onload = search();
