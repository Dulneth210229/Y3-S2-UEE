# Rural Jobs Mobile (Expo)

## Setup
```bash
cd mobile
cp .env.example .env
npm i
npx expo install react-native-voice @react-native-picker/picker @react-native-async-storage/async-storage @react-native-community/netinfo expo-image-picker expo-notifications expo-speech react-native-webview
# For native modules (voice/picker) build a dev client or prebuild:
eas build --profile development --platform android
# OR
npx expo prebuild
npm run android
```
- Backend at `http://localhost:4000`. On Android emulator use `API_URL=http://10.0.2.2:4000`.

## Verify
- Auth signup/login
- Jobs browse, voice search, job creation launches Stripe Checkout (WebView)
- Chat realtime, local notifications
- Offline queue with NetInfo
