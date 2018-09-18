import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book';


class SearchPage extends Component {

    change = (e) => {
      if (e.target.value) {
        this.props.onSearch(e.target.value);
      } else {
        this.props.onClear();
      }
    }

    render () {
      const searchedBooks = this.props.searchedBooks;
      const shelfedBooks = this.props.shelfedBooks;

      // assign book shelf prop to searched books
      for (let searchedBook of searchedBooks)
        for (let shelfedBook of shelfedBooks)
          if (searchedBook.id === shelfedBook.id)
            searchedBook.shelf = shelfedBook.shelf

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
            <ol className="books-grid">
              {searchedBooks.length ? (searchedBooks.map(book => (
                <Book 
                  key={book.id}
                  bookData={book}
                  onBookMove={newBookState => this.props.shelfMove(book, newBookState)}
                />
              ))) : (
                <div>No results</div>
              )}
            </ol>
          </div>
        </div>
      )
    }
}

export default SearchPage