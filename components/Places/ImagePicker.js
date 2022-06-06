import {
  View,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {Colors} from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

export default function ImagePicker({onTakeImage}) {
  const [filePath, setFilePath] = useState();
  const requestCameraPermission = async () => {
    if ((Platform, PermissionsAndroid.OS === 'android')) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const takeImageHandler = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();

    if (isCameraPermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0].uri);
        onTakeImage(response.assets[0].uri)
      });
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (filePath) {
    imagePreview = <Image source={{uri: filePath}} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton
        children="Take Image"
        onPress={() => takeImageHandler('photo')}
        icon="camera"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow:"hidden"
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  },
});
