import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

const QuestionCta = () => {
  const navigation = useNavigation();
  const ctaClickHandler = () => {
    navigation.navigate("AskQuestion");
  };
  return (
    <View style={styles.ctaContainer}>
      <Text style={styles.ctaTxt}>ASK</Text>
      <View style={styles.actionContainer}>
        <Button onPressHandler={ctaClickHandler}>
          <Text style={styles.actionTxt}>+</Text>
        </Button>
      </View>
    </View>
  );
};

export default QuestionCta;

const styles = StyleSheet.create({
  ctaContainer: {
    flexDirection: "row",
    paddingHorizontal: 64,
    position: "relative",
  },
  ctaTxt: {
    color: colors.textPrimary,
    fontSize: 120,
    fontWeight: 500,
  },
  actionContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.bgDark,
    position: "absolute",
    right: 50,
    top: 85,
    borderWidth: 16,
    borderColor: "#ff5d5d",
  },
  actionTxt: {
    color: "#ff5d5d",
    fontWeight: "bold",
    fontSize: 80,
    position: "absolute",
    top: -22,
    left: 13,
  },
});
