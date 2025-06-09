import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Options = () => {
  return (
    <View style={styles.option}>
      <Text style={styles.optionText}>Remove</Text>
      <Text>
        <Ionicons name="close-circle-sharp" size={18} color="black" />
      </Text>
    </View>
  );
};

type RemoveFriendOptionProps = {
  id: string;
  showOptions: boolean;
  optionClickHandler: (id: string) => void;
};

const RemoveFriendOption = ({
  id,
  showOptions,
  optionClickHandler,
}: RemoveFriendOptionProps) => {
  return (
    <View>
      {showOptions && <Options />}
      <Pressable onPress={() => optionClickHandler(id)}>
        <Text>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="black"
          />
        </Text>
      </Pressable>
    </View>
  );
};

export default RemoveFriendOption;

const styles = StyleSheet.create({
  option: {
    position: "absolute",
    width: 110,
    backgroundColor: "#ff5d5d",
    borderRadius: 8,
    right: 30,
    top: -8,
    borderWidth: 0.5,
    alignItems: "center",
    flexDirection: "row",
  },
  optionText: {
    padding: 8,
    fontSize: 16,
    flexDirection: "row",
    fontWeight: "500",
  },
});
