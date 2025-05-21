import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import Button from "../components/UI/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { updateUser } from "../api/user";

let initialRender = true;

const ProfilePageScreen = () => {
  const { userData, storeUserData, logout } = useContext(AuthContext);
  if (!userData) return null;
  const [profileData, setProfileData] = useState(userData);
  const [disableSave, setDisableSave] = useState(true);
  const handleChange = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value ? value : null }));
  };
  const formatterFromDate = new Date(userData.createdAt)
    .toUTCString()
    .slice(5, 16);

  const handleSave = async () => {
    setDisableSave(true);
    updateUser({
      email: profileData.email,
      name: profileData.name,
      userToken: userData.userToken,
      avatar: profileData.avatar,
      setUserData: storeUserData,
    });
  };

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      return;
    }
    if (
      userData.email !== profileData.email ||
      userData.name !== profileData.name
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [profileData.email, profileData.name]);
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
      <View>
        <Text>Member since {formatterFromDate}</Text>
      </View>
      <View style={styles.inputHolder}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email</Text>
          <MaterialIcons size={16} name="mode-edit" />
        </View>
        <TextInput
          style={styles.input}
          value={profileData.email}
          onChangeText={(val) => handleChange("email", val)}
        />
      </View>
      <View style={styles.inputHolder}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Name</Text>
          <MaterialIcons size={16} name="mode-edit" />
        </View>
        <TextInput
          style={styles.input}
          value={profileData.name || ""}
          onChangeText={(val) => handleChange("name", val)}
        />
      </View>
      <View style={styles.inputHolder}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
          <MaterialIcons size={16} name="edit-off" />
        </View>
        <TextInput
          style={styles.input}
          value={profileData.username}
          editable={false}
        />
      </View>
      <View style={styles.btnsContainer}>
        <Button onPressHandler={handleSave} disable={disableSave}>
          <View style={[styles.btnContainer, styles.saveColor]}>
            <Text style={styles.btnTxt}>Save changes</Text>
          </View>
        </Button>
        <Button onPressHandler={logout}>
          <View style={[styles.btnContainer, styles.logoutColor]}>
            <Text style={styles.btnTxt}>Logout</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default ProfilePageScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  labelContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  label: {
    fontSize: 18,
  },
  inputHolder: {
    paddingHorizontal: 24,
    gap: 8,
  },
  input: {
    width: 340,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: 600,
  },
  btnsContainer: {
    marginTop: 16,
    gap: 16,
  },
  btnContainer: {
    width: 340,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  saveColor: {
    backgroundColor: "#78d796",
  },
  logoutColor: {
    backgroundColor: "#ff5d5d",
  },
});
