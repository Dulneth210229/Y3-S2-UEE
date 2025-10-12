
// Load .env if available (won't crash if missing)
try { require('dotenv').config(); } catch (e) {}

export default {
  name: "Rural Jobs",
  slug: "rural-jobs",
  scheme: "ruraljobs",
  version: "1.0.0",
  extra: {
    API_URL: process.env.API_URL || "http://10.0.2.2:4000",
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || ""
  },
  plugins: [],
  ios: {
    bundleIdentifier: "com.example.ruraljobs",
    infoPlist: {
      NSMicrophoneUsageDescription: "We use the microphone for voice features.",
      NSCameraUsageDescription: "We use the camera to choose profile photos.",
      NSPhotoLibraryUsageDescription: "We need access to your library to upload photos."
    }
  },
  android: {
    package: "com.example.ruraljobs",
    permissions: [
      "RECORD_AUDIO",
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "VIBRATE",
      "INTERNET"
    ]
  }
};
