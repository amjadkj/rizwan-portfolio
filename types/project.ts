export type ImageData = {
  src: string;
  alt: string;
};

export type IntroData = {
  title: string;
  description: string; // 1 to 3 sentences, max ~220 characters
  tools: string[]; // 1 to 10 items, each rendered as a pill
  image: ImageData; // full-bleed background
  imagePosition?: string; // CSS object-position, default "center"
  backHref?: string; // default "/#projects"
};

export type AssessmentData = {
  eyebrow?: string; // default "BUSINESS NEEDS ASSESSMENT"
  heading?: string; // default "Assessment"
  tagline?: string; // default: see section 8
  description: string[]; // one string per paragraph, supplied per project
  image: ImageData; // supplied per project
};

export type PointData = {
  icon?: string; // key in iconMap, falls back to a default cycle
  text: string; // one or two sentences
};

export type StakeholdersData = {
  heading?: string; // default "Stakeholder Engagement & Requirements Elicitation"
  tag?: string; // chip on the image card, e.g. "Stakeholders"
  panelTitle?: string; // large text on the image card, optional
  panelTagline?: string; // small text under panelTitle, optional
  image: ImageData; // supplied per project
  points: PointData[]; // 1 to 6, extra items are ignored
};

export type EvaluationPoint = {
  icon?: string; // key in iconMap, falls back to a default cycle
  title?: string; // short label, optional
  text: string; // one to three sentences
};

export type EvaluationData = {
  eyebrow?: string; // default "KEY FINDINGS"
  heading?: string; // default "Solution Evaluation & Recommendations"
  image: ImageData; // supplied per project, shown in the middle
  imageStyle?: "free" | "framed"; // default "free" (transparent cutouts)
  points: EvaluationPoint[]; // 1 to 6, extra items are ignored
};

export type ValidationPoint = {
  icon?: string; // key in iconMap, default "CheckCircle2" for all
  title: string; // short module or outcome name
  text?: string; // one or two sentences, optional
};

export type ValidationData = {
  heading?: string; // default "Solution Validation & Continuous Improvement"
  listLabel?: string; // default "VALIDATION & IMPROVEMENTS"
  images: ImageData[]; // 1 to 4, extra items are ignored
  points: ValidationPoint[]; // 1 to 6, extra items are ignored
};

export type ComparisonSide = {
  image: ImageData; // supplied per project
  heading: string; // shown in the overlay when this side is dominant
  points: string[]; // 1 to 6 descriptions, extra items are ignored
};

export type ComparisonData = {
  heading?: string; // optional section heading, hidden when absent
  tagline?: string; // optional, hidden when absent
  old: ComparisonSide; // left side, shown when the divider is past 50%
  new: ComparisonSide; // right side, shown when the divider is under 50%
  labels?: [string, string]; // chips on the frame, default ["Old", "New"]
  sliderLabel?: string; // accessible name of the divider
  aspectRatio?: string; // default "16 / 9"
  defaultPosition?: number; // default 50
};

export type Project = {
  slug: string;
  intro: IntroData;
  assessment?: AssessmentData;
  stakeholders?: StakeholdersData;
  comparison?: ComparisonData;
  evaluation?: EvaluationData;
  validation?: ValidationData;
};

