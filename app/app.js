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

  // タスクトレイに格納
  var Menu = electron.Menu;
  var Tray = electron.Tray;

  var trayIcon = new Tray(__dirname + "/icon.png");

  // タスクトレイに右クリックメニューを追加
  var contextMenu = Menu.buildFromTemplate([
      { label: "表示", click: function () { mainWindow.show(); } },
      { label: "非表示", click: function () { mainWindow.hide(); } },
      { label: "終了", click: function () { mainWindow.close(); } }
  ]);
  trayIcon.setContextMenu(contextMenu);

  // タスクトレイのツールチップをアプリ名に
  trayIcon.setToolTip(app.getName());

  // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
  trayIcon.on("clicked", function () {
      mainWindow.focus();
  });
});
