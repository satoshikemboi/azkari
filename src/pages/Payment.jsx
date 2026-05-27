import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  HelpCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { transactionId } = useParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayment();
  }, [transactionId]);

  const fetchPayment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payments/transaction/${transactionId}`
      );

      setPayment(res.data);
    } catch (error) {
      console.log(error);
      setPayment(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">Loading payment...</div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
        Invalid Transaction ID
      </div>
    );
  }

  const qrUrl = payment.paypayQrCode
    ? `http://localhost:5000${payment.paypayQrCode}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-lg relative">

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b">
          <button>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="text-[15px] font-semibold text-gray-800">
            Payment
          </h1>

          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>

        {/* Status */}
        <div className="px-5 mt-4">
          <div className="flex justify-between text-[11px] text-gray-500">
            <span>Agreement</span>
            <span className="text-sky-500 font-semibold">Payment</span>
            <span>Receive</span>
          </div>

          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-sky-500 rounded-full"></div>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-[10px] bg-sky-100 text-sky-600 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Amount Card */}
        <div className="mt-8 flex justify-center">
          <div className="w-[230px] h-[230px] rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex flex-col items-center justify-center shadow-md">
            
            <p className="text-[13px] text-black/80">Amount</p>

            <h2 className="text-[44px] font-bold text-black">
              ¥{payment.amount}
            </h2>

            <p className="text-[14px] font-medium text-black mt-2">
              {payment.itemName}
            </p>

            <div className="flex items-center gap-1 mt-2 text-[11px] text-black/70">
              <ShieldCheck className="w-4 h-4" />
              Secure Payment
            </div>
          </div>
        </div>

        {/* QR Section */}
        <div className="px-5 mt-10">
          <div className="border rounded-3xl p-5 shadow-sm bg-white">

            <div className="flex flex-col items-center">

              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="w-[160px] h-[160px] object-cover rounded-xl border"
                />
              ) : (
                <div className="w-[160px] h-[160px] flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-sm">
                  No QR uploaded
                </div>
              )}

              <p className="text-[12px] text-gray-500 mt-3">
                Scan QR to complete payment
              </p>
            </div>

            {/* Phone */}
            <div className="mt-5">
              <p className="text-[12px] text-gray-500 mb-2">
                PayPay Number
              </p>

              <div className="flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-3">
                <span className="text-[14px] font-semibold text-gray-800">
                  {payment.phoneNumber}
                </span>

                <button
                  onClick={() => copyToClipboard(payment.phoneNumber)}
                  className="text-sky-500"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Link */}
            <div className="mt-5">
              <a
                href={payment.paypayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 h-[50px] rounded-2xl bg-sky-500 text-white font-semibold active:scale-[0.98] transition"
              >
                Open Payment Link
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-[11px] text-gray-400 mt-6 px-6">
          After payment, your transaction will be automatically confirmed.
        </div>
      </div>
    </div>
  );
}