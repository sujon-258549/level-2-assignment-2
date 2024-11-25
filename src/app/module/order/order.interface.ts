// email (string): The email address of the customer.
// car (ObjectId): The car ordered. (unused ref) (enter the created carId from your database which car you would love to buy).
// quantity (number): The quantity of the ordered car.
// totalPrice (number): The total price (car price * quantity).
// import { Types } from 'mongoose';
export interface TOrder {
  email: string; // The email address of the customer
  car: string; // Reference to the car ID in the database
  quantity: number; // Quantity of the ordered car
  totalPrice: number; // Total price (car price * quantity)
}
