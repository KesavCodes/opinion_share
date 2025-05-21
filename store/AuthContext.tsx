import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserData = {
  userToken: string;
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};

type AuthContextType = {
  userData: UserData | null;
  storeUserData: (userData: UserData) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  storeUserData: (userData: UserData) => {},
  logout: () => {},
  loading: false,
});

const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [loading, setLoading] = useState(true);

  const storeUserData = async (userData: UserData) => {
    await AsyncStorage.setItem("osUser", JSON.stringify(userData));
    setUserData(userData);
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem("osUser");
    setUserData(null);
  };

  const checkLoginStatus = async () => {
    const userData = await AsyncStorage.getItem("osUser");
    setUserData(userData ? JSON.parse(userData) : null);
    setLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        storeUserData,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
