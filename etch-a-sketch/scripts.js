function makeGrid(spots) {
  const container = document.getElementById("grid");
  container.textContent = "";
  for (let i = 0; i < spots; i++) {
    let colum = document.createElement("div");
    colum.className = "colum";
    container.append(colum);
    for (let n = 0; n < spots; n++) {
      let div = document.createElement("div");
      div.style.padding = `${500 / (spots * 2)}px`;
      div.onmouseover = function () {
        div.setAttribute("class", "color");
      };
      colum.append(div);
    }
  }
}

makeGrid(50);

let clear = document.getElementById("clear");
let gridSize = document.getElementById("gridSize");
let outputValue = document.getElementById("value");
let para = document.createElement("p");

function sizeOfGrid() {
  let currentVal = gridSize.value;
  return currentVal;
}

outputValue.textContent = sizeOfGrid();

gridSize.addEventListener("change", function (event) {
  outputValue.textContent = "";
  outputValue.textContent = sizeOfGrid();
  makeGrid(sizeOfGrid());
});

clear.addEventListener("click", function (event) {
  makeGrid(sizeOfGrid());
});
