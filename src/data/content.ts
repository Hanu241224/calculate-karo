export type CategorySlug = 'finance' | 'health' | 'maths' | 'age-date';

export type ToolField = {
  id: string;
  label: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  min?: string;
  step?: string;
};

export type ToolResult = {
  primary: string;
  secondary: string;
  detail: string;
};

export type Tool = {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  description: string;
  fields: ToolField[];
  formulaLabel: string;
  popularity: string;
  featured?: boolean;
};

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  count: number;
  tools: Tool[];
};

export type Article = {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  relatedToolSlugs?: string[];
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
};

const financeTools: Tool[] = [
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    categorySlug: 'finance',
    description: 'Estimate a monthly loan payment using principal, annual interest rate, and loan tenure.',
    formulaLabel: 'Standard reducing-balance EMI formula',
    popularity: '1.4M/mo',
    featured: true,
    fields: [
      { id: 'principal', label: 'Loan amount', placeholder: '500000', prefix: 'Rs.', min: '0', step: '1000' },
      { id: 'rate', label: 'Annual interest rate', placeholder: '8.5', suffix: '%', min: '0', step: '0.01' },
      { id: 'years', label: 'Loan tenure', placeholder: '5', suffix: 'years', min: '0', step: '0.5' },
    ],
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    categorySlug: 'finance',
    description: 'Project the future value of a monthly investment with annual expected returns.',
    formulaLabel: 'Monthly compounding future value',
    popularity: '1.2M/mo',
    fields: [
      { id: 'monthly', label: 'Monthly investment', placeholder: '10000', prefix: 'Rs.', min: '0', step: '500' },
      { id: 'rate', label: 'Expected annual return', placeholder: '12', suffix: '%', min: '0', step: '0.01' },
      { id: 'years', label: 'Investment period', placeholder: '10', suffix: 'years', min: '0', step: '0.5' },
    ],
  },
  {
    slug: 'gst-calculator',
    title: 'GST Calculator',
    categorySlug: 'finance',
    description: 'Calculate GST and final invoice value from a base amount and tax rate.',
    formulaLabel: 'Base amount plus GST',
    popularity: '980K/mo',
    fields: [
      { id: 'amount', label: 'Base amount', placeholder: '25000', prefix: 'Rs.', min: '0', step: '100' },
      { id: 'rate', label: 'GST rate', placeholder: '18', suffix: '%', min: '0', step: '0.01' },
    ],
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    categorySlug: 'finance',
    description: 'Calculate the future value of a lump-sum investment with annual compounding.',
    formulaLabel: 'A = P(1 + r)^t',
    popularity: '740K/mo',
    fields: [
      { id: 'principal', label: 'Principal', placeholder: '100000', prefix: 'Rs.', min: '0', step: '1000' },
      { id: 'rate', label: 'Annual interest rate', placeholder: '7.5', suffix: '%', min: '0', step: '0.01' },
      { id: 'years', label: 'Period', placeholder: '8', suffix: 'years', min: '0', step: '0.5' },
    ],
  },
];

