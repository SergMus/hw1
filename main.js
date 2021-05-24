let dataInfo = [];
let current = 0;

function setData(data) {
  return (dataInfo = [...data]);
}

function fetchTodos() {
  fetch("https://boring-fe.herokuapp.com/advertisments")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .then(() => {
      render();
      sliderRender();
    })
    .catch((err) => {
      console.log("error", err);
    });
}

fetchTodos();

function render() {
  dataInfo.reverse().map((item) => {
    let container = document.querySelector(".container");
    container.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="card" id="${item.id}" data-select="false">
        <div class="card-img" style="background: url(${item.img}) no-repeat center/cover;"></div>
        <div class="card-body">
            <h3 class="card-title" style="color: #e9813c">${item.title}</h3>
            <p class="card-text">${item.description}"</p>
        </div>
      </div> `
    );
  });
}

let toggle = document.querySelector(".toggle");
toggle.onclick = () => {
  let cards = document.querySelectorAll(".card");
  let card = Array.from(cards).find((item) => {
    return !item.classList.contains("opacity");
  });
  let cardBody = card.childNodes[3];
  if (!card.classList.contains("opacity") && card.dataset.select === "false") {
    card.style.paddingTop = 350 - cardBody.scrollHeight + "px";
    cardBody.style.height = cardBody.scrollHeight + "px";
    card.dataset.select = "true";
  } else if (
    !card.classList.contains("opacity") &&
    card.dataset.select === "true"
  ) {
    card.style.paddingTop = 250 + "px";
    cardBody.style.height = "100px";
    card.dataset.select = "false";
  }
};

function sliderRender() {
  let cards = document.querySelectorAll(".card");

  function slider() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("opacity");
    }
    cards[current].classList.remove("opacity");
  }
  slider();

  document.querySelector(".btn-left").onclick = function () {
    if (current - 1 == -1) {
      current = cards.length - 1;
    } else {
      current--;
    }
    slider();
  };

  document.querySelector(".btn-right").onclick = function () {
    if (current + 1 == cards.length) {
      current = 0;
    } else {
      current++;
    }
    slider();
  };
}
