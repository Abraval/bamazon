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
  //   console.log("connected as id " + connection.threadId);
  display();
});

function display() {
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
    console.log("****************************************\n");
    console.log("Total Sales:\n");
    console.log("****************************************\n");
    console.table(results);
    action();
  });
}

function action() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit"
      ],
      message: "What would yopu like to do now?"
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          byDepartment();
          break;
        case "Create New Department":
          newDepartment();
          break;
        case "Exit":
          console.log("See you later!");
          connection.end();
      }
    });
}

function byDepartment() {
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt({
        name: "whichDept",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].department_name);
          }
          return choiceArray;
        },
        message: "Which item would you like to purchase?"
      })
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].department_name === answer.whichDept) {
            chosenItem = results[i];
          }
        }
        connection.query(
          "SELECT department_name, over_head_costs, product_sales, total_profit FROM departments WHERE ?",
          { department_name: chosenItem.department_name },
          function(err, results) {
            if (err) throw err;
            console.log("\n****************************************\n");
            console.log("Sales by department:\n");
            console.log("****************************************\n");
            console.table(results);
            action();
          }
          
        );
        
      });
  });
}
