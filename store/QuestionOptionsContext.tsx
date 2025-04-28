import { createContext, useState } from "react";
import { optionsArr } from "../constants/options";

type QuestionOptionsContextType = {
  userQuestion: string;
  updateUserQuestion: (text: string) => void;
  selectedOptions: Record<string, string>;
  optionChangeHandler: (id: string, value: string) => void;
};

export const QuestionOptionsContext = createContext<QuestionOptionsContextType>({
  userQuestion: "",
  updateUserQuestion: (text: string) => {},
  selectedOptions: {},
  optionChangeHandler: (id: string, value: string) => {},
});

const getAllOptionIdsObj = () =>
  optionsArr.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.id] = curr.defaultValue;
    return acc;
  }, {});

const QuestionOptionsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(getAllOptionIdsObj);

  const updateUserQuestion = (text: string) => setUserQuestion(text);
  const optionChangeHandler = (id: string, value: string) =>
    setSelectedOptions((prevState) => ({ ...prevState, [id]: value }));

  return (
    <QuestionOptionsContext.Provider
      value={{
        userQuestion,
        updateUserQuestion,
        selectedOptions,
        optionChangeHandler,
      }}
    >
      {children}
    </QuestionOptionsContext.Provider>
  );
};

export default QuestionOptionsContextProvider;
