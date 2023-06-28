export const environment = {
  production       : false,
  environmentName  : 'Dev',
  version          : '1.0.0',
  intranet: {
    api: 'http://10.23.14.95:8995/Servicios/AccesoDatos_1.0.0/api'
  },
  internet: {
    autheticated: 'https://apim-dev-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated',
    SUBSCRIPTIONKEY: "dfeb9e69860f45258647cc7ba45fb040",
    api: 'https://apim-dev-proxy.sodhc.co/accesoDatos/SGL/'
  },
  customApi:{
    api: ''
  }
};
