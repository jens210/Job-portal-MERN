import React, {Component} from 'react';
import { Link } from "react-router-dom";

class CategoryList extends Component {

    render() {
        let list = [];

        this.props.categories.forEach((elm) => {
            list.push(<div key={elm._id}>
                <Link className="link" to={`/jobs/${elm.name}`}>{elm.name}</Link>
            </div>)
        });

        return (
            <div>
                <h3>Categories</h3>
                    {list}
            </div>
        );
    }
}

export default CategoryList;
