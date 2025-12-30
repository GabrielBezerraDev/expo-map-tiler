import { useToastController } from "@tamagui/toast";
import MapsTiler, { CoordinatesType } from "components/MapTiler";
import { useTracker } from "hooks/useTracker";
import { useDeviceIdProvider } from "providers/useDeviceIdProvider";
import { useSocketProvider } from "providers/useSocketProvider";
import { useEffect, useState } from "react";

export default function ClientMap() {
  const { location } = useTracker();
  const { userId } = useDeviceIdProvider();
  const [trackPath, setTrackPath] = useState<CoordinatesType[]>([]);
  const { socket, openConnection } = useSocketProvider();
  const toastController = useToastController();
  useEffect(() => {
    openConnection();
    setTrackPath((paths) => {
      if (location?.coords) {
        paths.push([
          location?.coords.longitude,
          location?.coords.latitude
        ]);
        toastController.show(
          `eixo x: ${paths[paths.length - 1][0]} | eixo y: ${
            paths[paths.length - 1][1]
          }\n`
        );
        if(socket) socket.emit('update_position', {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            userId: userId
        });
      }
      
      return [...paths];
    });
  }, [location]);

  return <MapsTiler coordinates={trackPath}></MapsTiler>;
}
