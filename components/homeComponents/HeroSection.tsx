import { StyleSheet, Text, View } from "react-native";
import HeroImg from "../../assets/images/home/Hero";
const HeroSection = () => {
  return (
    <View style={styles.imgHolder}>
      <HeroImg />
    </View>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  imgHolder: {
    maxHeight: 300,
  },
});
