const submitBookButton = document.querySelector('#submit-book-button');
const addBookButton = document.querySelector('#add-book-button');
const addBookForm = document.querySelector('#add-book-form');
const bookLibrary = document.querySelector('#book-library');
const closeFormButton = document.querySelector('.close-form')

const myLibrary = []

addBookButton.addEventListener('click', () => {
  addBookForm.classList.toggle('show');
})

submitBookButton.addEventListener('click', (event) => {
  event.preventDefault()
  let author = document.getElementById('author').value;
  let title = document.getElementById('title').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('is_read').checked;
  // console.log(author)
  // console.log(title)
  // console.log(pages)
  // console.log(read)
  if (!author || !title || !pages ) {
    alert('Enter all the values');
  }  
  else if (checkDuplicate(author, title))
    alert('This book is already in the library');
  else {
    addBookForm.classList.remove('show');
    addBookToLibrary(author, title, pages, read);
  }
})

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary(author, title, pages, read) {
  let bookInstance = new Book(author, title, pages, read);
  myLibrary.push(bookInstance);
  createBookCard(bookInstance);
  addBookForm.reset();
  // console.log(myLibrary);
}

function createBookCard(bookInstance) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-library-card');

  bookCard.appendChild(createBookAuthor(bookInstance.author));
  bookCard.appendChild(createBookTitle(bookInstance.title));
  bookCard.appendChild(createBookPages(bookInstance.pages));

  const cardButtonsContainer = document.createElement('div');
  bookCard.appendChild(cardButtonsContainer);

  const readButton = createReadButton(bookInstance.read);
  cardButtonsContainer.appendChild(readButton);

  readButton.addEventListener('click', () => {
    bookInstance.read = !bookInstance.read;
    setReadButtonStyle(readButton, bookInstance.read);
    // console.log(bookInstance);
    // console.table(myLibrary);
  });

  const removeButton = createRemoveButton();
  cardButtonsContainer.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(bookInstance), 1);
    bookLibrary.removeChild(bookCard);
    // console.table(myLibrary);
  })

  bookLibrary.appendChild(bookCard);
  // console.table(myLibrary);
}

function createBookAuthor(author) {
  const bookCardAuthor = document.createElement('p');
  bookCardAuthor.textContent = author.charAt(0).toUpperCase() + author.slice(1).toLowerCase();
  return bookCardAuthor;
}

function createBookTitle(title) {
  const bookCardTitle = document.createElement('p');
  bookCardTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  return bookCardTitle;
}

function createBookPages(pages) {
  const bookCardPages = document.createElement('p');
  bookCardPages.textContent = `Pages: ${pages}`;
  return bookCardPages;
}

function createRemoveButton() {
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-button');
  removeBtn.textContent = 'Remove';
  return removeBtn;
}

function createReadButton(read) {
  const readButton = document.createElement('button');
  readButton.classList.add('read-button');
  setReadButtonStyle(readButton, read);
  return readButton;
}

function setReadButtonStyle(readButton, read) {
  if (read === true) {
    readButton.style.backgroundColor = 'rgba(35, 158, 80, 0.86)'; 
    readButton.textContent = 'Read';
  }
  else {
    readButton.textContent = 'Not read';
    readButton.style.backgroundColor = 'rgba(158, 10, 50, 0.86)';
  }
}

function checkDuplicate(author, title) {
  return myLibrary.some(book => book.author === author && book.title === title);
}

closeFormButton.addEventListener('click', (event) => {
  event.preventDefault();
  addBookForm.classList.remove('show');
})