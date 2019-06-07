import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AreaList extends Component {

    render() {
        let list = [];
        let area = [];

        this.props.jobs.forEach((elm) => {

            if (!area.includes(elm.area.name)) {
                area.push(elm.area.name)
            }
        });

        area.forEach((elm) => {
            list.push(<div key={elm}>
                <Link className="link" to={`/jobs/${this.props.category}/${elm}`}>{elm}</Link>
            </div>)
        });


        return (
            <div>
                <h3>Areas</h3>
                {list}
            </div>
        );
    }
}

export default AreaList;
