// import mockAxios from 'axios';
import {round} from '../../utils'
import {ShoppingCartService, HttpService} from '../../services';
let mock;
const cartItems = [
    {
        "id": "wf",
        "name": "Workflow",
        "price": 199.99,
        quantity: 10
    }, {
        "id": "docgen",
        "name": "Document Generation",
        "price": 9.99,
        quantity: 10
    }, {
        "id": "form",
        "name": "Form",
        "price": 99.99,
        quantity: 10
    }
];

const testData = [
    {
        discount: {
            code: 'RRD4D32',
            description: '10% discount for orders above $1000 (pre-discount)',
            percentDiscount: 10,
            applyDiscountAmount: 1000
        },
        discountPrice: 309.98
    }, {
        discount: {
            code: '44F4T11',
            description: '15% discount for orders above $1500 (pre-discount)',
            percentDiscount: 15,
            applyDiscountAmount: 1500
        },
        discountPrice: 464.96
    }, {
        discount: {
            code: 'FF9543D1',
            description: 'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchase' +
                    'd',
            priceDiscount: 1,
            appyProductId: 'docgen',
            applyQuantity: 10
        },
        discountPrice: 10
    }, {
        discount: {
            code: 'YYGWKJD',
            description: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
            priceDiscount: 10,
            appyProductId: 'form',
            applyQuantity: 1,
            relatedProductIds: ["wf"]
        },
        discountPrice: 100
    }
];

describe('ShoppingCartService tests', () => {
    afterEach(() => {
        if (mock && mock.mockRestore) {
            mock.mockRestore();
        }
    })
    testData.forEach((d) => it(`calculateOrder(data, ${d.discount.code}) should calculate discount as expected`, async() => {
        const http = new HttpService();
        http.getDiscountCode = () => Promise.resolve(d.discount);

        const service = new ShoppingCartService(http);
        const results = await service.calculateOrder(cartItems, d.discount);
        expect(round(results.discountPrice)).toEqual(d.discountPrice);
    }));

})