import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../constants/colors";

type IPros = {
  holderStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  sloganStyle?: StyleProp<TextStyle>;
};

const Title: React.FC<IPros> = ({ holderStyle, titleStyle, sloganStyle }) => {
  return (
    <View style={[styles.titleHolder, holderStyle]}>
      <Text style={[styles.title, titleStyle]}>OPINION SHARE</Text>
      <Text style={[styles.slogan, sloganStyle]}>SAY IT AS YOU SEE IT</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleHolder: {
    gap: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  slogan: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
