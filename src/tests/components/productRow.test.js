import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductRow from '../../components/shopping-cart/productRow';

configure({ adapter: new Adapter() });

describe('ProductRow render tests', () => {
  it('renders without crashing when product item is empty', () => {
    shallow(<ProductRow />);
  });

  it('should render the table row with product data', () => {
    const product = {
      id: '123',
      price: 100,
      name: 'test',
    };
    const element = shallow(<ProductRow product={product} />);
    const tr = element.find('tr');
    expect(tr.length).toEqual(1);
    expect(tr.childAt(0).text()).toEqual('123');
    expect(tr.childAt(1).text()).toEqual('test');
    expect(tr.childAt(2).text()).toEqual('100');
  });

  it('Should trigger on change event on quantity change', () => {
    const product = {
      id: '123',
      price: 100,
      name: 'test',
    };
    const onQuantityUpdate = jest.fn();
    const element = shallow(<ProductRow product={product} onQuantityUpdate={onQuantityUpdate} />);
    const input = element.find('.quantity');
    expect(input.length).toEqual(1);
    const event = {
      target: {
        value: '5',
      },
    };
    input
      .at(0)
      .simulate('change', event);
    expect(onQuantityUpdate).toBeCalledWith({
      id: '123', name: 'test', price: 100, quantity: 5,
    });
  });

  it('Should update price column when quantity update with valid number', () => {
    const product = {
      id: '1',
      price: 299.99,
      name: 'test',
    };
    const onQuantityUpdate = jest.fn();
    const element = shallow(<ProductRow product={product} onQuantityUpdate={onQuantityUpdate} />);
    const input = element.find('.quantity');
    expect(input.length).toEqual(1);
    const event = {
      target: {
        value: '10',
      },
    };
    input
      .at(0)
      .simulate('change', event);
    expect(onQuantityUpdate).toBeCalledWith({
      id: '1', name: 'test', price: 299.99, quantity: 10,
    });

    const price = element.find('.price');
    expect(price.text()).toEqual('$2999.9');
  });
});
