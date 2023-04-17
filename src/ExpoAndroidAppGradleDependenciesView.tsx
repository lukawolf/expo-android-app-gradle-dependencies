import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAndroidAppGradleDependenciesViewProps } from './ExpoAndroidAppGradleDependencies.types';

const NativeView: React.ComponentType<ExpoAndroidAppGradleDependenciesViewProps> =
  requireNativeViewManager('ExpoAndroidAppGradleDependencies');

export default function ExpoAndroidAppGradleDependenciesView(props: ExpoAndroidAppGradleDependenciesViewProps) {
  return <NativeView {...props} />;
}
