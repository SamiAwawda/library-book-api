import type { Request, Response } from "express";
import * as booksService from "../services/books.service.js";
import { createBookSchema, idParamSchema, updateBookSchema } from "../schemas/book.schema.js";

export function getAll(_req: Request, res: Response) {
  res.json(booksService.getAllBooks());
}

export function getOne(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  res.json(booksService.getBookById(id));
}

export function create(req: Request, res: Response) {
  const input = createBookSchema.parse(req.body);
  res.status(201).json(booksService.createBook(input));
}

export function update(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  const input = updateBookSchema.parse(req.body);
  res.json(booksService.updateBook(id, input));
}

export function remove(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  booksService.deleteBook(id);
  res.status(204).send();
}
