"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();

var config = require('./cfg.json');

var prefix = config.prefix;

var _require = require('node-ssh'),
    NodeSSH = _require.NodeSSH;

require('dotenv').config();

var _process$env = process.env,
    TOKEN = _process$env.TOKEN,
    PREFIX = _process$env.PREFIX;
var ssh = new NodeSSH();
var vpsler = [{
  host: '37.120.222.133',
  username: 'root',
  passphrase: 'quexhardvps31'
}];
client.on('ready', function () {
  console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.on('message', function _callee(msg) {
  var gonderen;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (msg.content === "test") {
            gonderen = msg.author.username;
            ssh.connect(vpsler[0]).then(function () {
              ssh.execCommand('ls -la').then(function (result) {
                console.log("STDOUT: ".concat(result.stdout));
                console.log("STDERR: ".concat(result.stderr));
              });
            });
            msg.reply("[".concat(vpsler[0].host, ":").concat(vpsler[0].port, "] Test ediliyor!"));
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(TOKEN);