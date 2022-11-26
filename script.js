let tableBody = document.querySelector('tbody');
let modal = document.querySelector('.modal');
let modalBtn = document.querySelector('.modal-btn');
let closeBtn = document.querySelector('.close');
let submitBtn = document.querySelector('.submit');

let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(title + ' by ' + author + ', ' + pages + ' pages, ' + read + ' yet');
    }
};

// Adds new book to myLibrary and adds it to table
function addBookToLibrary(title, author, pages, read) {
    // Create new book
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Add new book to table
    let newRow = tableBody.insertRow();
    newRow.setAttribute('index', myLibrary.length);
    for (let prop in book) {
        if (['title', 'author', 'pages', 'read'].includes(prop)) {
            let newCell = newRow.insertCell();
            newCell.textContent = book[prop];
        }   
    }
};

// Deletes book from myLibrary and removes it from the table
function removeBookFromLibrary(index) {
    // This only deletes the instance of the book object but does not remove it
    // from the list, keeping the list length the same
    delete myLibrary[index];
}

// Display modal
modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Get new book when user submits form and add it to myLibrary
submitBtn.addEventListener('click', function submitNewBook(event) {
    event.preventDefault();
    let newTitle = document.querySelector('#title').value;
    console.log(newTitle);
    let newAuthor = document.querySelector('#author').value;
    console.log(newAuthor);
    let newPages = document.querySelector('#pages').value;
    console.log(newPages);
    let newRead = document.querySelector('#read');
    if (newRead.checked) {
        newRead = 'read';
    } else {
        newRead = 'not read';
    }
    console.log(newRead);
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    modal.style.display = 'none';
});