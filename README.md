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
- Some ESlint rules need update to fix all eslint error
- Some of code styles are messup before I have conflict plugin in my vscode - sorry it that annoye you



### Original Requirements
This exercise is designed to assess your coding and problem-solving style. Since there is no right or wrong answer, we will primarily be looking into how you structure your proposed solution and how you approach the given problems.

#### Business rules
Nintex is re-designing their product system to give more flexibility to clients on which products to purchase. Following is a table of products we offer:

 

|PRODUCT ID|	PRODUCT NAME|	PRICE|
| :------------- | :----------: | -----------: |
|wf|	Workflow	|$199.99|
|docgen|	Document Generation	|$9.99|
|form|	Form|	$99.99|
 

Also, we currently have these promotion codes:

|PROMO CODE|	DESCRIPTION|
| :------------- | -----------: |
|RRD4D32	|10% discount for orders above $1000 (pre-discount)|
|44F4T11	|15% discount for orders above $1500 (pre-discount)|
|FF9543D1	|Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased|
|YYGWKJD	|Reduces the form price to $89.99 a unit when at least 1 wf is purchased|

For simplicity sake, only one promotion code can be applied at a time.

 

#### Requirements:
We would like you to implement a single checkout page, where you'll be able to select products, insert a promotion code (if any available), and being shown the payable amount.

Since promotion codes come and go, we want the pricing rules to be as flexible as possible so that could be changed in the future with little notice.

Outcomes examples:

``` 
Products	2x wf
Promotion:	 
Total	$399.98
 	 
Products	6x wf
Promotion:	RRD4D32
Total	$1,079.94
 	 
Products	1x wf, 1x form
Promotion:	YYGWKJD
Total	$289.98
```
##### Directions:
Feel free to make any assumptions where required to complete the exercise, unless contrary to what is specified in the business rules and/or requirements


We are not aiming to get a perfect, production ready solution. Only spend enough time to produce a testable and maintainable solution for the requirements given.

We use Javascript ES6 and ReactJS internally and building your sample with these is the easiest way to show us your relevant skills.

We will be focusing our attention on your front-end engineering skills; thus we will be looking into the quality and structure of your JavaScript. Please build a UI that helps to demonstrate that.

Feel free to mock any back-end components (if any required in your design). We won’t be judging any back-end implementation. Feel free to design the data required how you see fit.

We won’t be judging the aesthetics aspect of the UI. Again, we will be more interested in how you structure your style sheets.
 

Your solution should include all source code, including tests, and instructions on how to run your solution.
