import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "match",
    icon: "star-outline",
    title: "Smart job matches",
    body: "Get suggestions based on your skills, experience, and distance.",
  },
  {
    key: "voice",
    icon: "mic-outline",
    title: "Voice search & posting",
    body: "Find jobs or fill forms hands-free in English/Sinhala/Tamil.",
  },
  {
    key: "chat",
    icon: "chatbubbles-outline",
    title: "Real-time chat",
    body: "Message securely, receive notifications, and schedule interviews.",
  },
  {
    key: "offline",
    icon: "cloud-offline-outline",
    title: "Works offline",
    body: "Queue actions and sync automatically when you’re back online.",
  },
];

export default function OnboardingScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  const onDone = async (goTo = "Signup") => {
    await AsyncStorage.setItem("onboarded_v1", "1");
    navigation.replace(goTo);
  };

  const next = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
    } else {
      onDone("Signup");
    }
  };

  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
    <LinearGradient
      colors={["#0ea5e9", "#6366f1", "#0b0f14"]}
      style={{ flex: 1 }}
    >
      {/* Top bar */}
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onDone("Login")}>
          <Text style={{ color: "white", fontWeight: "700" }}>
            {t("login", "Login")}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity onPress={() => changeLang("en")}>
            <Text style={{ color: "white" }}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLang("si")}>
            <Text style={{ color: "white" }}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLang("ta")}>
            <Text style={{ color: "white" }}>TA</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => onDone("Signup")}>
          <Text style={{ color: "white", fontWeight: "700" }}>
            {t("skip", "Skip")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {slides.map((s) => (
          <View key={s.key} style={{ width, padding: 20 }}>
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                borderRadius: 24,
                padding: 24,
                overflow: "hidden",
                backgroundColor: "rgba(17,24,39,0.5)",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: 30,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <Ionicons name={s.icon} size={40} color="#fff" />
                </View>
              </View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                {t(`onb_${s.key}_title`, s.title)}
              </Text>
              <Text
                style={{
                  color: "#e5e7eb",
                  fontSize: 16,
                  marginTop: 12,
                  textAlign: "center",
                }}
              >
                {t(`onb_${s.key}_body`, s.body)}
              </Text>
            </BlurView>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={{ alignItems: "center", marginTop: 12 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: index === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === i ? "white" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={{ padding: 20, paddingBottom: 36 }}>
        <Button
          title={
            index === slides.length - 1
              ? t("get_started", "Get Started")
              : t("next", "Next")
          }
          onPress={next}
        />
        <TouchableOpacity
          onPress={() => onDone("Login")}
          style={{ marginTop: 12, alignItems: "center" }}
        >
          <Text style={{ color: "#e5e7eb" }}>
            {t("already_have_account", "Already have an account?")}{" "}
            <Text style={{ color: "white", fontWeight: "700" }}>
              {t("login", "Login")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
