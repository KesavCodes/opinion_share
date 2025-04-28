import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { dummyQuestions } from "../../dummy_data/ask";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../UI/Button";
import { colors } from "../../constants/colors";

const QuestionDrawer = () => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dummyQuestions.map((item, index) => {
          return (
            <View
              key={item.id}
              style={[styles.card, index === 0 && styles.firstCard]}
            >
              <View style={styles.titleHolder}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                  {item.title}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoTxtHolder}>
                  <View style={styles.createdByHolder}>
                    <Text style={styles.infoTxt}>Created By</Text>
                    <Image
                      style={styles.profilePic}
                      source={{
                        uri: "https://th.bing.com/th/id/OIP.Fhxe1ojPRPz36muHp8UVMAHaHa?w=500&h=500&rs=1&pid=ImgDetMain",
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.infoTxt}>
                      Closes in <Text style={styles.time}>8h 32m 64s</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.tagHolder}>
                  {item.allHands && (
                    <Ionicons name="hand-right-outline" size={24} />
                  )}
                  {item.anonymous && (
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
        })}
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
