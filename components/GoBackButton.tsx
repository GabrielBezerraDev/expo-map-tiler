import { ArrowLeft } from "@tamagui/lucide-icons";
import { goBack } from "expo-router/build/global-state/routing";
import { Button, ButtonProps } from "tamagui";

export const GobackButton = ({
  buttonPropsTamagui,
}: {
  buttonPropsTamagui?: ButtonProps;
}) => {
  return (
    <Button
      z={100}
      position="absolute"
      t={"5%"}
      l={"5%"}
      bg={"$backgroundPress"}
      color="$color"
      onPress={goBack}
      circular
      icon={<ArrowLeft />}
      size="$4"
      {...buttonPropsTamagui}
    />
  );
};
