import axios from 'axios';

class HttpService {
  constructor(urlRoot) {
    this.urlRoot = urlRoot || process.env.REACT_APP_API_ROOT || 'http://localhost:8000';
  }

  async getProducts() {
    try {
      const response = await axios.get(`${this.urlRoot}/api/product`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getDiscountCode(code) {
    try {
      const response = await axios.get(`${this.urlRoot}/api/coupon/${code}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
export default HttpService;
