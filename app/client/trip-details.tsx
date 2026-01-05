import { useEffect, useState } from "react";
import { YStack, Spinner, Button, Text, XStack } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "@tamagui/lucide-icons";
import MapsTiler, { CoordinatesType } from "../../components/MapTiler";

// CONFIG URL (Atenção ao IP):
const BASE_URL = `${process.env.EXPO_PUBLIC_BACKEND_API}/api/trips`; 

export default function TripDetails() {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  
  const [coordinates, setCoordinates] = useState<CoordinatesType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      fetchRoute();
    }
  }, [tripId]);

  async function fetchRoute() {
    try {
      // Chama a rota específica do backend
      const response = await fetch(`${BASE_URL}/${tripId}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setCoordinates(data);
      }
    } catch (err) {
      console.error("Erro ao carregar rota:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <YStack flex={1} bg="$background">
      {/* Header Personalizado */}
      <XStack p="$4" pt="$12" items="center" gap="$4" bg="$background" zIndex={10} elevation={2}>
        <Button 
          icon={ArrowLeft} 
          circular 
          size="$4"
          onPress={() => router.back()} 
        />
        <Text fontSize="$6" fontWeight="bold">Detalhes do Trajeto</Text>
      </XStack>

      {/* Mapa ou Loading */}
      {loading ? (
        <YStack flex={1} justify="center" items="center">
          <Spinner size="large" color="$blue10" />
        </YStack>
      ) : (
        <YStack flex={1}>
          {coordinates.length > 0 ? (
             <MapsTiler coordinates={coordinates} />
          ) : (
            <YStack flex={1} justify="center" items="center" p="$8">
              <Text textAlign="center" color="$gray10">
                Nenhuma coordenada encontrada para esta viagem.
              </Text>
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  );
}