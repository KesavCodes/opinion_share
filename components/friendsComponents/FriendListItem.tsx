import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FriendsResponse } from "../QuestionComponents/PreviewQuestion/FriendDrawer";
import { colors } from "../../constants/colors";
import LoadingState from "../../assets/images/ui/Loading";
import EmptyState from "../../assets/images/ui/Empty";
import RemoveFriendOption from "./FriendOption";

interface FriendsListProps {
  friendsData: FriendsResponse[];
  isLoading: boolean;
  showEmptyState?: boolean;
}

interface FriendItemProps {
  friendData: FriendsResponse;
  ctaComponent?: React.ReactNode;
}

const LoadingFriends = () => (
  <View>
    <View style={styles.imgHolder}>
      <LoadingState />
    </View>
    <Text style={styles.feedbackText}>
      Sit tight, We are loading your Friends
    </Text>
  </View>
);

const EmptyFriends = () => (
  <View>
    <View style={styles.imgHolder}>
      <EmptyState />
    </View>
    <Text style={styles.feedbackText}>No friends found</Text>
  </View>
);

const FriendItem = ({ friendData, ctaComponent }: FriendItemProps) => {
  const displayName = friendData.name || friendData.username;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.profilePic}
          source={{
            uri: friendData.avatar,
          }}
        />
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {displayName}
        </Text>
      </View>
      {ctaComponent}
    </View>
  );
};

const FriendListItem = ({
  friendsData,
  isLoading,
  showEmptyState = true,
}: FriendsListProps) => {
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
    setShowOptions(
      friendsData.reduce(
        (acc: Record<string, boolean>, friend: FriendsResponse) => {
          acc[friend.id] = false;
          return acc;
        },
        {}
      )
    );
  }, []);

  return (
    <FlatList
      data={friendsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FriendItem
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
        isLoading ? (
          <LoadingFriends />
        ) : showEmptyState ? (
          <EmptyFriends />
        ) : undefined
      }
    />
  );
};

export default FriendListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    position: "relative",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 18,
    width: "70%",
    fontWeight: "500",
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  imgHolder: {
    maxHeight: 450,
  },
  feedbackText: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "500",
  },
  contentContainer: {
    paddingVertical: 8,
  },
});
