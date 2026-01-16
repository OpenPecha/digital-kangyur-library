export interface TimelineEvent {
  id: string;
  title: {
    tibetan: string;
    english: string;
    sanskrit?: string;
  };
  date: {
    year: number;
    century?: string;
    era?: string;
    approximate?: boolean;
  };
  description: {
    tibetan?: string;
    english: string;
  };
  category: 'translation' | 'compilation' | 'publication' | 'discovery' | 'transmission' | 'scholarship';
  location?: {
    tibetan?: string;
    english: string;
  };
  key_figures?: Array<{
    name: {
      tibetan: string;
      english: string;
    };
    role: string;
  }>;
  significance: 'major' | 'important' | 'minor';
  related_events?: string[];
  sources?: string[];
}

export interface TimelinePeriod {
  id: string;
  name: {
    tibetan: string;
    english: string;
  };
  startYear: number;
  endYear: number;
  description: string;
  events: TimelineEvent[];
} 