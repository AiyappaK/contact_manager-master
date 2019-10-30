import React from 'react' 
import axios from '../../config/axios'
import NoteForm from './NForm'

class NoteNew extends React.Component {
    constructor(){
        super() 
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        //console.log('notenew component')
        axios.post('/notes', formData,{
        headers: {
            'x-auth': localStorage.getItem('token')
        }
    })
            .then(() => this.props.history.push('/notes'))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
               
                <h2> Add Note </h2>
                <NoteForm handleSubmit={this.handleSubmit} /> 
            </div>
        )   
    }
}

export default NoteNew