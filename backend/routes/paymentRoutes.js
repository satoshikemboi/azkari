const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
  getPaymentByTransactionId,
} = require("../controllers/paymentController");

const router = express.Router();


// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG/JPG images allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});


// =======================
// IMPORTANT ORDER FIX HERE
// =======================

// GET ALL
router.get("/", getPayments);

// TRANSACTION ROUTE (MUST COME BEFORE /:id)
router.get(
  "/transaction/:transactionId",
  getPaymentByTransactionId
);

// CREATE
router.post(
  "/create",
  upload.single("paypayQrCode"),
  createPayment
);


// UPDATE
router.put(
  "/:id",
  upload.single("paypayQrCode"),
  updatePayment
);

// DELETE
router.delete("/:id", deletePayment);

module.exports = router;