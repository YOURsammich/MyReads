import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js';

class SearchPage extends Component {
    state = {
      searchedBooks: []
    }

    change = (e) => {
      if (e.target.value) {
        this.props.onSearch(e.target.value);
      } else {
        this.props.onClear();
      }
    }

    render () {
      const searchedBooks = this.props.searchedBooks

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link 
              className="close-search" 
              to="/"
              onClick={this.props.onClear}
            >Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={this.change}
              />
            </div>
          </div>
          <div className="search-books-results">
            {searchedBooks.length ? (
              <div>
                <BookShelf
                  title="Not your books"
                  shelfMove={this.props.shelfMove}
                  books={searchedBooks.filter(book => book.shelf === 'none')} 
                />

                <BookShelf
                  title="Your books"
                  shelfMove={this.props.shelfMove}
                  books={searchedBooks.filter(book => book.shelf !== 'none')} 
                />
              </div>
            ) : (
              <div className="no-results">No results</div>
            )}
          </div>
        </div>
      )
    }
}

export default SearchPage