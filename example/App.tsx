import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAndroidAppGradleDependencies from 'expo-android-app-gradle-dependencies';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAndroidAppGradleDependencies.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
