// mobile/src/screens/Auth/LoginScreen.js
import { View, Text, TouchableOpacity } from "react-native"; // ⬅ add TouchableOpacity
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function LoginScreen({ navigation }) {
  // ⬅ accept navigation
  const { control, handleSubmit } = useForm();
  const { login } = useAuth();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0b0f14" }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "800",
          marginBottom: 12,
        }}
      >
        {t("login")}
      </Text>

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label={t("email")}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label={t("password")}
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <Button title={t("login")} onPress={handleSubmit(login)} />

      {/* ➜ add this link to go to Signup */}
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <Text style={{ color: "#9ca3af" }}>Don’t have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{ paddingVertical: 8 }}
        >
          <Text style={{ color: "#2563eb", fontWeight: "700" }}>
            Create one
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
