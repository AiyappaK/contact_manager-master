import React from 'react' 
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import Contactsrow from './Contactsrow'

class ContactList extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        axios.get('/contacts')
            .then(response => this.setState(() => ({ contacts: response.data })))
    }
    render() {
        return (
            <div>
                 <Link to="/contacts/new">Add Contact</Link>
                {
                    this.state.contacts.length === 0 ? (<p> No contacts found. Add your first Contact</p>) : (
                        <div> 
                            <h2>Listing Contacts - {this.state.contacts.length} </h2>
                           
                            {/* <ul>
                                {
                                    this.state.contacts.map(contact => {
                                        return (
                                            <li key={contact._id}> {contact.name} </li>
                                        )
                                    })
                                }
                            </ul> */}
                                <table border='1'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>   
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.contacts.map(contact => {
                                            return (
                                            <Contactsrow 
                                            key={contact._id}
                                            {...contact}/>
                                            )
                                        })}
                                    </tbody>
                                </table>
                        </div>
                    ) 
                }
                <br></br>
             
            </div>
            
        )
    }
   
    
}

export default ContactList