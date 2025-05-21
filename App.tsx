import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "./navigation/StackNavigation";
import QuestionOptionsContextProvider from "./store/questionOptionsContext";
import AuthProvider from "./store/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <QuestionOptionsContextProvider>
        <NavigationContainer>
          <StackNavigation />
          <StatusBar style="dark" />
        </NavigationContainer>
      </QuestionOptionsContextProvider>
    </AuthProvider>
  );
};

export default App;
