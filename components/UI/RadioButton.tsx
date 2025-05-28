// components/RadioButton.js
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type RadioButtonProps = {
  options: { key: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selected,
  onSelect,
  children,
}) => {
  return (
    <View>
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={styles.radioContainer}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.outerCircle}>
            {selected === option.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.label}>{option.key}</Text>
        </Pressable>
      ))}
      {children}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});
