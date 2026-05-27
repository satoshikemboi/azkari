import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  ChevronLeft,
  HelpCircle,
  Home,
  Wallet,
  Settings,
  ShoppingBag,
  Tag,
  Unlock,
  Check,
} from "lucide-react";

export default function UnlockTicket() {
  const [confirmed, setConfirmed] = useState(false);

  const [transactionId, setTransactionId] = useState("");
  const [payment, setPayment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPayment = async () => {
    if (!transactionId) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://azkari-7pmg.onrender.com/api/payments/transaction/${transactionId}`
      );

      setPayment(res.data);
    } catch (err) {
      setError("Invalid Transaction ID");
      setPayment(null);
    } finally {
      setLoading(false);
    }
  };

  // BLOCK UI until payment is loaded
  if (!payment) {
    return (
      <div className="w-full min-h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm">

          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Enter Transaction ID
          </h1>

          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="TXN-123456"
            className="w-full h-12 px-4 rounded-2xl border border-gray-200 outline-none"
          />

          <button
            onClick={fetchPayment}
            className="w-full mt-3 h-12 bg-sky-500 text-white rounded-2xl font-semibold"
          >
            {loading ? "Loading..." : "Load Transaction"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] flex justify-center">
      <div className="w-full max-w-sm min-h-screen bg-white relative overflow-hidden shadow-sm">

        {/* Header */}
        <div className="flex items-center px-4 pt-4 pb-3">
          <button>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="flex-1 text-center text-[15px] font-semibold text-gray-700 -ml-6">
            {payment.itemName}
          </h1>

          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>

        {/* Progress */}
        <div className="px-5">
          <div className="flex justify-between text-[11px] text-gray-500 mb-2">
            <span>同意</span>
            <span>支払</span>
            <span className="text-sky-500 font-medium">受取</span>
          </div>

          <div className="relative flex items-center">
            <div className="absolute w-full h-[3px] bg-sky-200 rounded-full"></div>
            <div className="absolute left-0 w-[72%] h-[3px] bg-sky-500 rounded-full"></div>

            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500"></div>
            <div className="flex-1"></div>

            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500"></div>
            <div className="flex-1"></div>

            <div className="relative z-10 w-5 h-5 rounded-full border-[3px] border-sky-500 bg-white flex items-center justify-center">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <div className="bg-sky-100 text-sky-500 text-[10px] px-2 py-[3px] rounded-full">
              あなた
            </div>
          </div>
        </div>

        {/* Seller */}
        <div className="absolute right-5 top-[104px] flex flex-col items-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="seller"
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />

          <span className="text-[11px] font-semibold text-gray-700 mt-1">
            AKKO
          </span>
        </div>

        {/* Lock */}
        <div className="flex flex-col items-center mt-10">
          <div className="relative">

            <div className="w-[110px] h-[90px] border-[24px] border-yellow-400 border-b-0 rounded-t-[80px] mx-auto"></div>

            <div className="w-[220px] h-[220px] bg-yellow-400 rounded-full -mt-2 relative flex flex-col items-center justify-center">

              <div className="absolute top-[52px] flex flex-col items-center">
                <div className="w-[15px] h-[15px] bg-black rounded-full"></div>
                <div className="w-[8px] h-[22px] bg-black rounded-b-full -mt-1"></div>
              </div>

              <div className="text-center mt-16">
                <h2 className="text-[44px] font-bold text-black leading-none">
                  ¥{payment.amount}
                </h2>

                <p className="text-[15px] text-black mt-3">
                  {payment.itemName}
                </p>

                <p className="text-[11px] text-gray-700 mt-1">
                  配送料
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="px-5 mt-10">
          <button
            onClick={() => setConfirmed(!confirmed)}
            className="flex items-start gap-3 text-left"
          >
            <div
              className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center mt-[2px] transition-all ${
                confirmed
                  ? "bg-red-400 border-red-400"
                  : "border-gray-300 bg-white"
              }`}
            >
              {confirmed && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>

            <span className="text-[13px] text-gray-700 leading-relaxed">
              商品を受け取り、内容を確認しました
            </span>
          </button>
        </div>

        {/* Unlock Button */}
        <div className="px-4 mt-5">
          {confirmed ? (
            <Link
              to={`/payment/${payment.transactionId}`}
              className="w-full h-[52px] rounded-full bg-[#c9b458] text-white flex items-center justify-center gap-2 text-[15px] font-semibold active:scale-[0.98] transition-all duration-200"
            >
              <Unlock className="w-4 h-4" />
              ロック解除して送金
            </Link>
          ) : (
            <button
              disabled
              className="w-full h-[52px] rounded-full bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center gap-2 text-[15px] font-semibold"
            >
              <Unlock className="w-4 h-4" />
              ロック解除して送金
            </button>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 w-full h-[72px] border-t border-gray-200 bg-white flex items-center justify-around px-2">

          <NavItem icon={<Home size={20} />} label="ホーム" />
          <NavItem icon={<Tag size={20} />} label="売る" />
          <NavItem active icon={<ShoppingBag size={20} />} label="買う" />
          <NavItem icon={<Wallet size={20} />} label="ウォレット" />
          <NavItem icon={<Settings size={20} />} label="設定" />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-[10px] ${
        active ? "text-sky-500" : "text-gray-400"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </div>
  );
}