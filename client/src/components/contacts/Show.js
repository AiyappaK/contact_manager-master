import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class ContactShow extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              contact : {}
          }
          this.handleDelete = this.handleDelete.bind(this)
      }

      handleDelete (){
          const confirmDelete = window.confirm("Are you sure?")
          if(confirmDelete){
              //api call to delte
              axios.delete(`/contacts/${this.state.contact._id}`)
              .then(()=> this.props.history.push('/contacts'))
              .catch(err => window.alert(err))
          }
      }

      componentDidMount(){
          const id = this.props.match.params.id
          axios.get(`/contacts/${id}`)
          
          .then(response => this.setState (()=> ({contact : response.data})))
          
      }

      render (){
           return (
                  <div>
                   
                      <center><h2>Contact info</h2> </center><br></br>
                      <center>
                      <table border='1' width="300px">
                      <center><img src="./images/download.jpeg" alt="Stickman" /></center>
                      <br></br>
                      <center><h2> {this.state.contact.name} </h2></center>
                      <center><p> <b>Email - </b>{this.state.contact.email} </p></center>
                      <center><p> <b>Mobile - </b>{this.state.contact.mobile} </p></center>
                     <center>
                     <Link to ={`/contacts/edit/${this.state.contact._id}`}> edit </Link>

                     <button onClick= {this.handleDelete}>
                        delete 
                     </button>
                      <Link to ="/contacts"> back </Link></center>
                      </table>
                      </center>
                  </div>
           )
      }

}

export default ContactShow