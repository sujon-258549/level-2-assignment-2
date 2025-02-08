// brand (string): The brand or manufacturer of the car (e.g., Toyota, BMW, Ford).
// model (string): The model of the car (e.g., Camry, 3 Series, Focus).
// year (number): The year of manufacture.
// price (number): Price of the car.
// category (string): The type of car (e.g., Sedan, SUV, Truck). use enum, exact value (Sedan, SUV, Truck, Coupe, Convertible)
// description (string): A brief description of the car's features.
// quantity (number): Quantity of the car available.
// inStock (boolean): Indicates if the car is in stock.
// Enum for Car Categories

// export type CarCategory = ;
// Interface for Car
export interface TCar {
  brand: 'Toyota' | 'BMW' | 'Ford'; // The brand or manufacturer of the car
  model: string; // The model of the car
  image?: string;
  year: number; // The year of manufacture
  price: number; // Price of the car
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible'; // The type of car (using the enum)
  description: string; // A brief description of the car's features
  quantity: number; // Quantity of the car available
  inStock: boolean; // Indicates if the car is in stock
}
