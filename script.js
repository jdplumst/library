let tableBody = document.querySelector('tbody');
let modal = document.querySelector('.modal');
let modalBtn = document.querySelector('.modal-btn');
let closeBtn = document.querySelector('.close');
let submitBtn = document.querySelector('.submit');
let form = document.querySelector('form');

// Stores Book objects
let myLibrary = [];

// Book constructor
class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
    
    info() {
        return(this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read + ' yet');
    };
};

// Adds new book to myLibrary and adds it to table
function addBookToLibrary(title, author, pages, read) {
    // Create new book
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Add new book to table
    let newRow = tableBody.insertRow();
    newRow.setAttribute('index', myLibrary.length - 1);
    for (let prop in book) {
        if (['title', 'author', 'pages'].includes(prop)) {
            let newCell = newRow.insertCell();
            newCell.textContent = book[prop];
            newCell.style.textAlign = 'center';
        } else if (prop === 'read') {
            let newCell= newRow.insertCell();
            let readCheckbox = document.createElement('input');
            readCheckbox.type = 'checkbox';
            if (read === 'read') {
                readCheckbox.checked = true;
            }
            newCell.append(readCheckbox);
            newCell.style.textAlign = 'center';
        }
    }

    // Add delete button to end of row
    let endCell = newRow.insertCell();
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';   
    endCell.append(deleteBtn);
    endCell.style.textAlign = 'center';
};

// Deletes book from myLibrary and removes it from the table
function removeBookFromLibrary(index) {
    // This only deletes the instance of the book object but does not remove it
    // from the list, keeping the list length the same
    delete myLibrary[index];
};

// Display modal and reset form
modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    form.reset();
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Get new book when user submits form and add it to myLibrary
submitBtn.addEventListener('click', function submitNewBook(event) {
    event.preventDefault(); // Prevent form from submitting
    let newTitle = document.querySelector('#title').value;
    let newAuthor = document.querySelector('#author').value;
    let newPages = document.querySelector('#pages').value;
    let newRead = document.querySelector('#read');
    if (newRead.checked) {
        newRead = 'read';
    } else {
        newRead = 'not read';
    }
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    modal.style.display = 'none';
});

// Delete book from library or change read status of book
tableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) { // Delete book from library
        let tableRow = event.target.parentElement.parentElement;
        let bookIndex = tableRow.getAttribute('index');
        tableRow.parentElement.removeChild(tableRow);
        delete myLibrary[bookIndex];
    } else if (event.target.type === 'checkbox') { // Change read status of book
        let tableRow = event.target.parentElement.parentElement;
        let bookIndex = tableRow.getAttribute('index');
        if (myLibrary[bookIndex].read === 'read') {
            event.target.checked = false;
            myLibrary[bookIndex].read = 'not read';
        } else {
            event.target.checked = true;
            myLibrary[bookIndex].read = 'read';
        }
    }
});