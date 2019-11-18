# bamazon


## ABOUT

### Meet BAMAZON

Bamazon is Amazon-like storefront node application. It will take in orders from customers and deplete stock from the store's inventory. 

Consists of two applications: Customer View and Manager View.

#### Customer View will:

* Display all of the items available for sale

* Ask customer which item they would like to buy

* Ask how many units of the product they would like to buy

Once the customer has placed the order, application will check if the store has enough of the product to meet the customer's request.

* If not, the app will alert the customer of insufficient quantity

* If the store does have enough of the product, the app will fulfill the customer's order. By updating the SQL database to reflect the remaining quantity and showing the customer the total cost of their purchase.

#### Manager View will allow the manager to:

* View Products for Sale

* View Low Inventory

* Add to Inventory

* Add New Product

## TECHNOLOGIES USED

- Node.js
- Inquiere package
- MySQL
- JavaScript

## INSTRUCTIONS and EXAMPLES

### ! BEFORE YOU BEGIN ! 

- In the root directory, run:
```sh
$ npm install 
```
(to install node modules)

```sh
$ npm install  mysql
```
(to install MySQL package)

```sh
$ npm install inquirer
```
(to install inquirer package)

```sh
$ npm install dotenv
```
(to install dotenv package)

- Create .env file to hold your own MySQL password
********

### TO USE _CUSTOMER VIEW_ APPILCATION:

* Open the terminal in your root derictory. Once there, run this command:

```sh
$ node bamazonCustomer.js
```
You will be prompted to this screen:
![Image description](img/customer_1.png)

* Pick an ID of item you would like to purchase'

* Enter the quantity

> if the store doesen't have enough of the product to meet the your request, you will get this alert:

![Image description](img/customer_2.png)

>if the store does have enough of the product, the app will fulfill your order and show your total cost.

![Image description](img/customer_3.png)

* If you would like to make anither purchase, press <Y> and you will be promted to the screen _Available goods_ with an updated inventory.

*If you would like to exit, press <N>
