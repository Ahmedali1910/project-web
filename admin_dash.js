  const searchInput = document.querySelector(".searchInput");
  const categoryFilter = document.querySelector(".categorydropdown");
  const statusFilter = document.querySelector(".statusdropdown");
  const rows = document.querySelectorAll(".book-table tbody tr");

  function filterBooks() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value.toLowerCase();
    const statusValue = statusFilter.value.toLowerCase();

    rows.forEach(row => {
      const id = row.children[0].textContent.toLowerCase();
      const title = row.children[1].textContent.toLowerCase();
      const author = row.children[2].textContent.toLowerCase();
      const category = row.children[3].textContent.toLowerCase();
      const status = row.children[4].textContent.toLowerCase();

      const matchSearch =
        id.includes(searchValue) ||
        title.includes(searchValue) ||
        author.includes(searchValue);

      const matchCategory =
        categoryValue === "" || category.includes(categoryValue);

      const matchStatus =
        statusValue === "" || status.includes(statusValue);

      if (matchSearch && matchCategory && matchStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // events
  searchInput.addEventListener("input", filterBooks);
  categoryFilter.addEventListener("change", filterBooks);
  statusFilter.addEventListener("change", filterBooks);
    
  // =========================================

    // button Delete
      const deleteButtons = document.querySelectorAll(".delete-btn");



deleteButtons.forEach(button => {
  button.addEventListener("click", function () {

    const confirmDelete = confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      const row = this.closest("tr");
      row.remove();
    };
    const bookId = this.dataset.id; // 🧠 نجيب ID
    
    loadData(); // نجيب البيانات من localStorage
    
    // نحذف الكتاب من array
    books = books.filter(book => book.id !== bookId);
    
    saveData(); // نحفظ التعديل
    
    
  });
});