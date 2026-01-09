// components/AnimatedCar.tsx
import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { CarIcon } from "./CarIcon";
import { useAnimatedCar } from "../hooks/useAnimatedCar";

interface AnimatedCarProps {
  coordinate: [number, number];
  rotation: number;
  size?: number;
  color?: string;
}

export function AnimatedCar({
  coordinate,
  rotation,
  size = 50,
  color = "#1a1a2e",
}: AnimatedCarProps) {
  const { animatedCarStyle, animatedShadowStyle } = useAnimatedCar({
    coordinate,
    rotation,
    animationDuration: 800,
  });

  return (
    <Animated.View style={styles.container}>
      {/* Sombra animada separada */}
      <Animated.View
        style={[
          styles.shadow,
          {
            width: size * 0.8,
            height: size * 0.3,
            borderRadius: size * 0.4,
          },
          animatedShadowStyle,
        ]}
      />
      
      {/* Carro com rotação e scale animados */}
      <Animated.View style={[styles.carWrapper, animatedCarStyle]}>
        <CarIcon width={size} height={size} color={color} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    position: "absolute",
    bottom: -5,
    backgroundColor: "#000",
  },
  carWrapper: {
    // Sombra nativa do iOS/Android para efeito 3D
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});