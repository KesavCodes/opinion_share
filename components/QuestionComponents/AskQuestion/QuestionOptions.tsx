import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import OptionsCard from "../../UI/OptionsCard";
import { optionsArr } from "../../../constants/options";
import { QuestionOptionsContext } from "../../../store/questionOptionsContext";

const QuestionOptions = () => {
  const { selectedOptions, optionChangeHandler } = useContext(
    QuestionOptionsContext
  );
  return (
    <View style={styles.rootOptionContainer}>
      <Text style={styles.titleTxt}>Opinion Options</Text>
      <View style={styles.optionsContainer}>
        {optionsArr.map((item) => {
          return (
            <OptionsCard
              key={item.id}
              id={item.id}
              label={item.label}
              options={item.options}
              info={item.info}
              currentlySelected={selectedOptions[item.id]}
              changeSelected={optionChangeHandler}
            />
          );
        })}
      </View>
    </View>
  );
};

export default QuestionOptions;

const styles = StyleSheet.create({
  rootOptionContainer: {
    marginTop: 20,
    gap: 12,
  },
  titleTxt: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "900",
  },
  optionsContainer: {
    gap: 8,
  },
});
