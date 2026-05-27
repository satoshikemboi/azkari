// Admin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Upload,
  Save,
  Trash2,
  Plus,
} from "lucide-react";

export default function Admin() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    itemName: "",
    amount: "",
    paypayLink: "",
    phoneNumber: "",
    transactionId: "",
  });

  const [qrFile, setQrFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/payments"
      );

      setPayments(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      itemName: "",
      amount: "",
      paypayLink: "",
      phoneNumber: "",
        transactionId: "",
    });

    setQrFile(null);

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("amount", formData.amount);
      data.append("paypayLink", formData.paypayLink);
      data.append("phoneNumber", formData.phoneNumber);
        data.append("transactionId", formData.transactionId);

      if (qrFile) {
        data.append("paypayQrCode", qrFile);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/payments/${editingId}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/payments/create",
          data
        );
      }

      fetchPayments();

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment._id);

    setFormData({
      itemName: payment.itemName,
      amount: payment.amount,
      paypayLink: payment.paypayLink,
      phoneNumber: payment.phoneNumber,
      transactionId: payment.transactionId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/payments/${id}`
      );

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center p-5">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage PayPay payment listings
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Plus className="w-5 h-5 text-sky-500" />

            <h2 className="text-xl font-semibold text-gray-800">
              {editingId
                ? "Edit Listing"
                : "Create Listing"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Item Name */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Item Name
              </label>

              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="ぬいぐるみ"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-400"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="800"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-400"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-400"
                required
              />
            </div>

            /* Transaction ID */
<div>
  <label className="text-sm text-gray-600 mb-2 block">
    Transaction ID
  </label>

  <input
    type="text"
    name="transactionId"
    value={formData.transactionId}
    onChange={handleChange}
    placeholder="TXN-123456789"
    className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-400"
    required
  />
</div>

            {/* Link */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                PayPay Link
              </label>

              <input
                type="text"
                name="paypayLink"
                value={formData.paypayLink}
                onChange={handleChange}
                placeholder="https://pay.paypay.ne.jp/example"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-400"
                required
              />
            </div>

            {/* QR Upload */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 mb-2 block">
                PayPay QR Image
              </label>

              <label className="w-full h-36 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 transition">
                <Upload className="w-7 h-7 text-gray-400 mb-2" />

                <span className="text-sm text-gray-500">
                  Upload QR Code Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setQrFile(e.target.files[0])
                  }
                />
              </label>

              {qrFile && (
                <p className="text-sm text-green-600 mt-2">
                  {qrFile.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 h-12 rounded-2xl bg-sky-500 text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                <Save className="w-4 h-4" />

                {editingId
                  ? "Update Listing"
                  : "Create Listing"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-12 px-5 rounded-2xl bg-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Listings
          </h2>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-white rounded-3xl shadow-sm p-5"
                >

                  {/* QR */}
                  <img
                    src={`http://localhost:5000${payment.paypayQrCode}`}
                    alt="qr"
                    className="w-full h-52 object-cover rounded-2xl border border-gray-100"
                  />

                  {/* Content */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {payment.itemName}
                    </h3>

                    <p className="text-2xl font-bold text-sky-500 mt-1">
                      ¥{payment.amount}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {payment.phoneNumber}
                    </p>

                    <a
                      href={payment.paypayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-500 break-all"
                    >
                      {payment.paypayLink}
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() =>
                        handleEdit(payment)
                      }
                      className="flex-1 h-11 rounded-2xl bg-yellow-400 text-black font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(payment._id)
                      }
                      className="w-12 h-11 rounded-2xl bg-red-500 text-white flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}