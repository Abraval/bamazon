require("dotenv").config();
var mysql = require("mysql");
const cTable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: process.env.My_SQL_PASS,
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        message: "What would you like to do?"
      }
    ])
    .then(function(answer) {
      if (answer.action === "View Products for Sale") {
        viewProducts();
      } else if (answer.action === "View Low Inventory") {
        lowInventory();
      } else if (answer.action === "Add to Inventory") {
        addToInventory();
      } else {
        addNewProduct();
      }
    });
}
function viewProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
  });
}
function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    results
  ) {
    if (err) throw err;
    console.table(results);
  });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Name of the item"
      },

      {
        name: "dept",
        type: "input",
        message: "What department?"
      },
      {
        name: "price",
        type: "input",
        message: "Price"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.dept,
          price_$: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, results) {
          if (err) throw err;
          console.table("Item " + answer.item + " added successfully!");
        }
      );
    });
}
function addToInventory() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "item",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which product's inventory would you like to update?"
        },

        {
          name: "newStock",
          type: "input",
          message: "How many would you like to add?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.item) {
            chosenItem = results[i];
          }
        }
        var newStock = parseInt(answer.newStock)+parseInt(chosenItem.stock_quantity);

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
                item_id: chosenItem.item_id
            }
          ],
          function(error) {
            if (error) throw err;
            console.table("Inventory of " + chosenItem.product_name + " updated successfully!");
          }
        );
      });
  });
}
