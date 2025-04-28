import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "./navigation/StackNavigation";
import QuestionOptionsContextProvider from "./store/questionOptionsContext";

const App = () => {
  return (
    <QuestionOptionsContextProvider>
      <NavigationContainer>
        <StackNavigation />
        <StatusBar style="dark" />
      </NavigationContainer>
    </QuestionOptionsContextProvider>
  );
};

export default App;
