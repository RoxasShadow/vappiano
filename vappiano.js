/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    geoip = require('geoip'),
    path = require('path');

var options = {
  geoip: 'GeoIP.dat'
};

options.geoip = path.join(path.dirname(require.main.filename), options.geoip);
options.proxy = process.argv[2] == 'proxy';
options.port = parseInt(process.argv[3] || 80);

http.createServer(function(req, res) {
  var remoteAddress = req.connection.remoteAddress;
  var country = new geoip.Country(options.geoip);
  var countryObj = country.lookupSync(remoteAddress);

  var target = '';
  switch(countryObj.country_code) {
    case 'UK':
      target = 'http://uk.mozestudio.com';
      break;
    default:
      target = 'http://www.mozestudio.com';
  }

  if(proxy) {
    proxy.web(req, res, { target: target });
  }
  else {
    res.writeHead(301, { 'Location': target });
  }

  res.end();
}).listen(options.port, function() {
  console.log('vappiano started on port ' + options.port + ' in ' + (options.proxy ? 'proxy' : 'redirector') + ' mode.');
});
