import { useState } from "react";
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
  ShieldCheck,
  Hash,
  ArrowRight,
  AlertCircle,
  Loader,
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

  // ── Entry screen (no payment loaded yet) ────────────────────────────────────
  if (!payment) {
    return (
      <div className="w-full min-h-screen bg-[#f6f7f8] flex justify-center items-center px-4">
        <div className="w-full max-w-sm bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">

          {/* Top brand area */}
          <div className="bg-gray-50 px-6 pt-8 pb-6 flex flex-col items-center gap-5 border-b border-gray-100">

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] bg-sky-500 flex items-center justify-center">
                <Unlock className="w-[18px] h-[18px] text-sky-50" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-semibold tracking-tight text-gray-800">Azukari</span>
                <span className="text-[10px] text-sky-500 tracking-[0.15em] mt-1">安全取引サービス</span>
              </div>
            </div>

            {/* Padlock illustration */}
            <div className="flex flex-col items-center gap-3">
              <svg width="130" height="148" viewBox="0 0 130 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38 72 L38 46 C38 26 50 14 65 14 C80 14 92 26 92 46 L92 72"
                  stroke="#E2C35B"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                />
                <rect x="10" y="64" width="110" height="80" rx="18" fill="#F2D46C" />
                <rect x="10" y="64" width="110" height="6" rx="0" fill="#EFC94A" />
                <circle cx="65" cy="96" r="10" fill="#B8941A" />
                <rect x="61" y="99" width="8" height="14" rx="4" fill="#B8941A" />
              </svg>

              <div className="flex items-center gap-1.5 bg-sky-50 text-sky-600 text-[11px] font-medium px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3 h-3" strokeWidth={2.5} />
                エスクロー保護中
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="px-6 py-6">
            <p className="text-[16px] font-semibold text-gray-800 mb-1">取引IDを入力</p>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
              購入者保護にアクセスするには<br />取引IDを入力してください。
            </p>

            {/* Input */}
            <div className="relative mb-3">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchPayment()}
                placeholder="TXN-123456"
                className="
                  w-full h-12 pl-10 pr-4
                  rounded-xl border border-gray-200
                  bg-gray-50 text-gray-800
                  text-[14px] font-mono tracking-wide
                  placeholder:font-sans placeholder:tracking-normal placeholder:text-gray-400
                  outline-none
                  focus:border-sky-400 focus:bg-white
                  transition-all
                "
              />
            </div>

            {/* Button */}
            <button
              onClick={fetchPayment}
              disabled={loading}
              className="
                w-full h-12 rounded-xl
                bg-sky-500 text-sky-50
                text-[14px] font-semibold tracking-wide
                flex items-center justify-center gap-2
                transition-all active:scale-[0.98]
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  読み込み中...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  取引を読み込む
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[12px] text-red-500 font-medium">{error}</p>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] text-gray-400">安全な保護</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Footer trust line */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <Unlock className="w-3 h-3" strokeWidth={2} />
              購入者と販売者の両方を保護します
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main unlock screen (payment loaded) ─────────────────────────────────────
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

          {/* Track with nodes */}
          <div className="relative flex items-center">

            {/* Solid line: 同意 → 支払 (completed) */}
            <div
              className="absolute h-[2px] bg-sky-500"
              style={{ left: 10, right: "50%", top: 9 }}
            ></div>

            {/* Solid line: 支払 → 受取 (completed) */}
            <div
              className="absolute h-[2px] bg-sky-500"
              style={{ left: "50%", right: 10, top: 9 }}
            ></div>

            {/* Node 1: 同意 (completed) */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="flex-1"></div>

            {/* Node 2: 支払 (completed) */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="flex-1"></div>

            {/* Node 3: 受取 (active — red-400 with ring) */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-red-400 ring-[3px] ring-red-200 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-[11px] mt-2">
            <span className="text-sky-500">同意</span>
            <span className="text-sky-500">支払</span>
            <span className="text-red-400 font-semibold">受取</span>
          </div>

          <div className="flex justify-end mt-2">
            <div className="bg-red-50 text-red-400 text-[10px] px-2 py-[3px] rounded-full">
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
                <p className="text-[15px] text-black mt-3">{payment.itemName}</p>
                <p className="text-[11px] text-gray-700 mt-1">チケット手数料</p>
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
                confirmed ? "bg-red-400 border-red-400" : "border-gray-300 bg-white"
              }`}
            >
              {confirmed && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-[13px] text-gray-700 leading-relaxed">
              表示された金額を全額支払うことに同意します
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