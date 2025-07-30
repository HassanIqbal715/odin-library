const myLibrary = [];

function Book(name, author, pages, isRead) {
    if (!new.target) {
        throw Error("Book constructor called without \'new\' operator.");
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        let read;
        if (isRead) {
            read = 'has been read';
        }
        else {
            read = 'not yet read';
        }

        return `${this.name} by ${this.author}, ${this.pages} pages, ${read}`;
    }
}

function addBookToLibrary(name, author, pages, isRead) {
    myLibrary.push(new Book(name, author, pages, isRead));
}