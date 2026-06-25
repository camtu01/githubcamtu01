import { BankProduct } from './types';

export const PROFILE_INFO = {
  fullName: 'Nguyễn Thị Cẩm Tú',
  title: 'Phó Giám đốc Chi nhánh',
  company: 'VietinBank Chi nhánh Bến Lức',
  email: 'camtu.nguyen@vietinbank.vn',
  phone: '0908.123.456', // Simulated professional hotline representing the branch team
  address: 'Số 159`, Quốc lộ 1A, Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An',
  philosophy: 'Đồng hành cùng khách hàng, kiến tạo các giải pháp tài chính tối ưu, bền vững cho doanh nghiệp và gia đình tại Bến Lức, Long An.',
  bio: [
    'Với hơn 15 năm kinh nghiệm trong ngành Tài chính - Ngân hàng, tôi tự hào là người đồng hành sát cánh cùng các doanh nghiệp, hộ kinh doanh và khách hàng cá nhân tại khu vực Bến Lức và Long An.',
    'Trên cương vị Phó Giám đốc VietinBank Chi nhánh Bến Lức, tôi và đội ngũ cán bộ luôn nỗ lực tối đa để mang đến những sản phẩm, dịch vụ tài chính chất lượng vượt trội: từ dòng vốn kinh doanh ưu đãi cho doanh nghiệp sản xuất, đến các gói vay mua nhà, tích lũy thông minh và các dịch vụ ngân hàng số tiên tiến nhất.',
    'Phương châm làm việc của tôi là Chuyên nghiệp - Tận tâm - Minh bạch - Kịp thời, luôn lấy sự thành công và phát triển thịnh vượng của khách hàng làm thước đo giá trị.'
  ],
  stats: [
    { label: 'Năm kinh nghiệm', value: '15+' },
    { label: 'Khách hàng đồng hành', value: '5,000+' },
    { label: 'Doanh nghiệp FDI & SMEs', value: '350+' },
    { label: 'Dư nợ & Huy động (tỷ)', value: '4,500+' }
  ],
  achievements: [
    'Giải thưởng "Cán bộ quản lý xuất sắc nhất hệ thống VietinBank" năm 2024.',
    'Bằng khen của Thống đốc Ngân hàng Nhà nước Việt Nam về đóng góp xuất sắc trong phát triển tín dụng nông nghiệp nông thôn.',
    'Dẫn dắt Chi nhánh Bến Lức đạt danh hiệu Chi nhánh dẫn đầu tăng trưởng khối FDI & Sản xuất kinh doanh tại Long An.'
  ]
};

