var books = [
  { id: "1", title: "Clean Code",    author: "Robert Martin", category: "Programming",     status: "available", description:"A guide to writing clean software.",image: "clean.png"  ,details: "clean.html"},
  { id: "2", title: "Harry Potter",  author: "J.K Rowling",   category: "Fantasy",          status: "borrowed", description:"A young wizard and his adventures.",image: "harry.png"  ,details: "harry.html"},
  { id: "3", title: "Atomic Habits", author: "James Clear",   category: "Self Development", status: "available",description:"How to build good habits.",image: "atomic.png" ,details: "atomic.html"}
];

var users = [
  { id: "U001", username: "alice", email: "alice@mail.com",  password: "alice123", role: "user"  },
  { id: "U002", username: "bob",   email: "bob@mail.com",    password: "bob12345", role: "user"  },
  { id: "A001", username: "admin", email: "admin@mail.com",  password: "admin123", role: "admin" }
];

var borrowedBooks = [
  { userId: "U001", bookId: "B002", borrowDate: "2025-02-10", dueDate: "2025-03-21" }
];


function saveData() {
  
  localStorage.setItem("library_books", JSON.stringify(books));

  localStorage.setItem("library_users", JSON.stringify(users));

  localStorage.setItem("library_borrowedBooks", JSON.stringify(borrowedBooks));
}

function loadData() {

  if (localStorage.getItem("library_books")) {
    users         = JSON.parse(localStorage.getItem("library_users"));
    books         = JSON.parse(localStorage.getItem("library_books"));
    borrowedBooks = JSON.parse(localStorage.getItem("library_borrowedBooks"));

  }

  else {
    saveData();
  }  
}

function Search_Books_by_title(title) {
    var results = [];
    var q = title.toLowerCase();

    for(var i = 0 ; i < books.length ; i++) {
        var b = books[i];
        var tit = b.title.toLowerCase();
        var valid = tit.includes(q);
    
        if(valid)
            results.push(books[i]);
    }
    return results;
}

function Search_Books_by_ID(ID) {
    var q  = ID;
    for(var i = 0 ; i < books.length ; i++) {
        var b = books[i];
        var valid = q === b.id; 
        if(valid) {
          return b;
        }
    }
    return null;
}

function Search_Books_by_Catigory(category) {
    var results = [];
    var q = category.toLowerCase();
  
    for(var i = 0 ; i < books.length ; i++) {
        var b = books[i];
        var t = b.category.toLowerCase();
        var valid = t.includes(q);
    
        if(valid)
            results.push(books[i]);
    }
    return results;
}

function Search_Books_by_author(author) {
    var results = [];
    var q = author.toLowerCase();

    for(var i = 0 ; i < books.length ; i++) {
        var b = books[i];
        var t = b.author.toLowerCase();
        var valid = t.includes(q);
    
        if(valid)
            results.push(books[i]);
    }
    return results;
}

function searchBooks() {
    loadData();
    var git_input = document.getElementById("searchInput").value; 
    var git_select = document.getElementById("filterType").value;
    var results = [];
    switch (git_select) {
        case "title" :
           results = Search_Books_by_title(git_input);
            break;

        case "category" :
          results = Search_Books_by_Catigory(git_input);
            break;

        default:
           results = Search_Books_by_author(git_input);
    }
  return results;
}

function searchBooks2() {
    loadData();
    var git_input = document.getElementById("search123").value;
    return Search_Books_by_title(git_input);
}

function desplay(bookList) {
   
   var container = document.getElementById("books");

    if (bookList.length === 0) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }
  container.innerHTML = bookList.map(
    (book) => {
        var available = book.status === "available";
        var available1 = book.image !== "";
        var available2 = book.details !== "" ;
        return (
            '<div class = "book">'+
      ''+(available1?'<img src ='+book.image+'>':'<h2>No Image</h2>')+
      '<h3 class="title">Title:' + book.title + '</h3>'+
      '<p class="author">Author:' + book.author + '</p>'+
      '<p class="category">Category:' + book.category + '</p>'+
      '<p>Status:' + book.status + '</p>'+
      ''+(available2?'<button><a href='+book.details+'>👀 View Details</a></button>':'<p>Description:'+book.description +'</p>')+
        ''+(available?'<button><a href = borrowed_books.html >🤝🏻 Borrow Book</a>':"<button disabled>🤝🏻 Borrow Book")+'</button>'+
      '<hr>'+
      '<link rel="stylesheet" href="user_dashboard_style.css">'+
      '</div>'
        );
    }
  ).join('');
}

function desplay2() {
  var container = document.getElementById("admin_book");

  loadData();
 var bookList=books;
  if (bookList.length === 0) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }
  container.innerHTML = bookList.map(
    (book)=>{
      return (
        '<tr>'+'<td>'+book.id+'</td>'
      +'<td>'+book.title+'</td>'+
      '<td>'+book.author+'</td>'+
      '<td>'+book.category+'</td>'+
      '<td>'+book.status+'</td>'+
      '<td>'+
        '<a  class="btn" href="edit_book.html?id=1" class="btn-edit">✍️ Edit</a>'+
        '<a style="margin-left: 20px;" class="btn" href="delete_book.html?id=1" class="btn-delete">🗑️ Delete</a>'+
      '</td>'+
    '</tr>'+
    '<style>th { background: #1e1a12; color: #c9a84c; border: 1px solid #7a6030; padding: 12px 16px; }'
    +'td { background: #1e1a12; color: #d4c5a0;        border: 1px solid #4a3c20; padding: 11px 16px; }</style>'
      );
    }
  ).join('');
}


function addBook(Id, Title, Author, Category,Description,imgae) {
  if (!Id || !Title || !Author || !Category || !Description) { window.alert("Please fill in all required fields."); return ; }
  if (Search_Books_by_ID(Id)!=null)                          { window.alert("A book with this ID already exists."); return ; }

  loadData();
  books.push({ id: Id, title: Title, author: Author, category: Category, status: "available",description :Description, image: imgae ,details: ""});
  saveData();
}

function editBook(Id, Title, Author, Category ,Description,Image) {
  loadData();
  var book = Search_Books_by_ID(Id);
  if (book === null) { window.alert("Book not found."); return ; }

  book.title       = Title;
  book.author      = Author;
  book.category    = Category;
  book.description = Description;
  book.image       = Image;
  for(let i=0;i<books.length;i++) {
    if(books[i].id===book.id){
      books[i]=book;
    }
  }
  saveData();
}

function Status() {
  
  loadData();
  var total=0,available=0,Borrowed=0,users_num=0;
  books.forEach((book)=>{
    total++;
    if(book.status==="available")available++;
    else Borrowed++;
  })
  users_num=users.length;

  document.getElementById("total_cell").innerHTML='<p>'+total+'</p>';
  document.getElementById("Available_cell").innerHTML='<p>'+available+'</p>';
  document.getElementById("Borrow_cell").innerHTML='<p>'+Borrowed+'</p>';
  document.getElementById("User_cell").innerHTML='<p>'+users_num+'</p>';
}

