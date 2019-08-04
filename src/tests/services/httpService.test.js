import {HttpService} from "../../services";
import mockAxios from 'axios';
let mock;

describe('HttpService tests', () => {
    afterEach(() => {
        if (mock && mock.mockRestore) {
            mock.mockRestore();
        }
    })
    it('getProducts() Should send request to api, and return list of products from serve' +
            'r',
    async() => {
        const http = new HttpService("http://test");
        mock = mockAxios
            .get
            .mockImplementationOnce(() => Promise.resolve({
                data: [
                    {
                        mocked: true
                    }
                ]
            }));

        const products = await http.getProducts();

        expect(products).toEqual([
            {
                mocked: true
            }
        ]);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("http://test/api/product");
    });

    it('getDiscountCode() Should send request to api, and return list of products from s' +
            'erver',
    async() => {
        const http = new HttpService("http://test");
        mock = mockAxios
            .get
            .mockImplementationOnce(() => Promise.resolve({
                data: {
                    code: "11111"
                }
            }));

        const products = await http.getDiscountCode("111111");

        expect(products).toEqual({code: "11111"});
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("http://test/api/coupon/111111");
    });
    it('getDiscountCode() should not crash when http error', async() => {
        const http = new HttpService("http://test");
        mock = mockAxios
            .get
            .mockImplementationOnce(() => Promise.reject({status: 500, data: "HTTP_ERROR"}));

        const products = await http.getDiscountCode("111111");

        expect(products).toEqual(null);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("http://test/api/coupon/111111");
    });
})