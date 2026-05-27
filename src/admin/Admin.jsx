import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Upload,
  Save,
  Trash2,
  Plus,
  Copy,
  Check,
} from "lucide-react";

export default function Admin() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copiedId, setCopiedId] = useState("");

  const [formData, setFormData] = useState({
    itemName: "",
    amount: "",
    paypayLink: "",
    phoneNumber: "",
    transactionId: "",
  });

  const [qrFile, setQrFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const API =
    "https://azkari-7pmg.onrender.com/api/payments";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API);

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

      data.append(
        "phoneNumber",
        formData.phoneNumber
      );

      data.append(
        "transactionId",
        formData.transactionId
      );

      if (qrFile) {
        data.append("paypayQrCode", qrFile);
      }

      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          data
        );
      } else {
        await axios.post(
          `${API}/create`,
          data
        );
      }

      fetchPayments();

      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
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
      await axios.delete(`${API}/${id}`);

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  const copyTransactionId = (id) => {
    navigator.clipboard.writeText(id);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex justify-center p-5">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage PayPay listings
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-gray-100 mb-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-sky-500" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editingId
                  ? "Edit Listing"
                  : "Create Listing"}
              </h2>

              <p className="text-sm text-gray-500">
                Fill in all payment details
              </p>
            </div>
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
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-500"
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
                placeholder="5000"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                PayPay Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="08012345678"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-500"
                required
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Transaction ID
              </label>

              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="TXN-6112"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-500"
                required
              />
            </div>

            {/* PayPay Link */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 mb-2 block">
                PayPay Link
              </label>

              <input
                type="text"
                name="paypayLink"
                value={formData.paypayLink}
                onChange={handleChange}
                placeholder="https://pay.paypay.ne.jp/xxxxx"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:border-sky-500"
                required
              />
            </div>

            {/* QR Upload */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 mb-2 block">
                PayPay QR Code
              </label>

              <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 transition-all">

                <Upload className="w-8 h-8 text-gray-400 mb-3" />

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
                <div className="mt-3 text-sm text-green-600">
                  {qrFile.name}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4 mt-2">

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
                  className="h-12 px-6 rounded-2xl bg-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listings */}
        <div>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Listings
          </h2>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100"
                >

                  {/* QR */}
                  <div className="bg-gray-50 flex justify-center items-center p-6">
                    <img
                      src={`https://azkari-7pmg.onrender.com${payment.paypayQrCode}`}
                      alt="QR"
                      className="w-48 h-48 object-cover rounded-3xl border border-gray-100"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {payment.itemName}
                        </h3>

                        <p className="text-3xl font-bold text-sky-500 mt-2">
                          ¥{payment.amount}
                        </p>
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div className="mt-5">

                      <p className="text-xs text-gray-400 mb-2">
                        Transaction ID
                      </p>

                      <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between">

                        <span className="font-semibold text-gray-700 text-sm">
                          {payment.transactionId}
                        </span>

                        <button
                          onClick={() =>
                            copyTransactionId(
                              payment.transactionId
                            )
                          }
                          className="text-sky-500"
                        >
                          {copiedId ===
                          payment.transactionId ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Number */}
                    <div className="mt-4">

                      <p className="text-xs text-gray-400 mb-2">
                        PayPay Number
                      </p>

                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <span className="font-medium text-gray-700">
                          {payment.phoneNumber}
                        </span>
                      </div>
                    </div>

                    {/* Link */}
                    <div className="mt-4">
                      <a
                        href={payment.paypayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500 text-sm break-all"
                      >
                        {payment.paypayLink}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          handleEdit(payment)
                        }
                        className="flex-1 h-11 rounded-2xl bg-yellow-400 text-black font-semibold"
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
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}