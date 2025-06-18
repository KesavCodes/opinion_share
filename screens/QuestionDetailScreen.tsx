import { StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigation";
import Title from "../components/common/Title";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import QuestionTextAndOptions from "../components/QuestionDetailComponents/QuestionTextAndOptions";
import QuestionAnswers from "../components/QuestionDetailComponents/UserAnswers";

const QuestionDetailScreen = ({
  route,
  navigation
}: {
  route: RouteProp<RootStackParamList>;
  navigation: NativeStackNavigationProp<RootStackParamList>
}) => {
  const questionId = route.params?.questionId;
  if(!questionId) return navigation.navigate("Home");
  return (
    <View>
      <Title holderStyle={styles.titleContainer} />
      <QuestionTextAndOptions id={questionId}/>
      <QuestionAnswers id={questionId} />
    </View>
  );
};

export default QuestionDetailScreen;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
});