const healthTools: Tool[] = [
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    categorySlug: 'health',
    description: 'Calculate body mass index from weight and height, with a clear weight category.',
    formulaLabel: 'BMI = weight / height squared',
    popularity: '1.1M/mo',
    featured: true,
    fields: [
      { id: 'weight', label: 'Weight', placeholder: '70', suffix: 'kg', min: '0', step: '0.1' },
      { id: 'height', label: 'Height', placeholder: '170', suffix: 'cm', min: '0', step: '0.1' },
    ],
  },
  {
    slug: 'calorie-needs-calculator',
    title: 'Calorie Needs Calculator',
    categorySlug: 'health',
    description: 'Estimate daily maintenance calories using the Mifflin-St Jeor method.',
    formulaLabel: 'Mifflin-St Jeor baseline estimate',
    popularity: '860K/mo',
    fields: [
      { id: 'weight', label: 'Weight', placeholder: '70', suffix: 'kg', min: '0', step: '0.1' },
      { id: 'height', label: 'Height', placeholder: '170', suffix: 'cm', min: '0', step: '0.1' },
      { id: 'age', label: 'Age', placeholder: '30', suffix: 'years', min: '0', step: '1' },
    ],
  },
  {
    slug: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    categorySlug: 'health',
    description: 'Estimate a daily hydration target from body weight.',
    formulaLabel: '35 ml per kg of body weight',
    popularity: '650K/mo',
    fields: [
      { id: 'weight', label: 'Weight', placeholder: '70', suffix: 'kg', min: '0', step: '0.1' },
    ],
  },
  {
    slug: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    categorySlug: 'health',
    description: 'Estimate a healthy reference weight range from height.',
    formulaLabel: 'Healthy BMI range converted to weight',
    popularity: '520K/mo',
    fields: [
      { id: 'height', label: 'Height', placeholder: '170', suffix: 'cm', min: '0', step: '0.1' },
    ],
  },
];

const mathsTools: Tool[] = [
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    categorySlug: 'maths',
    description: 'Find a percentage of any number instantly.',
    formulaLabel: 'Value times percentage divided by 100',
    popularity: '1.5M/mo',
    featured: true,
    fields: [
      { id: 'value', label: 'Value', placeholder: '1250', min: '0', step: '0.01' },
      { id: 'percent', label: 'Percentage', placeholder: '18', suffix: '%', min: '0', step: '0.01' },
    ],
  },
  {
    slug: 'average-calculator',
    title: 'Average Calculator',
    categorySlug: 'maths',
    description: 'Calculate the arithmetic mean of a total across a known number of items.',
    formulaLabel: 'Total divided by count',
    popularity: '930K/mo',
    fields: [
      { id: 'total', label: 'Total value', placeholder: '480', step: '0.01' },
      { id: 'count', label: 'Number of items', placeholder: '12', min: '1', step: '1' },
    ],
  },
  {
    slug: 'ratio-calculator',
    title: 'Ratio Calculator',
    categorySlug: 'maths',
    description: 'Simplify two values into their lowest whole-number ratio.',
    formulaLabel: 'Greatest common divisor simplification',
    popularity: '670K/mo',
    fields: [
      { id: 'a', label: 'First value', placeholder: '24', min: '0', step: '1' },
      { id: 'b', label: 'Second value', placeholder: '36', min: '0', step: '1' },
    ],
  },
  {
    slug: 'square-root-calculator',
    title: 'Square Root Calculator',
    categorySlug: 'maths',
    description: 'Find the square root of a positive number.',
    formulaLabel: 'Principal square root',
    popularity: '580K/mo',
    fields: [
      { id: 'value', label: 'Number', placeholder: '144', min: '0', step: '0.01' },
    ],
  },
];

const ageDateTools: Tool[] = [
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    categorySlug: 'age-date',
    description: 'Convert a birth year into current age.',
    formulaLabel: 'Current year minus birth year',
    popularity: '920K/mo',
    featured: true,
    fields: [
      { id: 'year', label: 'Birth year', placeholder: '1995', min: '1900', step: '1' },
    ],
  },
  {
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    categorySlug: 'age-date',
    description: 'Calculate elapsed days between two day numbers in the same month or period.',
    formulaLabel: 'End day minus start day',
    popularity: '710K/mo',
    fields: [
      { id: 'start', label: 'Start day number', placeholder: '4', min: '1', step: '1' },
      { id: 'end', label: 'End day number', placeholder: '26', min: '1', step: '1' },
    ],
  },
  {
    slug: 'weeks-to-days-calculator',
    title: 'Weeks to Days Calculator',
    categorySlug: 'age-date',
    description: 'Convert weeks into an exact number of days.',
    formulaLabel: 'Weeks multiplied by 7',
    popularity: '430K/mo',
    fields: [
      { id: 'weeks', label: 'Weeks', placeholder: '6', min: '0', step: '0.1' },
    ],
  },
  {
    slug: 'hours-to-minutes-calculator',
    title: 'Hours to Minutes Calculator',
    categorySlug: 'age-date',
    description: 'Convert hours into minutes for schedules, shifts, and time planning.',
    formulaLabel: 'Hours multiplied by 60',
    popularity: '390K/mo',
    fields: [
      { id: 'hours', label: 'Hours', placeholder: '3.5', min: '0', step: '0.1' },
    ],
  },
];

