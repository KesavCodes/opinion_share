import { ScrollView, StyleSheet } from "react-native";

type IProps = {
  children: React.ReactNode;
};

const ScreenBaseContainer: React.FC<IProps> = ({ children }) => {
  return (
    <ScrollView style={styles.rootContainer} bounces={false} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default ScreenBaseContainer;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
})
