var connection = require("../config/connection.js");

//SQL Helper function
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
    selectAll: function(table, cb) {
        var queryString = `SELECT * FROM  ${table} ;`;
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    }, insertOne: function(table, cols, vals, cb) {
        var queryString = `INSERT INTO ${table} ;`;

        queryString += " (";
        queryString += cols.toString();
        queryString += ")";
        queryString += `VALUES (`;
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    }, updateOne: function(table, objColVals, condition, cb) {
        var queryString = `UPDATE ${table}`;

        queryString += ` SET `;
        queryString += objToSQL(objColsVals);
        queryString += ` WHERE `;
        queryString += condition;

        connection(queryString, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;