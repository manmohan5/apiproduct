/* eslint-disable camelcase */
const {
  getProductCategory,
  getProductData,
  getProductByName,
  postProduct,
  getProductBrand,
  getProductListning,
  getProductByBrandname,
  getProductByCategoryname,
  getProductByCategoryTree
} = require('../models/product');

// eslint-disable-next-line consistent-return
function getPoductCategoryRoutes(req, res, next) {
  getProductCategory()
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
function getProductBrandRoutes(req, res, next) {
  getProductBrand()
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

function getProductByBrandnameRoutes(req, res, next) {
  getProductByBrandname(req.params.brand_name)
    .then(p => {
      //
      if (p.rowCount === 0) {
        res.send([{ product_name: 'product not available' }]);
        next({
          message: 'brand is not available ',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

function getProductByCategorynameRoutes(req, res, next) {
  getProductByCategoryname(req.params.category_name)
    .then(p => {
      //
      if (p.rowCount === 0) {
        res.send([{ message: 'no data' }]);
        next({
          message: 'brand is not available ',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

function getProductByCategoryTreeRoutes(req, res, next) {
  getProductByCategoryTree(req.params.category_name)
    .then(p => {
      //
      if (p.rowCount === 0) {
        // res.send([{ count: 0 }]);
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
function getProductByNameRoutes(req, res, next) {
  const pname = req.params.product_name;
  getProductByName(pname)
    .then(p => {
      if (p.rowCount === 0) {
        next({
          message: 'no data',
          status: 404
        });
      } else {
        res.send(p.rows);
      }
    })
    .catch(err => res.send(err.message, err.status));
}

// eslint-disable-next-line consistent-return
function postProductRoutes(req, res) {
  const values = Object.values(req.body);
  // const keys = Object.keys(req.query);
  // const KeyVal = Object.values(req.query);

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

function getProductListningRoutes(req, res, next) {
  const keys = Object.keys(req.query);
  const KeyVal = Object.values(req.query);
  if (keys.length === 0) {
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
  } else {
    getProductListning(keys, KeyVal)
      .then(p => {
        if (p.rows) {
          res.send(p.rows);
        } else {
          res.send(p.detail);
        }
      })
      .catch(err => res.send(err.message, err.status));
  }
}
// update
// eslint-disable-next-line consistent-return

module.exports = {
  getProductDataRoutes,
  getProductByNameRoutes,
  postProductRoutes,
  getProductBrandRoutes,
  getProductListningRoutes,
  getPoductCategoryRoutes,
  getProductByBrandnameRoutes,
  getProductByCategorynameRoutes,
  getProductByCategoryTreeRoutes
};
