import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.snapgame.app',
  appName: 'SnapGame',
  webDir: "../client",
  server: {
    cleartext: true,
    hostname: '10.0.2.2',
    androidScheme: 'http'
  }
};

export default config;
