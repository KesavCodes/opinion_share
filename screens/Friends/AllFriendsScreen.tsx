import React, { useEffect, useState } from "react";
import { getFriends } from "../../api/friends";
import { FriendsResponse } from "../../components/QuestionComponents/PreviewQuestion/FriendDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendListItem from "../../components/friendsComponents/FriendListItem";

const AllFriendsScreen = () => {
  const [availableFriends, setAvailableFriends] = useState<FriendsResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const setFriendsData = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("osUser");
      const friends = await getFriends({
        username: JSON.parse(userData!).username,
        searchText: "",
      });
      setAvailableFriends(friends);
      setIsLoading(false);
    };
    setFriendsData();
  }, []);

  return (
    <FriendListItem friendsData={availableFriends} isLoading={isLoading} />
  );
};

export default AllFriendsScreen;
