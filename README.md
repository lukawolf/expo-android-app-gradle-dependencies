# expo-android-app-gradle-dependencies

This expo module is used to inject custom dependencies into the android/app/build.gradle file

## Installation

```bash
npx expo install expo-android-app-gradle-dependencies
```

## Usage

Edit your *Expo* app's __`app.json`__ (or its dynamic .js/.ts config) to contain the following block:

:warning: The variables below are only an example (forcing an alpha build of okhttp to include Happy Eyeballs-like fast fallback). You should use whatever dependencies your project needs.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-android-app-gradle-dependencies", 
        {
          "spacing": "    ",
          "dependencies": [
            "com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.11",
            "com.squareup.okhttp3:okhttp:5.0.0-alpha.11",
            "com.squareup.okhttp3:okhttp-urlconnection:5.0.0-alpha.11"
          ]
        }
      ]
    ]
 }
```

Any string within the dependencies array will be added as per the example below. The spacing key is used to define your required indentation.


After adding the plugin, run or build your app using expo app services:
```bash
npx expo prebuild --clean
```

### Expected results in android/app/build.gradle
```diff
dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    def isGifEnabled = (findProperty('expo.gif.enabled') ?: "") == "true";
    def isWebpEnabled = (findProperty('expo.webp.enabled') ?: "") == "true";
    def isWebpAnimatedEnabled = (findProperty('expo.webp.animated') ?: "") == "true";
    def frescoVersion = rootProject.ext.frescoVersion

    // If your app supports Android versions before Ice Cream Sandwich (API level 14)
    if (isGifEnabled || isWebpEnabled) {
        implementation("com.facebook.fresco:fresco:${frescoVersion}")
        implementation("com.facebook.fresco:imagepipeline-okhttp3:${frescoVersion}")
    }

    if (isGifEnabled) {
        // For animated gif support
        implementation("com.facebook.fresco:animated-gif:${frescoVersion}")
    }

    if (isWebpEnabled) {
        // For webp support
        implementation("com.facebook.fresco:webpsupport:${frescoVersion}")
        if (isWebpAnimatedEnabled) {
            // Animated webp support
            implementation("com.facebook.fresco:animated-webp:${frescoVersion}")
        }
    }

    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.0.0")

    debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}")
    debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
        exclude group:'com.squareup.okhttp3', module:'okhttp'
    }
    debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
+    // START expo-android-app-gradle-dependencies
+    implementation 'com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.11'
+    implementation 'com.squareup.okhttp3:okhttp:5.0.0-alpha.11'
+    implementation 'com.squareup.okhttp3:okhttp-urlconnection:5.0.0-alpha.11'
+    // END expo-android-app-gradle-dependencies
}
```
