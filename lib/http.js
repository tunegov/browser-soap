/*
 * Copyright (c) 2011 Vinay Pulim <vinay@milewise.com>
 * MIT Licensed
 */

var url = require('./url');
var ajax = require('./ajax')

var VERSION = "0.2.0";

exports.request = function (rurl, data, callback, exheaders, exoptions) {
  headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  exheaders = exheaders || {};
  for (var attr in exheaders) {
    headers[attr] = exheaders[attr];
  }
  ajax.send(rurl, function (xhr) {
    var resp = { statusCode: xhr.status };
    var status = Math.floor(xhr.status / 100);
    if (status === 2) {
      callback(null, resp, xhr.responseText);
    } else {
      callback("Eroor:: " + xhr.status, resp, xhr.responseText);
    }
  }, data ? "POST" : "GET", data, headers);
}
