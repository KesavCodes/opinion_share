import { createContext, useState } from "react";
import { optionsArr } from "../constants/options";

export type SelectedOptionsType = {
    identity: string;
    timing: string;
    shareBy: string;
    visibility: string;
  }

type QuestionOptionsContextType = {
  userQuestion: string;
  updateUserQuestion: (text: string) => void;
  selectedOptions: SelectedOptionsType;
  optionChangeHandler: (id: string, value: string) => void;
  friendsList: string[];
  addFriend: (friendId: string) => void;
  removeFriend: (friendId: string) => void;
  resetAllOption: () => void;
};

export const QuestionOptionsContext = createContext<QuestionOptionsContextType>(
  {
    userQuestion: "",
    updateUserQuestion: (text: string) => {},
    selectedOptions: {
      identity: "",
      timing: "",
      shareBy: "",
      visibility: "",
    },
    optionChangeHandler: (id: string, value: string) => {},
    friendsList: [],
    addFriend: (friendId: string) => {},
    removeFriend: (friendId: string) => {},
    resetAllOption: () => {},
  }
);

const getAllOptionIdsObj = () =>
  optionsArr.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.id] = curr.defaultValue;
    return acc;
  }, {});

const QuestionOptionsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>(getAllOptionIdsObj as unknown as SelectedOptionsType);
  const [friendsList, setFriendsList] = useState<string[]>([]);

  const updateUserQuestion = (text: string) => setUserQuestion(text);
  const optionChangeHandler = (id: string, value: string) =>
    setSelectedOptions((prevState) => ({ ...prevState, [id]: value }));

  const addFriend = (friendId: string) => {
    if (!friendsList.includes(friendId)) {
      setFriendsList((prevList) => [...prevList, friendId]);
    }
  };
  const removeFriend = (friendId: string) => {
    setFriendsList((prevList) => prevList.filter((id) => id !== friendId));
  };

  const resetAllOption = () => {
    setUserQuestion("");
    setSelectedOptions(getAllOptionIdsObj as unknown as SelectedOptionsType);
    setFriendsList([]);
  }
  return (
    <QuestionOptionsContext.Provider
      value={{
        userQuestion,
        updateUserQuestion,
        selectedOptions,
        optionChangeHandler,
        friendsList,
        addFriend,
        removeFriend,
        resetAllOption,
      }}
    >
      {children}
    </QuestionOptionsContext.Provider>
  );
};

export default QuestionOptionsContextProvider;
