import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAndroidAppGradleDependencies.web.ts
// and on native platforms to ExpoAndroidAppGradleDependencies.ts
import ExpoAndroidAppGradleDependenciesModule from './ExpoAndroidAppGradleDependenciesModule';
import ExpoAndroidAppGradleDependenciesView from './ExpoAndroidAppGradleDependenciesView';
import { ChangeEventPayload, ExpoAndroidAppGradleDependenciesViewProps } from './ExpoAndroidAppGradleDependencies.types';

// Get the native constant value.
export const PI = ExpoAndroidAppGradleDependenciesModule.PI;

export function hello(): string {
  return ExpoAndroidAppGradleDependenciesModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAndroidAppGradleDependenciesModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAndroidAppGradleDependenciesModule ?? NativeModulesProxy.ExpoAndroidAppGradleDependencies);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAndroidAppGradleDependenciesView, ExpoAndroidAppGradleDependenciesViewProps, ChangeEventPayload };
