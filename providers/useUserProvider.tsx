import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import * as SecureStore from 'expo-secure-store';

// Definição do Usuário baseada na sua tabela do Supabase
export type User = {
  id: number | string; // O print mostra int8, mas as vezes o JWT manda string. Aceita ambos.
  email: string;
  first_name?: string; // Opcional pois pode não vir no login inicial
  last_name?: string;
  // Nunca salve a senha aqui!
};

interface UserContextData {
  user: User | null;
  setUser: (user:User) => void; 
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

//   // 1. Ao iniciar o App, tenta buscar o usuário salvo no celular
//   useEffect(() => {
//     async function loadStorageData() {
//       try {
//         const storedUser = await SecureStore.getItemAsync(USER_STORAGE_KEY);
        
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         }
//       } catch (error) {
//         console.log("Erro ao carregar usuário:", error);
//       } finally {
//         setIsLoading(false); // Libera o app (sai da splash screen)
//       }
//     }

//     loadStorageData();
//   }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para não precisar importar useContext e UserContext toda vez
export function useUserProvider() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um UserProvider");
  }
  return context;
}