export const environment = {
  production       : true,
  environmentName  : 'QA',
  version          : '1.0.0',
  intranet: {
    api: 'http://10.23.14.94:8995/Servicios/AccesoDatos_1.0.0/api',
  },
  internet: {
    autheticated: 'https://apim-qa-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated', 
    SUBSCRIPTIONKEY: "442c55ae313642028c9eb69dc4220dad",
    api: 'https://apim-qa-proxy.sodhc.co/accesoDatos/SGL/', 
  },
  customApi:{
    api: ''
  }
};
