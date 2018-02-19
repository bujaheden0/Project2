module.exports =  {
    debug    : true,
    mongoUri : 'mongodb://localhost:27017/roommateFinder',
    facebook : {
        clientID : '261712024357597',
        clientSecret : '10ed4d35fa0f53cb76e2123b6f1d4338',
        callbackUrl : 'http://localhost:4200/api/oauth/facebook/callback'
    },
    google : {
        clientID : '59950765134-5vn63kn8b2oi2n2kkuvikg0dvlfjjmc4.apps.googleusercontent.com',
        clientSecret : 'dvGrvdBvNlLLcTpn9v6OSuoJ',
        callbackUrl : 'http://localhost:4200/api/oauth/google/callback'
    }
}