export const BANK_PRODUCTS: BankProduct[] = [
  {
    id: 'loan-business',
    title: 'Gói Vay Sản Xuất Kinh Doanh Ưu Đãi',
    shortDescription: 'Cung cấp nguồn vốn lưu động kịp thời, lãi suất cực ưu đãi cho doanh nghiệp sản xuất, hộ kinh doanh tại Bến Lức.',
    description: 'Bến Lức là trung tâm công nghiệp trọng điểm của Long An. Hiểu rõ chu kỳ luân chuyển vốn của các doanh nghiệp và hộ kinh doanh, VietinBank thiết kế gói vay sản xuất kinh doanh ưu đãi với thủ tục phê duyệt siêu tốc.',
    category: 'loan',
    benefits: [
      'Lãi suất vay cực kỳ cạnh tranh chỉ từ 5.0% - 5.5%/năm',
      'Hạn mức cho vay linh hoạt lên tới 85% nhu cầu vốn thực tế',
      'Thời gian giải ngân cực nhanh trong vòng 24h - 48h làm việc',
      'Chấp thuận tài sản thế chấp đa dạng: Nhà đất, nhà xưởng, máy móc thiết bị, quyền tài sản',
      'Phương thức trả nợ linh hoạt phù hợp với dòng tiền kinh doanh của doanh nghiệp'
    ],
    features: [
      { label: 'Lãi suất chỉ từ', value: '5.0%/năm' },
      { label: 'Thời hạn vay', value: 'Tối đa 120 tháng' },
      { label: 'Hạn mức tài trợ', value: 'Lên tới 85%' }
    ],
    highlightColor: 'from-blue-600 to-indigo-600',
    iconName: 'Briefcase'
  },
  {
    id: 'loan-home',
    title: 'Vay Mua Nhà Đất - Xây Dựng Tổ Ấm',
    shortDescription: 'Hỗ trợ tài chính vượt trội giúp bạn nhanh chóng sở hữu căn nhà mơ ước với lãi suất cố định dài hạn.',
    description: 'Giải pháp tài chính tối ưu cho các gia đình trẻ và cán bộ công nhân viên tại các khu công nghiệp Bến Lức mua căn hộ, đất nền hoặc xây dựng, sửa chữa nhà ở.',
    category: 'loan',
    benefits: [
      'Lãi suất cố định ưu đãi từ 5.8%/năm',
      'Thời gian cho vay kéo dài lên tới 35 năm giúp giảm áp lực trả nợ hàng tháng',
      'Hỗ trợ vay tới 80% giá trị tài sản bảo đảm',
      'Ân hạn gốc lên tới 24 tháng đầu tiên',
      'Thủ tục đơn giản, hỗ trợ đánh giá tài sản nhanh chóng miễn phí'
    ],
    features: [
      { label: 'Lãi suất ưu đãi', value: '5.8%/năm' },
      { label: 'Thời gian vay', value: 'Tối đa 35 năm' },
      { label: 'Tỷ lệ tài trợ', value: 'Lên tới 80%' }
    ],
    highlightColor: 'from-cyan-600 to-blue-600',
    iconName: 'Home'
  },
  {
    id: 'saving-online',
    title: 'Tiền Gửi Tiết Kiệm Tích Lũy iPay',
    shortDescription: 'Gửi tiền online an toàn tuyệt đối qua app iPay, cộng thêm lãi suất khuyến khích cao hơn quầy.',
    description: 'Kênh đầu tư an toàn sinh lời tối ưu cho khoản vốn nhàn rỗi của cá nhân và gia đình. Giao dịch trực tuyến qua VietinBank iPay mọi lúc mọi nơi mà không cần xếp hàng tại quầy.',
    category: 'saving',
    benefits: [
      'Cộng thêm lãi suất ưu đãi lên tới +0.3% - +0.5%/năm so với gửi tại quầy',
      'Kỳ hạn linh hoạt từ 1 - 36 tháng tùy theo kế hoạch tài chính của bạn',
      'Giao dịch an toàn bảo mật tuyệt đối với Smart OTP',
      'Sử dụng sổ tiết kiệm online để cầm cố vay vốn nhanh khi cần gấp',
      'Rút gốc linh hoạt một phần trước hạn vẫn bảo toàn lãi suất tối đa'
    ],
    features: [
      { label: 'Lãi suất gửi tới', value: '6.0%/năm' },
      { label: 'Lãi suất cộng thêm', value: 'Lên tới +0.3%' },
      { label: 'Số tiền tối thiểu', value: 'Chỉ từ 1,000,000đ' }
    ],
    highlightColor: 'from-emerald-600 to-teal-600',
    iconName: 'PiggyBank'
  },
  {
    id: 'digital-ipay',
    title: 'Hệ Sinh Thái Số VietinBank iPay',
    shortDescription: 'Ứng dụng ngân hàng số vạn năng, miễn phí chuyển tiền trọn đời, mở tài khoản Alias siêu độc đáo.',
    description: 'Chuyển đổi số toàn diện cùng VietinBank iPay. Tận hưởng thế giới tiện ích số từ thanh toán không tiền mặt, đặt vé máy bay, phòng khách sạn, taxi đến mở tài khoản số đẹp.',
    category: 'digital',
    benefits: [
      'Miễn phí toàn bộ giao dịch chuyển tiền trong và ngoài hệ thống 24/7',
      'Mở tài khoản bằng định danh trực tuyến eKYC trong vòng 2 phút',
      'Đặc quyền đặt tên tài khoản riêng biệt bằng Nickname/Alias mang đậm chất cá nhân',
      'Thanh toán tự động hóa đơn điện, nước, internet, học phí tiện lợi',
      'Hệ thống bảo mật sinh trắc học FacePay tiên tiến bảo vệ tài khoản'
    ],
    features: [
      { label: 'Phí chuyển tiền', value: 'Miễn phí trọn đời' },
      { label: 'Mở TK trực tuyến', value: 'Chỉ trong 2 phút' },
      { label: 'Tính năng nổi bật', value: 'Đặt biệt danh Alias' }
    ],
    highlightColor: 'from-purple-600 to-indigo-600',
    iconName: 'Smartphone'
  },
  {
    id: 'priority-premium',
    title: 'Dịch Vụ Khách Hàng Ưu Tiên Premium',
    shortDescription: 'Đặc quyền chăm sóc dành riêng cho khách hàng VIP với sảnh chờ riêng biệt và tư vấn chuyên sâu.',
    description: 'Giải pháp quản lý tài sản đẳng cấp dành cho giới thượng lưu và chủ doanh nghiệp tại Bến Lức. Bạn được chăm sóc bởi các chuyên gia tài chính cao cấp dẫn dắt bởi Phó Giám đốc Chi nhánh.',
    category: 'priority',
    benefits: [
      'Không gian giao dịch riêng tư tại Quầy Ưu tiên / Phòng chờ VIP',
      'Đội ngũ Chuyên gia Tư vấn Tài chính cá nhân phục vụ riêng biệt',
      'Đặc quyền Thẻ tín dụng cao cấp Signature: Hoàn tiền tới 15% mọi chi tiêu',
      'Tặng gói phòng chờ thương gia tại các sân bay trong nước và quốc tế',
      'Chương trình ưu đãi lãi suất huy động và giảm sâu lãi suất cho vay chuyên biệt'
    ],
    features: [
      { label: 'Phòng chờ sân bay', value: 'Miễn phí không giới hạn' },
      { label: 'Dịch vụ chăm sóc', value: 'Chuyên gia riêng 24/7' },
      { label: 'Ưu đãi tỷ giá', value: 'Tốt nhất hệ thống' }
    ],
    highlightColor: 'from-amber-600 to-yellow-600',
    iconName: 'Crown'
  }
];

