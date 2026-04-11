    const tableBody = document.querySelector("tbody");

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowed")) || [];

    function loadBorrowed() {
    tableBody.innerHTML = "";

    borrowedBooks.forEach((book, index) => {
        const row = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td>
            <button class="return-btn" data-index="${index}">Return</button>
            </td>
        </tr>
        `;
        tableBody.innerHTML += row;
    });
    }

    loadBorrowed();

    document.addEventListener("click", (e) => {
    if (e.target.classList.contains("return-btn")) {
        const index = e.target.dataset.index;

        borrowedBooks.splice(index, 1);

        localStorage.setItem("borrowed", JSON.stringify(borrowedBooks));

        loadBorrowed();
    }
    });