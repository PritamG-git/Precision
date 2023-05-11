import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import notifee from '@notifee/react-native';
import { Platform } from 'react-native';
import { store } from '@/store';
import { setNotificationCount } from '@/actions/UserActions';

export async function requestUserPermission() {
    if (Platform.OS == 'android') {
        await notifee.requestPermission()
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken()
    }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken()
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (err) {
            showMessage({
                message: err.message,
                type: "danger",
            });
        }
    }
}

export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log(
            'Notification on foreground state:',
            remoteMessage.notification,
        );
        store.dispatch(setNotificationCount(store.getState().user.activeNotification + 1))
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });
        await notifee.displayNotification({ ...remoteMessage.notification, android: { channelId } });
    })
}