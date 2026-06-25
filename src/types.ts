export interface BankProduct {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: 'saving' | 'loan' | 'digital' | 'priority';
  benefits: string[];
  features: { label: string; value: string }[];
  highlightColor: string;
  iconName: string;
}

export interface ConsultationBooking {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productInterest: string;
  appointmentDate?: string;
  preferredTime?: string;
  note?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'resolved';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
