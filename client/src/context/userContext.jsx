import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

// Create the UserContext with default values
export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to log in the user and save the data to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to log out the user and remove the data from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Automatically save user data to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);

  // Ensure the hook is used within a UserProvider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  return context;
};
