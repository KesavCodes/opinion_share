import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SearchState from "../../assets/images/Friends/Search";
import { colors } from "../../constants/colors";
import { searchUser } from "../../api/user";
import FriendListItem from "../../components/friendsComponents/FriendListItem";

const SearchFriendsScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const latestSearchId = useRef(0);

  useEffect(() => {
    if (!searchKey) {
      setSearchResults([]);
      return;
    }
    const controller = new AbortController();
    const currentSearchId = ++latestSearchId.current;
    const getSearchResults = async () => {
      try {
        setIsLoading(true);
        const searchRes = await searchUser(searchKey, controller.signal);
        if (currentSearchId === latestSearchId.current)
          setSearchResults(searchRes);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          Alert.alert("Something went wrong", "Couldn't fetch users");
        }
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => getSearchResults(), 500);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchKey]);
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>🔍</Text>
        <TextInput
          style={styles.inputText}
          placeholder=" Search Friend..."
          value={searchKey}
          onChangeText={(key) => setSearchKey(key)}
        />
      </View>
      <FriendListItem
        friendsData={searchResults}
        isLoading={isLoading}
        showEmptyState={!!searchKey}
      />
      {!searchResults.length && !searchKey && (
        <View style={styles.imgHolder}>
          <SearchState />
        </View>
      )}
    </View>
  );
};

export default SearchFriendsScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 18,
  },
  imgHolder: {
    maxHeight: 450,
  },
  feedbackText: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "500",
  },
});
