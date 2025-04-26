import { Book } from "./Book";

export class Library {
  private allBooks: Book[] = [];

  addBook(book: Book): void {
    const exists = this.allBooks.find(b => b.id === book.id);
    if (!exists) {
      this.allBooks.push(book);
    }
  }

  getAvailableBooks(): Book[] {
    return this.allBooks.filter(book => book.isAvailable);
  }

  getAllBooks(): Book[] {
    return this.allBooks; 
  }

  checkOutBook(title: string): void {
    const book = this.allBooks.find(b => b.title === title);
    if (!book) throw new Error("Libri nuk ekziston.");
    if (!book.isAvailable) throw new Error("Libri nuk është i disponueshëm për check-out.");
    book.isAvailable = false;
  }

  returnBook(title: string): void {
    const book = this.allBooks.find(b => b.title === title);
    if (!book) throw new Error("Libri nuk ekziston.");
    if (book.isAvailable) throw new Error("Ky libër është tashmë në bibliotekë.");
    book.isAvailable = true;
  }

  searchBookByTitle(title: string): Book | undefined {
    return this.allBooks.find(b => b.title.toLowerCase() === title.toLowerCase());
  }
}