export const categories: Category[] = [
  {
    slug: 'health',
    title: 'Health',
    count: healthTools.length,
    description: 'Health and wellness calculators for everyday personal planning.',
    tools: healthTools,
  },
  {
    slug: 'maths',
    title: 'Maths',
    count: mathsTools.length,
    description: 'Fast mathematical calculators for school, work, and daily problem-solving.',
    tools: mathsTools,
  },
  {
    slug: 'finance',
    title: 'Finance',
    count: financeTools.length,
    description: 'Reliable calculators for loans, tax, investments, and personal finance decisions.',
    tools: financeTools,
  },
  {
    slug: 'age-date',
    title: 'Age & Date',
    count: ageDateTools.length,
    description: 'Simple date and time converters for planning and record keeping.',
    tools: ageDateTools,
  },
];

export const tools = categories.flatMap((category) => category.tools);

const editorialArticles: Article[] = [
  {
    slug: 'how-to-calculate-emi-accurately',
    title: 'How to Calculate EMI Accurately Before Taking a Loan',
    categorySlug: 'finance',
    relatedToolSlugs: ['emi-calculator'],
    excerpt: 'Understand the three inputs that shape every EMI and how small rate changes affect monthly payments.',
    readTime: '6 min read',
    date: 'Jul 18, 2026',
    author: 'Calculate Karo Editorial',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'bmi-results-explained',
    title: 'BMI Results Explained: What the Number Can and Cannot Tell You',
    categorySlug: 'health',
    relatedToolSlugs: ['bmi-calculator'],
    excerpt: 'A practical guide to reading BMI results responsibly alongside broader health context.',
    readTime: '5 min read',
    date: 'Jul 12, 2026',
    author: 'Calculate Karo Editorial',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'percentage-calculations-for-business',
    title: 'Percentage Calculations Every Small Business Should Know',
    categorySlug: 'maths',
    relatedToolSlugs: ['percentage-calculator'],
    excerpt: 'Use percentages correctly for margins, discounts, taxes, and month-over-month comparisons.',
    readTime: '7 min read',
    date: 'Jul 6, 2026',
    author: 'Calculate Karo Editorial',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'date-planning-with-simple-calculators',
    title: 'Use Date Calculators to Plan Deadlines Without Mistakes',
    categorySlug: 'age-date',
    relatedToolSlugs: ['date-difference-calculator', 'age-calculator'],
    excerpt: 'Avoid manual counting errors when planning project milestones, renewals, and follow-ups.',
    readTime: '4 min read',
    date: 'Jun 29, 2026',
    author: 'Calculate Karo Editorial',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
  },
];

const categoryArticleImages: Record<CategorySlug, string> = {
  finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  health: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  maths: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'age-date': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
};

const categoryGuideNouns: Record<CategorySlug, string> = {
  finance: 'financial planning',
  health: 'personal wellness',
  maths: 'daily problem-solving',
  'age-date': 'schedule planning',
};

