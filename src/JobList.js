import React, {Component} from 'react';
import { Link } from "react-router-dom";

class JobList extends Component {

    render() {
        let list = [];
        this.props.jobs.forEach((elm) => {
            list.push(<div key={elm._id}>
                <Link className="link" to={`/show-job/${elm._id}`}>{elm.title}</Link>
            </div>)
        });

        return (
            <div>
                <h3>Jobs</h3>
                    {list}
            </div>
        );
    }
}

export default JobList;
