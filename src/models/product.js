const pool = require('../utils/config.js');

async function getProductData() {
  try {
    const query = `select * from product`;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}

async function getProductCategory() {
  try {
    const query = `select  category_id , category_name,parent_id from category`;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}
async function getProductByName(name) {
  try {
    const query = `select product_name from product where product_name=$1`;
    return await pool.query(query, [name]);
  } catch (error) {
    return error;
  }
}

async function getProductListning(key, values) {
  const value = values[0].replace(/"/g, "'");
  const query =
    values.length === 1
      ? `select * from product where ${key[0]}=${value}`
      : `select * from product where ${key[0]}=${values[0].replace(
          /"/g,
          "'"
        )} and  ${key[1]}=${values[1].replace(/"/g, "'")}`;

  try {
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}
async function getProductBrand() {
  try {
    const query = `select brand_name from brand`;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}
async function getProductByBrandname(brandName) {
  try {
    const query = `select  p.product_id ,p.product_name from product p join brand b on b.brand_id=p.brand_id where b.brand_name='${brandName}';
    `;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}

async function getProductByCategoryname(catName) {
  console.log(catName);
  try {
    const query = `select  p.product_id ,p.product_name from product p join category c on c.category_id=p.category_id where c.category_name='${catName}';
    `;
    // const q = `with RECURSIVE  cte  as(select category_id,parent_id,category_name,CAST(0 as INTEGER) as Level from category where parent_id IN(select parent_id from category where category_name='${catName}') UNION ALL select i.category_id,i.parent_id,i.category_name, Level + CAST(i.category_id as INTEGER) as Level from category i inner join cte  on cte.category_id=i.parent_id) select * from cte  order by Level;
    // `;
    return await pool.query(query);
  } catch (error) {
    return error;
  }
}
async function getProductByCategoryTree(catName) {
  try {
    // const query = `select  p.product_id ,p.product_name from product p join category c on c.category_id=p.category_id where c.category_name='${catName}'`;
    const q = `with RECURSIVE  cte  as(select category_id,parent_id,category_name,CAST(0 as INTEGER) as Level from category where category_id IN(select category_id from category where category_name='${catName}') UNION ALL select i.category_id,i.parent_id,i.category_name, Level + CAST(i.category_id as INTEGER) as Level from category i inner join cte  on cte.category_id=i.parent_id) select category_id,parent_id,category_name from cte where parent_id!=0 order by Level;
    `;

    const data = await pool.query(q);
    return data;
  } catch (error) {
    return error;
  }
}

async function postProduct(productData) {
  try {
    const query = `insert into product (product_name,brand_id,category_id) values($1,(select brand_id from brand where brand_name = $2),(select category_id from category where category_name = $3)) RETURNING *`;
    return await pool.query(query, [...productData]);
  } catch (error) {
    try {
      await pool.query(`insert into brand(brand_name) values($1)`, [
        productData[1]
      ]);
      const query = `insert into product (product_name,brand_id,category_id) values($1,(select brand_id from brand where brand_name = $2),(select category_id from category where category_name = $3)) RETURNING *`;
      return await pool.query(query, [...productData]);
    } catch (e) {
      return e;
    }
  }
}

module.exports = {
  getProductData,
  postProduct,
  getProductCategory,
  getProductBrand,
  getProductListning,
  getProductByBrandname,
  getProductByCategoryname,
  getProductByCategoryTree,
  getProductByName
};
