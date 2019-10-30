import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class noteShow extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              note : {}
          }
          this.handleDelete = this.handleDelete.bind(this)
      }

      handleDelete (){
          const confirmDelete = window.confirm("Are you sure?")
          if(confirmDelete){
              //api call to delte
              axios.delete(`http://localhost:3005/notes/${this.state.note._id}`)
              .then(()=> this.props.history.push('/notes'))
              .catch(err => window.alert(err))
          }
      }

      componentDidMount(){
          const id = this.props.match.params.id
          axios.get(`/notes/${id}`)
          
          .then(response => this.setState (()=> ({note : response.data})))
          
      }

      render (){
           return (
                  <div>
                     
                     <h2>Notes</h2> <br></br>
                    <h2>{this.state.note.title} </h2>
                    <p> Body - {this.state.note.body} </p>
                    <p>  Tags - {this.state.note.tags} </p>
                    
                     <Link to ={`/notes/edit/${this.state.note._id}`}> edit </Link>

                     <button onClick= {this.handleDelete}>
                        delete 
                     </button>
                      <Link to ="/notes"> back </Link>
                     
                  </div>
           )
      }

}

export default noteShow