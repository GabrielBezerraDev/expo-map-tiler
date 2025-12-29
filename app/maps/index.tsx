import { View } from "react-native";
import {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
} from "@maplibre/maplibre-react-native";

import { GobackButton } from "components/GoBackButton";

// 1. DADOS (GeoJSON) - Rotas em Manaus
const rotasManaus = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { cor: "#3b82f6", largura: 6 }, // Azul
      geometry: {
        type: "LineString",
        coordinates: [
          [-60, -3.0831], // Arena da Amazônia
          [-60.0233, -3.1302], // Teatro Amazonas
        ],
      },
    },
  ],
};



export default function Maps() {
  // 2. URL DO ESTILO MAPTILER
  // Escolha o estilo que preferir: "streets-v2", "basic-v2", "bright-v2", "satellite"
  const mapTilerStyleURL =
    "https://api.maptiler.com/maps/streets-v2/style.json?key=dVpV2CiI5ldRGDxqISVr";

  return (
    <View style={{ flex: 1 }}>
      <GobackButton></GobackButton>
      <MapView
        style={{ flex: 1 }}
        mapStyle={mapTilerStyleURL}
      >
        <Camera centerCoordinate={[-60.025, -3.1]} zoomLevel={12} />

        {/* 3. SUAS CAMADAS (Desenhadas por cima do mapa do MapTiler) */}
        <ShapeSource id="minhas-rotas" shape={rotasManaus}>
          <LineLayer
            id="linhas-desenho"
            style={{
              lineColor: ["get", "cor"],
              lineWidth: ["get", "largura"],
              lineCap: "round",
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}
