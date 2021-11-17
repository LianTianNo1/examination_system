// 引入模块
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

// 开发环境
const isDev = process.env.NODE_ENV === 'development'

let win

// 监听electron 加载完毕的时候的创建窗口等等
app.on('ready', function () {
  // 创建一个窗口 设置属性
  win = new BrowserWindow({
    //fullscreen: true   //全屏
    // resizable: false, //不允许用户改变窗口大小
    width: 1000, //设置窗口宽高
    height: 900,
    // icon: iconPath, //应用运行时的标题栏图标
    minWidth: 900, // 最小宽度
    minHeight: 800, // 最小高度
    // 进行对首选项的设置
    webPreferences: {
      backgroundThrottling: false, //设置应用在后台正常运行
      nodeIntegration: true, //设置能在页面使用nodejs的API
      contextIsolation: false, //关闭警告信息
      webSecurity: false,
      // 使用 proload 预加载注入的模块
    },
  })
  // 删除菜单
  // win.removeMenu()
  // 打开开发者工具
  // win.webContents.openDevTools()
  // 这里让主进程加载一个index.html
  win.loadFile('./static/main.html')

  // 监听窗口关闭事件
  win.on('closed', () => {
    //释放win
    win = null
    app.exit()
  })
})

// 监听所有的窗口都关闭了
app.on('window-all-closed', () => {
  console.log('窗口全部都关闭了')
  app.exit()
})

// 退出程序，销毁窗口
ipcMain.on('destroy', () => {
  app.exit()
})
