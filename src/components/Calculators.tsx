import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, TrendingUp, ArrowRight, Table } from 'lucide-react';
import { INTEREST_RATES } from '../data';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'loan' | 'saving'>('loan');

  // --- Loan Calculator States ---
  const [loanAmount, setLoanAmount] = useState<number>(500000000); // 500 million VND
  const [loanTerm, setLoanTerm] = useState<number>(60); // 60 months (5 years)
  const [loanRate, setLoanRate] = useState<number>(5.5); // 5.5% per year
  const [loanMethod, setLoanMethod] = useState<'reducing' | 'flat'>('reducing'); // Reducing balance vs Flat
  const [loanSchedule, setLoanSchedule] = useState<{ month: number; payment: number; principal: number; interest: number; balance: number }[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  // --- Saving Calculator States ---
  const [savingAmount, setSavingAmount] = useState<number>(100000000); // 100 million VND
  const [savingTerm, setSavingTerm] = useState<number>(12); // 12 months
  const [savingRate, setSavingRate] = useState<number>(5.5); // 5.5% per year
  const [savingResult, setSavingResult] = useState<{ interest: number; total: number }>({ interest: 0, total: 0 });

  // Map Term to interest rates based on iPay rates
  const mapTermToRate = (months: number): number => {
    if (months <= 2) return 3.4;
    if (months <= 5) return 3.8;
    if (months <= 11) return 4.8;
    if (months <= 17) return 5.5;
    return 6.0;
  };

  // Update saving rate when term changes
  useEffect(() => {
    setSavingRate(mapTermToRate(savingTerm));
  }, [savingTerm]);

  // Loan Calculation Trigger
  useEffect(() => {
    const monthlyRate = (loanRate / 100) / 12;
    let schedule = [];
    let totalInt = 0;
    let firstMonthPay = 0;

    if (loanMethod === 'reducing') {
      // Amortized (Dư nợ giảm dần)
      let remainingBalance = loanAmount;
      const fixedPrincipal = loanAmount / loanTerm;

      for (let m = 1; m <= loanTerm; m++) {
        const interest = remainingBalance * monthlyRate;
        const payment = fixedPrincipal + interest;
        remainingBalance -= fixedPrincipal;
        totalInt += interest;

        if (m === 1) firstMonthPay = payment;

        if (m <= 12 || m === loanTerm) {
          schedule.push({
            month: m,
            payment: Math.round(payment),
            principal: Math.round(fixedPrincipal),
            interest: Math.round(interest),
            balance: Math.max(0, Math.round(remainingBalance))
          });
        }
      }
      setMonthlyPayment(Math.round(firstMonthPay)); // Show first month as representative max
    } else {
      // Flat (Niên kim cố định / gốc đều, lãi đều)
      const monthlyPrincipal = loanAmount / loanTerm;
      const monthlyInterest = loanAmount * monthlyRate;
      const payment = monthlyPrincipal + monthlyInterest;
      totalInt = monthlyInterest * loanTerm;
      firstMonthPay = payment;

      for (let m = 1; m <= loanTerm; m++) {
        schedule.push({
          month: m,
          payment: Math.round(payment),
          principal: Math.round(monthlyPrincipal),
          interest: Math.round(monthlyInterest),
          balance: Math.round(loanAmount - m * monthlyPrincipal)
        });
      }
      setMonthlyPayment(Math.round(payment));
    }

    setLoanSchedule(schedule.slice(0, 6)); // Display first 6 months
    setTotalInterest(Math.round(totalInt));
  }, [loanAmount, loanTerm, loanRate, loanMethod]);

  // Saving Calculation Trigger
  useEffect(() => {
    const interest = savingAmount * (savingRate / 100) * (savingTerm / 12);
    setSavingResult({
      interest: Math.round(interest),
      total: Math.round(savingAmount + interest)
    });
  }, [savingAmount, savingTerm, savingRate]);

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <section id="calculators" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest font-mono">Công cụ tài chính</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-2 tracking-tight">
            Tính Toán Khoản Vay & Tích Lũy
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Ước tính dòng tiền minh bạch, nhanh chóng giúp bạn chủ động lập kế hoạch tài chính cá nhân hoặc doanh nghiệp tại Bến Lức.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-200/60 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('loan')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'loan' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="h-4 w-4 text-blue-600" />
              <span>Tính Toán Khoản Vay</span>
            </button>
            <button
              onClick={() => setActiveTab('saving')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'saving' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Ước Tính Tiết Kiệm</span>
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 max-w-5xl mx-auto">
          {activeTab === 'loan' ? (
            /* --- LOAN CALCULATOR --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Inputs Form */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-800">Số tiền muốn vay:</label>
                    <span className="text-base font-extrabold text-blue-600 font-mono">
                      {formatVND(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000000}
                    max={5000000000}
                    step={10000000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-1">
                    <span>10 TRIỆU ĐỒNG</span>
                    <span>5 TỶ ĐỒNG</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-800">Thời hạn vay (tháng):</label>
                      <span className="text-sm font-extrabold text-slate-800 font-mono">{loanTerm} tháng</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={240}
                      step={6}
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-1">
                      <span>6 THÁNG</span>
                      <span>20 NĂM</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-800">Lãi suất (% / năm):</label>
                      <span className="text-sm font-extrabold text-slate-800 font-mono">{loanRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={15}
                      step={0.1}
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-1">
                      <span>ƯU ĐÃI DN: 5.0%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-3">Phương pháp tính lãi:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setLoanMethod('reducing')}
                      className={`p-4 rounded-xl text-left border text-sm cursor-pointer transition-all ${
                        loanMethod === 'reducing'
                          ? 'border-blue-500 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <p className="font-bold">Lãi giảm dần (Niên kim)</p>
                      <p className="text-[11px] text-slate-500 mt-1">Tiền lãi giảm dần theo số nợ gốc thực tế còn lại.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanMethod('flat')}
                      className={`p-4 rounded-xl text-left border text-sm cursor-pointer transition-all ${
                        loanMethod === 'flat'
                          ? 'border-blue-500 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <p className="font-bold">Gốc & Lãi chia đều</p>
                      <p className="text-[11px] text-slate-500 mt-1">Tổng tiền gốc và lãi được chia đều hàng tháng cố định.</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculations Result */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-md">
                <div className="space-y-6">
                  <h4 className="text-sm uppercase tracking-wider font-semibold font-mono text-blue-300">Kết quả tạm tính</h4>
                  
                  <div>
                    <p className="text-xs text-blue-200">
                      {loanMethod === 'reducing' ? 'Tháng trả gốc + lãi đầu tiên (Cao nhất):' : 'Số tiền đóng cố định mỗi tháng:'}
                    </p>
                    <p className="text-3xl font-sans font-black text-amber-300 mt-1.5 font-mono">
                      {formatVND(monthlyPayment)}
                    </p>
                  </div>

                  <div className="space-y-3.5 border-t border-white/10 pt-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Tổng gốc cần trả:</span>
                      <span className="font-bold font-mono">{formatVND(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Tổng tiền lãi:</span>
                      <span className="font-bold font-mono text-amber-200">{formatVND(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Tổng gốc + lãi:</span>
                      <span className="font-bold font-mono text-white">{formatVND(loanAmount + totalInterest)}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated schedule text */}
                <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-blue-200 leading-relaxed">
                  💡 *Kết quả trên mang tính chất tham khảo. Lãi suất thực tế tại thời điểm giải ngân có thể thấp hơn tùy thuộc hồ sơ xếp hạng tín dụng doanh nghiệp hoặc cá nhân. Vui lòng liên hệ riêng với chị Cẩm Tú để nhận tư vấn giảm lãi suất kịch sàn.*
                </div>
              </div>
            </div>
          ) : (
            /* --- SAVING CALCULATOR --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Inputs Form */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-800">Số tiền gửi tiết kiệm:</label>
                    <span className="text-base font-extrabold text-emerald-600 font-mono">
                      {formatVND(savingAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000000}
                    max={2000000000}
                    step={10000000}
                    value={savingAmount}
                    onChange={(e) => setSavingAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-1">
                    <span>10 TRIỆU ĐỒNG</span>
                    <span>2 TỶ ĐỒNG</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-slate-800 block mb-2">Kỳ hạn gửi:</label>
                    <select
                      value={savingTerm}
                      onChange={(e) => setSavingTerm(Number(e.target.value))}
                      className="w-full p-3.5 border border-slate-200 rounded-xl bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value={1}>1 Tháng (3.4% / năm)</option>
                      <option value={3}>3 Tháng (3.8% / năm)</option>
                      <option value={6}>6 Tháng (4.8% / năm)</option>
                      <option value={12}>12 Tháng (5.5% / năm)</option>
                      <option value={24}>24 Tháng (6.0% / năm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-800 block mb-2">Lãi suất gửi trực tuyến iPay:</label>
                    <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 text-emerald-800 font-bold rounded-xl text-center text-base font-mono">
                      {savingRate}% / năm
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-amber-800 leading-relaxed">
                  📱 **Đặc quyền gửi Online qua iPay:** VietinBank Bến Lức áp dụng cộng thêm **+0.3% - +0.5%/năm** lãi suất thưởng cho mọi khách hàng thực hiện gửi trực tuyến qua ứng dụng iPay thay vì mở sổ giấy tại phòng giao dịch.
                </div>
              </div>

              {/* Calculations Result */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-md">
                <div className="space-y-6">
                  <h4 className="text-sm uppercase tracking-wider font-semibold font-mono text-emerald-300">Tiền lời nhận được</h4>
                  
                  <div>
                    <p className="text-xs text-emerald-200">Tiền lãi nhận cuối kỳ hạn:</p>
                    <p className="text-3xl font-sans font-black text-amber-300 mt-1.5 font-mono">
                      {formatVND(savingResult.interest)}
                    </p>
                  </div>

                  <div className="space-y-3.5 border-t border-white/10 pt-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Số tiền gốc ban đầu:</span>
                      <span className="font-bold font-mono">{formatVND(savingAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Tiền lãi sinh thêm:</span>
                      <span className="font-bold font-mono text-amber-200">{formatVND(savingResult.interest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Tổng số tiền nhận về:</span>
                      <span className="font-bold font-mono text-white">{formatVND(savingResult.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-emerald-100 leading-relaxed">
                  🔒 VietinBank là một trong những ngân hàng quốc doanh vững mạnh nhất, bảo đảm an toàn dòng vốn tiết kiệm tuyệt đối 100% trong mọi biến động thị trường.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
