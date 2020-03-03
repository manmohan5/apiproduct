/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const pool = require('./src/utils/config');

function getPath(fileName) {
  return path.resolve(`${fileName}`);
}

async function dropTable() {
  const query = `DROP TABLE IF EXISTS product,category,brand;`;
  await pool.query(query);
}

async function createProductTable() {
  try {
    const query = `CREATE TABLE IF NOT EXISTS product (
    PRODUCT_ID SERIAL PRIMARY KEY,
    PRODUCT_NAME VARCHAR(25) UNIQUE,
    BRAND_ID INT NOT NULL,
    CATEGORY_ID INT NOT NULL,
    FOREIGN KEY (BRAND_ID)
    REFERENCES BRAND(BRAND_ID),
    FOREIGN KEY (CATEGORY_ID)
    REFERENCES CATEGORY(CATEGORY_ID)
    ON DELETE CASCADE

   );`;

    await pool.query(query);
    await pool.query(
      `insert into product(product_name,brand_id,category_id) values('a30',2,6)`
    );
    await pool.query(
      `insert into product(product_name,brand_id,category_id) values('a50',2,6)`
    );
    await pool.query(
      `insert into product(product_name,brand_id,category_id) values('Splendor',4,5)`
    );
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}

async function createBrandTable() {
  try {
    const query = `CREATE TABLE IF NOT EXISTS brand (
    BRAND_ID SERIAL PRIMARY KEY,
    BRAND_NAME VARCHAR(25) UNIQUE
      );`;

    await pool.query(query);
    await pool.query(`insert into brand (brand_name) values('nokia')`);
    await pool.query(`insert into brand (brand_name) values('samsung')`);
    await pool.query(`insert into brand (brand_name) values('suzuki')`);
    await pool.query(`insert into brand (brand_name) values('honda')`);
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}

async function createCategoryTable() {
  try {
    const filePath = getPath('./src/csvData/category.csv');
    const query = `CREATE TABLE IF NOT EXISTS category (
    CATEGORY_ID INT PRIMARY KEY,
    CATEGORY_NAME VARCHAR(25) UNIQUE,
    PARENT_ID INT
      );`;

    await pool.query(query);
    // await pool.query(`insert into category values(1,'electronics',0,)`);
    // await pool.query(`insert into category values(2,'mobile',1)`);
    // await pool.query(`insert into category values(3,'vehicle')`);
    // await pool.query(`insert into category values(4,'car',3)`);
    await pool.query(
      `\copy category from '${filePath}' with delimiter ',' csv header`
    );
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}
// async function createProductDesTable() {
//   try {
//     const filePath = getPath('./src/csvData/category.csv');
//     const query = `CREATE TABLE IF NOT EXISTS productdes (
//     product_size INT ,
//     product_shape VARCHAR(25) UNIQUE,
//     product_id INT,
//     FOREIGN KEY (product_id)
//     REFERENCES product(product_id)
//     ON DELETE CASCADE

//       );`;

//     await pool.query(query);
//     // await pool.query(`insert into category values(1,'electronics',0,)`);
//     // await pool.query(`insert into category values(2,'mobile',1)`);
//     // await pool.query(`insert into category values(3,'vehicle')`);
//     // await pool.query(`insert into category values(4,'car',3)`);
//     await pool.query(
//       `\copy category from '${filePath}' with delimiter ',' csv header`
//     );
//   } catch (e) {
//     console.log('SQL Exception');
//     console.log(e);
//   }
// }

async function seed() {
  await dropTable();
  await createBrandTable();
  await createCategoryTable();
  await createProductTable();
  await createProductDesTable();
  await pool.end();
  console.log('seeding done');
}

seed();
