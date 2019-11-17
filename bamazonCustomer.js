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
  display();
});

function display() {
  console.log("****************************************\n");
  console.log("Available goods:\n");
  console.log("****************************************\n");
  connection.query(
    "SELECT item_id, product_name, stock_quantity, price_$ FROM products",
    function(err, res) {
      if (err) throw err;

      console.table(res);

      purchase();
    }
  );
}

function purchase() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results)

    inquirer
      .prompt([
        {
          name: "whichItem",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which item would you like to purchase?"
        },

        {
          name: "howMany",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        var chosenItem;

        // console.log(chosenItem.item_id)
        // if (typeof answer.howMany === "string") {
        //   console.log("Please,pick a number!");
        //   process.exit();
        // }
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.whichItem) {
            chosenItem = results[i];
          }
        }
        // console.log(chosenItem.item_id);

        if (chosenItem.stock_quantity < parseInt(answer.howMany)) {
          console.log("****************************************\n");
          console.log("Insufficient quantity!\n");
          console.log("****************************************\n");
          inquirer
            .prompt([
              {
                name: "anotherPurchase",
                type: "confirm",
                message: "Whould you like to make another purchase?"
              }
            ])
            .then(function(answer) {
              // console.log(answer);
              if (answer.anotherPurchase) {
                display();
              } else {
                console.log("****************************************\n");
                console.log("See you later!\n");
                console.log("****************************************\n");
                connection.end();
              }
            });
        } else {
          var newStock =
            parseInt(chosenItem.stock_quantity) - parseInt(answer.howMany);

          var total = Math.floor(
            parseInt(answer.howMany) * parseFloat(chosenItem.price_$)
          );

          // console.log(newStock)
          // console.log(chosenItem.department_name);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newStock,
                product_sales: chosenItem.product_sales+total
              },
              {
                item_id: chosenItem.item_id
              }
            ],
           
              // "UPDATE departments SET ? WHERE ?",
              //   [
              //     {
              //       product_sales: products.product_sales
                 
              //     },
              //     {
              //       department_name: chosenItem.department_name
              //     }
              //   ],

            function(error) {
              if (error) throw err;

              console.log(
                "You successfuly purchased " +
                  answer.howMany +
                  " " +
                  chosenItem.product_name +
                  ". Your Total is: $" +
                  total +
                  ". Thank you!"
              );

              inquirer
                .prompt([
                  {
                    name: "anotherPurchase",
                    type: "confirm",
                    message: "Whould you like to make another purchase?"
                  }
                ])
                .then(function(answer) {
                  // console.log(answer);
                  if (answer.anotherPurchase) {
                    display();
                  } else {
                    console.log("See you later!");
                    connection.end();
                  }
                });
            }
          );
        }
      });
  });
}
