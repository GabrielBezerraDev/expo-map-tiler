import { Redirect } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { LogBox } from "react-native";
import { Button, View } from "tamagui";

export default function HomePage() {
  LogBox.ignoreAllLogs(true);
  return (
    <View
      height={"100%"}
      width={"100%"}
      items={"center"}
      justify={"center"}
    >
        <View
            flexDirection="column"
            width={'100%'}
            items={'center'}
            gap={'$3'}
        >
            <Button width={'$18'} height={'$4'}>Transportador</Button>
            <Button onPress={() => navigate('/maps')}  width={'$18'} height={'$4'}>Cliente</Button>
        </View>
    </View>
  );
}
