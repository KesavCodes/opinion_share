import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getFriends } from "../../api/friends";
import { FriendsResponse } from "../../components/QuestionComponents/PreviewQuestion/FriendDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendListItem from "../../components/friendsComponents/FriendListItem";
import RemoveFriendOption from "../../components/friendsComponents/RemoveFriendOption";

const AllFriendsScreen = () => {
  const [availableFriends, setAvailableFriends] = useState<FriendsResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<Record<string, boolean>>({});
  const [prevSelectedId, setPrevSelectedId] = useState<string | null>(null);

  const optionClickHandler = (id: string) => {
    setShowOptions((prevState) => {
      if (prevSelectedId && prevSelectedId !== id) {
        prevState[prevSelectedId] = false;
      }
      prevState[id] = !prevState[id];
      return { ...prevState };
    });
    setPrevSelectedId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const setFriendsData = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("osUser");
      const friends = await getFriends({
        username: JSON.parse(userData!).username,
        searchText: "",
      });
      setAvailableFriends(friends);
      setShowOptions(
        friends.reduce(
          (acc: Record<string, boolean>, friend: FriendsResponse) => {
            acc[friend.id] = false;
            return acc;
          },
          {}
        )
      );
      setIsLoading(false);
    };
    setFriendsData();
  }, []);

  return (
    <View>
      <FlatList
        data={availableFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendListItem
            friendData={item}
            ctaComponent={
              <RemoveFriendOption
                id={item.id}
                showOptions={showOptions[item.id]}
                optionClickHandler={optionClickHandler}
              />
            }
          />
        )}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          isLoading ? <Text>Loading...</Text> : <Text>No friends found</Text>
        }
      />
    </View>
  );
};

export default AllFriendsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 8,
  },
});
