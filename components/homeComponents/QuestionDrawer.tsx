import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/question";
import Shimmer from "../UI/Shimmer";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/StackNavigation";

type QuestionResponseType = {
  id: string;
  createdById: string;
  questionText: string;
  visibility: string;
  identity: string;
  isTimed: boolean;
  endTimeStamp: string | null;
  isPublic: boolean;
  publicLink: string | null;
  createdAt: string;
  createdBy: {
    name: string | null;
    username: string;
    avatar: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const iconMapping = {
  instantReveal: (
    <MaterialCommunityIcons name="lightning-bolt" size={22} color="black" />
  ),
  allHands: <FontAwesome name="handshake-o" size={22} color="black" />,
  showName: <FontAwesome name="user" size={22} color="black" />,
  anonymous: <FontAwesome name="user-secret" size={22} color="black" />,
};

const QuestionDrawer = () => {
  const [availableQuestions, setAvailableQuestions] = useState<
    QuestionResponseType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const setQuestionData = async () => {
      setIsLoading(true);
      const questions = await getQuestions();
      setAvailableQuestions(questions);
      setIsLoading(false);
    };
    setQuestionData();
  }, []);
  if (!isLoading && (!availableQuestions || availableQuestions.length === 0)) {
    return <Text>No Question Available</Text>;
  }

  const onQuestionCardPressHandler = (questionId: string) =>
    navigation.navigate("QuestionDetail", { questionId });

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Shimmer width={310} height={210} />
        ) : (
          availableQuestions.map((item, index) => {
            const displayName = item.createdBy.name || item.createdBy.username;
            return (
              <Pressable
                key={item.id}
                onPress={() => onQuestionCardPressHandler(item.id)}
              >
                <View style={[styles.card, index === 0 && styles.firstCard]}>
                  <View style={styles.titleHolder}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.questionText}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <View style={styles.infoTxtHolder}>
                      <View style={styles.createdByHolder}>
                        <Image
                          style={styles.profilePic}
                          source={{
                            uri: item.createdBy.avatar,
                          }}
                        />
                        <View>
                          <Text>Created By</Text>
                          <Text style={styles.creatorName}>{displayName}</Text>
                        </View>
                      </View>
                      <View>
                        {item.endTimeStamp ? (
                          <Text>
                            <MaterialCommunityIcons
                              name="timer-outline"
                              size={18}
                              color="black"
                            />{" "}
                            Closes in{" "}
                            <Text style={styles.time}>8h 32m 64s</Text>
                          </Text>
                        ) : (
                          <Text style={styles.time}>
                            <MaterialCommunityIcons
                              name="timer-off-outline"
                              size={18}
                              color="black"
                            />{" "}
                            No Time Limit
                          </Text>
                        )}
                      </View>
                    </View>
                    {/* Have to have proper icons for both visibility and identity */}
                    <View style={styles.tagHolder}>
                      {item.visibility === "instantReveal"
                        ? iconMapping.instantReveal
                        : iconMapping.allHands}
                      {item.identity === "showName"
                        ? iconMapping.showName
                        : iconMapping.anonymous}
                    </View>
                  </View>
                  <View>
                    <View style={styles.ctaBtn}>
                      <Text style={styles.labelText}>Answer</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default QuestionDrawer;

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 8,
    width: 320,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: "#fff1ef",
  },
  firstCard: {
    marginLeft: 12,
  },
  titleHolder: {
    backgroundColor: colors.bgDark,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
    width: "98%",
  },
  createdByHolder: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoTxtHolder: {
    gap: 10,
    width: "80%",
  },
  creatorName: {
    fontSize: 15,
    fontWeight: 500,
  },
  time: {
    fontWeight: "bold",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  tagHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 10,
    flex: 1,
    paddingTop: 10,
  },
  ctaBtn: {
    backgroundColor: "#ff5d5d",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  labelText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "bold",
  },
});
