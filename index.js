const myLibrary = [];


// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status method
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to array and re-render
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Display all books
function displayBooks() {
  const container = document.getElementById('libraryContainer');
  container.innerHTML = ''; // Clear previous content

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? 'Read' : 'Not read'}</p>
      <button class="toggle-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    container.appendChild(card);
  });

  // Button event listeners
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookId = e.target.parentElement.getAttribute('data-id');
      const index = myLibrary.findIndex(book => book.id === bookId);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });
  });

  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookId = e.target.parentElement.getAttribute('data-id');
      const book = myLibrary.find(book => book.id === bookId);
      if (book) {
        book.toggleRead();
        displayBooks();
      }
    });
  });
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('bookDialog');
  const newBookBtn = document.getElementById('newBookBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('bookForm');

  newBookBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'));
    const read = formData.get('read') === 'on';

    addBookToLibrary(title, author, pages, read);
    form.reset();
    dialog.close();
  });
});
