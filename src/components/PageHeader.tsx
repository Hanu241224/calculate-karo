import React from 'react';

type PageHeaderStat = {
  label: string;
  value: string;
};

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  stats?: PageHeaderStat[];
  align?: 'left' | 'center';
};

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, icon, children, stats = [], align = 'left' }) => (
  <header className={`panel-surface overflow-hidden p-6 md:p-8 ${align === 'center' ? 'text-center' : ''}`}>
    <div className={`flex flex-col gap-5 ${align === 'center' ? 'items-center' : ''}`}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-black/10 bg-[#fff1ed] text-[#f4510b]">
            {icon}
          </div>
        )}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-3xl'}>
        <h1 className="heading-display">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-black/55 md:text-base">{description}</p>
      </div>
      {(stats.length > 0 || children) && (
        <div className={`flex w-full flex-col gap-4 border-t border-black/10 pt-5 md:flex-row md:items-center md:justify-between ${align === 'center' ? 'max-w-2xl' : ''}`}>
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className="min-w-24 rounded-[14px] border border-black/10 bg-[#fff7f3] px-3 py-2">
                  <div className="text-base font-semibold text-black">{stat.value}</div>
                  <div className="eyebrow mt-1 text-[11px] text-black/45">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
        </div>
      )}
    </div>
  </header>
);

export default PageHeader;
