import React, { useState } from "react";
import { Book } from "./Book";

// Define the types for props
interface AddFormProps {
  onAddBook: (newBook: Book) => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [genre, setGenre] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = new Book(Date.now(), title, author, year, genre);
    onAddBook(newBook);  // Pass the new book to the parent
    setTitle("");
    setAuthor("");
    setYear(0);
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
      </div>
      <div>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
        />
      </div>
      <div>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddForm;
