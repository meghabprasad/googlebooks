import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SaveBtn from "../components/SaveBtn";

class Books extends Component {
  state = {
    books: [],
    googleBooks: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }



  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = book => {
    API.saveBook({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(" "),
      synopsis: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
      infoLink: book.volumeInfo.infoLink
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getGoogleBooks(this.state.title)
        .then(res => {
          this.setState({ googleBooks: res.data.items})
            
            console.log("State Google Books", this.state.googleBooks)

          }
        );
        console.log("here we are")
      // API.saveBook({
      //   title: this.state.title,
      //   author: this.state.author,
      //   synopsis: this.state.synopsis
      // })
      //   .then(res => this.loadBooks())
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div class="container">
      <Container fluid>
            <Jumbotron>
              <div style={{color: "white", fontSize: "90px", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "20px"}}>
              <p>Bookworm</p>
              
              </div>
              <p style={{color: "white", fontSize: "30px"}}>- powered by Google Books -</p>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title or keyword (Required)"
              />
              {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              /> */}
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                // disabled={this.state.title}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
              <br></br><br></br>
            {this.state.googleBooks.length ? (
              <List>
                {this.state.googleBooks.map(book => (
                  <ListItem key={book.id}>
                      <img src={book.volumeInfo.imageLinks.smallThumbnail} />
                      <strong> <a href={book.volumeInfo.infoLink}>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </a></strong>

                      <p>{book.volumeInfo.description}</p>
                    
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                    <SaveBtn onClick={() => this.saveBook(book)}/>
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

export default Books;
