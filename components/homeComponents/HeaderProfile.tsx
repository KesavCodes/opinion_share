import { Image, Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../common/Title";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HeaderProfile = () => {
  const { userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const profilePicClickHandler = () => {
    navigation.navigate("Profile");
  };
  if (!userData) return null;
  return (
    <View style={styles.headerContainer}>
      <Title />
      <View style={styles.optionsContainer}>
        <Ionicons name="notifications-circle-outline" size={50} />
        <Ionicons name="search-circle-outline" size={50} />
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
