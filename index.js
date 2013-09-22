var path = require('path');
var eejs = require("ep_etherpad-lite/node/eejs");

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content = '<script src="../static/plugins/ep_clear_authorship_no_prompt/static/js/clear_authorship_no_prompt.js"></script>' + args.content;
  return cb();
};
