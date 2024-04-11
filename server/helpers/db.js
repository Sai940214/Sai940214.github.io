<<<<<<< HEAD
const { Pool } = require("pg");

const openDb = () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bbs",
    password: "123456",
    port: 5432,
  });
  return pool;
};

const query = (sql, values = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = openDb();
      const result = await pool.query(sql, values);
      resolve(result);
    } catch (error) {
      reject(error.message);
=======
const { Pool } = require('pg')

const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bbs',
    password: '0318',
    port: 5432
  })
  return pool
}

const query = (sql,values=[]) => {
  return new Promise(async(resolve,reject)=> {
    try {
      const pool = openDb()
      const result = await pool.query(sql,values)
      resolve(result)
    } catch (error) {
      reject(error.message)
>>>>>>> f1536be (0411 modified by this version)
    }
  });
};

module.exports = {
<<<<<<< HEAD
  query,
};
=======
  query
}
>>>>>>> f1536be (0411 modified by this version)
