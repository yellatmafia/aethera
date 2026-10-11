import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, Send, Settings, UserRound, X } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';

export function ContactPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setNotice(t('Vui lòng điền đầy đủ thông tin.'));
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotice(t('Vui lòng nhập email hợp lệ.'));
      return;
    }

    setSending(true);
    setNotice('');

    // Simulate sending (in a real app, this would call an API)
    setTimeout(() => {
      setSending(false);
      setNotice(t('Tin nhắn của bạn đã được gửi thành công!'));
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="contact-page">
      <section className="page-intro">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> {t('Liên hệ')}</div>
          <h1>{t('Liên hệ với chúng tôi')}<br /><em>{t('Có câu hỏi hoặc góp ý?')}</em></h1>
          <p>{t('Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong hành trình học ngôn ngữ.')}</p>
        </div>
      </section>

      <div className="contact-form-container">
        <form className="contact-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="contact-name">{t('Họ và tên')}</label>
            <input
              type="text"
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('Nhập họ và tên của bạn')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">{t('Email')}</label>
            <input
              type="email"
              id="contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('nhan@example.com')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">{t('Chủ đề')}</label>
            <input
              type="text"
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('Nhập chủ đề tin nhắn')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">{t('Tin nhắn')}</label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('Nhập tin nhắn của bạn...')}
              rows="6"
              required
            />
          </div>

          <button type="submit" className="primary-button" disabled={sending}>
            {sending ? (<><Send size={18} /> <span>{t('Đang gửi...')}</span></>) : (<><Send size={18} /> <span>{t('Gửi tin nhắn')}</span></>)}
          </button>
        </form>
      </div>

      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label={t('Đóng thông báo')}>
            <X size={17} />
          </button>
        </div>
      )}

      <section className="contact-info">
        <div className="contact-info-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> {t('Thông tin liên hệ')}</div>
            <h2>{t('Cách khác để liên hệ')}</h2>
          </div>
        </div>
        <div className="contact-details">
          <div className="contact-item">
            <div className="contact-icon"><Mail size={20} /></div>
            <div>
              <strong>{t('Email hỗ trợ')}</strong>
              <span>support@aethera.app</span>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Phone size={20} /></div>
            <div>
              <strong>{t('Hotline')}</strong>
              <span>+84 123 456 789</span>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><UserRound size={20} /></div>
            <div>
              <strong>{t('Họp trực tuyến')}</strong>
              <span>{t('Theo lịch hẹn')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}