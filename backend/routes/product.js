const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck } = require("../middlewares/auth");
const { adminCheck } = require("../middlewares/auth");

const {
  create,
  list
} = require("../controllers/product");

router.get("/products", list);
/* router.get("/category/:slug", read); */
router.post("/product", authCheck, adminCheck, create);
/* router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
 */
module.exports = router;