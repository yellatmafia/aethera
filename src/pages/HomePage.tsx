import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Languages,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { LeafMark } from '@/components/AppLayout';
import { useLanguage } from '@/i18n/useLanguage';
import type { User } from '@/types/auth';
import type { Route } from '@/types/navigation';

const featureCards = [
  {
    title: 'Voice Translation',
    description: 'Bằng giọng nói hoặc văn bản để tra cứu từ điển ngay lập tức.',
    icon: Languages,
    route: 'translate',
    tone: 'blue',
  },
  {
    title: 'AI Assistant',
    description: 'Hỗ trợ học tập thông minh, giải đáp thắc mắc về ngôn ngữ.',
    icon: WandSparkles,
    route: 'ai-assistant',
    tone: 'violet',
  },
  {
    title: 'Vocabulary Notebook & Practice',
    description: 'Lưu và ôn tập từ vựng đã học với các bài kiểm tra tương tác.',
    icon: BookOpen,
    route: 'vocabulary',
    tone: 'gold',
  },
] as const;

function StoryArtwork({ index }: { index: number }) {
  return (
    <svg className={`story-art story-art-${index + 1}`} viewBox="0 0 400 220" role="img" aria-label="">
      <defs>
        <linearGradient id={`story-sky-${index}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={index === 1 ? '#9bcde0' : '#c7e6dd'} />
          <stop offset="1" stopColor={index === 1 ? '#eff2da' : '#f5efd2'} />
        </linearGradient>
      </defs>
      <path fill={`url(#story-sky-${index})`} d="M0 0h400v220H0z" />
      <circle cx={index === 1 ? 315 : 74} cy="49" r="23" fill="#ffe39a" opacity=".9" />
      <path d="m0 133 85-73 73 69 85-91 157 113v69H0Z" fill="#75a997" />
      <path d="m0 154 101-49 76 52 102-78 121 65v76H0Z" fill="#357d67" />
      {index === 0 && (
        <>
          <path d="M0 171c99-31 184-7 270 49H0Z" fill="#d7a647" />
          <path d="M0 188c103-31 193-4 249 32H0Z" fill="#f4ce64" />
          <path d="M244 142h70v54h-70z" fill="#eee0bd" />
          <path d="m234 145 45-36 48 36Z" fill="#884c38" />
          <path d="M257 159h14v20h-14zm27 0h14v20h-14z" fill="#4c7565" />
          <path d="M71 137v44m20-49v52m21-44v48m22-35v41" stroke="#f4ecd7" strokeWidth="4" opacity=".8" />
        </>
      )}
      {index === 1 && (
        <>
          <path d="M0 178c95-30 180-25 263 42H0Z" fill="#d8bb70" />
          <path d="M37 151h116v61H37z" fill="#b88a59" />
          <path d="m25 155 68-56 74 56Z" fill="#554c3d" />
          <path d="M79 172h29v40H79z" fill="#70563b" />
          <path d="M48 164h20v19H48zm71 0h20v19h-20z" fill="#c6dfd1" />
          <path d="M0 202c119-19 206-14 293 18H0Z" fill="#668d51" />
        </>
      )}
      {index === 2 && (
        <>
          <path d="M0 160c100-39 236-22 400 16v44H0Z" fill="#80a956" />
          <path d="M0 182c112-35 249-15 400 17v21H0Z" fill="#b7bd62" />
          <path d="M0 205c133-32 271-5 400 10v5H0Z" fill="#e3cc7b" />
          <path d="M58 147h58v44H58z" fill="#d8c9a0" />
          <path d="m49 150 38-30 39 30Z" fill="#5b5140" />
          <path d="M79 164h15v27H79z" fill="#536c58" />
          <path d="M206 153h49v36h-49z" fill="#ddd0aa" />
          <path d="m199 155 31-25 33 25Z" fill="#5b5140" />
        </>
      )}
      <path d="M0 216c99-13 202-12 400 0v4H0Z" fill="#145b49" opacity=".65" />
    </svg>
  );
}

function ProgressMeter({
  label,
  complete,
  total,
}: {
  label: string;
  complete: number;
  total: number;
}) {
  const percentage = Math.round((complete / total) * 100);
  return (
    <div className="home-progress-meter">
      <div className="home-progress-label">
        <span>{label}: {complete} / {total}</span>
        <strong>{percentage}%</strong>
      </div>
      <div
        className="home-progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={complete}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export function HomePage({ onNavigate, user }: { onNavigate: (route: Route) => void; user: User | null }) {
  const { language, t } = useLanguage();

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-hero-kicker">
            <span />
            {t('Mỗi ngày một chút, hiểu thêm một lời.')}
          </div>
          <h1>
            {t('Hành trình kết nối ngôn ngữ')}
          </h1>
          <p>{t('Khám phá ngôn ngữ địa phương, học từ mới và kết nối với tri thức mỗi ngày.')}</p>
          <div className="home-hero-actions">
            <button className="home-hero-primary" onClick={() => onNavigate('translate')}>
              <Languages size={20} /> {t('Khám phá ngay')} <ArrowRight size={19} />
            </button>
          </div>
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <span className="home-art-orbit home-art-orbit-one" />
          <span className="home-art-orbit home-art-orbit-two" />
          <span className="home-art-circle"><LeafMark large /></span>
        </div>
      </section>

      <section className="home-features">
        <div className="home-section-heading">
          <div>
            <h2>{t('Các tính năng chính')}</h2>
            <p>{t('Khám phá những công cụ giúp bạn học ngôn ngữ hiệu quả nhất.')}</p>
          </div>
        </div>
        <div className="home-features-grid">
          {featureCards.map(({ title, description, icon: Icon, route, tone }) => (
            <article
              key={route}
              className={`home-feature-card home-feature-${tone}`}
              onClick={() => onNavigate(route)}
            >
              <div className="home-feature-icon">
                <Icon size={24} />
              </div>
              <div className="home-feature-content">
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
