Vappiano
========
The IP-based locator.

About
-----
Vappiano is delivered with two modes: The first one performs 301 redirects, while the second one is a proxy that sends requests to the target server.

Setup
-----
Download the [GeoIP](http://dev.maxmind.com/geoip/legacy/geolite/) database and store it inside the *vappiano* folder. Then, configure the target routes manually inside `vappiano.js`.
Configuration files? /sbatta atm.

How to run
----------
Execute `npm install` to install the required dependencies and then do `node vappiano.js [redirector|proxy] [port]`.
