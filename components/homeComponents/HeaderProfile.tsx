import { Image, Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Title from "../common/Title";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/StackNavigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HeaderProfile = () => {
  const { userData } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const profilePicClickHandler = () => {
    navigation.navigate("Profile");
  };
  const friendsListClickHandler = () => {
    navigation.navigate("Friends");
  };
  if (!userData) return null;
  return (
    <View style={styles.headerContainer}>
      <Title />
      <View style={styles.optionsContainer}>
        <Ionicons name="notifications-circle-outline" size={50} />
        <Pressable onPress={friendsListClickHandler} style={styles.friendsIcon}>
          <FontAwesome5 name="user-friends" size={20} />
        </Pressable>
        <Pressable onPress={profilePicClickHandler}>
          <Image
            style={styles.profilePic}
            source={{
              uri: userData.avatar,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  friendsIcon: {
    height: 42,
    width: 42,
    padding: 5,
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});
