import { Award, Briefcase, GraduationCap, MapPin, CheckCircle, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_INFO, BEN_LUC_BRANCH_INFO } from '../data';

export default function AboutMe() {
  return (
    <section id="intro" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest font-mono">Người dẫn dắt tài chính</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-2 tracking-tight">
            Chân Dung Người Đồng Hành Tin Cậy
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left - Personal Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full" />
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 mb-4">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <span>Hành Trình Sự Nghiệp</span>
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-blue-500 mt-0.5 shrink-0" />
                  <span><strong>2020 - Nay:</strong> Phó Giám đốc VietinBank Chi nhánh Bến Lức.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-blue-500 mt-0.5 shrink-0" />
                  <span><strong>2015 - 2020:</strong> Trưởng phòng Khách hàng Doanh nghiệp vừa & nhỏ (SME) - VietinBank Long An.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-blue-500 mt-0.5 shrink-0" />
                  <span><strong>2011 - 2015:</strong> Chuyên viên Quản lý rủi ro Tín dụng cấp cao tại Hội sở phía Nam.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 mb-4">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <span>Nền Tảng Đào Tạo</span>
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>🎓 <strong>Thạc sĩ Tài chính - Ngân hàng:</strong> Đại học Kinh tế TP.HCM (UEH).</p>
                <p>📜 <strong>Chứng chỉ Thẩm định FDI chuyên sâu:</strong> Hiệp hội Ngân hàng Châu Á.</p>
                <p>🗣️ <strong>Ngôn ngữ:</strong> Tiếng Việt (Bản ngữ), Tiếng Anh (Chuyên ngành Tài chính).</p>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-2xl text-white shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-bold">Thành Tích & Đóng Góp</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-blue-100">
                {PROFILE_INFO.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-2.5">
                    <span className="text-amber-400 font-bold shrink-0">★</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Detailed bio narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
              Sứ mệnh khơi thông dòng vốn phát triển tại Bến Lức
            </h3>
            
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              {PROFILE_INFO.bio.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 flex items-start space-x-4 mt-6">
              <MapPin className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Văn phòng làm việc & Trụ sở giao dịch chính:</h4>
                <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                  {PROFILE_INFO.address}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  (Địa thế đắc địa ngay trung tâm Bến Lức, dễ dàng di chuyển từ Quốc lộ 1A và các KCN lân cận)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VietinBank Ben Luc Branch Intro Block */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/5 rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Building2 className="h-6 w-6" />
                <span className="font-bold uppercase tracking-wider text-sm font-mono">Vị thế Chi nhánh</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-sans leading-tight">
                {BEN_LUC_BRANCH_INFO.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Đòn bẩy tài chính chiến lược cho trục đô thị - công nghiệp năng động nhất của tỉnh Long An.
              </p>
            </div>
            
            <div className="lg:col-span-8 lg:border-l lg:border-slate-100 lg:pl-8 space-y-6">
              <p className="text-slate-600 text-sm leading-relaxed">
                {BEN_LUC_BRANCH_INFO.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BEN_LUC_BRANCH_INFO.values.map((val, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold font-mono">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">{val.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
