import { navigate } from "expo-router/build/global-state/routing";
import { LogBox } from "react-native";
import { Button, View } from "tamagui";

export default function HomePage() {
  
  LogBox.ignoreAllLogs(true);
  return (
    <View height={"100%"} width={"100%"} items={"center"} justify={"center"}>
      <View flexDirection="column" width={"100%"} items={"center"} gap={"$3"}>
        <Button width={"$18"} height={"$4"}>
          Cliente
        </Button>
        <Button onPress={() => navigate("/transport")} width={"$18"} height={"$4"}>
          Transportador
        </Button>
      </View>
    </View>
  );
}
