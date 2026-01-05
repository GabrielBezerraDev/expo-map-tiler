import { View } from "react-native";
import {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
  CircleLayer,
} from "@maplibre/maplibre-react-native";
import { useMemo } from "react";

export type CoordinatesType = [number, number];

export interface MapsProps {
  coordinates?: CoordinatesType[];
}

export default function MapsTiler({ coordinates = [] }: MapsProps) {
  
  const geoJSONData = useMemo(() => {
    // 1. SE NÃO TIVER DADOS, RETORNA UMA COLEÇÃO VAZIA (GeoJSON Válido)
    if (!coordinates || coordinates.length === 0) {
      return {
        type: "FeatureCollection",
        features: [],
      };
    }

    // 2. SE TIVER DADOS, CRIA O LINESTRING
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

  const lastCoordinate = coordinates.length > 0 ? coordinates[coordinates.length - 1] : null;

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} mapStyle={mapTilerStyleURL}>
        
        {lastCoordinate && (
           <Camera 
             centerCoordinate={lastCoordinate} 
             zoomLevel={15} 
             animationMode="easeTo" 
             animationDuration={500} 
           />
        )}
        <ShapeSource key={`route-${coordinates.length}`}  id="minhas-rotas" shape={geoJSONData}>
          <LineLayer
            id="linha-trajeto"
            style={{
              lineColor: "#823c14",
              lineWidth: 5,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
          <CircleLayer
            id="ponto-atual"
            style={{
              circleRadius: 6,
              circleColor: "#ff7a2eff",
              circleStrokeWidth: 2,
              circleStrokeColor: "#ffffff",
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}