import React from "react"; // Importante para os tipos
import { PointAnnotation, Callout } from "@maplibre/maplibre-react-native";
import { StyleSheet, View as RNView } from "react-native"; // Recomendo usar View do RN para o container do marker
import { Text, View } from "tamagui";

// Omitimos 'children' para evitar conflito, pois você define o conteúdo fixo dentro
export interface PointAnnotationMapTilerProps 
  extends Omit<React.ComponentProps<typeof PointAnnotation>, "children"> {}

export const PointAnnotationMapTiler = (props: PointAnnotationMapTilerProps) => {
  return (
    <PointAnnotation
      {...props} 
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerDot} />
      </View>

      <Callout title="Detalhes" contentStyle={{ borderRadius: 12 }}>
        <View p="$2" width={200} bg={'white'} rounded={'$4'}>
            <Text color="black" fontWeight="bold">Ponto {props.id}</Text>
            <Text color="black">Coordenada carregada.</Text>
            <Text color="black">Coordenada X: {props.coordinate[0]}</Text>
            <Text color="black">Coordenada Y: {props.coordinate[1]}</Text>
        </View>
      </Callout>
    </PointAnnotation>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 15,
  },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ff7a2eff",
    borderWidth: 2,
    borderColor: "white",
  },
});