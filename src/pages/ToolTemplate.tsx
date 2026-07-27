import React, { useEffect, useState } from 'react';
import { ArrowRight, BadgePercent, CalendarDays, Calculator, HeartPulse, Landmark, MessageSquareText, RefreshCw, Send, Sparkles } from 'lucide-react';
import BlogCardsSection from '../components/BlogCardsSection';
import { articles, calculateTool, findCategory, findTool } from '../data/content';
import type { CategorySlug, Tool, ToolResult } from '../data/content';
import { Link } from '../lib/router';
import { useParams } from '../lib/router-hooks';
import NotFound from './NotFound';

const ToolTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = findTool(slug);
  const category = findCategory(tool?.categorySlug);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [status, setStatus] = useState('');
  const [resultMode, setResultMode] = useState('per-day');

  useEffect(() => {
    setValues({});
    setResult(null);
    setStatus('');
    setResultMode('per-day');
  }, [slug]);

  if (slug === 'ask-ai') return <AskAiGuide />;
  if (!tool || !category) return <NotFound />;
  const toolArticles = articles
    .filter((article) => article.relatedToolSlugs?.includes(tool.slug))
    .slice(0, 3);

  const handleCalculate = () => {
    const nextResult = calculateTool(tool, values);
    setResult(nextResult);
    setStatus(nextResult ? 'Calculated successfully.' : 'Please enter valid values for every field.');
  };

  const handleClear = () => {
    setValues({});
    setResult(null);
    setStatus('Inputs cleared.');
  };

  const handleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem('calculate-karo-bookmarks') ?? '[]') as string[];
    const nextSaved = Array.from(new Set([...saved, tool.slug]));
    localStorage.setItem('calculate-karo-bookmarks', JSON.stringify(nextSaved));
    setStatus('Saved to this device.');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: tool.title, text: tool.description, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setStatus('Link copied to clipboard.');
  };

  return (
    <ToolProductPage
        tool={tool}
        categoryTitle={category.title}
        values={values}
        result={result}
        resultMode={resultMode}
        status={status}
        toolArticles={toolArticles}
        suggestedTools={category.tools.filter((categoryTool) => categoryTool.slug !== tool.slug).slice(0, 2)}
        onValueChange={(fieldId, value) => {
          setValues((current) => ({ ...current, [fieldId]: value }));
          setStatus('');
        }}
        onCalculate={handleCalculate}
        onClear={handleClear}
        onBookmark={handleBookmark}
        onShare={() => void handleShare()}
        onResultModeChange={setResultMode}
      />
  );
};

