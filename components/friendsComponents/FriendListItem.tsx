import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FriendsResponse } from "../QuestionComponents/PreviewQuestion/FriendDrawer";
import { colors } from "../../constants/colors";

interface FriendListItemProps {
  friendData: FriendsResponse;
  ctaComponent?: React.ReactNode;
}

const FriendListItem = ({ friendData, ctaComponent }: FriendListItemProps) => {
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
});
