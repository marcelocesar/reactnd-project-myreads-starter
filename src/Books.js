import React from "react";

class Books extends React.Component {
  state = {
    shelfs: [{label: "Currently Reading", value: "currentlyReading"}, {label: "Want to Read", value: "wantToRead"}, {label: "Read", value: "read"}, {label: "None", value: "none"}]
  };

  marked({book, shelf}) {
    const spanStyle = {
      marginRight: "10px"
    };
    const signal = '🗸';
    let divMarekd = {};

    if (book.shelf === shelf.value) {
      divMarekd = <span style={spanStyle}>{signal}</span>;
    } else {
      divMarekd = <span style={spanStyle} />;
    }

    return <div>{divMarekd}</div>;
  }

  render() {
    const {title, books, onUpdateBook} = this.props;
    const {shelfs} = this.state;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books && books.length > 0
              ? books.map(book => (
                  <li key={book.id} data-shelf={book.hasOwnProperty("shelf") ? "" : (book.shelf = "none")}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? `${book.imageLinks.thumbnail}` : `http://via.placeholder.com/128x193?text=No%20Cover`})`}} />
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={event => onUpdateBook(book, event.target.value)}>
                            <option value="move" disabled>
                              Move to...
                            </option>
                            {shelfs.map(shelf => (
                              <option key={shelf.value} value={shelf.value} selected={book.shelf === shelf.value}>
                                {/*this.marked({book, shelf})*/} {book.shelf === shelf.value ? `🗸 ${shelf.label}` : `\b ${shelf.label}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors ? book.authors.join(", ") : ""}</div>
                    </div>
                  </li>
                ))
              : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default Books;
