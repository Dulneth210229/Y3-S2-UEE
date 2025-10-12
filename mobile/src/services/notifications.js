import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldSetBadge: false, shouldPlaySound: false })
});

export async function registerNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
}

export async function notifyLocal(title, body) {
  return Notifications.scheduleNotificationAsync({ content: { title, body }, trigger: null });
}
