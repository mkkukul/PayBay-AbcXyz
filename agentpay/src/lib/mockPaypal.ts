import { v4 as uuidv4 } from "uuid";
import { Payment } from "@/types";

let payments: Payment[] = [];

export async function sendPayout(
  from: string,
  to: string,
  amount: number = 15
): Promise<Payment> {
  // Simulated delay to feel real
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const payment: Payment = {
    id: uuidv4(),
    from,
    to,
    amount,
    currency: "USD",
    status: "completed",
    timestamp: new Date(),
  };

  payments.unshift(payment);
  return payment;
}

export function getPayments(): Payment[] {
  return payments;
}

export function clearPayments() {
  payments = [];
}
