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

      
      subscriber.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, 
          timeInterval: 5000,              
          distanceInterval: 0,             
        },
        (newLocation) => {
          console.log("Object: ",newLocation);
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