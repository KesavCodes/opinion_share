import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Button from "./Button";
import { colors } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QuestionOptionsContext } from "../../store/questionOptionsContext";

type OptionCardProps = {
  label: string;
  id: string;
  options: Array<{ key: string; value: string }>;
  info: string;
  currentlySelected: string;
  changeSelected: (id: string, value: string) => void;
};

const showAlert = (title: string, desc: string) =>
  Alert.alert(
    title,
    desc,
    [
      {
        text: "Got it!",
      },
    ],
    {
      cancelable: true,
    }
  );

const OptionsCard: React.FC<OptionCardProps> = ({
  label,
  id,
  options,
  info,
  currentlySelected,
  changeSelected,
}) => {
  const { selectedOptions } = useContext(QuestionOptionsContext);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.labelTxt}>{label}</Text>
        <Ionicons
          name="information-circle"
          size={24}
          onPress={() => showAlert(label, info)}
        />
      </View>
      <View style={styles.optionsContainer}>
        {options.map(({ key, value }) => (
          <View key={value} style={styles.options}>
            <Button
              onPressHandler={() => changeSelected(id, value)}
              style={[
                styles.ctaBtn,
                value === currentlySelected && { backgroundColor: "#ff5d5d" },
              ]}
              disable={
                selectedOptions.visibility === "allHands" && value === "public"
              }
            >
              <Text style={styles.optionsTxt}>{key}</Text>
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OptionsCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 4,
    gap: 12,
  },
  ctaBtn: {
    backgroundColor: colors.bgDark,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelTxt: {
    fontWeight: "bold",
    fontSize: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  options: {
    width: "48%",
  },
  optionsTxt: {
    fontWeight: 600,
    fontSize: 16,
    color: colors.textLight,
  },
});
