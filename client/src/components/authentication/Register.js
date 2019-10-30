import React from "react"
import axios from '../../config/axios'

class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            message:'',
            notice:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3000/users/register',formData)
            .then(() => {
                this.setState(() => ({
                    username:'', email:'', password:'', notice: 'Successfully registered, redirecting to login page'
                }))
                setTimeout(()=>{
                    this.props.history.push("/users/login")
                },2000)
            })
            .catch(err => console.log(err))
    }
        
            handleChange(e){
                e.persist()
                // when ever we r taking event obj directly inside the event handler or directly 
                // inside the setState method then we suppose to call persist
                this.setState(()=> ({
                    [e.target.name]: e.target.value
                }))
            }
             

    
    render(){
        return(
            <div>
                
                <h2>Register </h2>
                {this.state.notice && <p>{this.state.notice}</p>}
                <form onSubmit={this.handleSubmit}>
                <label>
                    Username
                    <input type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
                </label><br></br>
                <label>
                    Email
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>
                </label><br></br>
                <label>
                    Password
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label><br></br>
                {/* <label>
                    confirm password:
                <input type="password" name="confirm_password" id="confirm_password"  onkeyup={this.handleCheck} /> 
                <span id='message'></span>
                </label> <br></br> */}
                <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default UserRegister