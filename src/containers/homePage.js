import React, {Component} from "react";
import {Link} from 'react-router-dom';

export class HomePage extends Component {
    render() {
        return (
            <div>
                <Link to="/checkout" className="btn btn-success btn-lg">Go to checkout page</Link>
            </div>
        )
    }
}
export default HomePage;