const toolGuideArticles: Article[] = tools.flatMap((tool, index) => [
  {
    slug: `${tool.slug}-practical-guide`,
    title: `How to Use the ${tool.title} for ${categoryGuideNouns[tool.categorySlug]}`,
    categorySlug: tool.categorySlug,
    relatedToolSlugs: [tool.slug],
    excerpt: `A focused guide to choosing realistic inputs, reading the result, and using the ${tool.title} with confidence.`,
    readTime: '4 min read',
    date: `Jul ${String(20 - (index % 9)).padStart(2, '0')}, 2026`,
    author: 'Calculate Karo Editorial',
    image: categoryArticleImages[tool.categorySlug],
  },
  {
    slug: `${tool.slug}-common-mistakes`,
    title: `Common ${tool.title} Mistakes and How to Avoid Them`,
    categorySlug: tool.categorySlug,
    relatedToolSlugs: [tool.slug],
    excerpt: `Avoid input errors, mismatched units, and assumption gaps that can make ${tool.title.toLowerCase()} results harder to trust.`,
    readTime: '3 min read',
    date: `Jun ${String(28 - (index % 8)).padStart(2, '0')}, 2026`,
    author: 'Calculate Karo Editorial',
    image: categoryArticleImages[tool.categorySlug],
  },
]);

export const articles: Article[] = [...editorialArticles, ...toolGuideArticles];

export const findCategory = (slug?: string) =>
  categories.find((category) => category.slug === slug);

export const findTool = (slug?: string) =>
  tools.find((tool) => tool.slug === slug);

export const findArticle = (slug?: string) =>
  articles.find((article) => article.slug === slug);

export const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export const formatNumber = (value: number, maximumFractionDigits = 2) =>
  value.toLocaleString('en-IN', { maximumFractionDigits });

const getNumber = (values: Record<string, string>, key: string) => {
  const value = Number(values[key]);
  return Number.isFinite(value) ? value : 0;
};

const gcd = (a: number, b: number): number => {
  const nextA = Math.abs(Math.round(a));
  const nextB = Math.abs(Math.round(b));
  if (nextB === 0) return nextA;
  return gcd(nextB, nextA % nextB);
};

