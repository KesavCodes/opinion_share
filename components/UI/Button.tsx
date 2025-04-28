import { Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type IProps = {
  children: React.ReactNode;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<IProps> = ({ children, onPressHandler, style }) => {
  return (
    <Pressable onPress={onPressHandler} style={style}>
      {children}
    </Pressable>
  );
};

export default Button;
