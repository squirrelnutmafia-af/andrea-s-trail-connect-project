export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type TechnicalGrade = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';

export type Highlight = 
  | 'lake' 
  | 'river' 
  | 'waterfall' 
  | 'coastline' 
  | 'forest' 
  | 'historical' 
  | 'ruins' 
  | 'viewpoint';

export type RouteFeature = 
  | 'via-ferrata' 
  | 'climbing' 
  | 'canyoning' 
  | 'ridge' 
  | 'mountain-pass' 
  | 'scrambling' 
  | 'avoids-roads' 
  | 'circular' 
  | 'point-to-point';

export type Facility = 
  | 'restaurant' 
  | 'mountain-hut' 
  | 'refuge' 
  | 'water-source' 
  | 'cable-car';

export interface HikingRoute {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  distance: number; // km
  duration: number; // hours
  elevationGain: number; // meters
  difficulty: Difficulty;
  technicalGrade: TechnicalGrade;
  highlights: Highlight[];
  features: RouteFeature[];
  facilities: Facility[];
  rating: number; // 1-5
  reviewCount: number;
  region: string;
}

export interface RouteFilters {
  difficulty: Difficulty[];
  technicalGrade: TechnicalGrade[];
  distanceMin: number;
  distanceMax: number;
  durationMin: number;
  durationMax: number;
  highlights: Highlight[];
  features: RouteFeature[];
  facilities: Facility[];
}

export type SortOption = 
  | 'popular' 
  | 'rating' 
  | 'distance-asc' 
  | 'distance-desc' 
  | 'duration-asc' 
  | 'elevation';

export const TECHNICAL_GRADE_LABELS: Record<TechnicalGrade, string> = {
  T1: 'Hiking',
  T2: 'Mountain hiking',
  T3: 'Demanding mountain hiking',
  T4: 'Alpine hiking',
  T5: 'Demanding alpine hiking',
  T6: 'Difficult alpine hiking',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export const HIGHLIGHT_LABELS: Record<Highlight, string> = {
  lake: 'Lakes',
  river: 'Rivers',
  waterfall: 'Waterfalls',
  coastline: 'Coastline',
  forest: 'Forests',
  historical: 'Historical sites',
  ruins: 'Ruins',
  viewpoint: 'Viewpoints',
};

export const FEATURE_LABELS: Record<RouteFeature, string> = {
  'via-ferrata': 'Via Ferrata',
  climbing: 'Climbing sections',
  canyoning: 'Canyoning',
  ridge: 'Ridges',
  'mountain-pass': 'Mountain passes',
  scrambling: 'Scrambling',
  'avoids-roads': 'Avoids main roads',
  circular: 'Circular route',
  'point-to-point': 'Point-to-point',
};

export const FACILITY_LABELS: Record<Facility, string> = {
  restaurant: 'Restaurants',
  'mountain-hut': 'Mountain huts',
  refuge: 'Refuges',
  'water-source': 'Water sources',
  'cable-car': 'Cable car access',
};
