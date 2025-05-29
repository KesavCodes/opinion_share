import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../UI/Button";
import { colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/question";
import Shimmer from "../UI/Shimmer";

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

const QuestionDrawer = () => {
  const [availableQuestions, setAvailableQuestions] = useState<QuestionResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
  console.log("Available Questions: ", availableQuestions);
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Shimmer width={310} height={210} />
        ) : (
          availableQuestions.map((item, index) => {
              const displayName = item.createdBy.name || item.createdBy.username;
            return (
              <View
                key={item.id}
                style={[styles.card, index === 0 && styles.firstCard]}
              >
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
                        <Text style={styles.infoTxt}>Created By</Text>
                        <Text>{displayName}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.infoTxt}>
                        Closes in <Text style={styles.time}>8h 32m 64s</Text>
                      </Text>
                    </View>
                  </View>
                  {/* Have to have proper icons for both visibility and identity */}
                  <View style={styles.tagHolder}>
                    {item.visibility === "instantReveal" && (
                      <Ionicons name="hand-right-outline" size={24} />
                    )}
                    {item.identity === "showName" && (
                      <Ionicons name="business-outline" size={24} />
                    )}
                  </View>
                </View>
                <View>
                  <Button onPressHandler={() => {}}>
                    <View style={styles.ctaBtn}>
                      <Text style={styles.labelText}>Submit</Text>
                    </View>
                  </Button>
                </View>
              </View>
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
    height: 210,
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
  infoTxt: {
    fontSize: 16,
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
    gap: 8,
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
