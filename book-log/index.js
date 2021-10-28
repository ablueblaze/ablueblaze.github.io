// Book object constructor
function Book(title, author, read = "no") {
  this.title = title;
  this.author = author;
  this.read = read;
}

//! Storage:
// This will be what the local storage will use for it's key's
function uniqueId(book) {
  return `${book.title} ${book.author}`;
}

// Store the given book in local storage
function storeLocal(book) {
  localStorage.setItem(uniqueId(book), JSON.stringify(book));
}

// Returns a book as an object from local storage
function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Returns an array of all books in local storage
function getAllLocal() {
  let keys = Object.keys(localStorage);
  let allBooks = [];
  for (i of keys) {
    allBooks.push(getLocal(i));
  }
  return allBooks;
}

//! Template:
// Raises the case of the first letter of a word
function raiseCase(word) {
  return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
}

function cardRowMaker(placement, contents, fullClassName) {
  const newDiv = document.createElement("div");
  newDiv.className = fullClassName;
  newDiv.appendChild(contents);
  placement.appendChild(newDiv);
}

function readOrUnread(element, book) {
  if (book.read === "yes") {
    element.textContent = "Read";
  } else {
    element.textContent = "Unread";
    element.classList.add("unread");
  }
}

function bookCardTemplate(placement, book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  const namePar = document.createElement("p");
  namePar.className = "book-name";
  namePar.textContent = raiseCase(book.title);
  cardRowMaker(bookCard, namePar, "card-row scrollable");

  const authorPar = document.createElement("p");
  authorPar.className = "book-author";
  authorPar.textContent = raiseCase(book.author);
  cardRowMaker(bookCard, authorPar, "card-row scrollable");

  const readBtn = document.createElement("button");
  readBtn.className = "read-button";
  readBtn.setAttribute("data-book-id", uniqueId(book));
  readOrUnread(readBtn, book);
  cardRowMaker(bookCard, readBtn, "card-row");

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("data-book-id", uniqueId(book));
  cardRowMaker(bookCard, deleteBtn, "card-row");

  placement.appendChild(bookCard);
}

function generateBookCards(placement, arrayOfBooks) {
  for (i of arrayOfBooks) {
    bookCardTemplate(placement, i);
  }
}

//! Modal:
function toggleModal() {
  const modal = document.querySelector(".modal");
  if (modal.classList == "modal") {
    modal.classList.add("active");
  } else {
    modal.classList.remove("active");
  }
}

function modalDisplay(
  targetClassList,
  activeModalClass,
  closeModalClass,
  openModalClass
) {
  if (
    targetClassList == activeModalClass ||
    targetClassList == closeModalClass
  ) {
    toggleModal();
  }
  if (targetClassList == openModalClass) {
    toggleModal();
  }
}

//todo find a way to work with the form data that is clearer, and doesn't require you to know what each index is.
function createBookFromModal(placement, formElement) {
  let data = new FormData(formElement);
  let newBookData = [];
  for (v of data) {
    newBookData.push(v[1]);
  }
  const newBook = new Book(newBookData[0], newBookData[1], newBookData[2]);
  storeLocal(newBook);
  bookCardTemplate(placement, newBook);
  console.log(localStorage.getItem(uniqueId(newBook)));
}

//! Card Utility:
function toggleRead(target, unreadClassList, readClassList) {
  let currentBook = getLocal(target.dataset.bookId);
  console.log(currentBook);
  console.log(target.dataset.bookId);
  if (target.className === unreadClassList) {
    target.classList.remove("unread");
    target.textContent = "Read";
    currentBook["read"] = "yes";
    storeLocal(currentBook);
  } else if (target.className === readClassList) {
    target.classList.add("unread");
    target.textContent = "Unread";
    currentBook["read"] = "no";
    storeLocal(currentBook);
  }
}

function deleteBook(target) {
  if (target.className == "delete-button") {
    let check = window.confirm("Delete book?");
    if (check) {
      const bookCard = target.parentElement.parentElement;
      const bookKey = target.dataset.bookId;
      localStorage.removeItem(bookKey);
      bookCard.remove();
    }
  }
}

document.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target.dataset.bookId);
  modalDisplay(target.classList, "modal active", "close", "new-book");
  toggleRead(target, "read-button unread", "read-button");
  deleteBook(target);
});

const cardBox = document.querySelector('.card-box')
const formElement = document.forms["new-book"];
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  createBookFromModal(cardBox, formElement);
  toggleModal();
  formElement.reset();
});

const allBooks = getAllLocal();
generateBookCards(cardBox, allBooks);
