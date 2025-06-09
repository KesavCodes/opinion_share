import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../UI/Button";
import { colors } from "../../../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext, useEffect, useState } from "react";
import { QuestionOptionsContext } from "../../../store/questionOptionsContext";
import { getFriends } from "../../../api/friends";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shimmer from "../../UI/Shimmer";

export type FriendsResponse = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

const FriendDrawer = () => {
  const [availableFriends, setAvailableFriends] = useState<FriendsResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { friendsList, addFriend, removeFriend } = useContext(
    QuestionOptionsContext
  );
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
  if (!isLoading && (!availableFriends || availableFriends.length === 0))
    return null;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Shimmer width={220} height={110} />
        ) : (
          availableFriends.map((item, index) => {
            const isSelected = friendsList.includes(item.id);
            const displayName = item.name || item.username;
            return (
              <View
                key={item.id}
                style={[
                  styles.card,
                  index === 0 && styles.firstCard,
                  index === availableFriends.length - 1 && styles.lastCard,
                ]}
              >
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: item.avatar,
                  }}
                />
                <View style={styles.ctaContainer}>
                  <View style={styles.titleHolder}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {displayName}
                    </Text>
                  </View>
                  <Button
                    onPressHandler={
                      isSelected
                        ? () => removeFriend(item.id)
                        : () => addFriend(item.id)
                    }
                  >
                    <View
                      style={[
                        styles.ctaBtn,
                        isSelected ? styles.removeColor : styles.addColor,
                      ]}
                    >
                      <Text style={styles.labelText}>
                        {isSelected ? "Remove" : "Add"}
                      </Text>
                      <AntDesign
                        name={isSelected ? "minuscircle" : "pluscircle"}
                        size={18}
                        color="white"
                      />
                    </View>
                  </Button>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default FriendDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: colors.bgSecondary,
  },
  firstCard: {
    marginLeft: 12,
  },
  lastCard: {
    marginRight: 12,
  },
  titleHolder: {
    width: 100,
    overflow: "hidden",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    width: "98%",
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1.5,
  },
  ctaContainer: {
    gap: 8,
  },
  ctaBtn: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  addColor: {
    backgroundColor: colors.bgDark,
  },
  removeColor: {
    backgroundColor: "#ff5d5d",
  },
  labelText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
  },
});
