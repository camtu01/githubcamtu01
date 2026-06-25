import { Phone, Calendar, ArrowDown, Award, Sparkles, Building, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_INFO } from '../data';

interface HeroProps {
  onActionClick: (sectionId: string) => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-20 overflow-hidden"
    >
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0054a6_1px,transparent_1px),linear-gradient(to_bottom,#0054a6_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-[120px] opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Phục vụ Tận tâm - Uy tín dẫn đầu</span>
            </motion.div>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-amber-400 font-mono text-sm tracking-widest uppercase font-semibold"
              >
                Chào mừng Quý khách đến với trang cá nhân
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight"
              >
                <span className="block text-white">Nguyễn Thị Cẩm Tú</span>
                <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent mt-2">
                  Phó Giám đốc VietinBank
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-300 font-medium border-l-4 border-red-500 pl-4 py-1"
              >
                {PROFILE_INFO.company}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans"
            >
              "{PROFILE_INFO.philosophy}"
            </motion.p>

            {/* Core Badges / CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="hero-book-now-btn"
                onClick={() => onActionClick('#booking')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all text-base cursor-pointer transform hover:-translate-y-0.5"
              >
                <Calendar className="h-5 w-5" />
                <span>Đặt lịch tư vấn trực tiếp</span>
              </button>
              
              <button
                id="hero-products-btn"
                onClick={() => onActionClick('#products')}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all text-base cursor-pointer"
              >
                <span>Khám phá sản phẩm</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Quick stats banner in Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-800"
            >
              {PROFILE_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-3xl font-extrabold text-blue-400 font-sans">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - CSS-crafted Executive Bio Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-sm"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-red-500 rounded-3xl opacity-10 blur-xl animate-pulse" />
              
              {/* Profile container */}
              <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-950/90 border border-slate-700/60 rounded-3xl p-6 shadow-2xl overflow-hidden backdrop-blur-lg">
                {/* Bank badge watermark */}
                <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Building className="h-3 w-3" />
                  <span>VietinBank CN Bến Lức</span>
                </div>

                {/* Professional Avatar Graphics */}
                <div className="h-72 w-full bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl relative overflow-hidden flex flex-col items-center justify-end border border-blue-800/50">
                  {/* Styled avatar vector representing a female banking leader */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Building className="h-48 w-48 text-white" />
                  </div>
                  
                  {/* Portrait Image */}
                  <div className="w-48 h-48 rounded-full border-2 border-amber-400/80 relative flex items-center justify-center overflow-hidden mb-6 shadow-xl bg-slate-800">
                    <img
                      src="https://i.ibb.co/pBDSvkwP/Ms-Cam-Tu99469.jpg"
                      alt="Nguyễn Thị Cẩm Tú"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <Award className="h-8 w-8 text-amber-400 absolute bottom-2 right-2 z-20 drop-shadow-md" />
                  </div>
                  
                  {/* Floating badge for Mrs. Tú */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-2 rounded-xl flex items-center space-x-2.5 shadow-lg">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-200">Trực tuyến tư vấn ngay</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">Nguyễn Thị Cẩm Tú</h3>
                    <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mt-1">Phó Giám đốc Chi nhánh</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Tận tâm - Chuyên nghiệp là chìa khóa tháo gỡ mọi rào cản tài chính của khách hàng doanh nghiệp và cá nhân."
                  </p>

                  <div className="space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kinh nghiệm:</span>
                      <span className="font-semibold text-white">Hơn 15 năm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Văn phòng chính:</span>
                      <span className="font-semibold text-white">Quốc lộ 1A, TT Bến Lức</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Chuyên môn sâu:</span>
                      <span className="font-semibold text-amber-300">Tài trợ DN sản xuất & FDI</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer text-slate-400 hover:text-white transition-colors" onClick={() => onActionClick('#intro')}>
          <span className="text-xs font-mono tracking-widest uppercase">Cuộn để khám phá</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
