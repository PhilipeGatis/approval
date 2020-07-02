import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core/styles';

interface AppOptions {
  drawerToolsWidth: number;
  infoAreaWidth: number;
}

interface AppThemeOptions extends ThemeOptions {
  app?: AppOptions;
}

export interface AppTheme extends Theme {
  app: AppOptions;
}

const appTheme: AppThemeOptions = {
  app: {
    drawerToolsWidth: 56,
    infoAreaWidth: 356,
  },
};

const theme: Theme = createMuiTheme(appTheme);

export default theme;
