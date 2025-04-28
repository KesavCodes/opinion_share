import { Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../common/Title";

const HeaderProfile = () => {
  return (
    <View style={styles.headerContainer}>
      <Title />
      <View style={styles.optionsContainer}>
        <Ionicons name="notifications-circle-outline" size={50} />
        <Ionicons name="search-circle-outline" size={50} />
        <Image
          style={styles.profilePic}
          source={{
            uri: "https://th.bing.com/th/id/OIP.Fhxe1ojPRPz36muHp8UVMAHaHa?w=500&h=500&rs=1&pid=ImgDetMain",
          }}
        />
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
