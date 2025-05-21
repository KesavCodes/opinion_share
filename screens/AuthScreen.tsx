import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import Title from "../components/common/Title";
import HeroSection from "../components/homeComponents/HeroSection";
import Button from "../components/UI/Button";
import { colors } from "../constants/colors";
import { authenticateUser } from "../api/user";
import { AuthContext } from "../store/AuthContext";

const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [userInput, setUserInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const updateUserInput = (key: string, value: string) => {
    setUserInput((prevState) => ({ ...prevState, [key]: value }));
  };
  const toggleAuthMode = () =>
    setAuthMode((prevState) => (prevState === "login" ? "signup" : "login"));
  const isLogInScreen = authMode === "login";

  const { storeUserData } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Title holderStyle={styles.titleContainer} />
      <HeroSection />
      <TextInput
        style={styles.input}
        placeholder={isLogInScreen ? "Username / Email" : "Email"}
        onChangeText={(value) => updateUserInput("email", value)}
        value={userInput.email}
      />
      {!isLogInScreen && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(value) => updateUserInput("username", value)}
          value={userInput.username}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => updateUserInput("password", value)}
        value={userInput.password}
      />
      <Button
        onPressHandler={() => {
          authenticateUser({
            mode: authMode,
            email: userInput.email,
            username: userInput.username,
            password: userInput.password,
            setUserData: storeUserData,
          });
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.btnTxt}>{isLogInScreen ? "Login" : "Signup"}</Text>
      </Button>
      <View style={styles.secondaryCtaContainer}>
        <Text style={styles.secondaryCtaDesc}>
          {isLogInScreen ? "New to Opinion Share?" : "Already a member?"}
        </Text>
        <Pressable onPress={toggleAuthMode}>
          <Text style={styles.secondaryCtaTxt}>
            {isLogInScreen ? "SignIn" : "LogIn"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 36,
    gap: 16,
  },
  titleContainer: {
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  buttonContainer: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.bgDark,
  },
  btnTxt: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryCtaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    gap: 6,
  },
  secondaryCtaDesc: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  secondaryCtaTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AuthScreen;
