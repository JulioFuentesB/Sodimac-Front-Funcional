export const environment = {
  production      : true,
  environmentName  : 'PROD',
  version         : '1.0.0',
  intranet: {
    api: 'http://10.23.18.164:8995/Servicios/AccesoDatos_1.0.0/api',
  },
  internet: {
    autheticated: 'https://apim-prod-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated',
    SUBSCRIPTIONKEY: "209fa70e5b0c4b5c8bddaf0aa54b8e19",
    api: 'https://apim-prod-proxy.sodhc.co/accesoDatos/SGL/' 
  },
  customApi:{
    api: ''
  }
};
