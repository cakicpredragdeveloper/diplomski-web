import {GeoLocation} from "./GeoLocation";

export interface Coordinate {

  timestamp: Date;
  vin: string;
  speed: number;
  geoLocation: GeoLocation;
  place: string;
  fuelLevel: number;
  city: string;
  bateryVoltage: number;
  direction: number;
  manufacturerName: string;
  modelName: string;
}
