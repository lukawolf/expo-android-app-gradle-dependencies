import * as React from 'react';

import { ExpoAndroidAppGradleDependenciesViewProps } from './ExpoAndroidAppGradleDependencies.types';

export default function ExpoAndroidAppGradleDependenciesView(props: ExpoAndroidAppGradleDependenciesViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