export const BEN_LUC_BRANCH_INFO = {
  title: 'Giới thiệu VietinBank Bến Lức',
  description: 'Thành lập nhằm đồng hành cùng sự bứt phá kinh tế của vùng động lực Bến Lức - Long An, VietinBank Chi nhánh Bến Lức là đơn vị tài chính uy tín, cung cấp toàn diện giải pháp tài chính cho các Tập đoàn, doanh nghiệp trong và ngoài nước tại các khu công nghiệp (KCN Thuận Đạo, KCN Vĩnh Lộc 2, KCN Phúc Long, KCN Phú An Thạnh...) cùng hàng chục ngàn hộ gia đình địa phương.',
  values: [
    { title: 'Tốc độ', text: 'Thủ tục xử lý hồ sơ nhanh chóng, tối giản quy trình hỗ trợ tối đa doanh nghiệp.' },
    { title: 'Địa phương', text: 'Hiểu sâu sắc đặc thù nông nghiệp, công nghiệp và thương mại của địa bàn Long An.' },
    { title: 'Sức mạnh', text: 'Hậu thuẫn bởi tiềm lực tài chính vững mạnh hàng đầu Việt Nam của ngân hàng quốc doanh VietinBank.' }
  ]
};
export const INTEREST_RATES = {
  savings: [
    { term: 'Không kỳ hạn', rate: '0.1% / năm' },
    { term: '1 - 2 Tháng', rate: '3.1% / năm (iPay: 3.4%)' },
    { term: '3 Tháng', rate: '3.5% / năm (iPay: 3.8%)' },
    { term: '6 - 9 Tháng', rate: '4.5% / năm (iPay: 4.8%)' },
    { term: '12 Tháng', rate: '5.2% / năm (iPay: 5.5%)' },
    { term: '18 - 36 Tháng', rate: '5.7% / năm (iPay: 6.0%)' }
  ],
  loans: [
    { type: 'Sản xuất kinh doanh', rate: 'Từ 5.0% / năm' },
    { type: 'Mua nhà đất thế chấp', rate: 'Từ 5.8% / năm' },
    { type: 'Mua ô tô tiêu dùng', rate: 'Từ 6.5% / năm' },
    { type: 'Thấu chi & Tiêu dùng', rate: 'Từ 7.5% / năm' }
  ]
};
