import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./component/goal-item";
import GoalInput from "./component/goal-input";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [userGoals, setUserGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const startAddGoalHandler = () => {
    setIsModalVisible(true);
  };

  const addGoalHandler = () => {
    setUserGoals((previousGoals) => [
      ...previousGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);

    setEnteredGoalText("");
    setIsModalVisible(false);
  };

  const onDeleteItem = (key) => {
    setUserGoals((previousGoals) => {
      return previousGoals.filter((goal) => {
        return goal.key !== key;
      });
    });
  };

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        isModalVisible={isModalVisible}
        enteredGoalText={enteredGoalText}
        addGoalHandler={addGoalHandler}
        goalInputHandler={goalInputHandler}
      />
      <View style={styles.goalContainer}>
        <FlatList
          data={userGoals}
          renderItem={(goal) => {
            return <GoalItem goal={goal.item} onDeleteItem={onDeleteItem} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalContainer: {
    flex: 5,
  },
});
