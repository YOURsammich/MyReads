import React, { Component } from 'react'

class Book extends Component {

    change = (e) => {
      this.props.onBookMove(e.target.value);
    }

    render () {
      const {imageLinks, shelf, title, authors, id} = this.props.bookData;

      return (
        <li>
          <div className="book">
            <div className="book-top">
              <div 
                className={"book-cover " + (!imageLinks ? 'no-cover' : '')}
                style={imageLinks && { backgroundImage: 'url(' + imageLinks.thumbnail + ')' }}
              ></div>
              <div className="book-shelf-changer">
                <select 
                  onChange={this.change} 
                  value={shelf ? shelf : 'none'}
                >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{title}</div>
            {authors && authors.map(author => (
              <div key={id + author} className="book-authors">{author}</div>
            ))}
          </div>
        </li>
      )
    }
}

export default Book