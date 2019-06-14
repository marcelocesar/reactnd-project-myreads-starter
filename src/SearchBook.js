import React from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'


class SearchBook extends React.Component {

    state = {
        query: '',
        searchBooks: []
    }

    updateQuery = (query) => {
        this.setState({ 
            query: query,
        });
        this.searchBook(this.state.query)
    }

    searchBook(query) {
        this.props.onSearchBook(query).then((bookResults) => {
            this.setState({
                searchBooks: bookResults ? bookResults : []
            })
        })
        
    }

    clearQuery = () => {
        this.setState({ query: '' });
    }

    render() {
        
        const { query, searchBooks } = this.state;
        const { onUpdateBook } = this.props;
        let showingBooks;

        if (query) {
            showingBooks = searchBooks
        } else {
            showingBooks = []
        }

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    { query ? 
                        (showingBooks.length > 0 ?
                            <Books 
                                title="" 
                                books={showingBooks}
                                onUpdateBook={onUpdateBook}
                            />
                        : 'livro nao encontrado') : ''
                    }
                </div>
            </div>
        )
    }
}

export default SearchBook