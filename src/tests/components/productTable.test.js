import React from 'react';
import {mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ProductTable} from '../../components';

configure({adapter: new Adapter()});

describe('ProductTable render tests', () => {
    it('renders without crashing when products item null or empty', () => {
        shallow(<ProductTable/>);
    });

    it('should render 2 rows of table row', () => {
        const products = [
            {
                id: "1",
                price: 100,
                name: "test"
            }, {
                id: "2",
                price: 100,
                name: "test"
            }
        ]
        const element = mount(<ProductTable products={products}/>);
        const tr = element.find("tbody tr");
        expect(tr.length).toEqual(2);
    })

    it('Should trigger on change event on quantity change 2', () => {
        const products = [
            {
                id: "1",
                price: 100,
                name: "test"
            }, {
                id: "2",
                price: 100,
                name: "test"
            }
        ]
        const onQuantityUpdate = jest.fn();
        const element = mount(<ProductTable products={products} onQuantityUpdate={onQuantityUpdate}/>);
        const input = element.find("input.quantity");
        expect(input.length).toEqual(2);
        const event = {
            target: {
                value: '5'
            }
        };
        input
            .at(0)
            .simulate('change', event);
        expect(onQuantityUpdate).toBeCalledWith({"id": "1", "name": "test", "price": 100, "quantity": 5});
        event.target.value++;
        input
            .at(1)
            .simulate('change', event);
        expect(onQuantityUpdate).toBeCalledWith({"id": "2", "name": "test", "price": 100, "quantity": 6});
    })

});
