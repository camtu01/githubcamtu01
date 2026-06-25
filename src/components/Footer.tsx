import { Landmark, Phone, Mail, MapPin, ShieldAlert, Award } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs sm:text-sm">
      {/* Top Banner with core stats */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center space-x-3">
              <div className="p-1 bg-white rounded-xl flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/thumb/3/37/Logo_VietinBank.svg/320px-Logo_VietinBank.svg.png"
                  alt="VietinBank"
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold font-sans">VietinBank CN Bến Lức</h4>
                <p className="text-[10px] text-blue-200">Cam kết an toàn - Đồng hành phát triển</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Phone className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold font-sans">Hotline Tư Vấn 24/7</h4>
                <p className="text-sm font-bold font-mono text-amber-300">0908.123.456</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Award className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h4 className="font-bold font-sans">Bảo Trợ Bởi Thống Đốc NHNN</h4>
                <p className="text-[10px] text-blue-200">Đơn vị xếp hạng tăng trưởng loại I tại Long An</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Company Brief */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/thumb/3/37/Logo_VietinBank.svg/320px-Logo_VietinBank.svg.png"
                  alt="VietinBank Logo"
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans font-bold text-base text-white tracking-tight">Chi Nhánh Bến Lức</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm text-xs sm:text-sm">
              Trang tin truyền thông sản phẩm tài chính và xếp lịch tư vấn trực tiếp của chị Nguyễn Thị Cẩm Tú - Phó Giám đốc VietinBank Chi nhánh Bến Lức. Chúng tôi tự hào đồng hành cùng sự phồn vinh của quê hương Long An.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Thông tin liên hệ</h4>
            <ul className="space-y-3 text-slate-500 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>Số 159, Quốc lộ 1A, Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <span>camtu.nguyen@vietinbank.vn</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Hotline: 0908.123.456 (Hỗ trợ khẩn cấp 24/7)</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Điều khoản & Pháp lý</h4>
            <div className="flex items-start space-x-2.5 text-slate-500">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Tất cả các con số lãi suất, tính toán biên độ nợ trong các bảng tính trên website mang tính chất tham khảo tại hệ thống iPay. Bản quyền nội dung và bảo mật thông tin thuộc về VietinBank Chi nhánh Bến Lức.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 font-mono uppercase font-semibold">
          <p>© {currentYear} VietinBank Bến Lức. Tất cả quyền được bảo lưu.</p>
          <p className="mt-2 sm:mt-0">Thiết kế chuyên nghiệp bởi VietinBank Tech Team</p>
        </div>
      </div>
    </footer>
  );
}
