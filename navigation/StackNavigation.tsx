import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { StatusBar } from "react-native";
import AskQuestionScreen from "../screens/AskQuestionScreen";

type RootStackParamList = {
  Home: undefined; // No params for this route
  AskQuestion: undefined; // No params for this route
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
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
    </Stack.Navigator>
  );
};

export default StackNavigation;
