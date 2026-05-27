const Payment = require("../models/Payment");


// CREATE PAYMENT
const createPayment = async (req, res) => {
  try {
    const {
      itemName,
      amount,
      paypayLink,
      phoneNumber,
      transactionId,
    } = req.body;

    if (
      !itemName ||
      !amount ||
      !paypayLink ||
      !phoneNumber ||
      !transactionId ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK DUPLICATE TRANSACTION ID
    const existingPayment = await Payment.findOne({
      transactionId,
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "Transaction ID already exists",
      });
    }

    const payment = await Payment.create({
      itemName,
      amount,
      paypayLink,
      phoneNumber,
      transactionId,
      paypayQrCode: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET BY ID (MISSING BEFORE — FIXED)
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET BY TRANSACTION ID
const getPaymentByTransactionId = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      transactionId: req.params.transactionId,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Invalid Transaction ID",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.itemName = req.body.itemName || payment.itemName;
    payment.amount = req.body.amount || payment.amount;
    payment.paypayLink = req.body.paypayLink || payment.paypayLink;
    payment.phoneNumber = req.body.phoneNumber || payment.phoneNumber;
    payment.transactionId = req.body.transactionId || payment.transactionId;

    if (req.file) {
      payment.paypayQrCode = `/uploads/${req.file.filename}`;
    }

    const updated = await payment.save();

    res.json({ success: true, payment: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    await payment.deleteOne();

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentByTransactionId,
};