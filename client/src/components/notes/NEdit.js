import React from 'react' 
import axios from '../../config/axios'
import NoteForm from './NForm'

class NoteEdit extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            note : {},
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount (){
        const {id} = this.props.match.params
        axios.get(`/notes/${id}`)
        .then(response => {
            this.setState(()=> ({note : response.data}))
        })
    }

    handleSubmit(formData) {
       // console.log('note new component')
        axios.put(`/notes/${this.state.note._id}`, formData)
            .then(() => this.props.history.push(`/notes/${this.state.note._id}`))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h2> Edit Note</h2>
                <NoteForm 
                  note = {this.state.note}
                  handleSubmit = {this.handleSubmit}
                  />
            </div>
        )
    }
}

export default NoteEdit