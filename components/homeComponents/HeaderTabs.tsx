import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import Button from "../UI/Button";
import { tabsList } from "../../constants/tabs";

const HeaderTabs = () => {
  const [currentTab, setCurrentTab] = useState(1);

  const changeTabHandler = (tabId: number) => {
    const newTab = tabsList.find((tab) => tab.id === tabId);
    setCurrentTab(newTab?.id ?? 1);
  };

  return (
    <View style={styles.tabsContainer}>
      {tabsList.map((tab) => {
        return (
          <Button
            key={tab.id}
            onPressHandler={changeTabHandler.bind(null, tab.id)}
            style={styles.btnWidth}
          >
            <View style={[styles.tabContainer, tab.id === currentTab && {backgroundColor: colors.bgDark}]}>
              <Text style={[styles.labelText, tab.id === currentTab && {color: colors.textLight}]}>{tab.label}</Text>
            </View>
          </Button>
        );
      })}
    </View>
  );
};

export default HeaderTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  tabContainer: {
    backgroundColor: colors.bgSecondary,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  labelText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: 500,
  },
  btnWidth: {
    flex: 1,
  }
});
