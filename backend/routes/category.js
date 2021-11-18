const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck } = require("../middlewares/auth");
const { adminCheck } = require("../middlewares/auth");

const {
  create,
  read,
  update,
  remove,
  list,
  getsubcategories
} = require("../controllers/category");

router.get("/category", list);
router.get("/category/:slug", read);
router.post("/category", authCheck, adminCheck, create);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subcategory/:_id", getsubcategories);

module.exports = router;
