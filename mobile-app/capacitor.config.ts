import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.snapgame.app',
  appName: 'SnapGame',
  webDir: "../client",
  server: {
    cleartext: true,
    hostname: '192.168.123.108',
    androidScheme: 'http'
  }
};

export default config;
