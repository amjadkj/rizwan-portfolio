import {
  Search,
  Database,
  LineChart,
  Cpu,
  Award,
  CheckCircle2,
  RefreshCw,
  FileText,
  Users,
  Target,
  Workflow,
  BarChart3,
  ShieldCheck,
  Compass,
  Route,
  ClipboardList,
  MessageSquare,
  Hash,
  Scale,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Search,
  Database,
  LineChart,
  Cpu,
  Award,
  CheckCircle2,
  RefreshCw,
  FileText,
  Users,
  Target,
  Workflow,
  BarChart3,
  ShieldCheck,
  Compass,
  Route,
  ClipboardList,
  MessageSquare,
  Hash,
  Scale,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
};

export const getIcon = (name?: string): LucideIcon => {
  if (!name) return Target;
  return iconMap[name] ?? Target;
};

