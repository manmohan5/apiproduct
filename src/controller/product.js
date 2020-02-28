/* eslint-disable camelcase */
const {
  getProductCategory,
  getProductData,
  deleteProduct,
  postProduct,
  getProductBrand
} = require('../models/product');

// onst logger = require('../middleware/logging');

// eslint-disable-next-line consistent-return
function getPoductByCategoryRoutes(req, res, next) {
  const p_category = req.params.category;

  getProductCategory(p_category)
    .then(p => {
      //
      if (p.rowCount === 0) {
        next({
          message: 'category is not available ',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}
function getProductByBrandRoutes(req, res, next) {
  const p_brand = req.params.product_brand;
  console.log(req.params)
  getProductBrand(p_brand)
    .then(p => {
      //
      if (p.rowCount === 0) {
        next({
          message: 'category is not available ',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

function getProductDataRoutes(req, res, next) {
  getProductData()
    .then(p => {
      if (p.count === 0) {
        next({
          message: 'there is no data in the table',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

// eslint-disable-next-line consistent-return
function deleteProductByIDRoutes(req, res, next) {
  const pid = req.params.product_id;
  deleteProduct(pid)
    .then(p => {
      if (p.rowCount === 0) {
        next({
          message: 'unable to delete id is not available ',
          status: 404
        });
      } else {
        res.send(`deleted id:${pid}`);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

// eslint-disable-next-line consistent-return
function postProductRoutes(req, res) {
  const values = Object.values(req.body);
  // const keys = Object.keys(req.query);
  const KeyVal = Object.values(req.query);

  postProduct(values)
    .then(p => {
      if (p.rows) {
        res.send(p.rows);
      } else {
        res.send(p.detail);
      }
    })
    .catch(err => res.send(err.message, err.status));
}
// update
// eslint-disable-next-line consistent-return

module.exports = {
  getPoductByCategoryRoutes,
  getProductDataRoutes,
  deleteProductByIDRoutes,
  postProductRoutes,
  getProductByBrandRoutes
};
