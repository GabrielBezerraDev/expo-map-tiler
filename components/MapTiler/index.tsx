// MapsTiler.tsx
import { View } from "react-native";
import {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";
import { useMemo, useRef, useEffect, useState } from "react";
import { PointAnnotationMapTiler } from "./components/PointAnnotation";
import { AnimatedCar } from "./components/AnimatedCar";
import { calculateBearing } from "utils/rotationUtils";

export type CoordinatesType = [number, number];

export interface MapsProps {
  coordinates?: CoordinatesType[];
}

export default function MapsTiler({ coordinates = [] }: MapsProps) {
  const [isMoving, setIsMoving] = useState(false);
  const lastUpdateRef = useRef<number>(Date.now());

  const carState = useMemo(() => {
    if (!coordinates || coordinates.length === 0) return null;

    const currentPos = coordinates[coordinates.length - 1];
    let rotation = 0;

    if (coordinates.length >= 2) {
      const prevPos = coordinates[coordinates.length - 2];
      rotation = calculateBearing(prevPos, currentPos);
    }

    return { coordinate: currentPos, rotation };
  }, [coordinates]);

  // Detecta se o carro está em movimento
  useEffect(() => {
    if (coordinates.length > 0) {
      setIsMoving(true);
      lastUpdateRef.current = Date.now();

      const timeout = setTimeout(() => {
        setIsMoving(false);
      }, 2000); // Considera "parado" após 2s sem atualizações

      return () => clearTimeout(timeout);
    }
  }, [coordinates]);

  const geoJSONData = useMemo(() => {
    if (!coordinates || coordinates.length === 0) {
      return { type: "FeatureCollection", features: [] };
    }
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      ],
    };
  }, [coordinates]);

  const mapTilerStyleURL =
    "https://api.maptiler.com/maps/streets-v2/style.json?key=dVpV2CiI5ldRGDxqISVr";

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} mapStyle={mapTilerStyleURL}>
        {/* Câmera seguindo o carro com animação suave */}
        {carState && (
          <Camera
            centerCoordinate={carState.coordinate}
            zoomLevel={17}
            animationMode="easeTo"
            animationDuration={800}
            pitch={45} // Inclinação 3D estilo Uber!
            heading={carState.rotation}
          />
        )}

        {/* Linha do Trajeto */}
        <ShapeSource id="rota" shape={geoJSONData}>
          <LineLayer
            id="linha-sombra"
            layerIndex={99}
            style={{
              lineColor: "#00000033",
              lineWidth: 8,
              lineBlur: 3,
              lineTranslate: [0, 3],
            }}
          />
          <LineLayer
            id="linha"
            layerIndex={100}
            style={{
              lineColor: "#823c14",
              lineWidth: 5,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </ShapeSource>

        {/* Carrinho Animado */}
        {carState && (
          <PointAnnotation
            id="carro-uber"
            coordinate={carState.coordinate}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <AnimatedCar
              coordinate={carState.coordinate}
              rotation={carState.rotation}
              size={60}
              color={isMoving ? "#1a1a2e" : "#503932ff"} // Cor muda quando parado
            />
          </PointAnnotation>
        )}

        {/* Pontos do trajeto */}
        {coordinates.slice(0, -1).map((coordinate, index) => (
          <PointAnnotationMapTiler
            key={`marker-${index}`}
            id={String(index)}
            coordinate={coordinate}
          />
        ))}
      </MapView>
    </View>
  );
}