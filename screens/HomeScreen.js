import { ScrollView, StyleSheet, View } from "react-native";
import HeaderProfile from "../components/homeComponents/HeaderProfile";
import HeaderTabs from "../components/homeComponents/HeaderTabs";
import HeroSection from "../components/homeComponents/HeroSection";
import QuestionDrawer from "../components/homeComponents/QuestionDrawer";
import QuestionCta from "../components/homeComponents/QuestionCta";
import ScreenBaseContainer from "../components/ScreenBaseContainer";

const HomeScreen = () => {
  return (
    <ScreenBaseContainer>
      <HeaderProfile />
      <HeroSection />
      <HeaderTabs />
      <QuestionDrawer />
      <QuestionCta />
    </ScreenBaseContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
