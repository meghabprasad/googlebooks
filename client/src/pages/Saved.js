import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Saved extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
          .then(res =>
            this.setState({ books: res.data})
          )
          .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
    };

    render(){
        return (
            <div class="container">
            <Container fluid>
            <Jumbotron>
            <div style={{color: "white", fontSize: "90px", backgroundColor: "black", borderRadius: "50%"}}>
              <p>My Books</p>
              
              </div>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                      <img src={book.thumbnail} />
                      <strong> <a href= {book.infoLink}>
                        {book.title} by {book.authors}</a>
                      </strong>
                      <p>{book.synopsis}</p>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        
      </Container>
      </div>
    );
}


}

export default Saved;

