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

export interface EscapeAdd {
  title: string;
  url: string;
  image: string;
  notes: string;
  locationType: string;
  coordinates: string;
  offers: { offerType: string, offered: boolean }[];
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
