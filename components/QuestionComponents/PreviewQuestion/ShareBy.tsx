import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { optionsArr } from "../../../constants/options";
import OptionsCard from "../../UI/OptionsCard";
import { QuestionOptionsContext } from "../../../store/questionOptionsContext";

const ShareBy = () => {
  const { selectedOptions, optionChangeHandler } = useContext(
    QuestionOptionsContext
  );
  return (
    <View style={styles.optionsContainer}>
      {optionsArr
        .filter((item) => item.pageType === "preview")
        .map((item) => {
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
  );
};

export default ShareBy;

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 20,
  },
});
