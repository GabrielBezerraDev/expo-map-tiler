import { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";
import { YStack, Text, Card, XStack, Spinner, H3 } from "tamagui";
import { useRouter } from "expo-router";
import { Map, Clock, ChevronRight, User } from "@tamagui/lucide-icons";

// CONFIG URL:
const API_URL = "http://172.21.72.238:3000/api/trips"; 

export default function TripsList() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) throw new Error("Falha ao carregar dados");
      
      setTrips(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenTrip = (tripId: string) => {
    // Navega para os detalhes enviando o ID
    router.push({
      pathname: "/client/trip-details",
      params: { tripId }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit"
    });
  };

  if (loading) {
    return <YStack flex={1} justify="center" items="center"><Spinner size="large" /></YStack>;
  }

  return (
    <YStack flex={1} bg="$background" p="$4" pt="$10">
      <H3 mb="$4">Histórico de Viagens</H3>
      
      <FlatList
        data={trips}
        keyExtractor={(item) => item.trip_id}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Card 
            bordered 
            elevate 
            p="$4" 
            pressStyle={{ scale: 0.98, opacity: 0.9 }}
            onPress={() => handleOpenTrip(item.trip_id)}
            animation="bouncy"
          >
            <XStack justify="space-between" items="center">
              <YStack gap="$2" flex={1}>
                {/* Nome do Usuário */}
                <XStack items="center" gap="$2">
                   <User size={16} color="$blue10"/>
                   <Text fontWeight="bold" fontSize="$5" numberOfLines={1}>
                     {item.first_name} {item.last_name || ""}
                   </Text>
                </XStack>
                
                {/* Data */}
                <XStack items="center" gap="$2">
                  <Clock size={14} color="$gray10"/>
                  <Text color="$gray10" fontSize="$3">
                    {formatDate(item.start_time)}
                  </Text>
                </XStack>

                {/* Pontos Totais */}
                <XStack items="center" gap="$2">
                  <Map size={14} color="$gray10"/>
                  <Text color="$gray10" fontSize="$3">
                    {item.total_points} registros
                  </Text>
                </XStack>
              </YStack>

              <ChevronRight color="$gray8" />
            </XStack>
          </Card>
        )}
      />
    </YStack>
  );
}