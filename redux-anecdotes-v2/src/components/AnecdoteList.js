import React from 'react'
import { connect } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer";
import Filter from "./Filter"

class AnecdoteList extends React.Component {
  
  handleVote = (anecdote) => async (e) => {
    e.preventDefault()
    this.props.vote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => 
      filter === '' ?
      true : 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { vote, notify }
)(AnecdoteList)
