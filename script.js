let linkBooks = "https://striveschool-api.herokuapp.com/books";
const getData = async () => {
  try {
    let resultRaw = await fetch(linkBooks);
    let result = await resultRaw.json();
    outerBooks = result;
    renderBooks(result);
    addToList(result);
    removeCard();
  } catch (error) {
    console.log(error);
  }
};
const renderBooks = (result) => {
  let container = document.querySelector("#row");
  container.innerHTML = "";
  result.forEach((book) => {
    container.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card">
              <img class="card-img-top" src="${book.img}" alt="picture">
              <div class="card-body">
              <h5 class="card-title text-center title" >${book.title}</h5>
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
};

const addToList = (book) => {
  const addBTN = document.querySelectorAll(".addBtn");
  const list = document.querySelector("#drop-list");
  let counter = 0;
  for (let i = 0; i < addBTN.length; i++) {
    const element = addBTN[i];
    element.addEventListener("click", () => {
      element.classList.add("btn-success");
      list.innerHTML += `<li>${book[i].title}</li><button class="btn btn-danger" onclick="removeItem(event)">remove</button>`;
      counter++;
      const counterContainer = document.getElementById("counter");
      counterContainer.innerHTML = `<p>The items in the cart is:${counter}</p>`;
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

function search(query) {
  let cards = document.querySelectorAll(".card-title");
  if (query.length > 3) {
    const array = Array.prototype.slice.call(cards);
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.innerText.toLowerCase().includes(query)) {
        element.classList.add("bg-info");
      } else {
        element.parentElement.parentElement.remove();
      }
    }
  } else if (query.length === 0) {
    getData();
  }
}

const removeItem = (event) => {
  event.target.parentElement.remove();
};

const removeAll = () => {
  const list = document.querySelector("#drop-list");
  list.innerHTML = "";
};

window.onload = () => {
  getData();
};
