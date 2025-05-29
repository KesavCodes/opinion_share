import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";

const Shimmer = ({ height, width }: { height?: number; width?: number }) => {
  return new Array(3)
    .fill(0)
    .map((_, index) => (
      <View
        key={index}
        style={[
          styles.shimmer,
          height ? { height } : {},
          width ? { width } : {},
          index === 0 && styles.firstCard,
          index === 2 && styles.lastCard,
        ]}
      />
    ));
};

export default Shimmer;

const styles = StyleSheet.create({
  shimmer: {
    width: 200, // Default width if not provided
    height: 100, // Default height if not provided
    borderRadius: 8,
    backgroundColor: colors.bgSecondary,
    marginHorizontal: 6,
  },
  firstCard: {
    marginLeft: 12,
  },
  lastCard: {
    marginRight: 12,
  },
});
