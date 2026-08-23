export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionPlan?: "trial" | "annual" | "vip";
  expiresAt?: string;
  maxConnections?: number;
  isLoggedIn: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
