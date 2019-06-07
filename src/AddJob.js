import React, { Component } from 'react';
import AuthService from "./AuthService";

class AddJob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: [],
            category: '',
            area: ''
        };
        this.Auth = new AuthService(`${this.API_URL}/users/addjob`);
        this.handleChange = this.handleChange.bind(this);
    }

     addJob = (e) => {
        e.preventDefault();
        this.setState({
            input: {
                title: this.refs.title.value,
                description: this.refs.description.value,
                category: this.refs.category.value,
                area: this.refs.area.value
            }
        }, function () {
            console.log({ ...this.state.input });
            this.props.addJob(this.state.input);
        });

        // removing old values on submit
        this.refs.title.value = null;
        this.refs.description.value = null;
        this.refs.category.value = null;
        this.refs.area.value = null;
    }; 

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, });
    }

    render() {
        let authRender;
        let categories = [];
        this.props.categories.forEach((elm) => {
            categories.push(<option key={elm._id} value={elm._id}>{elm.name}</option>)
        });

        let areas = [];
        this.props.areas.forEach((elm) => {
            areas.push(<option key={elm._id} value={elm._id}>{elm.name}</option>)
        });

        if (localStorage.token !== undefined) {
            authRender =
                <div className="col-6">
                    <form onSubmit={this.addJob}>
                        <h3>Add a new job</h3>
                        <label htmlFor="itemText">Title</label>
                        <input className="form-control" ref='title' type='text' placeholder='Title' />
                        <label htmlFor="itemText">Description</label>
                        <textarea className="form-control" ref='description' type='text' placeholder='Describe the job' />
                        <label htmlFor="itemText">Category</label>
                        <select className="form-control" ref='category' name="category" value={this.state.category} onChange={this.handleChange}>
                            {categories}
                        </select>
                        <label htmlFor="itemText">Area</label>
                        <select className="form-control" ref='area' name="area" value={this.state.area} onChange={this.handleChange}>
                            {areas}
                        </select>
                        <button className="btn btn-outline-warning" type='submit'>Add new job</button>
                    </form>
                </div>
        }
        else {
            authRender =
                <div>
                    <p>You need to be logged in to post jobs.</p>
                </div>
        }

        return (
            <div>
                {authRender}
            </div>
        )
    }
}

export default AddJob;