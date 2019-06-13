import React from "react";
import {Route, Link} from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Books from "./Books";
import SearchBook from "./SearchBook";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.initBooksList();
  }

  initBooksList() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(book => {
      this.initBooksList();
    });
  };

  searchBook = (query) => {
    return BooksAPI.search(query);
  };

  render() {
    const {books} = this.state;

    return (
      <div className="app">
        <Route 
          exact 
          path="/search" 
          render={() => 
            <SearchBook 
              books={this.state.books} 
              onSearchBook={this.searchBook}
              onUpdateBook={this.updateBook}
            />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Books 
                    title="Currently Reading" 
                    books={books.filter(b => b.shelf === "currentlyReading")} 
                    onUpdateBook={this.updateBook} 
                  />
                  <Books 
                    title="Want to Read" 
                    books={books.filter(b => b.shelf === "wantToRead")} 
                    onUpdateBook={this.updateBook}
                  />
                  <Books 
                    title="Read" 
                    books={books.filter(b => b.shelf === "read")} 
                    onUpdateBook={this.updateBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
