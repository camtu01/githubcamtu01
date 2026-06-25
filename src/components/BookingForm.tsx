import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, CheckCircle, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { BANK_PRODUCTS } from '../data';

interface BookingFormProps {
  selectedProduct: string;
  onBookingSuccess: () => void;
}

export default function BookingForm({ selectedProduct, onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productInterest: '',
    appointmentDate: '',
    preferredTime: '09:00',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync selected product when it changes from the product section click
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, productInterest: selectedProduct }));
    } else {
      setFormData((prev) => ({ ...prev, productInterest: 'Vay Kinh Doanh' }));
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.productInterest) {
      setSubmitError('Vui lòng điền đầy đủ các thông tin bắt buộc (*).');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Đăng ký không thành công. Vui lòng thử lại.');
      }

      setIsSubmitted(true);
      onBookingSuccess(); // Notify parent so admin list updates if open
      
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        productInterest: 'Vay Kinh Doanh',
        appointmentDate: '',
        preferredTime: '09:00',
        note: '',
      });
    } catch (error: any) {
      console.error('Submit booking error:', error);
      setSubmitError(error.message || 'Lỗi kết nối mạng. Quý khách vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#0054a6_1px,transparent_1px),linear-gradient(to_bottom,#0054a6_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[150px] opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left instructions / context */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 inline-block">
              Hệ thống đặt hẹn bảo mật
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight">
              Đăng Ký Làm Việc Trực Tiếp Cùng Ban Giám Đốc
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mọi thông tin đăng ký của Quý khách đều được mã hóa bảo mật tuyệt đối 100% và chuyển trực tiếp đến hệ thống xếp lịch ưu tiên của Phó Giám đốc Nguyễn Thị Cẩm Tú.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Phục vụ ưu tiên:</strong> Tư vấn bảo mật tối đa 1-1, tránh xếp hàng chờ đợi tại quầy giao dịch.</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Phê duyệt nhanh:</strong> Nhận thẩm định hồ sơ sơ bộ và cam kết giải quyết vốn nhanh trong 24h.</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Bảo mật thông tin:</strong> Tuân thủ khắt khe pháp luật bảo mật dữ liệu khách hàng ngân hàng.</span>
              </div>
            </div>

            <div className="bg-blue-950/40 border border-blue-800/40 p-4 rounded-2xl flex items-center space-x-3 mt-8">
              <Clock className="h-5 w-5 text-blue-400" />
              <p className="text-xs text-blue-200">
                **Thời gian làm việc:** Thứ 2 đến Thứ 6 (07:30 - 11:30 và 13:00 - 17:00).
              </p>
            </div>
          </div>

          {/* Right form / success state */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              /* --- SUCCESS STATE --- */
              <div className="bg-slate-800/90 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md animate-fadeIn">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-sans text-white">Đăng Ký Thành Công!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Hệ thống đặt lịch đã ghi nhận yêu cầu tư vấn của Quý khách. Chị Nguyễn Thị Cẩm Tú cùng trợ lý chuyên trách VIP sẽ gọi điện trực tiếp hỗ trợ Anh/Chị trong vòng tối đa **15 phút**.
                  </p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-2xl text-left border border-slate-700/50 text-xs space-y-2.5 max-w-md mx-auto font-sans text-slate-300">
                  <p>👤 <strong>Người nhận lịch:</strong> Ban Giám đốc & Team VIP VietinBank Bến Lức</p>
                  <p>📞 <strong>SĐT phản hồi:</strong> Tổng đài nhánh chi nhánh hoặc Hotline 0908.123.456</p>
                  <p>📍 <strong>Địa điểm giao dịch ưu tiên:</strong> Phòng khách hàng VIP - Chi nhánh Bến Lức</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
                >
                  Gửi yêu cầu mới
                </button>
              </div>
            ) : (
              /* --- BOOKING FORM --- */
              <form
                id="consultation-form"
                onSubmit={handleSubmit}
                className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md"
              >
                <h3 className="text-xl font-bold font-sans text-white flex items-center space-x-2 border-b border-slate-700/50 pb-4">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <span>Điền Phiếu Hẹn Tư Vấn 1-1</span>
                </h3>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center space-x-1">
                      <span>Họ và tên Quý khách *</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                      Số điện thoại liên hệ *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="09xx xxx xxx"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                      Email (không bắt buộc)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="partner@domain.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                      Sản phẩm / Dịch vụ quan tâm *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                      <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="Vay Kinh Doanh">Gói vay vốn sản xuất kinh doanh (5.0%)</option>
                        <option value="Vay Mua Nhà">Cho vay mua nhà tổ ấm (5.8%)</option>
                        <option value="Tiết Kiệm iPay">Gửi tiết kiệm trực tuyến tích lũy (6.0%)</option>
                        <option value="Hệ Sinh Thái iPay">Đăng ký Tài khoản số đẹp, Alias iPay</option>
                        <option value="Khách Hàng Ưu Tiên">Đặc quyền Khách hàng VIP Signature</option>
                        <option value="Khác">Tư vấn tài chính tổng hợp khác</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                      Ngày muốn đặt lịch làm việc
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                      Khung giờ làm việc ưu tiên
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="08:00 - 09:30">Sáng: 08:00 - 09:30</option>
                        <option value="09:30 - 11:00">Sáng: 09:30 - 11:00</option>
                        <option value="13:30 - 15:00">Chiều: 13:30 - 15:00</option>
                        <option value="15:00 - 16:30">Chiều: 15:00 - 16:30</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                    Nhu cầu tài chính chi tiết (ví dụ: Vay 2 tỷ kinh doanh, gửi tiết kiệm sổ 500tr...)
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Quý khách vui lòng tóm tắt nhu cầu để ban tư vấn chuẩn bị hồ sơ chuyên nghiệp trước khi gọi lại..."
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-[1.01]"
                  >
                    {isSubmitting ? 'ĐANG GỬI THÔNG TIN...' : 'GỬI ĐĂNG KÝ BẢO MẬT NGAY'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
