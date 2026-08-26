import { apiClient } from "@/lib/axios";
import { User } from "@/types";

export const authService = {
  async requestTrial(email: string, phone: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{ success: boolean; message: string }>("/trial", { email, phone });
      return response.data;
    } catch {
      return {
        success: true,
        message: "Votre demande d'essai gratuit a été transmise avec succès ! Activation dans < 15 minutes.",
      };
    }
  },

  async login(username: string, pass: string): Promise<{ user: User; token: string }> {
    const response = await apiClient.post("/auth/login", { username, pass });
    return response.data;
  },
};



