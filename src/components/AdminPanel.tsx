import React, { useState, useEffect } from 'react';
import { ShieldAlert, LogIn, CheckCircle, Clock, Trash2, Search, Filter, RefreshCw, PhoneCall, Download } from 'lucide-react';
import { ConsultationBooking } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  refreshTrigger: number;
}

export default function AdminPanel({ onClose, refreshTrigger }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'resolved'>('all');

  const correctPassword = 'camtu123'; // Simple simulation credentials

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setErrorMsg('');
      fetchBookings();
    } else {
      setErrorMsg('Mật mã quản trị viên không chính xác. Vui lòng thử lại.');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings?password=${correctPassword}`);
      if (!response.ok) {
        throw new Error('Không thể đồng bộ dữ liệu lịch hẹn.');
      }
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-sync when a new booking is registered
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [refreshTrigger, isAuthenticated]);

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'resolved') => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': correctPassword,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Anh/Chị chắc chắn muốn xóa hồ sơ đặt hẹn này?')) {
      try {
        const response = await fetch(`/api/bookings/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': correctPassword,
          }
        });
        if (response.ok) {
          fetchBookings();
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleExportSimulate = () => {
    alert('📊 Hệ thống đang khởi tạo file báo cáo Excel (CSV)...\nTải xuống danh sách ' + filteredBookings.length + ' lịch hẹn thành công!');
  };

  // Filter and search bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      (b.productInterest && b.productInterest.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.note && b.note.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ liên hệ';
      case 'contacted':
        return 'Đang xử lý';
      case 'resolved':
        return 'Đã hoàn tất';
      default:
        return status;
    }
  };

  return (
    <section id="admin-workspace" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-5 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              Góc Nghiệp Vụ - Mrs. Cẩm Tú
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
              Hệ Thống Quản Lý Đăng Ký Tư Vấn
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-4 md:mt-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Quay lại trang chính
          </button>
        </div>

        {!isAuthenticated ? (
          /* --- LOGIN FORM --- */
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Xác Minh Danh Tính Trưởng Đơn Vị</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Để xem thông tin liên lạc và bảo mật của khách hàng, vui lòng nhập mã bảo mật Ban Giám đốc VietinBank Bến Lức.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && <p className="text-xs text-red-400 text-center font-semibold">{errorMsg}</p>}
              
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-bold">Mật mã quản trị viên:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mã bảo mật (Thử: camtu123)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Xác minh Đăng nhập</span>
              </button>
            </form>
          </div>
        ) : (
          /* --- ADMIN DASHBOARD --- */
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase">Tổng đăng ký</p>
                <p className="text-2xl font-mono font-black text-white mt-1">{bookings.length}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                <p className="text-xs text-amber-400 font-semibold uppercase">Chờ xử lý</p>
                <p className="text-2xl font-mono font-black text-amber-400 mt-1">
                  {bookings.filter((b) => b.status === 'pending').length}
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                <p className="text-xs text-blue-400 font-semibold uppercase">Đang liên hệ</p>
                <p className="text-2xl font-mono font-black text-blue-400 mt-1">
                  {bookings.filter((b) => b.status === 'contacted').length}
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                <p className="text-xs text-emerald-400 font-semibold uppercase">Đã hoàn tất</p>
                <p className="text-2xl font-mono font-black text-emerald-400 mt-1">
                  {bookings.filter((b) => b.status === 'resolved').length}
                </p>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm họ tên, số điện thoại, nhu cầu..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === 'pending' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Chờ liên hệ
                </button>
                <button
                  onClick={() => setStatusFilter('contacted')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === 'contacted' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Đang xử lý
                </button>
                <button
                  onClick={() => setStatusFilter('resolved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    statusFilter === 'resolved' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Đã hoàn tất
                </button>
              </div>

              {/* Refresh / Export */}
              <div className="flex space-x-2 w-full md:w-auto justify-end">
                <button
                  onClick={fetchBookings}
                  className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  title="Tải lại danh sách"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={handleExportSimulate}
                  className="flex items-center space-x-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Xuất báo cáo Excel</span>
                </button>
              </div>
            </div>

            {/* List Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              {loading ? (
                <div className="p-10 text-center text-slate-400 flex flex-col items-center space-y-2">
                  <RefreshCw className="h-6 w-6 animate-spin text-amber-400" />
                  <p className="text-xs font-medium">Đang đồng bộ cơ sở dữ liệu lịch hẹn...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  🗄️ Chưa có yêu cầu đăng ký tư vấn nào khớp với bộ lọc tìm kiếm.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-4">Khách hàng</th>
                        <th className="p-4">Dịch vụ quan tâm</th>
                        <th className="p-4">Lịch hẹn mong muốn</th>
                        <th className="p-4">Ghi chú nhu cầu</th>
                        <th className="p-4">Trạng thái</th>
                        <th className="p-4 text-right">Thao tác nghiệp vụ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{b.customerName}</div>
                            <div className="text-slate-400 mt-1 font-semibold flex items-center space-x-1 font-mono">
                              <PhoneCall className="h-3 w-3 text-slate-500" />
                              <span>{b.phone}</span>
                            </div>
                            {b.email && <div className="text-[10px] text-slate-500 mt-0.5">{b.email}</div>}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-300">{b.productInterest}</span>
                          </td>
                          <td className="p-4">
                            {b.appointmentDate ? (
                              <div className="space-y-0.5">
                                <div className="font-semibold text-slate-300 font-mono">{b.appointmentDate}</div>
                                <div className="text-[10px] text-slate-500 font-bold">{b.preferredTime}</div>
                              </div>
                            ) : (
                              <span className="text-slate-500 italic">Khách muốn gọi lại ngay</span>
                            )}
                          </td>
                          <td className="p-4 max-w-xs">
                            <p className="text-slate-400 leading-relaxed line-clamp-2" title={b.note}>
                              {b.note || <span className="text-slate-600 italic">Không có ghi chú</span>}
                            </p>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase font-mono ${getStatusBadgeClass(b.status)}`}>
                              {translateStatus(b.status)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end items-center space-x-2">
                              {/* Action buttons to update status */}
                              {b.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'contacted')}
                                  className="px-2.5 py-1 bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white rounded text-[10px] font-bold transition-all cursor-pointer"
                                >
                                  Đã liên hệ
                                </button>
                              )}
                              {b.status === 'contacted' && (
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'resolved')}
                                  className="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold transition-all cursor-pointer"
                                >
                                  Hoàn tất
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleDelete(b.id)}
                                className="p-1.5 text-slate-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                                title="Xóa lịch hẹn"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
