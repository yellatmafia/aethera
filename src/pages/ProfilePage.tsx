import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, History, Languages, LogIn, LogOut, Settings, UserRound } from 'lucide-react';
import { getStudyHistory } from '@/backend/study-history';
import type { StudyRecord } from '@/backend/study-history';
import type { User } from '@/types/auth';
import { useLanguage } from '@/i18n/useLanguage';
import type { Route } from '@/types/navigation';

type ProfilePageProps = {
  user: User | null;
  onNavigate: (route: Route) => void;
  onSignOut: () => Promise<void>;
};

export function ProfilePage({ user, onNavigate, onSignOut }: ProfilePageProps) {
  const { t } = useLanguage();
  const [error, setError] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const [recentRecords, setRecentRecords] = useState<StudyRecord[]>([]);
  const [historyError, setHistoryError] = useState('');

  useEffect(() => {
    if (user?.id) {
      try {
        setRecentRecords(getStudyHistory(user.id).slice(0, 5)); // Show last 5 records
        setHistoryError('');
      } catch (error) {
        setHistoryError(error instanceof Error ? error.message : 'Không thể đọc lịch sử học tập.');
      }
    }
  }, [user?.id, t]);

  const signOut = async () => {
    setError('');
    setSigningOut(true);
    try {
      await onSignOut();
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : 'Không thể đăng xuất.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-hero">
        <div className="account-avatar"><UserRound size={28} /></div>
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> {t('Trang cá nhân')}</div>
          <h1>{user?.name ?? t('Khách học tập')}</h1>
          <p>{user?.email ?? t('Đang sử dụng ở chế độ khách')}</p>
        </div>
      </div>
      {user ? (
        <>
          {/* Learning Progress Metrics */}
          <section className="profile-progress">
            <div className="profile-section-header">
              <h2>{t('Tiến trình học tập')}</h2>
            </div>
            <div className="progress-grid">
              <div className="progress-card">
                <h3>{t('Từ vựng đã học')}</h3>
                <p className="progress-value">124 {t('từ')}</p>
              </div>
              <div className="progress-card">
                <h3>{t('Điểm số trung bình')}</h3>
                <p className="progress-value">85%</p>
              </div>
              <div className="progress-card">
                <h3>{t('Ngày học liên tục')}</h3>
                <p className="progress-value">7 {t('ngày')}</p>
              </div>
              <div className="progress-card">
                <h3>{t('Thời gian học tập')}</h3>
                <p className="progress-value">12 {t('giờ')}</p>
              </div>
            </div>
          </section>

          {/* Activity History Details */}
          <section className="profile-history">
            <div className="profile-section-header">
              <h2>{t('Hoạt động gần đây')}</h2>
            </div>
            {historyError && <div className="notice" role="alert">{t(historyError)}</div>}
            {!historyError && recentRecords.length > 0 ? (
              <div className="history-list">
                {recentRecords.map((record) => (
                  <div key={record.id} className="history-item">
                    <div className="history-icon">
                      <Languages size={20} />
                    </div>
                    <div className="history-content">
                      <div className="history-title">
                        <strong>{record.source}</strong>
                        <span className="history-type">
                          {t(record.language === 'tay' ? 'Tiếng Tày' : 'Tiếng Mường')}
                        </span>
                      </div>
                      <div className="history-time">
                        {new Date(record.createdAt).toLocaleDateString(
                          language === 'en' ? 'en-US' : 'vi-VN',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                        <span className="history-time-detail">
                          {new Date(record.createdAt).toLocaleTimeString(
                            language === 'en' ? 'en-US' : 'vi-VN',
                            { hour: '2-digit', minute: '2-digit' }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="history-empty">
                <p>{t('Chưa có hoạt động học tập nào.')}</p>
                {!historyError && (
                  <button className="quiet-button" onClick={() => onNavigate('translate')}>
                    {t('Bắt đầu tra từ')} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Quick Access Cards */}
          <div className="account-grid">
            <div className="account-card">
              <span className="account-card-icon"><BookOpen size={18} /></span>
              <div><strong>{t('Từ vựng của tôi')}</strong><span>{t('Tra cứu, thêm và nhập các mục từ đã được kiểm chứng.')}</span></div>
              <button className="quiet-button" onClick={() => onNavigate('vocabulary')}>{t('Mở')} <ArrowRight size={15} /></button>
            </div>
            <div className="account-card">
              <span className="account-card-icon"><History size={18} /></span>
              <div><strong>{t('Lịch sử tra từ')}</strong><span>{t('Những lượt tra từ của riêng bạn.')}</span></div>
              <button className="quiet-button" onClick={() => onNavigate('history')}>{t('Mở')} <ArrowRight size={15} /></button>
            </div>
          </div>
          {error && <div className="form-error" role="alert">{t(error)}</div>}
          <div className="account-actions">
            <button className="secondary-button" onClick={() => onNavigate('settings')}><Settings size={16} /> {t('Cài đặt tài khoản')}</button>
            <button className="quiet-button danger-button" onClick={signOut} disabled={signingOut}>
              <LogOut size={16} /> {t(signingOut ? 'Đang đăng xuất...' : 'Đăng xuất')}
            </button>
          </div>
        </>
      ) : (
        <div className="data-empty">
          <div className="empty-page-icon"><LogIn size={24} /></div>
          <h2>{t('Bạn đang sử dụng ở chế độ khách')}</h2>
          <p>{t('Tạo tài khoản hoặc đăng nhập để lưu cài đặt và quản lý tài khoản học tập.')}</p>
          <button className="primary-button" onClick={() => onNavigate('login')}><LogIn size={16} /> {t('Đăng nhập')}</button>
        </div>
      )}
    </div>
  );
}
