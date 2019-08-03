import {CheckoutPage, HomePage} from '../../containers';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Header} from '..'

import React from 'react'

export function App() {
    return (
        <div className="container">
            <Router>

                <Header></Header>
                <div className="body pt-5">
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/checkout/" component={CheckoutPage}/>
                </div>
            </Router>

        </div>
    );
}
export default App;