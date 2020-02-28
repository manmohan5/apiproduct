const pool = require('../utils/config.js');

async function getProductData() {
  try {
    const query = `select * from product`;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}
async function getProductCategory(categoryName) {
  try {
    const query = `select * from product where category=$1`;
    return await pool.query(query, [categoryName]);
  } catch (error) {
    return error;
  }
}
async function getProductBrand(productBrand) {
  console.log(productBrand)
  try {
    const query = `select * from product where product_brand=$1`;
    return await pool.query(query, [productBrand]);
  } catch (error) {
    return error;
  }
}

async function deleteProduct(id) {
  try {
    const query = 'delete from product where product_id=$1';
    return await pool.query(query, [id]);
  } catch (error) {
    return error;
  }
}

async function postProduct(productData) {
  try {
    const query = 'insert into product values($1,$2,$3,$4) RETURNING *';
    return await pool.query(query, [...productData]);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getProductData,
  postProduct,
  deleteProduct,
  getProductCategory,
  getProductBrand
};