export const calculateTool = (tool: Tool, values: Record<string, string>): ToolResult | null => {
  if (tool.fields.some((field) => !values[field.id])) return null;

  switch (tool.slug) {
    case 'emi-calculator': {
      const principal = getNumber(values, 'principal');
      const monthlyRate = getNumber(values, 'rate') / 12 / 100;
      const months = getNumber(values, 'years') * 12;
      if (principal <= 0 || months <= 0) return null;
      const emi = monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
      const total = emi * months;
      return {
        primary: formatCurrency(emi),
        secondary: 'Estimated monthly EMI',
        detail: `Total payable: ${formatCurrency(total)}. Estimated interest: ${formatCurrency(total - principal)}.`,
      };
    }
    case 'sip-calculator': {
      const monthly = getNumber(values, 'monthly');
      const months = getNumber(values, 'years') * 12;
      const monthlyRate = getNumber(values, 'rate') / 12 / 100;
      if (monthly <= 0 || months <= 0) return null;
      const futureValue = monthlyRate === 0
        ? monthly * months
        : monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
      return {
        primary: formatCurrency(futureValue),
        secondary: 'Projected maturity value',
        detail: `Invested amount: ${formatCurrency(monthly * months)}. Estimated gain: ${formatCurrency(futureValue - monthly * months)}.`,
      };
    }
    case 'gst-calculator': {
      const amount = getNumber(values, 'amount');
      const tax = amount * getNumber(values, 'rate') / 100;
      return {
        primary: formatCurrency(amount + tax),
        secondary: 'Invoice value including GST',
        detail: `GST amount: ${formatCurrency(tax)}. Base amount: ${formatCurrency(amount)}.`,
      };
    }
    case 'compound-interest-calculator': {
      const principal = getNumber(values, 'principal');
      const amount = principal * (1 + getNumber(values, 'rate') / 100) ** getNumber(values, 'years');
      return {
        primary: formatCurrency(amount),
        secondary: 'Future value',
        detail: `Interest earned: ${formatCurrency(amount - principal)}.`,
      };
    }
    case 'bmi-calculator': {
      const heightM = getNumber(values, 'height') / 100;
      const bmi = getNumber(values, 'weight') / (heightM * heightM);
      if (!Number.isFinite(bmi) || bmi <= 0) return null;
      const range = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight' : 'Obesity range';
      return {
        primary: formatNumber(bmi, 1),
        secondary: range,
        detail: 'BMI is a screening measure and should not replace professional medical advice.',
      };
    }
    case 'calorie-needs-calculator': {
      const calories = 10 * getNumber(values, 'weight') + 6.25 * getNumber(values, 'height') - 5 * getNumber(values, 'age') + 5;
      return {
        primary: `${formatNumber(calories)} kcal/day`,
        secondary: 'Estimated maintenance calories',
        detail: 'This uses a standard adult baseline before activity adjustments.',
      };
    }
    case 'water-intake-calculator': {
      const liters = getNumber(values, 'weight') * 35 / 1000;
      return {
        primary: `${formatNumber(liters, 2)} L/day`,
        secondary: 'Suggested hydration target',
        detail: 'Adjust for weather, activity, health conditions, and medical guidance.',
      };
    }
    case 'ideal-weight-calculator': {
      const heightM = getNumber(values, 'height') / 100;
      return {
        primary: `${formatNumber(18.5 * heightM * heightM, 1)} - ${formatNumber(24.9 * heightM * heightM, 1)} kg`,
        secondary: 'Healthy BMI reference range',
        detail: 'This is a general reference range, not a personalized diagnosis.',
      };
    }
    case 'percentage-calculator': {
      const result = getNumber(values, 'value') * getNumber(values, 'percent') / 100;
      return {
        primary: formatNumber(result),
        secondary: 'Percentage value',
        detail: `${formatNumber(getNumber(values, 'percent'))}% of ${formatNumber(getNumber(values, 'value'))} is ${formatNumber(result)}.`,
      };
    }
    case 'average-calculator': {
      const count = getNumber(values, 'count');
      if (count <= 0) return null;
      return {
        primary: formatNumber(getNumber(values, 'total') / count),
        secondary: 'Arithmetic average',
        detail: `Total ${formatNumber(getNumber(values, 'total'))} divided across ${formatNumber(count, 0)} items.`,
      };
    }
    case 'ratio-calculator': {
      const a = getNumber(values, 'a');
      const b = getNumber(values, 'b');
      const divisor = gcd(a, b);
      if (divisor === 0) return null;
      return {
        primary: `${Math.round(a / divisor)}:${Math.round(b / divisor)}`,
        secondary: 'Simplified ratio',
        detail: `Original ratio ${formatNumber(a, 0)}:${formatNumber(b, 0)} reduced by ${divisor}.`,
      };
    }
    case 'square-root-calculator': {
      const value = getNumber(values, 'value');
      if (value < 0) return null;
      return {
        primary: formatNumber(Math.sqrt(value)),
        secondary: 'Principal square root',
        detail: `${formatNumber(Math.sqrt(value))} x ${formatNumber(Math.sqrt(value))} = ${formatNumber(value)}.`,
      };
    }
    case 'age-calculator': {
      const currentYear = new Date().getFullYear();
      const age = currentYear - getNumber(values, 'year');
      if (age < 0) return null;
      return {
        primary: `${formatNumber(age, 0)} years`,
        secondary: 'Approximate age',
        detail: `Calculated against calendar year ${currentYear}. Exact age depends on birth month and day.`,
      };
    }
    case 'date-difference-calculator': {
      const days = Math.abs(getNumber(values, 'end') - getNumber(values, 'start'));
      return {
        primary: `${formatNumber(days, 0)} days`,
        secondary: 'Difference between day numbers',
        detail: 'For full calendar dates, include month and year in your planning check.',
      };
    }
    case 'weeks-to-days-calculator': {
      return {
        primary: `${formatNumber(getNumber(values, 'weeks') * 7)} days`,
        secondary: 'Converted duration',
        detail: 'One calendar week equals exactly 7 days.',
      };
    }
    case 'hours-to-minutes-calculator': {
      return {
        primary: `${formatNumber(getNumber(values, 'hours') * 60)} minutes`,
        secondary: 'Converted time',
        detail: 'One hour equals exactly 60 minutes.',
      };
    }
    default:
      return null;
  }
};
