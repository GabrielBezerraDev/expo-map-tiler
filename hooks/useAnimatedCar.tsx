// hooks/useAnimatedCar.ts
import { useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

interface UseAnimatedCarProps {
  coordinate: [number, number] | null;
  rotation: number;
  animationDuration?: number;
}

export function useAnimatedCar({
  coordinate,
  rotation,
  animationDuration = 1000,
}: UseAnimatedCarProps) {
  // Valores animados
  const animatedRotation = useSharedValue(0);
  const animatedLongitude = useSharedValue(0);
  const animatedLatitude = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  // Anima a rotação suavemente
  useEffect(() => {
    if (rotation !== undefined) {
      // Calcula a menor diferença angular (evita girar 350° quando poderia girar -10°)
      const currentRotation = animatedRotation.value;
      let diff = rotation - (currentRotation % 360);
      
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      animatedRotation.value = withTiming(currentRotation + diff, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [rotation]);

  // Anima a posição suavemente
  useEffect(() => {
    if (coordinate) {
      animatedLongitude.value = withTiming(coordinate[0], {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      });
      animatedLatitude.value = withTiming(coordinate[1], {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [coordinate]);

  // Efeito de pulse contínuo (estilo Uber quando está parado ou em movimento)
  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Repete infinitamente
      true // Reverte
    );
  }, []);

  // Estilo animado para a View do carro
  const animatedCarStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${animatedRotation.value}deg` },
      { scale: pulseScale.value },
    ],
  }));

  // Estilo animado para a sombra (pulsa junto)
  const animatedShadowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulseScale.value, [1, 1.05], [1, 1.1]) }],
    opacity: interpolate(pulseScale.value, [1, 1.05], [0.3, 0.2]),
  }));

  return {
    animatedCarStyle,
    animatedShadowStyle,
    animatedLongitude,
    animatedLatitude,
  };
}