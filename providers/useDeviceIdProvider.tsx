import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";

export interface DeviceIdContextInterface {
  generateUUID: () => string;
  userId: string;
}

const DeviceIdContext = createContext({} as DeviceIdContextInterface);

const DeviceIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    (async () => {
      setUserId(await getPermanentDeviceId());
    })();
  }, []);

  const getPermanentDeviceId = async (): Promise<string> => {
    if (Platform.OS === "android") {
      const androidId = Application.getAndroidId();
      return androidId || generateUUID();
    } else {
      let iosId = await SecureStore.getItemAsync("secure_deviceid", {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
      });

      if (iosId) {
        return iosId;
      }

      const newId = uuidv4();
      await SecureStore.setItemAsync("secure_deviceid", newId, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
      });

      return newId;
    }
  };

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return (
    <DeviceIdContext.Provider value={{ generateUUID, userId }}>
      {children}
    </DeviceIdContext.Provider>
  );
};

const useDeviceIdProvider = () => {
  const context = useContext(DeviceIdContext);
  return context;
};

export { useDeviceIdProvider, DeviceIdProvider };
