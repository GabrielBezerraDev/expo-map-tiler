import { useToastController } from "@tamagui/toast";
import MapsTiler, { CoordinatesType } from "components/MapTiler";
import { useTracker } from "hooks/useTracker";
import { useDeviceIdProvider } from "providers/useDeviceIdProvider";
import { useSocketProvider } from "providers/useSocketProvider";
import { useUserProvider } from "providers/useUserProvider";
import { useEffect, useState, useRef } from "react";
import { Button, YStack, Text } from "tamagui"; // Importando componentes de UI
import { StopCircle, Play } from "@tamagui/lucide-icons"; // Ícones opcionais

// Função auxiliar simples para gerar UUID v4
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function TransportMap() {
  const { location } = useTracker();
  const { userId } = useDeviceIdProvider();
  const { user } = useUserProvider();
  
  const [trackPath, setTrackPath] = useState<CoordinatesType[]>([]);
  // 1. ESTADO PARA CONTROLAR O RASTREAMENTO
  const [isTracking, setIsTracking] = useState(true);

  const { socket, openConnection } = useSocketProvider();
  const toastController = useToastController();

  const tripIdRef = useRef(generateUUID());

  useEffect(() => {
    openConnection();
  }, []);

  useEffect(() => {
    // 2. VERIFICAÇÃO: Se não estiver rastreando, encerra a execução aqui
    if (!isTracking) return;

    // Só processa se tiver localização e o socket estiver conectado
    if (location?.coords && userId) {
      const newCoord: CoordinatesType = [
        location.coords.longitude,
        location.coords.latitude,
      ];

      // Atualiza o rastro visual localmente
      setTrackPath((prevPaths) => [...prevPaths, newCoord]);

      // Feedback visual
      // toastController.show(`Enviando...`);

      if (socket && socket.connected) {
        socket.emit("update_position", {
          userId: user?.id,
          tripId: tripIdRef.current,
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    }
  }, [location, userId, socket, isTracking]); // Adicionamos isTracking nas dependências

  // Função para alternar o estado
  const handleToggleTracking = () => {
    if (isTracking) {
      toastController.show("Rastreamento Pausado");
      setIsTracking(false);
    } else {
      toastController.show("Rastreamento Retomado");
      setIsTracking(true);
    }
  };

  return (
    // Usamos YStack com flex: 1 para ocupar a tela toda
    <YStack flex={1} position="relative">
      
      {/* O Mapa fica no fundo ocupando tudo */}
      <MapsTiler coordinates={trackPath} />

      {/* 3. BOTÃO OVERLAY (Por cima do mapa) */}
      <YStack
        position="absolute"
        b='$10' // Distância do fundo
        self="center" // Centralizado horizontalmente
        width="90%"
      >
        <Button
          size="$5"
          theme={isTracking ? "red" : "green"} // Vermelho para parar, Verde para iniciar
          onPress={handleToggleTracking}
          icon={isTracking ? StopCircle : Play}
          elevate
          shadowRadius="$4"
          shadowColor="$shadowColor"
        >
          {isTracking ? "Parar Viagem" : "Retomar Viagem"}
        </Button>
      </YStack>

    </YStack>
  );
}