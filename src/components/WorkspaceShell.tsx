import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  HeartPulse,
  Mic,
  MicOff,
  Plus,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { articles, categories, tools } from '../data/content';
import { Link } from '../lib/router';
import { useLocation } from '../lib/router-hooks';
import HeaderSearch from './HeaderSearch';

type WorkspaceMode = 'home' | 'ai';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

const WorkspaceShell: React.FC<{ mode: WorkspaceMode }> = ({ mode }) => {
  const { search } = useLocation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [isWarmMode, setIsWarmMode] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [attachment, setAttachment] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(0);

  const initialQuery = useMemo(
    () => new URLSearchParams(search).get('q')?.trim() ?? '',
    [search],
  );

  useEffect(() => {
    if (mode === 'ai' && initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery, mode]);

  const navigateToAi = (value: string) => {
    window.history.pushState(null, '', `/ai${value ? `?q=${encodeURIComponent(value)}` : ''}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const submitQuery = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery && !attachment) return;

    if (mode === 'home') {
      navigateToAi(trimmedQuery);
      return;
    }

    const userMessage: ChatMessage = {
      id: ++messageIdRef.current,
      role: 'user',
      content: trimmedQuery || `Help me understand ${attachment}`,
    };
    const assistantMessage: ChatMessage = {
      id: ++messageIdRef.current,
      role: 'assistant',
      content: getAssistantReply(trimmedQuery),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setQuery('');
    setAttachment('');
    setIsListening(false);
    window.history.replaceState(null, '', '/ai');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') submitQuery();
  };

  return (
    <div className={`workspace-page ${isWarmMode ? '' : 'workspace-page--dim'}`}>
      <header className="workspace-header">
        <div className="workspace-header__left">
          <Link to="/" className="workspace-logo" aria-label="Calculate Karo home">
            <span className="workspace-brand__mark"><Calculator size={17} strokeWidth={2.2} /></span>
            <span className="workspace-brand__name">Calculate Karo</span>
          </Link>
          <HeaderSearch />
        </div>

        <nav className="workspace-header__nav" aria-label="Primary navigation">
          <div className="workspace-blog-menu">
            <button
              type="button"
              className="workspace-nav-link"
              onClick={() => setIsBlogMenuOpen((open) => !open)}
              aria-expanded={isBlogMenuOpen}
            >
              Blogs <ChevronDown size={21} className={isBlogMenuOpen ? 'rotate-180' : ''} />
            </button>
            {isBlogMenuOpen && (
              <div className="workspace-blog-dropdown">
                <p>Latest guides</p>
                {articles.slice(0, 4).map((article) => (
                  <Link key={article.slug} to={`/blog/${article.slug}`} onClick={() => setIsBlogMenuOpen(false)}>
                    {article.title}
                  </Link>
                ))}
                <Link to="/blog" className="workspace-blog-dropdown__all" onClick={() => setIsBlogMenuOpen(false)}>
                  View all articles <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>

          <Link to="/ai" className={`workspace-nav-link ${mode === 'ai' ? 'is-active' : ''}`}>
            Ask AI <Sparkles size={24} fill="currentColor" />
          </Link>

          <button
            type="button"
            className="workspace-theme-toggle"
            onClick={() => setIsWarmMode((warm) => !warm)}
            aria-label={isWarmMode ? 'Switch to dim workspace' : 'Switch to light workspace'}
            aria-pressed={!isWarmMode}
          >
            <span><Sun size={25} /></span>
          </button>

          <button type="button" className="workspace-sign-in" onClick={() => setIsSignInOpen(true)}>
            Sign in
          </button>
        </nav>
      </header>

      <main className={`workspace-frame ${isPanelOpen ? 'workspace-frame--panel-open' : ''}`}>
        <aside className="workspace-sidebar" aria-label="Calculator navigation">
          <div className="workspace-sidebar__rail">
            <button
              type="button"
              className="workspace-panel-toggle"
              onClick={() => setIsPanelOpen((open) => !open)}
              aria-label={isPanelOpen ? 'Collapse tools panel' : 'Expand tools panel'}
              aria-expanded={isPanelOpen}
            >
              <ArrowRight size={44} strokeWidth={1.8} className={isPanelOpen ? 'rotate-180' : ''} />
            </button>

            <div className="workspace-rail-actions">
              <RailLink to="/" label="Home" active={mode === 'home'} icon={<Calculator size={20} />} />
              <RailLink to="/category/finance" label="Finance" icon={<CircleDollarSign size={20} />} />
              <RailLink to="/category/health" label="Health" icon={<HeartPulse size={20} />} />
              <RailLink to="/category/maths" label="Maths" icon={<BarChart3 size={20} />} />
              <RailLink to="/category/age-date" label="Date" icon={<CalendarDays size={20} />} />
            </div>
          </div>

          <div className="workspace-sidebar__panel">
            <div className="workspace-panel-heading">
              <div>
                <span>Explore</span>
                <h2>All tools</h2>
              </div>
              <button type="button" onClick={() => setIsPanelOpen(false)} aria-label="Close tools panel">
                <X size={20} />
              </button>
            </div>

            <div className="workspace-panel-content">
              {categories.map((category) => (
                <div key={category.slug} className="workspace-category-group">
                  <Link to={`/category/${category.slug}`}>{category.title}</Link>
                  <span>{category.tools.length}</span>
                  <div>
                    {category.tools.slice(0, 3).map((tool) => (
                      <Link key={tool.slug} to={`/tool/${tool.slug}`}>{tool.title}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="workspace-canvas" aria-label={mode === 'home' ? 'Calculation workspace' : 'AI calculation assistant'}>
          <div className="workspace-conversation" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`workspace-message workspace-message--${message.role}`}>
                {message.role === 'assistant' && <span><Sparkles size={18} /></span>}
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="workspace-composer-wrap">
            {attachment && (
              <div className="workspace-attachment">
                <span>{attachment}</span>
                <button type="button" onClick={() => setAttachment('')} aria-label="Remove attachment"><X size={14} /></button>
              </div>
            )}
            <div className="workspace-composer">
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                onChange={(event) => setAttachment(event.target.files?.[0]?.name ?? '')}
                aria-label="Attach a file"
              />
              <button type="button" className="workspace-composer__icon" onClick={() => fileInputRef.current?.click()} aria-label="Attach a file">
                <Plus size={34} strokeWidth={2.2} />
              </button>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={mode === 'home' ? 'Ask anything or search a calculator' : 'Ask AI about a calculation'}
                aria-label="Ask Calculate Karo"
              />
              <button
                type="button"
                className={`workspace-composer__icon ${isListening ? 'is-listening' : ''}`}
                onClick={() => setIsListening((listening) => !listening)}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                aria-pressed={isListening}
              >
                {isListening ? <MicOff size={29} /> : <Mic size={29} />}
              </button>
              <button type="button" className="workspace-go" onClick={submitQuery}>Go</button>
            </div>
          </div>
        </section>

      </main>

      {isSignInOpen && (
        <div className="workspace-modal-backdrop" role="presentation" onMouseDown={() => setIsSignInOpen(false)}>
          <div className="workspace-modal" role="dialog" aria-modal="true" aria-labelledby="sign-in-title" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="workspace-modal__close" onClick={() => setIsSignInOpen(false)} aria-label="Close sign in"><X size={20} /></button>
            <span className="workspace-modal__mark"><Calculator size={22} /></span>
            <h2 id="sign-in-title">Welcome back</h2>
            <p>Sign in to keep your calculations, saved tools, and AI conversations together.</p>
            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>
            <button type="button" onClick={() => setIsSignInOpen(false)}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

const RailLink: React.FC<{ to: string; label: string; icon: React.ReactNode; active?: boolean }> = ({ to, label, icon, active = false }) => (
  <Link to={to} className={`workspace-rail-link ${active ? 'is-active' : ''}`} title={label} aria-label={label}>
    {icon}
  </Link>
);

const getAssistantReply = (query: string) => {
  const normalized = query.toLowerCase();
  const matchingTool = tools.find((tool) => normalized.includes(tool.title.toLowerCase().replace(' calculator', '')));

  if (matchingTool) {
    return `The ${matchingTool.title} is the right starting point. It uses ${matchingTool.formulaLabel.toLowerCase()}. Open the tool, enter the requested values, and I can help you interpret the result.`;
  }
  if (normalized.includes('loan') || normalized.includes('emi')) {
    return 'For a loan estimate, use the EMI Calculator with the principal, annual interest rate, and loan term. I can then help compare monthly payment and total interest.';
  }
  if (normalized.includes('health') || normalized.includes('bmi') || normalized.includes('calorie')) {
    return 'I can guide you to BMI, daily calorie, hydration, or ideal-weight tools. These provide planning estimates and should not replace medical advice.';
  }
  if (normalized.includes('date') || normalized.includes('age')) {
    return 'For date planning, I can calculate age, elapsed days, weeks to days, or hours to minutes. Tell me the dates or duration you are working with.';
  }
  return 'I can help choose a calculator, check the inputs, and explain the result in plain language. Tell me what you want to calculate and include any values or units you already have.';
};

export default WorkspaceShell;
