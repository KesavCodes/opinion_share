import api from "./axiosConfig";
import { Alert } from "react-native";

type GetFriendsProps = {
  username: string;
  searchText: string;
};

export const getFriends = async ({ username, searchText }: GetFriendsProps) => {
  let url = `/friend/${username}/friends`;
  if (searchText) {
    url += `?search=${searchText}`;
  }
  try {
    const res = await api.get(url);
    return res.data.data;
  } catch (error: any) {
    Alert.alert(
      "Friends data fetch Failed",
      error.response?.data?.message || error.message
    );
  }
};
