import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { StatusBar, Text } from "react-native";
import AskQuestionScreen from "../screens/AskQuestionScreen";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import ProfilePageScreen from "../screens/ProfilePageScreen";

type RootStackParamList = {
  Home: undefined; // No params for this route
  AskQuestion: undefined; // No params for this route
  Auth: undefined;
  Profile: undefined;
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
      {(userData && userData.userToken) ? (
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
            name="Profile"
            component={ProfilePageScreen}
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
