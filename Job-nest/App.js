import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.sampleText}>Sample Text for testing purpose </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afd7ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  sampleText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
