import { useRef } from "react";
import { Alert } from "react-native";
import { Button, Input, YStack, Form, Text, Spinner, H3 } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { useAuthStorage } from "../../hooks/useAuthStorage";
import { navigate } from "expo-router/build/global-state/routing";
import { useUserProvider } from "providers/useUserProvider";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    watch, // Necessário para comparar as senhas
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });
  const { setUser } = useUserProvider();

  // Refs para gerenciar a ordem de foco do teclado
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);
  const { saveToken } = useAuthStorage();
  const onSignUp = async (formData: any) => {
    try {
      console.log(
        "Enviando dados para:",
        "http://172.21.72.238:3000/auth/register"
      );

      const response = await fetch("http://172.21.72.238:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o backend retornou erro (ex: 400 - Email já existe)
        throw new Error(data.error || "Erro ao criar conta.");
      }

      // SUCESSO!
      console.log("Cadastro realizado:", data);

      // 1. Salva o token no SecureStore (Auto-Login)
      if (data.token) {
        await saveToken(data.token);
        setUser(data.user);
      }

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigate("/transport");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", error.message || "Falha na conexão com o servidor.");
    }
  };

  return (
    <YStack justify="center" items="center" flex={1} p="$10" bg="$background">
      <Form
        width="100%"
        gap="$4"
        onSubmit={handleSubmit(onSignUp)}
        borderWidth={1}
        borderColor="$borderColor"
        rounded="$4"
        p="$4"
      >
        <H3 text="center" mb="$2">
          Crie sua conta
        </H3>

        {/* --- CAMPO EMAIL --- */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          }}
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

        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "Primeiro nome é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                placeholder="Primeiro Nome"
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

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "Primeiro nome é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                placeholder="Segundo Nome"
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

        {/* --- CAMPO SENHA --- */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                ref={passwordRef}
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
              {errors.password && (
                <Text color="$red10" fontSize="$2" mt="$1">
                  {errors.password.message as string}
                </Text>
              )}
            </YStack>
          )}
        />

        {/* --- CAMPO CONFIRMAR SENHA --- */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirmação é obrigatória",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "As senhas não coincidem";
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <YStack>
              <Input
                ref={confirmPasswordRef}
                placeholder="Confirmar Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                returnKeyType="done" // Botão final "Concluído/Ir"
                onSubmitEditing={handleSubmit(onSignUp)}
              />
              {errors.confirmPassword && (
                <Text color="$red10" fontSize="$2" mt="$1">
                  {errors.confirmPassword.message as string}
                </Text>
              )}
            </YStack>
          )}
        />

        {/* --- BOTÃO CADASTRAR --- */}
        <Form.Trigger asChild>
          <Button
            theme="active"
            mt="$2"
            disabled={isSubmitting}
            opacity={isSubmitting ? 0.5 : 1}
            icon={isSubmitting ? <Spinner /> : undefined}
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
