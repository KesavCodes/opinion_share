import { Share, StyleSheet, Text, View } from "react-native";
import ScreenBaseContainer from "../components/ScreenBaseContainer";
import { colors } from "../constants/colors";
import Button from "../components/UI/Button";
import Title from "../components/common/Title";
import PreviewUserQuestion from "../components/QuestionComponents/PreviewQuestion/PreviewUserQuestion";
import ShareBy from "../components/QuestionComponents/PreviewQuestion/ShareBy";
import FriendDrawer from "../components/QuestionComponents/PreviewQuestion/FriendDrawer";
import { useContext } from "react";
import { QuestionOptionsContext } from "../store/questionOptionsContext";
import { AuthContext } from "../store/AuthContext";
import { addQuestion } from "../api/question";

interface NavigationProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const PreviewAndConfirmScreen: React.FC<NavigationProps> = ({navigation}) => {
  const { selectedOptions, userQuestion, friendsList, resetAllOption } = useContext(
    QuestionOptionsContext
  );
  const { userData } = useContext(AuthContext);
  const onPostQuestion = async () => {
    if (selectedOptions.shareBy === "friends" && friendsList.length === 0) {
      alert("Please select at least one friend to share with.");
      return;
    }
    await addQuestion({
      userId: userData?.id || "",
      userQuestion,
      selectedOptions,
      friendsList,
    });
    resetAllOption();
    navigation.navigate("Home");
    // Share.share({
    //   message: `Check out this question: ${userQuestion}`,
    // });
  };
  return (
    <ScreenBaseContainer>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title holderStyle={styles.center} />
        </View>
        <PreviewUserQuestion />
        <ShareBy />
        {selectedOptions.shareBy === "friends" && <FriendDrawer />}
        <View>
          <Button onPressHandler={onPostQuestion} style={styles.ctaBtn}>
            <Text style={styles.labelText}>Post question</Text>
          </Button>
        </View>
      </View>
    </ScreenBaseContainer>
  );
};

export default PreviewAndConfirmScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  center: {
    alignItems: "center",
  },
  ctaBtn: {
    backgroundColor: colors.bgSecondary,
    paddingVertical: 10,
    marginTop: 24,
    marginHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 8,
    borderTopWidth: 0.075,
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
