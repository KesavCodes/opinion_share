import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

type IProps = {
  children: React.ReactNode;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
};

const Button: React.FC<IProps> = ({
  children,
  onPressHandler,
  style,
  disable = false,
}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={[style, disable && styles.disabled]}
      disabled={disable}
    >
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
