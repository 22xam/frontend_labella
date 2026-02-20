import { login, me } from "./auth";

export const authService = {
  async loginWithPassword(identifier, password) {
    await login(identifier, password);
    return me();
  },
};
