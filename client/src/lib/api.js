const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const API_URLS = {
  auth: {
    signIn: `${API_BASE_URL}/api/auth/sign-in`,
    signUp: `${API_BASE_URL}/api/auth/sign-up`,
    signOut: `${API_BASE_URL}/api/auth/sign-out`,
  },
  user: {
    getHistory: `${API_BASE_URL}/api/user/get-history`,
    colorHistory: `${API_BASE_URL}/api/user/color-history`,
  },
};

export default API_BASE_URL;
