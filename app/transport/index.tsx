import { useRef, useState } from "react";
import { Button, Text, useWindowDimensions, View, XStack } from "tamagui";
import LottieView from "lottie-react-native";
import { GobackButton } from "components/GoBackButton";
import { useToastController } from "@tamagui/toast";
import { navigate } from "expo-router/build/global-state/routing";

export default function Client() {
  const [widthStack, setWidthStack] = useState<number>(0);
  const dimesions = useWindowDimensions();
  const [initTravel, setInitTravel] = useState(false);

  const toastController = useToastController();
  const [step, setStep] = useState(0);
  const anim1 = useRef(null);
  const anim2 = useRef(null);

  return (
    <View flex={1}>
      <View flex={1} z={1} items="center" justify="center">
        <View flex={1} items="center" justify="center" width="100%" gap={20}>
          <GobackButton
            buttonPropsTamagui={{
              t: "6%",
              l: dimesions.width - dimesions.width * 0.1,
            }}
          />

          <View
            animation="lazy"
            overflow="hidden"
            rounded="$10"
            width="90%"
            height="60%"
            onLayout={(layout) =>
              setWidthStack(layout.nativeEvent.layout.width)
            }
            items="center"
            justify="center"
            bg="#823c14"
            shadowColor="black"
            shadowRadius={initTravel ? 10 : 0}
            shadowOpacity={0.5}
          >
            <XStack
              height="100%"
              width={widthStack}
              x={step === 0 ? 0 : -widthStack}
              animation="bouncy"
            >
              <View width={widthStack} items="center" justify="center">
                <LottieView
                  autoPlay
                  loop={false}
                  ref={anim1}
                  style={{ width: "100%", height: "100%" }}
                  source={require("../../assets/animations/Animation - 1700557295028.json")}
                />
              </View>

              <View width={widthStack} items="center" justify="center">
                <View
                  width="100%"
                  height="100%"
                  items="center"
                  justify="center"
                  animation="lazy"
                  scale={initTravel ? 1.3 : 1}
                >
                  <LottieView
                    autoPlay
                    loop
                    ref={anim2}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                    source={require("../../assets/animations/Loading Web Komship.json")}
                  />
                </View>
              </View>
            </XStack>
          </View>

          <View
            px={20}
            gap={20}
            width="100%"
            items="center"
            animation="lazy"
            opacity={initTravel ? 0 : 1}
            y={initTravel ? 100 : 0}
            pointerEvents={initTravel ? "none" : "auto"}
          >
            <Text fontSize="$5" fontWeight="bold" color="white" text="center">
              {step === 0
                ? "Você está prestes a iniciar a viagem, o cliente terá acesso ao seu percurso."
                : "Iniciando rota..."}
            </Text>

            <Button
              onPress={() => {
                if (step === 0) {
                  setStep(1);
                } else {
                  toastController.show("Viagem Iniciada!");
                  setInitTravel(true);
                  setTimeout(() => {
                    navigate("/transport/map");
                  }, 1000);
                }
              }}
              fontSize="$6"
              fontWeight="bold"
              size="$5"
              width="100%"
            >
              {step === 0 ? "Continuar" : "Iniciar Viagem"}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
