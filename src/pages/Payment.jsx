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
        `https://azkari-7pmg.onrender.com/api/payments/transaction/${transactionId}`
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
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
        取引IDが無効です
      </div>
    );
  }

  const qrUrl = payment.paypayQrCode
    ? `https://azkari-7pmg.onrender.com${payment.paypayQrCode}`
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
            お支払い
          </h1>

          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>

        {/* Status */}
        <div className="px-5 mt-4">

          {/* Track with nodes */}
          <div className="relative flex items-center">

            {/* Solid line: 同意 → 支払 */}
            <div
              className="absolute h-[2px] bg-sky-500"
              style={{ left: 10, right: "50%", top: 9 }}
            ></div>

            {/* Dashed line: 支払 → 受取 */}
            <div
              className="absolute h-[2px]"
              style={{
                left: "50%",
                right: 10,
                top: 9,
                backgroundImage:
                  "repeating-linear-gradient(to right, #7dd3fc 0, #7dd3fc 5px, transparent 5px, transparent 10px)",
              }}
            ></div>

            {/* Node 1: 同意 (completed) */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="flex-1"></div>

            {/* Node 2: 支払 (active) */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 ring-[3px] ring-sky-200 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="flex-1"></div>

            {/* Node 3: 受取 (incomplete) */}
            <div className="relative z-10 w-5 h-5 rounded-full border-2 border-sky-300 bg-white flex-shrink-0"></div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-[11px] mt-2">
            <span className="text-sky-500">同意</span>
            <span className="text-sky-500 font-semibold">支払</span>
            <span className="text-gray-400">受取</span>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-[10px] bg-sky-100 text-sky-600 px-2 py-1 rounded-full">
              進行中
            </span>
          </div>
        </div>

        {/* Amount Card */}
        <div className="mt-8 flex justify-center">
          <div className="w-[230px] h-[230px] rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex flex-col items-center justify-center shadow-md">

            <p className="text-[13px] text-black/80">金額</p>

            <h2 className="text-[44px] font-bold text-black">
              ¥{payment.amount}
            </h2>

            <p className="text-[14px] font-medium text-black mt-2">
              {payment.itemName}
            </p>

            <div className="flex items-center gap-1 mt-2 text-[11px] text-black/70">
              <ShieldCheck className="w-4 h-4" />
              安全なお支払い
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
                  alt="QRコード"
                  className="w-[160px] h-[160px] object-cover rounded-xl border"
                />
              ) : (
                <div className="w-[160px] h-[160px] flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-sm">
                  QRコードなし
                </div>
              )}

              <p className="text-[12px] text-gray-500 mt-3">
                QRコードをスキャンしてお支払いを完了してください
              </p>
            </div>

            {/* Phone */}
            <div className="mt-5">
              <p className="text-[12px] text-gray-500 mb-2">
                PayPay番号
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
                支払いリンクを開く
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-[11px] text-gray-400 mt-6 px-6">
          お支払い後、取引は自動的に確認されます。
        </div>
      </div>
    </div>
  );
}