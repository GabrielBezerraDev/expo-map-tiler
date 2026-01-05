import { useRouter } from "expo-router"; 
import { LogBox } from "react-native";
import { Button, View } from "tamagui";

export type UserType = 'client' | 'transport';

export default function HomePage() {
  const router = useRouter(); 
  
  LogBox.ignoreAllLogs(true);

  const handleNavigate = (type: UserType) => {
    router.push({
      pathname: "/sign-in",
      params: { userType: type } 
    });
  };

  return (
    <View height={"100%"} width={"100%"} items={"center"} justify={"center"}>
      <View flexDirection="column" width={"100%"} items={"center"} gap={"$3"}>
        
        <Button 
          onPress={() => handleNavigate('client')} 
          width={"$18"} 
          height={"$4"}
        >
          Cliente
        </Button>

        <Button 
          onPress={() => handleNavigate('transport')} 
          width={"$18"} 
          height={"$4"}
        >
          Transportador
        </Button>

      </View>
    </View>
  );
}