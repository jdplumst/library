let tableBody = document.querySelector('tbody');

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

function addBookToLibrary(title, author, pages, read) {
    // Create new book
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Add new book to table
    let newRow = tableBody.insertRow();
    for (let prop in book) {
        if (['title', 'author', 'pages', 'read'].includes(prop)) {
            let newCell = newRow.insertCell();
            newCell.textContent = book[prop];
        }   
    }
};