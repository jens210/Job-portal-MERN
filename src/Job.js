import React, {Component} from 'react';

class Job extends Component {

    render() {
        return (
            <div>
                <h3>Title <br></br> {this.props.job.title}</h3>
                <p>Description <br></br> {this.props.job.description}</p>
            </div>
        );
    }
}

export default Job;
