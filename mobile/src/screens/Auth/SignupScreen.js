// mobile/src/screens/Auth/SignupScreen.js
import { View, Text, TouchableOpacity } from "react-native"; // ⬅ add TouchableOpacity
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function SignupScreen({ navigation }) {
  // ⬅ accept navigation
  const { control, handleSubmit } = useForm({
    defaultValues: { role: "JobSeeker" },
  });
  const { signup } = useAuth();
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
        {t("signup")}
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
      <Controller
        name="role"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Role"
            selectedValue={value}
            onValueChange={onChange}
            items={[
              { label: "JobSeeker", value: "JobSeeker" },
              { label: "JobPoster", value: "JobPoster" },
            ]}
          />
        )}
      />

      <Button title={t("signup")} onPress={handleSubmit(signup)} />

      {/* ➜ optional link back to Login */}
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <Text style={{ color: "#9ca3af" }}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={{ paddingVertical: 8 }}
        >
          <Text style={{ color: "#2563eb", fontWeight: "700" }}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
