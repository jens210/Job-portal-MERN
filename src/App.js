import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CategoryList from './CategoryList';
import AreaList from './AreaList';
import JobList from './JobList';
import Job from './Job';
import AddJob from './AddJob';
import AuthService from './AuthService';
import Login from './Login';
import NotFound from './NotFound';

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.Auth = new AuthService(`${this.API_URL}/users/addjob`);

        this.state = {
            categories: [],
            jobs: [],
            areas: [],
            loggedIn: false,
            isLoading: true
        };
        this.setLoginToTrue = this.setLoginToTrue.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        console.log("App component has mounted");
        this.getData();
    }

    getData() {
        fetch(`${this.API_URL}/areas`)
            .then(res => res.json())
            .then(data => this.setState({
                areas: data, isLoading: false
            }))

        fetch(`${this.API_URL}/jobs`)
            .then(res => res.json())
            .then(data => this.setState({
                jobs: data, isLoading: false
            }))

        fetch(`${this.API_URL}/categories`)
            .then(response => response.json())
            .then(data => this.setState({
                categories: data, isLoading: false
            }))
    }

    filterByCategory(category) {
        return this.state.jobs.filter((elm) => elm.category.name.includes(category))
    }

    filterByCategoryAndArea(category, area) {
        return this.state.jobs.filter((elm) =>
            elm.category.name.includes(category)).filter((elm) =>
                elm.area.name.includes(area))
    }

    getJobById(id) {
        return this.state.jobs.find((elm) => elm._id === id);
    }

    setLoginToTrue() {
        this.setState({
            loggedIn: true
        })
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({
            loggedIn: false
        });
    }

    addJob = (text) => {
        this.Auth.fetch(`${this.API_URL}/users/addjob`, {
            method: "POST",
            body: JSON.stringify({
                title: text.title,
                description: text.description,
                category: text.category,
                area: text.area
            })
        })
            .then(result => {
                this.getData();
            })
            .catch(error => {
                console.error("Error when adding job ", error);
            })
    };

    render() {
        let authRender;
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        // if user is logged in render link + btn
        //if (this.loggedIn === true) {
        if (localStorage.token !== null && localStorage.token !== undefined) {
            authRender =
                <div>
                    <Link className="nav-link" to='/users/addjob'>Add a job</Link>
                    <button id="logOutBtn" className="btn btn-outline-warning" onClick={this.logOut}>Log out</button>
                </div>
        }

        return (
            <Router>
                <div className="container-fluid">
                    <nav className="nav">
                        <Link className="navbar-brand" to='/'>Jobs</Link>

                        <li className="nav-item">
                            <Link className="nav-link" to='/users/login'>Login</Link>
                        </li>
                        {authRender}
                    </nav>
                    <div className="container">
                        <Switch>
                            <Route exact path={'/'}
                                render={(props) =>
                                    <CategoryList {...props}
                                        categories={this.state.categories} />}
                            />

                            <Route exact path={'/users/login'}
                                render={(props) => <Login {...props}
                                    setLoginToTrue={this.setLoginToTrue}
                                    loggedIn={this.state.loggedIn} />}
                            />}

                            <Route exact path={'/users/addjob'}
                                render={(props) => <AddJob {...props}
                                    addJob={this.addJob}
                                    categories={this.state.categories}
                                    areas={this.state.areas}
                                    handleAddJobData={this.handleAddJobData}
                                />}
                            />

                            <Route exact path={'/jobs/:category'}
                                render={(props) => <AreaList {...props}
                                    jobs={this.filterByCategory(props.match.params.category)}
                                    category={props.match.params.category} />}
                            />

                            <Route exact path={'/jobs/:category/:area'}
                                render={(props) => <JobList {...props}
                                    jobs={this.filterByCategoryAndArea(props.match.params.category, props.match.params.area)}
                                    category={props.match.params.category}
                                    area={props.match.params.area} />}
                            />

                            <Route exact path={'/show-job/:id'}
                                render={(props) => <Job {...props}
                                    job={this.getJobById(props.match.params.id)} />}
                            />}
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
