import express from "express";
import booksRouter from "./routes/books.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/books", booksRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
