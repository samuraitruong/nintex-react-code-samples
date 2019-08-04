This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
### Start local development
Below command will start mock backend on port 8000 and also start react application on default port 3000

```sh
    yarn dev
    or npm run dev
```
Note: Mocked API backend default running on port 8000, if you local machine has that port being use, you should change that port in /api/index.js before run above command.

### Build 
Run below command to build 
```sh
    REACT_APP_API_ROOT=http://env && yarn build

```
REACT_APP_API_ROOT is the backend URL for application
for example
``` sh
REACT_APP_API_ROOT=http://test:5000 ^&& yarn build 

or REACT_APP_API_ROOT=http://test:5000 ^&& npm build 

```
## Structure
### Mocked backend APi
mocked backend with static response using express server
- /api/product -> return list of 3 product with below format
```json
GET 200
    [
  {
    "id": "wf",
    "name": "Workflow",
    "price": 199.99
  },
  {
    "id": "docgen",
    "name": "Document Generation",
    "price": 9.99
  },
  {
    "id": "form",
    "name": "Form",
    "price": 99.99
  }
]
```
- /api/coupon/{code} return the promotion code details.
```json
GET 200
 {
  "code": "RRD4D32",
  "description": "10% discount for orders above $1000 (pre-discount)",
  "percentDiscount": 10,
  "applyDiscountAmount": 1000
 }
}

```

### Front-end app
Frontend app is react application is create with create-react-app and configure with scss
below are library being use in project
- bootstra4
- react-boostrap (not really need in this sample but I just use it )

**Components**
Are dump componenet which don't need to know anything about logic, data load, they only do render GUI depend on data passed to them

**Containers**
Are smart component which responsible to get data/ process data then pass to dump component. In real project I prefer to use Redux + Saga control the app state.

**Service**

Container the core service to calculate the discount.  There 3 rules were implemented as separate class and fully unit test, one factory method will return the instance of discount rule and then shopping cart service will calculate using the rule.

**Styles**
As project using bootstrap so not much custom styles that were introduced. there are some style under /src/styles to demo my skill, actually, they are just very little. Please note I using BEM rules to naming class name if you not familiar with it please read more at - https://en.bem.info/methodology/naming-convention/


**Tests**

Project has implement using TTD, every service class has fully unitested. most of UI feature has unit test using Enzema & Jest there maybe need couple of edge case unit test but I think to it is more than enougth for evaluation my skills. I can using other unit test framework such as Mocha/chai/Sinon/Jasmine... 

## Limitation & Improvement
- Sometime the development server is not ready so data is not loaded at first time, you can refresh page and everything will works like a charm
- Need to add error handling on UI when loading data error
- Configure dotenv or similar to inject the API root automatically from build environment





