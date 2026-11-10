export type Language = "en" | "fr" | "es" | "de" | "it" | "ar" | "pt" | "ru" | "tr";

export interface Message {
  id: string;
  from: "user" | "content-agent" | "design-agent" | "system";
  text: string;
  timestamp: Date;
}

export interface Payment {
  id: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}
