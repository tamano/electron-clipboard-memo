'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({titleBarStyle: 'hidden', width: 600, height: 480});
  mainWindow.loadURL('file://' + __dirname + '/main.html');

  //TODO: 開発時のみ
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
