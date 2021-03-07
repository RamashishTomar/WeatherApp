import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';

export default class Location {
  static checkAndRequest() {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then((result) => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                reject();
                break;

              case RESULTS.DENIED:
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, {
                  title: 'Location needed to determine your location',
                  message: 'We need the location to show wether forecast.',
                })
                  .then((result) => {
                    switch (result) {
                      case RESULTS.UNAVAILABLE:
                        reject();
                        break;

                      case RESULTS.DENIED:
                        reject();
                        break;

                      case RESULTS.GRANTED:
                        resolve();
                        break;

                      case RESULTS.BLOCKED:
                        reject();
                        break;
                    }
                  })
                  .catch((error) => reject(error));
                break;

              case RESULTS.GRANTED:
                resolve();
                break;

              case RESULTS.BLOCKED:
                reject();
                break;
            }
          })
          .catch((error) => reject(error));
      } else {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          .then((result) => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                reject();
                break;

              case RESULTS.DENIED:
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
                  title: 'Location needed to determine your location',
                  message: 'We need the location to show wether forecast.',
                })
                  .then((result) => {
                    switch (result) {
                      case RESULTS.UNAVAILABLE:
                        reject();
                        break;

                      case RESULTS.DENIED:
                        reject();
                        break;

                      case RESULTS.GRANTED:
                        resolve();
                        break;

                      case RESULTS.BLOCKED:
                        reject();
                        break;
                    }
                  })
                  .catch((error) => reject(error));
                break;

              case RESULTS.GRANTED:
                resolve();
                break;

              case RESULTS.BLOCKED:
                reject();
                break;
            }
          })
          .catch((error) => reject(error));
      }
    });
  }

  static getLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          let {
            coords: {latitude, longitude},
          } = position;
          let lat = parseFloat(latitude.toFixed(6));
          let lng = parseFloat(longitude.toFixed(6));
          resolve({lat, lng});
        },
        (error) => reject(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }
}
