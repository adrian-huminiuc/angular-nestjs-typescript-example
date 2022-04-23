// every variable will be replaced in the docker-compose start command
export const environment = {
  production: false,
  lhvUrl: 'https://api.sandbox.lhv.eu',
  appUrl: '${APP_URL}',
  apiUrl: '${API_URL}',
  lhvApiClientId: '${LHV_API_CLIENT_ID}'
};
