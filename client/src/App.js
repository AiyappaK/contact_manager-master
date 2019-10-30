import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './components/layout/Home'
import ContactList from './components/contacts/List'
//import ContactForm from './components/contacts/Form'
import ContactNew from './components/contacts/New'
import NoteList from './components/notes/Nlist'
import NoteNew from './components/notes/Nnew'
import ContactShow from './components/contacts/Show'
import ContactEdit from './components/contacts/Edit';
import noteShow from './components/notes/NShow'
import NoteEdit from './components/notes/NEdit'
import UserRegister from './components/authentication/Register'
import UserLogin from './components/authentication/Login'
import axios from './config/axios';

class App extends Component {
  constructor(props){
    super(props) 
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'),
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }

  handleIsAuthenticated(bool) {
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <center><h2>Contact Manager</h2></center>
          <center><Link to="/"> Home </Link> 
          
         
          {
            this.state.isAuthenticated && <div> <Link to="/contacts">Contacts</Link>||
            <Link to="/notes">Notes</Link> || <Link to='/users/logout'> Logout </Link> </div> 
          }
          {
            !this.state.isAuthenticated && (
              <div>
              <Link to="/users/register"> Register </Link>||  
              <Link to="/users/Login"> Login </Link>  
              </div>
            )
          }
               
        </center> 
            
          <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/contacts" component={ContactList} exact={true}/>
          <Route path="/notes" component={NoteList} exact={true}/>
          <Route path="/contacts/new" component={ContactNew} exact={true}/>
          <Route path="/contacts/edit/:id" component={ContactEdit} exact={true}/>
          <Route path="/notes/edit/:id" component={NoteEdit} exact={true}/>
          <Route path="/notes/new" component={NoteNew} />
          <Route path="/contacts/:id" component={ContactShow}/>
          <Route path="/notes/:id" component={noteShow} exact={true}/>

          <Route path="/users/register" component={UserRegister} exact={true}/>
          <Route path="/users/login" render={() => <UserLogin  handleIsAuthenticated={this.handleIsAuthenticated}/> } /> 
          <Route path='/users/logout' component={()=> {
            localStorage.clear()
            axios.defaults.headers['x-auth'] = null
          //   setTimeout(()=>{
          //     this.props.history.push("/")
          // },2000)
            return(
              <div>
                <p>Successfully logged out</p>
                
              </div>
            )
          }} />
          </Switch>  
        </div>

        
        {/* <div>
        <center><h2> Contact Manager </h2>
        <Link to="/"> Home </Link>  || 
        <Link to="/contacts">Contacts</Link> ||
        <Link to="/notes">Notes</Link>  ||
        <Link to="/contacts/new">Add Contact</Link>  ||
        <Link to="/notes/new">Add Note</Link>
        </center> 

        <Route path="/" component={Home} exact={true} />
        <Route path="/contacts" component={ContactList} exact={true}/>
        <Route path="/notes" component={NoteList} exact={true}/>
        <Route path="/contacts/new" component={ContactNew} />
        <Route path="/notes/new" component={NoteNew} />
        </div> */}
      </BrowserRouter>
    );
  }
}

export default App;
