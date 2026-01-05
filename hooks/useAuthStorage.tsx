import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "apolo_geo";

export const useAuthStorage = () => {
  const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  };

  const getToken = async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  };

  const removeToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  };

  return {
    saveToken, getToken, removeToken
  };

};
