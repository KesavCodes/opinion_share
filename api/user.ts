import { UserData } from "../store/AuthContext";
import api from "./axiosConfig";
import { Alert } from "react-native";

type AuthenticateUser = {
  mode: "login" | "signup";
  email?: string;
  username?: string;
  password: string;
  setUserData: (userData: UserData) => void;
};

type AuthRequestBody = {
  idText?: string;
  email?: string;
  username?: string;
  password: string;
};

type updateUserProps = {
  email: string;
  name: string;
  userToken: string;
  avatar?: string;
  setUserData: (userData: UserData) => void;
};

export const authenticateUser = async ({
  mode,
  email,
  username,
  password,
  setUserData,
}: AuthenticateUser) => {
  const body: AuthRequestBody = {
    password,
  };
  if (mode === "login") {
    body.idText = email;
  } else {
    body.email = email;
    body.username = username;
  }
  try {
    const res = await api.post(
      `/auth/${mode === "login" ? "login" : "register"}`,
      body
    );
    const data = {
      ...res.data.data.user,
      userToken: res.data.data.token,
    };
    setUserData(data);
  } catch (error: any) {
    Alert.alert(
      "Register Failed",
      error.response?.data?.message || error.message
    );
  }
};

export const updateUser = async ({
  email,
  name,
  avatar,
  userToken,
  setUserData,
}: updateUserProps) => {
  try {
    const res = await api.put(`/user/me`, {
      email,
      name,
      avatar,
    });
    const data = {
      ...res.data.data,
      userToken,
    };

    setUserData(data);
    Alert.alert("Update Successful", "Your profile has been updated.");
  } catch (error: any) {
    Alert.alert(
      "Update Failed",
      error.response?.data?.message || error.message
    );
  }
};
