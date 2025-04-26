import { useEffect, useRef, useState } from "react";
import { Library } from "./Library";
import { Book } from "./Book";
import AddForm from "./AddForm";  // Import AddForm component

function App() {
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [checkedOutBooks, setCheckedOutBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");

  const libraryRef = useRef<Library>(new Library());

  // Update available and checked-out books
  const updateBooks = () => {
    const available = libraryRef.current.getAvailableBooks();
    const checkedOut = libraryRef.current.getAllBooks().filter(
      (book) => !book.isAvailable
    );
    setAvailableBooks(available);
    setCheckedOutBooks(checkedOut);
  };

  // Check out a book
  const checkOutBook = (bookTitle: string) => {
    try {
      libraryRef.current.checkOutBook(bookTitle);
      setMessage(`You have successfully checked out "${bookTitle}".`);
      updateBooks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  // Return a book
  const returnBook = (bookTitle: string) => {
    try {
      libraryRef.current.returnBook(bookTitle);
      setMessage(`You have successfully returned "${bookTitle}".`);
      updateBooks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  // Search for a book by title
  const handleSearch = () => {
    const book = libraryRef.current.searchBookByTitle(searchTitle);
    if (book) {
      if (book.isAvailable) {
        setMessage(`Found book: "${book.title}" by ${book.author}. It's available.`);
      } else {
        setMessage(`Found book: "${book.title}" by ${book.author}. It's checked out.`);
      }
    } else {
      setMessage("Book not found.");
    }
  };

  // Initialize the library with some books
  useEffect(() => {
    const lib = new Library();

    const books = [
      new Book(1, "Metamorfoza", "Franz Kafka", 1915, "Fiction"),
      new Book(2, "I huaji", "Albert Camus", 1942, "Philosophy"),
      new Book(3, "1984", "George Orwell", 1949, "Dystopian"),
      new Book(4, "Zoti i mizave", "William Golding", 1954, "Allegorical Novel"),
      new Book(5, "Lufta dhe Paqja", "Leo Tolstoy", 1869, "Historical"),
      new Book(6, "Pride and Prejudice", "Jane Austen", 1813, "Romance"),
      new Book(7, "Kodi i Da Vinçit", "Dan Brown", 2003, "Thriller")
    ];

    books.forEach((book) => lib.addBook(book));

    libraryRef.current = lib;
    updateBooks();
  }, []);

  // Add a new book to the library
  const addBook = (newBook: Book) => {
    libraryRef.current.addBook(newBook);
    updateBooks();  // Re-update the book lists after adding a new book
  };

  return (
    <div className="App">
      <h1>Library System</h1>

      {/* AddForm component to add a book */}
      <AddForm onAddBook={addBook} />

      {/* Search Form */}
      <div>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search for a book by title"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Message */}
      <p>{message}</p>

      {/* Available Books */}
      <h2>Available Books:</h2>
      <ul>
        {availableBooks.length === 0 ? (
          <p>No books available.</p>
        ) : (
          availableBooks.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} ({book.year}) - {book.genre}
              <button onClick={() => checkOutBook(book.title)}>Check Out</button>
            </li>
          ))
        )}
      </ul>

      {/* Checked Out Books */}
      <h2>Checked Out Books:</h2>
      <ul>
        {checkedOutBooks.length === 0 ? (
          <p>No books checked out.</p>
        ) : (
          checkedOutBooks.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} ({book.year}) - {book.genre}
              <button onClick={() => returnBook(book.title)}>Return</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
