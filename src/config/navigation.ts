import { BookOpen, History, House, Languages, MessageCircle, Newspaper, Sparkles, WandSparkles, Phone, Settings, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Page } from '@/types/navigation';

type NavItem = { id: Page; label: string; icon: LucideIcon };

export const navItems: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: House },
  { id: 'translate', label: 'Từ điển/Tra dịch', icon: Languages },
  { id: 'vocabulary', label: 'Từ vựng & Luyện tập', icon: BookOpen },
  { id: 'ai-assistant', label: 'Trợ lý AI', icon: WandSparkles },
  { id: 'contact', label: 'Liên hệ', icon: Phone },
  { id: 'profile', label: 'Hồ sơ', icon: User },
  { id: 'settings', label: 'Cài đặt', icon: Settings },
];
