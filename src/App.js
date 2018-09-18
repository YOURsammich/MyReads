import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js';
import SearchPage from './SearchPage.js';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  shelfMove = (bookToMove, newShelf) => {
    BooksAPI.update(bookToMove, newShelf)
      .then(() => BooksAPI.getAll())
      .then(books => this.setState({ books }))
    }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then(searchedBooks => {
        // if no results just set empty array
        if (searchedBooks.error)
          searchedBooks = []
        
        this.setState({ searchedBooks })
      })
  }

  clearSearchedBooks = () => {
    this.setState({ searchedBooks: [] })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage
           onSearch={this.searchBooks}
           onClear={this.clearSearchedBooks}
           shelfMove={this.shelfMove}
           searchedBooks={this.state.searchedBooks}
           shelfedBooks={this.state.books}
          />
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf 
                title="Currently Reading"
                shelfMove={this.shelfMove}
                books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
              />
              <BookShelf 
                title="Want to Read"
                shelfMove={this.shelfMove}
                books={this.state.books.filter(book => book.shelf === 'wantToRead')}
              />
              <BookShelf 
                title="Read"
                shelfMove={this.shelfMove}
                books={this.state.books.filter(book => book.shelf === 'read')}
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp