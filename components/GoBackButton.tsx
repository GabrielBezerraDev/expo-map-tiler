import { ArrowLeft } from "@tamagui/lucide-icons";
import { Button, ButtonProps } from "tamagui";

export const GobackButton = ({
  buttonPropsTamagui,
}: {
  buttonPropsTamagui?: ButtonProps;
}) => {
  return (
    <Button
      z={100}
      {...buttonPropsTamagui}
      position="absolute"
      t={"5%"}
      l={"5%"}
      bg={'$backgroundPress'} // Cor do tema, mais flexível que 'black'
      color="$color" // Cor do tema para texto/ícone
      
      // --- CORREÇÕES ---
      circular             // Agora faz sentido com um ícone
      icon={<ArrowLeft />} // Use o ícone em vez do texto
      size="$4"            // 'size' controla width e height para botões de ícone
      // Remova width e fontSize que estavam causando conflito
    />
  );
};