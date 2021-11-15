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
} = require("../controllers/subcategory");

router.get("/subcategory", list);
router.get("/subcategory/:slug", read);
router.post("/subcategory", authCheck, adminCheck, create);
router.put("/subcategory/:slug", authCheck, adminCheck, update);
router.delete("/subcategory/:slug", authCheck, adminCheck, remove);

module.exports = router;
