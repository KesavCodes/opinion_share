import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchFriendsScreen from "../screens/Friends/SearchFriendsScreen";
import AllFriendsScreen from "../screens/Friends/AllFriendsScreen";
import FriendRequestScreen from "../screens/Friends/FriendRequestScreen";
import { StyleSheet, View } from "react-native";
import Title from "../components/common/Title";
import { colors } from "../constants/colors";

const Tab = createMaterialTopTabNavigator();

const FriendsTabs = () => {
  return (
    <View style={styles.container}>
      <Title holderStyle={styles.center} />
      <Tab.Navigator
        initialRouteName="AllFriends"
        backBehavior="none"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#ff5d5d",
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen name="Search" component={SearchFriendsScreen} />
        <Tab.Screen
          name="AllFriends"
          options={{ title: "All Friends" }}
          component={AllFriendsScreen}
        />
        <Tab.Screen
          name="FriendRequest"
          options={{ title: "Friend Request" }}
          component={FriendRequestScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default FriendsTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    gap: 12,
    backgroundColor: colors.bgPrimary,
  },
  center: {
    alignItems: "center",
  },
});
