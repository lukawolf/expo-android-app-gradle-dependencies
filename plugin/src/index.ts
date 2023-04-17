import { ConfigPlugin, withAppBuildGradle, WarningAggregator } from 'expo/config-plugins';

export type PluginProps = {
  spacing?: string,
  dependencies?: string[],
}

const defaultProps: PluginProps = {
  spacing: '    ',
  dependencies: [],
}

const withAppGradleDependencies: ConfigPlugin = (config, _props: PluginProps | void) => {
  const props = {...defaultProps, ..._props || {}};
  config = withAppBuildGradle(config, config => {    
    if (config.modResults.language !== 'groovy') {
      WarningAggregator.addWarningAndroid(
        'withAppGradleDependencies',
        `Cannot automatically configure app/build.gradle if it's not groovy`,
      );
      return config;
    }
    const dependenciesBlockStart = config.modResults.contents.search(/^dependencies \{$/m);
    if (dependenciesBlockStart === -1) {
      WarningAggregator.addWarningAndroid(
        'withAppGradleDependencies',
        `Cannot configure app/build.gradle as no dependency block start was found`,
      );
      return config;
    }
    const fromDependencies = config.modResults.contents.substring(dependenciesBlockStart);
    const dependenciesBlockEnd = fromDependencies.search(/^\}$/m);
    if (dependenciesBlockEnd === -1) {
      WarningAggregator.addWarningAndroid(
        'withAppGradleDependencies',
        `Cannot configure app/build.gradle as no dependency block end was found`,
      );
      return config;
    }
    const position = dependenciesBlockStart + dependenciesBlockEnd;
    let insertedDependencies: string[] = [`${props.spacing}// START expo-android-app-gradle-dependencies\n`];
    props.dependencies?.forEach(dependency => {
      insertedDependencies.push(`${props.spacing}implementation '${dependency}'\n`);
    });
    insertedDependencies.push(`${props.spacing}// END expo-android-app-gradle-dependencies\n`);
    config.modResults.contents = [config.modResults.contents.slice(0, position), ...insertedDependencies, config.modResults.contents.slice(position)].join('');
    config.modResults.contents;
    return config;
  });
  return config;
};

export default withAppGradleDependencies;