import React from 'react';
import ReactDOM from 'react-dom';
import {ProductRow} from '../../components';
describe('ProductRow render', () => {
    it('renders without crashing when product item is empty', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ProductRow/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

});
