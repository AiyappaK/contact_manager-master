import React from 'react' 
import { Link } from 'react-router-dom'
import axios from '../../config/axios'


class NoteList extends React.Component {
    constructor(props){
        super(props)       
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        axios.get('/notes')
            .then(response => this.setState(() => ({ notes: response.data })))
            console.log(this.state.notes)
    }
    render() {
        return (
            <div>
                 <Link to="/notes/new">Add Note</Link>
                {
                    this.state.notes.length === 0 ? (<p> No notes found. Add your first Note</p>) : (
                        <div> 
                           
                            <h2>Listing Notes - {this.state.notes.length} </h2>
                           
                            <ul>
                                {
                                    this.state.notes.map(note => {
                                        return (
                                            <li key={note._id}> <b>Title:</b> <Link to={`/notes/${note._id}`}> {note.title}</Link><br></br>
                                                                <b>Body:</b> {note.body}<br></br>
                                                                <b>Tags:</b> {note.tags[0]},{note.tags[1]} <br></br></li>
                                        )
                                    })
                                }
                            </ul>
                                
                        </div>
                    ) 
                }
                <br></br>

            </div>
        )
    }
}

export default NoteList