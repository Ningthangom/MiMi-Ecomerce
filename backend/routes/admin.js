const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus,dailySales,weeklySales  } = require("../controllers/admin");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.get("/admin/dailysales", authCheck, adminCheck, dailySales);
router.put("/admin/weeklysales", /* authCheck, adminCheck */ weeklySales);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
