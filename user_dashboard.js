const borrowButtons = document.querySelectorAll(".borrow-btn");

    
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowed")) || [];

    borrowButtons.forEach(button => {
    const bookCard = button.closest(".bookinfo");

    const title = bookCard.querySelector(".title").textContent;
    const author = bookCard.querySelector(".author").textContent.replace("Author: ", "");
    const status = bookCard.querySelector(".status");
    if (borrowedBooks.find(book => book.title === title)) {
        
        status.textContent = "❌ Not Available";
        button.disabled = true;
    }

    button.addEventListener("click", () => {
        const today = new Date().toLocaleDateString();

        borrowedBooks.push({ title, author, date: today });

        localStorage.setItem("borrowed", JSON.stringify(borrowedBooks));

        status.textContent = "❌ Not Available";
        button.disabled = true;

        alert("Book Borrowed ✅");
    });
    });