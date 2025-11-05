let myLibrary = [];

function Book(name, author, pages, isRead, coverLink) {
    if (!new.target) {
        throw Error("Book constructor called without \'new\' operator.");
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.cover = coverLink;

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

function addBookToLibrary(name, author, pages, isRead, coverLink) {
    myLibrary.push(new Book(name, author, pages, isRead, coverLink));
}

function displayBooks() {
    document.querySelector("#books-container").textContent = "";
    for (x of myLibrary) {
        const book = document.createElement("div");
        const cover = document.createElement("div");
        const coverImg = document.createElement("img");
        const desc = document.createElement("div");
        const title = document.createElement("h4");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const status = document.createElement("p");
        const statusButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        book.classList.add("book-item");
        cover.classList.add("cover");
        coverImg.classList.add("image");
        desc.classList.add("description");
        title.classList.add("title");
        pages.classList.add("pages");

        if (x.isRead) {
            status.classList.add("read");
            status.textContent = 'Read';
        }
        else {
            status.classList.add("not-read");
            status.textContent = 'Not Read';
        }

        coverImg.src = x.cover;
        title.textContent = x.name;
        author.textContent = x.author;
        pages.textContent = x.pages + " pages";
        statusButton.textContent = "Toggle Read";
        deleteButton.textContent = "Delete";

        book.dataset.id = x.id;
        book.dataset.status = x.isRead;

        deleteButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter(b => b.id !== book.dataset.id);
            document.querySelector("#books-container").removeChild(book);
        });

        statusButton.addEventListener("click", () => {
            console.log(book.dataset.status);
            if (book.dataset.status == "true") {
                book.dataset.status = "false";
                status.classList.remove("read");
                status.classList.add("not-read");
                status.textContent = 'Not Read';

                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].id == book.dataset.id) {
                        myLibrary[i].isRead = false;
                        break;
                    }
                }
            }
            else {
                book.dataset.status = "true";
                status.classList.remove("not-read");
                status.classList.add("read");
                status.textContent = 'Read';

                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].id == book.dataset.id) {
                        myLibrary[i].isRead = true;
                        break;
                    }
                }
            }
        });

        cover.appendChild(coverImg);
        desc.appendChild(title);
        desc.appendChild(author);
        desc.appendChild(pages);
        desc.appendChild(status);
        desc.appendChild(statusButton);
        desc.appendChild(deleteButton);
        book.appendChild(cover);
        book.appendChild(desc);
        
        document.querySelector("#books-container").appendChild(book);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false, 'images/the hobbit.webp');
addBookToLibrary('Bakemonogatari Vol. 1', 'Nisio Isin', 240, true, 'images/bakemonogatari.webp');
addBookToLibrary('Berserk Vol. 1', 'Kentaro Miura', 224, false, 'images/berserk.webp');
addBookToLibrary('Nichijou Vol. 1', 'Arawi Keiichi', 295, true, 'images/nichijou.webp');
addBookToLibrary('Uzumaki', 'Junji Ito', 295, true, 'images/uzumaki.webp');

displayBooks();

// New item

function submitForm() {
    Name = form.querySelector("#name-input").value;
    author = form.querySelector("#author-input").value;
    pages = form.querySelector("#pages-input").value;
    isRead = form.querySelector("#read-input").checked;
    imageLink = form.querySelector("#image-input").value;
    if (Name.trim() == "" || author.trim() == "" || pages.trim() == ""
        || imageLink.trim() == "")
        return;
    
    addBookToLibrary(Name, author, pages, isRead, imageLink);
    form.style.display = "none";
    formInputs.forEach((e) => {
        e.value = "";
    });

    displayBooks();
}

const form = document.querySelector("#new-book-form");
const formInputs = form.querySelectorAll("input");
const formSubmit = document.querySelector("#submit-form");
const formClose = document.querySelector("#form-topbar-cross");
const addBook = document.querySelector("#new-book");

formInputs.forEach((e) => {
    e.spellcheck = false;
});

formSubmit.addEventListener("click", ()=> {
    submitForm()
});

formClose.addEventListener("click", () => {
    form.style.display = "none";
});

addBook.addEventListener("click", () => {
    form.style.display = "block";
});