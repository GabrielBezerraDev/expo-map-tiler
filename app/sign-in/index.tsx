import { useRef } from "react";
import { Alert } from "react-native";
import { Button, Input, YStack, Form, Text, Spinner, XStack } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuthStorage } from "../../hooks/useAuthStorage";
import { useUserProvider } from "providers/useUserProvider";

export default function SignIn() {
  const router = useRouter();
  const { saveToken } = useAuthStorage();
  const { setUser } = useUserProvider();
  const { userType } = useLocalSearchParams();

  const onSignIn = async (data: any) => {
    try {
      const response = await fetch("http://172.21.72.238:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        await saveToken(result.token);

        console.log("Payload:", result.payload);
        setUser(result.payload);
        userType === "client"
          ? router.navigate("/client/trips")
          : router.navigate("/transport");
      } else {
        Alert.alert("Erro", result.error);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão");
    }
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const passwordRef = useRef<any>(null);

  const handleSignUpPress = () => {
    router.navigate("/sing-up");
  };

  return (
    <YStack justify="center" items="center" flex={1} p="$10" bg="$background">
      <Form
        width="100%"
        gap="$4"
        onSubmit={handleSubmit(onSignIn)}
        borderWidth={1}
        borderColor="$borderColor"
        rounded="$4"
        p="$4"
      >
        <Text fontSize="$6" fontWeight="bold" text="center" mb="$2">
          Acessar Conta
        </Text>

        {/* CAMPO EMAIL */}
        <Controller
          name="email"
          control={control}
          rules={{ required: "E-mail é obrigatório" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              {errors.email && (
                <Text color="$red10" fontSize="$2" mt="$1">
                  {errors.email.message as string}
                </Text>
              )}
            </YStack>
          )}
        />

        {/* CAMPO SENHA */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                ref={passwordRef}
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                returnKeyType="go"
                onSubmitEditing={handleSubmit(onSignIn)}
              />
              {errors.password && (
                <Text color="$red10" fontSize="$2" mt="$1">
                  {errors.password.message as string}
                </Text>
              )}
            </YStack>
          )}
        />

        {/* BOTÃO LOGAR */}
        <Form.Trigger asChild>
          <Button
            theme="active"
            disabled={isSubmitting}
            opacity={isSubmitting ? 0.5 : 1}
            icon={isSubmitting ? <Spinner /> : undefined}
          >
            {isSubmitting ? "Entrando..." : "Logar"}
          </Button>
        </Form.Trigger>
      </Form>

      {/* --- LINK PARA CADASTRO --- */}
      <XStack mt="$4" gap="$2">
        <Text color="$color" fontSize="$3">
          Não tem uma conta?
        </Text>
        <Text
          onPress={handleSignUpPress}
          color="$blue10" // Cor de link (azul do tema)
          fontWeight="bold"
          fontSize="$3"
          hoverStyle={{ textDecorationLine: "underline", cursor: "pointer" }} // Estilo para Web
          pressStyle={{ opacity: 0.7 }} // Feedback visual no toque (Mobile)
        >
          Cadastre-se
        </Text>
      </XStack>
    </YStack>
  );
}
