
let books = [
    {
        id: 1,
        title: "Java Programming",
        author: "James Gosling",
        category: "Programming",
        available: true
    },
    {
        id: 2,
        title: "Python Basics",
        author: "Guido van Rossum",
        category: "Programming",
        available: true
    },
    {
        id: 3,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Education",
        available: false
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        available: true
    },
    {
        id: 5,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        available: true
    },
    {
        id: 6,
        title: "Indian History",
        author: "Bipan Chandra",
        category: "History",
        available: false
    }
];

// Display Books

function displayBooks(bookList = books) {

    const container = document.getElementById("bookContainer");

    container.innerHTML = "";

    if (bookList.length === 0) {
        container.innerHTML = "<h3>No books found!</h3>";
        updateStats();
        return;
    }

    bookList.forEach(book => {

        container.innerHTML += `
            <div class="book-card">

                <div class="book-icon">📖</div>

                <h3>${book.title}</h3>

                <p>Author: ${book.author}</p>

                <p>Category: ${book.category}</p>

                <p class="${book.available ? 'status' : 'issued'}">
                    ${book.available ? 'Available' : 'Issued'}
                </p>

                <button onclick="toggleBook(${book.id})">
                    ${book.available ? 'Issue Book' : 'Return Book'}
                </button>

                <button class="delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>

            </div>
        `;
    });

    updateStats();
}

// Search Books

document.getElementById("searchInput")
.addEventListener("input", function() {

    filterBooks();

});

// Category Filter

document.getElementById("categoryFilter")
.addEventListener("change", function() {

    filterBooks();

});

function filterBooks() {

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("categoryFilter")
        .value;

    const filtered = books.filter(book => {

        const matchSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        const matchCategory =
            category === "All" || book.category === category;

        return matchSearch && matchCategory;

    });

    displayBooks(filtered);
}

// Add New Book

document.getElementById("bookForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const category = document.getElementById("bookCategory").value;

    if (!title || !author || !category) {
        alert("Please fill all fields!");
        return;
    }

    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        category: category,
        available: true
    };

    books.push(newBook);

    this.reset();

    displayBooks();

    alert("Book added successfully!");

});

// Issue and Return Book

function toggleBook(id) {

    const book = books.find(book => book.id === id);

    if (book) {
        book.available = !book.available;
        filterBooks();
    }

}

// Delete Book

function deleteBook(id) {

    if (confirm("Are you sure you want to delete this book?")) {

        books = books.filter(book => book.id !== id);

        filterBooks();

    }

}

// Update Statistics

function updateStats() {

    document.getElementById("totalBooks").innerText =
        books.length;

    document.getElementById("availableBooks").innerText =
        books.filter(book => book.available).length;

    document.getElementById("issuedBooks").innerText =
        books.filter(book => !book.available).length;

}

// Initial Display

displayBooks();
