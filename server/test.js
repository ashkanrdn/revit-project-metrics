const { Connection, Request } = require("tedious");
require('dotenv').config();

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: process.env.WEB_DATABASE_USER, // update me
      password: process.env.WEB_DATABASE_PASSWORD, // update me
    },
    type: "default"
  },
  server: process.env.WEB_DATABASE_SERVER, // update me
  options: {
    database: process.env.WEB_DATABASE, //update me
    encrypt: true,
    validateBulkLoadParameters: false,
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT TOP 20 pc.Name as CategoryName,
                   p.name as ProductName
     FROM [SalesLT].[ProductCategory] pc
     JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}