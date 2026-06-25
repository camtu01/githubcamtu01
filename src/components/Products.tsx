import { useState } from 'react';
import { Briefcase, Home, PiggyBank, Smartphone, Crown, Check, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BANK_PRODUCTS } from '../data';
import { BankProduct } from '../types';

interface ProductsProps {
  onSelectProduct: (productTitle: string) => void;
}

const renderIcon = (name: string, className = 'h-6 w-6') => {
  switch (name) {
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'PiggyBank':
      return <PiggyBank className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Crown':
      return <Crown className={className} />;
    default:
      return <Briefcase className={className} />;
  }
};

export default function Products({ onSelectProduct }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'loan' | 'saving' | 'digital' | 'priority'>('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'Tất cả dịch vụ' },
    { value: 'loan', label: 'Gói vay vốn' },
    { value: 'saving', label: 'Tiết kiệm tích lũy' },
    { value: 'digital', label: 'Ngân hàng số iPay' },
    { value: 'priority', label: 'Khách hàng VIP' },
  ] as const;

  const filteredProducts = BANK_PRODUCTS.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  const handleBooking = (product: BankProduct) => {
    onSelectProduct(product.title);
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest font-mono">Danh mục dịch vụ</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-2 tracking-tight">
            Giải Pháp Tài Chính May Đo Chuyên Biệt
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Tuyển chọn các sản phẩm ngân hàng đột phá, lãi suất cạnh tranh nhất được cá nhân hóa bởi chị Nguyễn Thị Cẩm Tú tại VietinBank Bến Lức.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-50 p-1.5 rounded-xl max-w-3xl mx-auto border border-slate-150">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                setExpandedProduct(null);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isExpanded = expandedProduct === product.id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  {/* Decorative Color Bar */}
                  <div className={`h-2 bg-gradient-to-r ${product.highlightColor}`} />
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Icon & Category Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 bg-gradient-to-br ${product.highlightColor} text-white rounded-xl shadow-md`}>
                          {renderIcon(product.iconName)}
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest bg-blue-50 text-blue-700 font-extrabold px-2.5 py-1 rounded-full">
                          {product.category === 'loan' ? 'Tín dụng' : product.category === 'saving' ? 'Tiết kiệm' : product.category === 'digital' ? 'Ngân hàng số' : 'Đặc quyền VIP'}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {product.shortDescription}
                      </p>

                      {/* Key Features Block */}
                      <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-100 mb-6">
                        {product.features.map((feat, idx) => (
                          <div key={idx} className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{feat.label}</p>
                            <p className="text-xs font-bold text-slate-800 mt-1 font-mono">{feat.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 border-t border-slate-200/60 pt-4 mb-6 overflow-hidden"
                        >
                          <p className="text-xs text-slate-600 leading-relaxed italic">
                            {product.description}
                          </p>
                          <div>
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1">
                              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                              <span>Quyền lợi nổi bật:</span>
                            </p>
                            <ul className="space-y-2">
                              {product.benefits.map((benefit, bIdx) => (
                                <li key={bIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between space-x-3">
                      <button
                        onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                        className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {isExpanded ? 'Thu gọn chi tiết' : 'Xem thêm lợi ích'}
                      </button>

                      <button
                        onClick={() => handleBooking(product)}
                        className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${product.highlightColor} shadow-md shadow-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer`}
                      >
                        <span>Nhận tư vấn</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
