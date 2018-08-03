import React from 'react'
import { connect } from "react-redux";
import { createNew } from '../reducers/anecdoteReducer';
import { notify } from "../reducers/notificationReducer";

class AnecdoteForm extends React.Component {
  
  handleSubmit = async (e) => {
    e.preventDefault()
    
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    this.props.createNew({
      content,
      votes: 0
    })
    this.props.notify(`you created '${content}'`, 5)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
     </div>
    )
  }
}

export default connect(
  null,
  { createNew, notify }
)(AnecdoteForm)
