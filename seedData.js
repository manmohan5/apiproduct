/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const pool = require('./src/utils/config');

function getPath(fileName) {
  return path.resolve(`${fileName}`);
}

async function dropTable() {
  const query = `DROP TABLE IF EXISTS product;`;
  await pool.query(query);
}

async function createProductTable() {
  try {
    const filePath = getPath('./src/csvData/product.csv');
    const query = `CREATE TABLE IF NOT EXISTS product (
    PRODUCT_ID INT PRIMARY KEY,
    PRODUCT_NAME VARCHAR(25) UNIQUE,
    PRODUCT_BRAND VARCHAR(25),
    CATEGORY VARCHAR(25)
   );`;

    await pool.query(query);
    await pool.query(
      `\copy product from '${filePath}' with delimiter ',' csv header`
    );
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}

async function seed() {
  await dropTable();
  await createProductTable();
  await pool.end();
  console.log('seeding done');
}

seed();
