import { useColorScheme } from "react-native";
import {
  PortalProvider,
  TamaguiProvider,
  type TamaguiProviderProps,
} from "tamagui"; // Importando do pacote principal
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { config } from "../tamagui.config";
import { CurrentToast } from "components/CurrentToast/CurrentToast";
import { SocketProvider } from "./useSocketProvider";
import { DeviceIdProvider } from "./useDeviceIdProvider";
import { UserProvider } from "./useUserProvider";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <SocketProvider>
        <DeviceIdProvider>
          <TamaguiProvider
            config={config}
            defaultTheme={colorScheme === "dark" ? "dark" : "light"}
            {...rest}
          >
            <PortalProvider shouldAddRootHost>
              <ToastProvider swipeDirection="horizontal" duration={6000}>
                {children}
                <CurrentToast />
                <ToastViewport top="$8" left={0} right={0} />
              </ToastProvider>
            </PortalProvider>
          </TamaguiProvider>
        </DeviceIdProvider>
      </SocketProvider>
    </UserProvider>
  );
}
