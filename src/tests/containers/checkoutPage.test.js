/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'axios';
import CheckoutPage from '../../containers/checkoutPage';
import products from '../data/product';

configure({ adapter: new Adapter() });

let mock;
function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 100));
}
describe('checkoutPage render tests', () => {
  afterEach(() => {
    if (mock && mock.mockRestore) {
      mock.mockRestore();
    }
  });
  it('renders without crashing', () => {
    shallow(<CheckoutPage />);
  });

  it('Should render product table with 3 products', async () => {
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.resolve({ data: products }));

    const element = await mount(<CheckoutPage />);
    await flushPromises();
    element.update();

    const productRow = element.find('.productRow');
    expect(productRow.length).toEqual(3);
    // should have the checkout block
    expect(element.find('#discountBtn').hostNodes().length).toEqual(1);
    expect(element.find('.checkoutPage__checkout').hostNodes().length).toEqual(1);
    expect(element.find('#discountCodeInput').hostNodes().length).toEqual(1);
    expect(element.find('#priceItem_price').hostNodes().length).toEqual(1);
  });

  it('Should update total price when quantity update', async () => {
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.resolve({ data: products }));

    const element = await mount(<CheckoutPage />);
    await flushPromises();
    element.update();
    const quantity = element
      .find('.quantity')
      .hostNodes();
    expect(element.find('#priceItem_price').text()).toEqual('$0');

    // should have the checkout block
    expect(quantity.length).toEqual(3);
    const event = {
      target: {
        value: '5',
      },
    };

    quantity
      .at(0)
      .simulate('change', event);
    await flushPromises();

    expect(element.find('#priceItem_price').text()).toEqual('$999.95');

    quantity
      .at(1)
      .simulate('change', event);
    await flushPromises();
    expect(element.find('#priceItem_price').text()).toEqual('$1049.91');

    quantity
      .at(2)
      .simulate('change', event);
    await flushPromises();
    expect(element.find('#priceItem_price').text()).toEqual('$1549.85');
  });

  it('Should display invalid discount code when enter the wrong code', async () => {
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.resolve({ data: products }));

    const element = await mount(<CheckoutPage />);
    await flushPromises();
    element.update();

    expect(element.contains('Invalid code or expired')).toEqual(false);

    mock.mockRestore();
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.reject({ statusCode: 400, data: 'No code found' }));
    // enter invalid code and submit
    element
      .find('#discountCodeInput')
      .hostNodes()
      .simulate('change', {
        target: {
          value: 'invalid',
        },
      });

    element
      .find('#discountBtn')
      .hostNodes()
      .simulate('click');

    await flushPromises();
    element.update();
    expect(element.contains('Invalid code or expired')).toEqual(true);
  });

  it('Should calculate discount when valid discount code provide', async () => {
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.resolve({ data: products }));

    const element = await mount(<CheckoutPage />);
    await flushPromises();
    element.update();

    expect(element.contains('Invalid code or expired')).toEqual(false);
    const quantity = element
      .find('.quantity')
      .hostNodes();

    quantity
      .at(0)
      .simulate('change', {
        target: {
          value: '15',
        },
      });
    await flushPromises();

    expect(element.find('#priceItem_price').text()).toEqual('$2999.86');

    mock.mockRestore();
    mock = mockAxios
      .get
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          code: '44F4T11',
          description: '15% discount for orders above $1500 (pre-discount)',
          percentDiscount: 15,
          applyDiscountAmount: 1500,
        },
      }));

    // enter invalid code and submit
    element
      .find('#discountCodeInput')
      .hostNodes()
      .simulate('change', {
        target: {
          value: '44F4T11',
        },
      });

    element
      .find('#discountBtn')
      .hostNodes()
      .simulate('click');

    await flushPromises();
    element.update();

    expect(element.find('#priceItem_discount').hostNodes().length).toEqual(1);
    expect(element.find('#priceItem_price').text()).toEqual('$2999.86');
    expect(element.find('#priceItem_discount').text()).toEqual('$449.98');
    expect(element.find('#priceItem_total').text()).toEqual('$2549.88');
    expect(element.contains('15% discount for orders above $1500 (pre-discount)')).toEqual(true);
  });
});
