import type { Book } from "../types/book.js";
import type { CreateBookInput, UpdateBookInput } from "../schemas/book.schema.js";
import { HttpError } from "../middleware/errorHandler.js";

// تخزين in-memory
const books: Book[] = [];
let nextId = 1;

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: number): Book {
  const book = books.find((b) => b.id === id);
  if (!book) throw new HttpError(404, `Book with id ${id} not found`);
  return book;
}

export function createBook(input: CreateBookInput): Book {
  const book: Book = { id: nextId++, ...input };
  books.push(book);
  return book;
}

export function updateBook(id: number, input: UpdateBookInput): Book {
  const book = getBookById(id);
  Object.assign(book, input);
  return book;
}

export function deleteBook(id: number): void {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) throw new HttpError(404, `Book with id ${id} not found`);
  books.splice(index, 1);
}
