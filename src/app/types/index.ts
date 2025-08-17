import { Moment } from "moment";

export interface Location {
  name: string;
  address: string;
  contact: string;
  images: File[];
}

export interface Service {
  id: number;
  name: string;
  duration: number;
}

export interface registerBusinessFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  // Business Information
  businessName: string;
  businessDescription: string;
  // Locations
  locations: Location[];
  services: Service[];
}

export interface BusinessEntity {
  id?: number;
  name: string;
  description: string;
  services: Service[];
  locations: Location[];
}

export interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
}

export interface CategoryType {
  id?: number;
  name: string;
  description: string;
  status: string;
  updatedAt?: Moment;
  createdAt?: Moment;
}

export interface ServiceType {
  id?: number;
  name: string;
  description: string;
  status: string;
  categoryId: number;
  category?: CategoryType;
  updatedAt?: Moment;
  createdAt?: Moment;
}
