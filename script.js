const submitBookButton = document.querySelector('#submit-book-button');
const addBookButton = document.querySelector('#add-book-button');
const addBookForm = document.querySelector('#add-book-form');
const bookLibrary = document.querySelector('#book-library');

const myLibrary = []


function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}


function addBookToLibrary(author, title, pages, read) {
  let bookInstance = new Book(author, title, pages, read);
  myLibrary.push(bookInstance);
  console.log(myLibrary);
  addBookForm.reset();
  createBookCard(bookInstance);
}

function createBookCard(bookInstance) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-library-card');

  const bookCardAuthor = document.createElement('p');
  bookCardAuthor.textContent = bookInstance.author.charAt(0).toUpperCase() + bookInstance.author.slice(1).toLowerCase();
  bookCard.appendChild(bookCardAuthor);

  const bookCardTitle = document.createElement('p');
  bookCardTitle.textContent = bookInstance.title.charAt(0).toUpperCase() + bookInstance.title.slice(1).toLowerCase();
  bookCard.appendChild(bookCardTitle);

  const bookCardPages = document.createElement('p');
  bookCardPages.textContent = `Pages: ${bookInstance.pages}`;
  bookCard.appendChild(bookCardPages);

  const cardButtonsContainer = document.createElement('div');
  bookCard.appendChild(cardButtonsContainer);

  const readButton = document.createElement('button');
  readButton.classList.add('read-button');

  if (bookInstance.read === true) {
    readButton.style.backgroundColor = 'rgba(24, 202, 89, 0.863)'; 
    readButton.textContent = 'Read';
  }
  else {
    readButton.textContent = 'Not read';
    readButton.style.backgroundColor = 'rgba(191, 18, 12, 0.863)';
  }
readButton.addEventListener('click', () => {
  if (readButton.value === true) {
    readButton.value = false;
    readButton.style.backgroundColor = 'rgba(191, 18, 12, 0.863)';
    readButton.textContent = 'Not read';
  }
  else if (readButton.value === false) {
    readButton.value = true;
    readButton.style.backgroundColor = 'rgba(24, 202, 89, 0.863)'; 
    readButton.textContent = 'Read';
  }
  createBookCard();
})
  cardButtonsContainer.appendChild(readButton);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';
  cardButtonsContainer.appendChild(removeButton);
  // removeButton.addEventListener('click', () => {
  //   myLibrary.splice(myLibrary.indexOf(bookInstance), 1);
  // })

  bookLibrary.appendChild(bookCard);
  showLibraryCards();
}



// readButton.addEventListener('click', () => {
//   if (readButton.value === true) {
//     readButton.value = false;
//     readButton.style.backgroundColor = 'rgba(191, 18, 12, 0.863)';
//     readButton.textContent = 'Not read';
//   }
//   else if (readButton.value === false) {
//     readButton.value = true;
//     readButton.style.backgroundColor = 'rgba(24, 202, 89, 0.863)'; 
//     readButton.textContent = 'Read';
//   }
//   createBookCard();
// })


submitBookButton.addEventListener('click', () => {
  event.preventDefault()
  let author = document.getElementById('author').value;
  let title = document.getElementById('title').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('is_read').checked;
  console.log(author)
  console.log(title)
  console.log(pages)
  console.log(read)
  if (!author || !title || !pages ) {
    alert('Enter all the values');
    addBookForm.reset();
  }  
  else {
    addBookForm.classList.remove('show');
    addBookToLibrary(author, title, pages, read);
    
  }
    

  
})

addBookButton.addEventListener('click', () => {
  addBookForm.classList.toggle('show');
})