import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAnswersForQuestion } from "../../api/answer";

const UserAnswer = ({ id }: { id: string }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getQuestion = async () => {
      setIsLoading(true);
      const answerRes = await getAnswersForQuestion(id);
      console.log(answerRes)
      setUserAnswer(answerRes[0]?.answer);
      setIsLoading(false);
    };
    getQuestion();
  }, []);
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <View>
      <Text>{userAnswer}</Text>
    </View>
  );
};

export default UserAnswer;

const styles = StyleSheet.create({});
