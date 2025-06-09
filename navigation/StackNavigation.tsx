import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { StatusBar, Text } from "react-native";
import AskQuestionScreen from "../screens/AskQuestionScreen";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import ProfilePageScreen from "../screens/ProfilePageScreen";
import PreviewAndConfirmScreen from "../screens/PreviewAndConfirmScreen";
import FriendsTabs from "./FriendsTabNavigation";

type RootStackParamList = {
  Home: undefined;
  AskQuestion: undefined;
  PreviewAndConfirm: undefined;
  Auth: undefined;
  Profile: undefined;
  Friends: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const { userData, loading } = useContext(AuthContext);
  if (loading) return <Text>Loading...</Text>;
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          paddingTop: StatusBar.currentHeight
            ? StatusBar.currentHeight + 8
            : undefined,
          backgroundColor: "white",
        },
      }}
    >
      {userData && userData.userToken ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AskQuestion"
            component={AskQuestionScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PreviewAndConfirm"
            component={PreviewAndConfirmScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilePageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Friends"
            component={FriendsTabs}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
