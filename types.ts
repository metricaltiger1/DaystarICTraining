
export interface Activity {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  outcomes: string[];
  imageUrl: string;
}

export interface ScenarioStep {
  step: number;
  prompt: string;
  hint: string;
}

export interface Scenario {
  id: string;
  title: string;
  roles: string[];
  instructions: string[];
  steps: ScenarioStep[];
}

export interface Resource {
  title: string;
  type: 'Reading' | 'Video' | 'Bible Reference';
  description: string;
  link: string;
}