const ToolProductPage: React.FC<{
  tool: Tool;
  categoryTitle: string;
  values: Record<string, string>;
  result: ToolResult | null;
  resultMode: string;
  status: string;
  toolArticles: typeof articles;
  suggestedTools: Tool[];
  onValueChange: (fieldId: string, value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
  onBookmark: () => void;
  onShare: () => void;
  onResultModeChange: (mode: string) => void;
}> = ({
  tool,
  categoryTitle,
  values,
  result,
  resultMode,
  status,
  toolArticles,
  suggestedTools,
  onValueChange,
  onCalculate,
  onClear,
  onResultModeChange,
}) => {
  const filledCount = tool.fields.filter((field) => values[field.id]).length;
  const completion = Math.round((filledCount / Math.max(tool.fields.length, 1)) * 100);
  const categoryIcon = getToolCategoryIcon(tool.categorySlug);

  return (
    <div className="bg-[#f5f2eb] text-[#101014]">
      <section className="min-h-full overflow-hidden bg-[#f5f2eb]">
        <div className="grid lg:grid-cols-2">
          <div className="relative bg-[#ff782f] px-5 py-7 md:px-10 md:py-10">
            <div className="absolute right-[-9px] top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[10px] border-l-[10px] border-y-transparent border-l-[#ff782f] lg:block" />
            <div className="mb-7 flex flex-wrap items-center gap-2 text-[11px] font-bold text-black/55">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <Link to={`/category/${tool.categorySlug}`} className="hover:text-black">{categoryTitle}</Link>
              <span>/</span>
              <span className="text-black">{tool.title}</span>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">{categoryIcon}</span>
              <div>
                <h1 className="text-xl font-medium text-white md:text-2xl">{tool.title}</h1>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-black/55">{tool.formulaLabel}</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-medium text-white">Tool Parameters</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {tool.fields.map((field) => (
                  <ToolParameterInput
                    key={field.id}
                    field={field}
                    value={values[field.id] ?? ''}
                    onChange={(value) => onValueChange(field.id, value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-medium text-white">Activity Level</h2>
              <p className="mt-2 max-w-xl text-xs font-semibold leading-5 text-white/80">
                Middle: balanced assumptions with clear formula handling. Move to high when the inputs are final and verified.
              </p>
              <div className="mt-7 grid grid-cols-4 items-center gap-0">
                {['Low', 'Middle', 'High', 'Very High'].map((label, index) => (
                  <div key={label} className="relative">
                    <div className="absolute left-0 right-0 top-3 h-px bg-black/15" />
                    <span className={`relative z-10 mx-auto block h-6 w-6 rounded-full border border-black/20 ${index === 1 ? 'bg-black ring-4 ring-[#ff782f]' : 'bg-[#ff782f]'}`} />
                    <div className={`mt-3 text-center text-[10px] font-black uppercase ${index === 1 ? 'text-white' : 'text-black/55'}`}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-4 text-xl font-medium text-white">Goals</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {['Estimate', 'Compare', 'Maintain', 'Plan'].map((goal, index) => (
                  <button
                    key={goal}
                    type="button"
                    className={`h-12 text-[10px] font-black uppercase smooth-control ${index === 2 ? 'bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.25)]' : 'bg-[#eb651f] text-black/55 hover:bg-black/10'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={onClear} className="text-[11px] font-black uppercase text-black/55 smooth-control hover:text-black">
                Clear
              </button>
              <button
                type="button"
                onClick={onCalculate}
                className="group flex h-10 min-w-48 skew-x-[-10deg] items-center justify-center bg-black px-6 text-[11px] font-black uppercase text-white smooth-control hover:bg-[#161616]"
              >
                <span className="skew-x-[10deg]">Calculate</span>
                <RefreshCw className="ml-2 h-4 w-4 skew-x-[10deg] smooth-control group-hover:rotate-180" />
              </button>
            </div>
            {status && <p className="mt-5 text-xs font-bold text-white/80">{status}</p>}
          </div>

          <div className="bg-[#f8f6f1] px-5 py-7 md:px-10 md:py-10">
            <div className="mb-5 text-xl font-medium">Your Result</div>
            <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <div className="text-4xl font-black leading-none tracking-tight">
                  {result?.primary ?? 'Ready'}
                </div>
                <p className="mt-2 max-w-xs text-xs font-semibold leading-5 text-black/60">
                  {result?.secondary ?? `Enter ${tool.fields.length} parameter${tool.fields.length === 1 ? '' : 's'} to calculate your result.`}
                </p>
              </div>
              <div className="space-y-3">
                <BreakdownRow label="Completion" value={`${completion}%`} percent={completion || 8} />
                <BreakdownRow label="Fields" value={`${filledCount}/${tool.fields.length}`} percent={completion || 12} />
                <BreakdownRow label="Traffic" value={tool.popularity} percent={72} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['per-day', 'Live'],
                ['3-meals', '3 Steps'],
                ['4-meals', '4 Tips'],
                ['5-meals', '5 Guides'],
              ].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onResultModeChange(mode)}
                  className={`h-12 text-[10px] font-black uppercase smooth-control ${resultMode === mode ? 'bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)]' : 'bg-black/5 text-black/55 hover:bg-black/10'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-medium">Adjust Confidence</h2>
              <p className="mt-2 text-xs font-semibold leading-5 text-black/55">
                We recommend starting with normal assumptions. Use high confidence when all values are verified.
              </p>
              <div className="mt-6 grid grid-cols-3 items-center gap-0">
                {['Low', 'Normal', 'High'].map((label, index) => (
                  <div key={label} className="relative">
                    <div className="absolute left-0 right-0 top-3 h-px bg-black/15" />
                    <span className={`relative z-10 mx-auto block h-6 w-6 rounded-full border border-black/15 ${index === 1 ? 'bg-black ring-4 ring-[#f8f6f1]' : 'bg-[#f8f6f1]'}`} />
                    <div className={`mt-3 text-center text-[10px] font-black uppercase ${index === 1 ? 'text-black' : 'text-black/45'}`}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[20px] w-full bg-transparent" />

        <section className="bg-[#f7f5f0] px-5 py-6 md:px-10 md:py-8 rounded-2xl border border-black/5 mx-5 md:mx-10 mb-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f4510b]">Next best steps</p>
              <h2 className="mt-2 text-xl font-black tracking-tight md:text-2xl">Continue with related calculators</h2>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-black/55">
                These tools support the same workflow as {tool.title}, so users can compare results, validate assumptions, and keep moving without leaving the calculator flow.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {suggestedTools.map((suggestedTool, index) => (
                  <Link key={suggestedTool.slug} to={`/tool/${suggestedTool.slug}`} className="group flex items-center gap-3 rounded-[18px] border border-black/10 bg-white p-3 smooth-control hover:-translate-y-0.5 hover:border-[#ff782f] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${index === 0 ? 'bg-[#ff782f]' : 'bg-black'}`}>
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-[0.04em] group-hover:text-[#f4510b]">{suggestedTool.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-black/55">{suggestedTool.description}</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 shrink-0 smooth-control group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
              {result?.detail && (
                <div className="mt-4 rounded-[18px] border border-black/10 bg-white p-4 text-xs font-semibold leading-5 text-black/60">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-black">Result note</span>
                  {result.detail}
                </div>
              )}
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f4510b]">Tool-specific blogs</p>
              <h2 className="mt-2 text-xl font-black tracking-tight md:text-2xl">Guides for better decisions</h2>
              <div className="mt-6 grid gap-3">
                {toolArticles.map((article) => (
                  <Link key={article.slug} to={`/blog/${article.slug}`} className="group rounded-[18px] border border-black/10 bg-white p-4 smooth-control hover:-translate-y-0.5 hover:border-[#ff782f] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-black leading-6 group-hover:text-[#f4510b]">{article.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-black/50">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 smooth-control group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

const ToolParameterInput: React.FC<{
  field: Tool['fields'][number];
  value: string;
  onChange: (value: string) => void;
}> = ({ field, value, onChange }) => (
  <div>
    <div className="relative">
      {field.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-black/45">{field.prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={field.min}
        step={field.step}
        placeholder={field.placeholder}
        aria-label={field.label}
        className={`h-9 w-full rounded-full border border-black/15 bg-[#ff782f] ${field.prefix ? 'pl-12' : 'pl-4'} ${field.suffix ? 'pr-16' : 'pr-4'} text-center text-[11px] font-black uppercase text-black outline-none smooth-control placeholder:text-black focus:border-black focus:bg-white`}
      />
      {field.suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-black/55">{field.suffix}</span>}
    </div>
    <p className="mt-1.5 text-center text-[9px] font-black uppercase text-black/45">{field.label}</p>
  </div>
);

const BreakdownRow: React.FC<{ label: string; value: string; percent: number }> = ({ label, value, percent }) => (
  <div className="grid grid-cols-[0.9fr_1fr_auto] items-center gap-3 text-[11px] font-bold">
    <span className="text-black/60">{label}</span>
    <span className="h-px bg-black/15">
      <span className="block h-px bg-black" style={{ width: `${Math.min(Math.max(percent, 4), 100)}%` }} />
    </span>
    <span className="font-black text-black">{value}</span>
  </div>
);

const getToolCategoryIcon = (slug: CategorySlug) => {
  switch (slug) {
    case 'finance':
      return <Landmark className="h-5 w-5" />;
    case 'health':
      return <HeartPulse className="h-5 w-5" />;
    case 'age-date':
      return <CalendarDays className="h-5 w-5" />;
    default:
      return <BadgePercent className="h-5 w-5" />;
  }
};

const aiScenarios = [
  {
    id: 'loan',
    label: 'Loan planning',
    icon: <Landmark className="w-4 h-4" />,
    prompt: 'I want to compare a Rs. 8 lakh loan at 8.5% for 5 years.',
    summary: 'Use EMI first, then compare total interest against a shorter tenure.',
    tools: ['emi-calculator', 'compound-interest-calculator'],
    accent: 'border-orange-200 bg-orange-500/10 text-orange-200',
  },
  {
    id: 'health',
    label: 'Health check',
    icon: <HeartPulse className="w-4 h-4" />,
    prompt: 'I know my height and weight. Which health metric should I calculate first?',
    summary: 'Start with BMI, then estimate hydration or calorie needs depending on your goal.',
    tools: ['bmi-calculator', 'water-intake-calculator', 'calorie-needs-calculator'],
    accent: 'border-orange-200 bg-orange-500/10 text-orange-200',
  },
  {
    id: 'business',
    label: 'Business math',
    icon: <BadgePercent className="w-4 h-4" />,
    prompt: 'Help me calculate an 18% tax amount and compare discounts.',
    summary: 'Use percentage for quick comparisons and GST when you need invoice-ready totals.',
    tools: ['percentage-calculator', 'gst-calculator', 'average-calculator'],
    accent: 'border-orange-200 bg-orange-500/10 text-orange-200',
  },
  {
    id: 'schedule',
    label: 'Dates and time',
    icon: <CalendarDays className="w-4 h-4" />,
    prompt: 'I need to plan a deadline and convert work weeks into days.',
    summary: 'Use date difference for the deadline window, then convert weeks or hours if needed.',
    tools: ['date-difference-calculator', 'weeks-to-days-calculator', 'hours-to-minutes-calculator'],
    accent: 'border-orange-200 bg-orange-500/10 text-orange-200',
  },
];

const AskAiGuide: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState(aiScenarios[0].id);
  const [prompt, setPrompt] = useState(aiScenarios[0].prompt);
  const activeScenario = aiScenarios.find((scenario) => scenario.id === activeScenarioId) ?? aiScenarios[0];
  const suggestedTools = activeScenario.tools
    .map((toolSlug) => findTool(toolSlug))
    .filter(Boolean);
  const aiArticles = articles
    .filter((article) => activeScenario.tools.some((toolSlug) => article.relatedToolSlugs?.includes(toolSlug)))
    .slice(0, 3);

  const selectScenario = (scenarioId: string) => {
    const nextScenario = aiScenarios.find((scenario) => scenario.id === scenarioId) ?? aiScenarios[0];
    setActiveScenarioId(nextScenario.id);
    setPrompt(nextScenario.prompt);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <section className="overflow-hidden rounded-lg border border-orange-200 bg-gray-950">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative p-6 md:p-8">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-500" />
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
              <Sparkles className="w-4 h-4" />
              AI calculator router
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              Ask in plain language. Get the right calculator path.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-gray-300 md:text-base">
              This page behaves like a guided AI planner: describe the calculation, choose the closest intent, and jump into the calculators that match the job.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <AiMetric value="4" label="Decision modes" />
              <AiMetric value="16+" label="Mapped tools" />
              <AiMetric value="0" label="Login required" />
              <AiMetric value="100%" label="Formula backed" />
            </div>
          </div>

          <div className="border-t border-orange-100 bg-gradient-to-br from-gray-950 via-orange-950/30 to-gray-950 p-5 md:p-6 lg:border-l lg:border-t-0">
            <div className="rounded-lg border border-white/80 bg-gray-950/80 p-4 shadow-lg shadow-orange-950/5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <MessageSquareText className="w-4 h-4 text-orange-400" />
                Calculation prompt
              </div>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="min-h-32 w-full resize-none rounded-lg border border-gray-800 bg-gray-950 p-3 text-sm font-medium leading-6 text-gray-100 outline-none smooth-control focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white smooth-control hover:bg-black">
                Preview recommendation <Send className="w-4 h-4" />
              </button>
              <p className="mt-3 text-xs leading-5 text-gray-400">
                Prototype mode: recommendations are generated from curated calculator mappings, so every action links to a working tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="panel-surface p-5 md:p-6">
          <p className="eyebrow">Choose an intent</p>
          <div className="mt-4 grid gap-3">
            {aiScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => selectScenario(scenario.id)}
                className={`flex items-center gap-3 rounded-lg border p-3 text-left smooth-control hover:-translate-y-0.5 ${activeScenarioId === scenario.id ? scenario.accent : 'border-gray-800 bg-gray-950 text-gray-200 hover:border-orange-200'}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900/70">
                  {scenario.icon}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{scenario.label}</span>
                  <span className="block text-xs font-medium opacity-75">{scenario.tools.length} suggested tools</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel-surface overflow-hidden">
          <div className="border-b border-gray-800 p-5 md:p-6">
            <p className="eyebrow">AI recommendation</p>
            <h2 className="heading-section mt-2">{activeScenario.label}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-300">{activeScenario.summary}</p>
          </div>
          <div className="grid gap-px bg-gray-800 md:grid-cols-3">
            {suggestedTools.map((tool, index) => (
              <Link
                key={tool!.slug}
                to={`/tool/${tool!.slug}`}
                className={`group flex min-h-[142px] flex-col justify-between p-4 smooth-control hover:bg-orange-500/10 ${
                  index === 0 ? 'bg-orange-500/10' : 'bg-gray-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${index === 0 ? 'bg-[#f4510b] text-white' : 'bg-gray-900 text-[#f4510b]'}`}>
                    <Calculator className="h-5 w-5" />
                  </div>
                  <span className={`rounded-md px-2 py-1 text-[11px] font-semibold ${index === 0 ? 'bg-orange-500/20 text-[#f4510b]' : 'bg-gray-800 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-[#f4510b]'}`}>
                    {tool!.popularity}
                  </span>
                </div>
                <div>
                  <div className={`text-sm font-semibold leading-tight group-hover:text-[#f4510b] ${index === 0 ? 'text-[#f4510b]' : 'text-white'}`}>{tool!.title}</div>
                  <p className="mt-1 line-clamp-1 text-[11px] font-semibold uppercase text-gray-400">{tool!.formulaLabel}</p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-[#f4510b]">
                    Open tool <ArrowRight className="ml-1 h-3.5 w-3.5 smooth-control group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {activeScenario.tools.slice(0, 3).map((toolSlug) => {
          const tool = findTool(toolSlug);
          if (!tool) return null;
          return (
            <div key={tool.slug} className="rounded-lg border border-gray-800 bg-gray-950 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Try asking</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">Which inputs do I need for the {tool.title}, and what should I compare after I get the result?</p>
            </div>
          );
        })}
      </section>

      <BlogCardsSection
        articles={aiArticles}
        eyebrow="Recommended reading"
        title="Guides matched to this AI intent"
        description="Use these focused guides to understand assumptions, inputs, and result interpretation before opening a calculator."
        ctaTo="/blog"
        ctaLabel="Browse all guides"
      />
    </div>
  );
};

const AiMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
    <div className="text-xl font-semibold text-white">{value}</div>
    <div className="mt-1 text-[11px] font-semibold uppercase text-gray-400">{label}</div>
  </div>
);

export default ToolTemplate;
