import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, FormGroup, ControlLabel, FormControl, Button, Row, Col } from "react-bootstrap";

const Menu = () => {
  const menuStyle = {
    background: 'lightblue',
    padding: 10,
  }

  const activeStyle = {
    background: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }

  return (
    <div style={menuStyle}>
      <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink> &nbsp;
      <NavLink to="/create" activeStyle={activeStyle}>create new</NavLink> &nbsp;
      <NavLink to="/about" activeStyle={activeStyle}>about</NavLink>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid >
      <Row>
        <Col sm={6} md={5}>  
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col sm={6} md={5}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Donald_Knuth_DSC00624.jpg" alt="" height='300' />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <em>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </em>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      redirect: false
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({ redirect: true })
  }

  render() {
    return(
      <div>
        {this.state.redirect ? <Redirect to="/" /> : null}
        
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup style={{ margin: 5 }}>
            <ControlLabel style={{ marginTop: 5 }}>content</ControlLabel>
            <FormControl 
              name='content' 
              value={this.state.content} 
              onChange={this.handleChange}
            />
            <ControlLabel style={{ marginTop: 5 }}>author</ControlLabel>
            <FormControl
              name='author' 
              value={this.state.author} 
              onChange={this.handleChange}
            />
            <ControlLabel style={{ marginTop: 5 }}>url for more info</ControlLabel>
            <FormControl
              name='info' 
              value={this.state.info} 
              onChange={this.handleChange}
            />
            <Button type="submit" style={{ marginTop: 5 }}>create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })
    
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const notificationStyle = 
      this.state.notification.length > 0 
      ? {
          border: 'solid',
          padding: 10,
          color: 'green',
          background: 'lightgreen',
          borderRadius: 10,
          borderWidth: 1,
          marginTop: 10
        } 
      : null
    
    return (
      <div style={{ margin: 10, maxWidth: 800 }}>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />

            <div style={notificationStyle}>
              {this.state.notification}
            </div>
            
            <Route exact path="/" render={() => 
              <AnecdoteList anecdotes={this.state.anecdotes} />
            } />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={() => 
              <CreateNew addNew={this.addNew}/>
            } />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
