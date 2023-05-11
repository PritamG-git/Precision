import { Alert, Keyboard, Linking, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage } from 'react-native-flash-message';

const HandleUnhandledTouches = () => {
  Keyboard.dismiss();
};

const NormalAlert = ({
  title = '',
  message = '',
  yesText = 'OK',
  cancelText = 'Cancel',
  singleButton = true,
}) => {
  return new Promise((resolve, reject) => {
    singleButton
      ? Alert.alert(
        title,
        message,
        [{ text: yesText, onPress: () => resolve(true), style: 'default' }],
        { cancelable: false },
      )
      : Alert.alert(
        title,
        message,
        [
          {
            text: cancelText,
            onPress: () => reject(false),
            style: 'default',
          },
          {
            text: yesText,
            onPress: () => resolve(true),
            style: 'default',
          },
          Platform.OS == "ios" && {
            text: 'Close',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
  });
};

const OpenCamera = (height, width) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      cropping: true,
      height,
      width
    })
      .then(file => {
        resolve(file);
      })
      .catch(error => {
        reject();
        if (error?.code == 'E_PERMISSION_MISSING') {
          NormalAlert({
            title: `Cannot Access Images`,
            message: `Please allow camera & photo permissions for app from settings`,
            singleButton: false
          }).then((resp) => Linking.openSettings())
        } else if (error?.code == 'E_NO_CAMERA_PERMISSION') {
          NormalAlert({
            title: `Cannot Access Images`,
            message: `Please allow camera & photo permissions for app from settings`,
            singleButton: false
          }).then((resp) => Linking.openSettings())
        }
      });
  });
};

const OpenGallery = (height, width) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      height,
      width
    })
      .then(file => {
        resolve(file);
      })
      .catch(error => {
        reject();
        if (error?.code == 'E_PERMISSION_MISSING') {
          NormalAlert({
            title: `Cannot Access Images`,
            message: `Please allow camera & photo permissions for app from settings`,
            singleButton: false
          }).then((resp) => Linking.openSettings())
        } else if (error.code === 'E_NO_LIBRARY_PERMISSION') {
          NormalAlert({
            title: `Cannot Access Images`,
            message: `Please allow camera & photo permissions for app from settings`,
            singleButton: false
          }).then((resp) => Linking.openSettings())
        }
      });
  });
};

const ValidateEmail = param => {
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const paramTrim = param?.trim();
  if (paramTrim) {
    if (emailRegex.test(paramTrim)) {
      return true;
    } else {
      showMessage({
        message: 'Please enter valid email address',
        type: "danger",
      });
      return false;
    }
  } else {
    showMessage({
      message: 'Please enter valid email address',
      type: "danger",
    });
    return false;
  }
};

const ValidateName = param => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const paramTrim = param?.trim();
  if (paramTrim) {
    if (nameRegex.test(paramTrim)) {
      return true;
    } else {
      showMessage({
        message: 'Please enter valid name',
        type: "danger",
      });
      return false;
    }
  } else {
    showMessage({
      message: 'Please enter valid name',
      type: "danger",
    });
    return false;
  }
};
export {
  HandleUnhandledTouches,
  NormalAlert,
  OpenCamera,
  OpenGallery,
  ValidateEmail,
  ValidateName,
};
