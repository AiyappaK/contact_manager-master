import React from 'react' 

class NoteForm extends React.Component {
    constructor() {
        super() 
        this.state = {
           title: '', 
           body: '', 
            tags: []
        }
        // bind methods, sets the context of the this keyword
        this.handleTagsChange = this.handleTagsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    // es6 arrow function
    handleTitleChange = (e) => {
        const title = e.target.value 
        // console.log(this) 
        this.setState(() => ({title }))
    }

    // es6 function - bind in constructor
    handleTagsChange(e) {
        const tags = e.target.value 
        // console.log(this)
        this.setState(() => ({ tags}))
    }

    // es6 function - bind when calling the function
    handleBodyChange(e) {
        const body = e.target.value 
        this.setState(() => ({body }))
    }
    componentWillReceiveProps(nextProps){
        const{title, body,tags} = nextProps.note
        this.setState(()=>({
            title,
            body,
            tags
        }))
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
           title: this.state.title, 
           body: this.state.body, 
            tags: this.state.tags
        }

        this.props.handleSubmit(formData)

        // clear form 

        this.setState(() => ({ 
           title: '',body: '', tags: ''
        }))
      
    }

    render() {
        return (
            <div>
                
                    <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label>
                            Title
                            <input type="text" value={this.state.title} onChange={this.handleTitleChange} /> 
                        </label> <br/> <br></br>

                       
                        <label>
                           Body
                            <input type="text" value={this.state.body} onChange={this.handleBodyChange.bind(this)} />
                        </label> <br /> <br></br>

                        <label>
                            Tags
                            <input type="text" value={this.state.tags} onChange={this.handleTagsChange} />
                        </label> <br /> <br></br>

                        <input type="submit" /> 
                        </fieldset>
                    </form> 
               
            </div>
        )
    }
}

export default NoteForm