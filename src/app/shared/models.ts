export interface Escape {
  id: string;
  title: string;
  url: string;
  image: string;
  notes: string;
  locationType: string;
  coordinates: string;
  offers: string[];
  visited: boolean;
  distance: number;
  voting: -1 | 0 | 1 | 2 | 3 | 4 | 5;
}
export type EscapeKey = keyof Escape;

export interface Track {
  id: string;
  title: string;
  url: string;
  notes: string;
  coordinates: string;
  attributes: string[];
  distance: number;
  gpx: string;
}

export type TrackKey = keyof Track;

export interface EscapeAdd {
  title: string;
  url: string;
  image: string;
  notes: string;
  locationType: string;
  coordinates: string;
  offers: { offerType: string, offered: boolean }[];
}

export interface TrackAdd {
  title: string;
  url: string;
  notes: string;
  attributes: string[];
  gpx: string;
}

export enum LocationType {
  CAMP = 'CAMP',
  HOTEL = 'HOTEL',
  WILD = 'WILD'
}

export enum Offer {
  FOOD = "FOOD",
  TOILET = "TOILET",
  SHOWER = "SHOWER",
  SWIMMING = "SWIMMING",
  WIFI = "WIFI",
  ELECTRICITY = "ELECTRICITY",
  SHOP = "SHOP",
}

export enum TrackAttributes {
  FOOD = "FOOD",
  LOOP = "LOOP",
  LAKE = "LAKE",
  RIVER = "RIVER",
}
