import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useToastController } from '@tamagui/toast';

export const useTracker = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const toastController = useToastController();
  const subscriber = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      // 2. Iniciar o "Watch" (Vigia)
      subscriber.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // Alta precisão (GPS)
          timeInterval: 5000,              // A cada 5000ms (5 segundos)
          distanceInterval: 0,             // 0 metros (atualiza mesmo se estiver parado)
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();

    return () => {
      if (subscriber.current) {
        subscriber.current.remove(); 
      }
    };
  }, []);


  return { location, errorMsg };
};