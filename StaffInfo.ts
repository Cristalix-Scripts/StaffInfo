/*
   ▄████████     ███        ▄████████    ▄████████    ▄████████       ▄█  ███▄▄▄▄      ▄████████  ▄██████▄
  ███    ███ ▀█████████▄   ███    ███   ███    ███   ███    ███      ███  ███▀▀▀██▄   ███    ███ ███    ███
  ███    █▀     ▀███▀▀██   ███    ███   ███    █▀    ███    █▀       ███▌ ███   ███   ███    █▀  ███    ███
  ███            ███   ▀   ███    ███  ▄███▄▄▄      ▄███▄▄▄          ███▌ ███   ███  ▄███▄▄▄     ███    ███
▀███████████     ███     ▀███████████ ▀▀███▀▀▀     ▀▀███▀▀▀          ███▌ ███   ███ ▀▀███▀▀▀     ███    ███
         ███     ███       ███    ███   ███          ███             ███  ███   ███   ███        ███    ███
   ▄█    ███     ███       ███    ███   ███          ███             ███  ███   ███   ███        ███    ███
 ▄████████▀     ▄████▀     ███    █▀    ███          ███             █▀    ▀█   █▀    ███         ▀██████▀
        ██╗  ██╗███████╗██╗   ██╗    ███████╗████████╗██████╗  ██████╗ ██╗  ██╗███████╗███████╗
        ██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔════╝
        █████╔╝ █████╗   ╚████╔╝     ███████╗   ██║   ██████╔╝██║   ██║█████╔╝ █████╗  ███████╗
        ██╔═██╗ ██╔══╝    ╚██╔╝      ╚════██║   ██║   ██╔══██╗██║   ██║██╔═██╗ ██╔══╝  ╚════██║
        ██║  ██╗███████╗   ██║       ███████║   ██║   ██║  ██║╚██████╔╝██║  ██╗███████╗███████║
        ╚═╝  ╚═╝╚══════╝   ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
                            https://github.com/Nartsissov | https://github.com/xpepelok
*/

const nickname = Player.getName()
const config = Config.load(nickname)
const scheduler = Executors.newSingleThreadScheduledExecutor()

if (!config.allTime) config.allTime = 0
if (!config.isStaffInfoRainbow) config.isStaffInfoRainbow = false
if (!config.isKeystrokesEnabled) config.isKeystrokesEnabled = false
if (!config.isKeystrokesRainbow) config.isKeystrokesRainbow = false
if (!config.isKeystrokesLeft) config.isKeystrokesLeft = false
if (!config.isCoordsEnabled) config.isCoordsEnabled = false
if (!config.isCoordsRainbow) config.isCoordsRainbow = false
if (!config.isStaffInfoEnabled) config.isStaffInfoEnabled = true
if (!config.isGuiEnabled) config.isGuiEnabled = true
if (!config.isCoordsExtend) config.isCoordsExtend = false
if (!config.isGuiPosition) config.isGuiPosition = false
if (!config.isCoordsPosition) config.isCoordsPosition = false

var isStaffInfoRainbow = config.isStaffInfoRainbow
var isKeystrokesEnabled = config.isKeystrokesEnabled
var isKeystrokesRainbow = config.isKeystrokesRainbow
var isKeystrokesLeft = config.isKeystrokesLeft
var isCoordsEnabled = config.isCoordsEnabled
var isCoordsRainbow = config.isCoordsRainbow
var isStaffInfoEnabled = config.isStaffInfoEnabled
var isGuiEnabled = config.isGuiEnabled
var isCoordsExtend = config.isCoordsExtend
var isGuiPosition = config.isGuiPosition
var isCoordsPosition = config.isCoordsPosition

var allTime = config.allTime
var timestamp = 0
var currentTime = 0

scheduler.scheduleAtFixedRate(function() {
    if (timestamp == 0) return
    leftClicks = 0
    rightClicks = 0
    config.allTime = allTime
    Config.save(nickname, config)
}, 0, 10, TimeUnit.SECONDS)

Events.on(this, 'game_loop', function() {
    Display.setTitle('「 Ник: ' + nickname + ' | FPS: ' + Draw.getFps() + ' | ' + UtilTime.now() + ' 」')
})

Events.on(this, 'server_connect', function() {
    currentTime = 0
    timestamp = System.currentTimeMillis()
})

function buildBoard() {
    if (timestamp == 0) return

    const res = Draw.getResolution()
    const width = res.getScaledWidth()

    const now = System.currentTimeMillis()
    const a = now - timestamp;
    const delta = a - currentTime
    currentTime = a
    allTime += delta

    let allTimeFormatted = UtilTime.makeStr(allTime)
    let currentTimeFormatted = UtilTime.makeStr(currentTime)
    if (isStaffInfoEnabled) {
        let color = 0xCFCCC2
        if (isStaffInfoRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        if (isGuiPosition) {
            Draw.drawRect(96, 0, 1, 55, 0x4C000000)
            Draw.drawString('Весь онлайн', 5, 4, color)
            Draw.drawString(allTimeFormatted, 11, 16, color)
            Draw.drawString('Текущий онлайн', 5, 28, color)
            Draw.drawString(currentTimeFormatted, 11, 40, color)
        } else {
            Draw.drawRect(width - 96, 0, width - 1, 55, 0x4C000000)
            Draw.drawString('Весь онлайн', width - 92, 4, color)
            Draw.drawString(allTimeFormatted, width - 86, 16, color)
            Draw.drawString('Текущий онлайн', width - 92, 28, color)
            Draw.drawString(currentTimeFormatted, width - 86, 40, color)
            }
        }
    }

function buildKeystrokes() {
    if (isKeystrokesEnabled) {
        const res = Draw.getResolution()
        const width = res.getScaledWidth()
        const height = res.getScaledHeight()

        let color = 0xCFCCC2
        let pressColor = 0x606C6E
        if (isKeystrokesRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        if (isKeystrokesLeft) {
            Draw.drawRect(50, 85, 30, 105, 0xCC000000)
            Draw.drawString('S', 38, 92,

                Keyboard.isKeyDown(31) ? pressColor : color)

            Draw.drawRect(50, 60, 30, 80, 0xCC000000)
            Draw.drawString('W', 38, 67, Keyboard.isKeyDown(17) ? pressColor : color)

            Draw.drawRect(75, 85, 55, 105, 0xCC000000)
            Draw.drawString('A', 63, 92, Keyboard.isKeyDown(32) ? pressColor : color)

            Draw.drawRect(25, 85, 5, 105, 0xCC000000)
            Draw.drawString('D', 13, 92, Keyboard.isKeyDown(30) ? pressColor : color)

            Draw.drawRect(75, 110, 5, 130, 0xCC000000)
            Draw.drawString('SPACE', 26, 117, Keyboard.isKeyDown(57) ? pressColor : color)

            Draw.drawRect(37, 135, 5, 155, 0xCC000000)
            Draw.drawString('LMB', 13, 142, Mouse.isButtonDown(0) ? pressColor : color)

            Draw.drawRect(75, 135, 42, 155, 0xCC000000)
            Draw.drawString('RMB', 50, 142, Mouse.isButtonDown(1) ? pressColor : color)
        } else {
            Draw.drawRect(width - 50, height - 105, width - 30, height - 125, 0xCC000000)
            Draw.drawString('W', width - 43, height - 118, Keyboard.isKeyDown(17) ? pressColor : color)

            Draw.drawRect(width - 50, height - 80, width - 30, height - 100, 0xCC000000)
            Draw.drawString('S', width - 43, height - 93, Keyboard.isKeyDown(31) ? pressColor : color)

            Draw.drawRect(width - 75, height - 80, width - 55, height - 100, 0xCC000000)
            Draw.drawString('A', width - 68, height - 93, Keyboard.isKeyDown(30) ? pressColor : color)

            Draw.drawRect(width - 25, height - 80, width - 5, height - 100, 0xCC000000)
            Draw.drawString('D', width - 18, height - 93, Keyboard.isKeyDown(32) ? pressColor : color)

            Draw.drawRect(width - 75, height - 55, width - 5, height - 75, 0xCC000000)
            Draw.drawString('SPACE', width - 54, height - 69, Keyboard.isKeyDown(57) ? pressColor : color)

            Draw.drawRect(width - 37, height - 30, width - 5, height - 52, 0xCC000000)
            Draw.drawString('RMB',width - 30, height - 45, Mouse.isButtonDown(1) ? pressColor : color)

            Draw.drawRect(width - 75, height - 30, width - 42, height - 52, 0xCC000000)
            Draw.drawString('LMB', width - 68, height - 45, Mouse.isButtonDown(0) ? pressColor : color)
        }
    }
}

function BIGKINGSmallDick() {
    if (isCoordsEnabled) {
        var color = 0xfae1a7
        const res = Draw.getResolution()
        const width = res.getScaledWidth()
        if (isCoordsRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        if (isCoordsPosition) {
            Draw.drawString("x: " + Math.floor(Player.getPosX()), width - 60, 4, color) + Draw.drawString("Y: " + Math.floor(Player.getPosY()), width - 60, 16, color) + Draw.drawString("Z: " + Math.floor(Player.getPosZ()), width - 60, 28, color)
        } else {
            Draw.drawString("x: " + Math.floor(Player.getPosX()), 4, 4, color) + Draw.drawString("Y: " + Math.floor(Player.getPosY()), 4, 16, color) + Draw.drawString("Z: " + Math.floor(Player.getPosZ()), 4, 28, color)
        }
    }
}

Events.on(this, 'gui_overlay_render', function() {
    buildBoard()
    buildKeystrokes()
    BIGKINGSmallDick()
})

Events.on(this, 'chat_send', function(event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] == '/si' || args[0] == '/staffinfo') {
        switch (args[1]) {
            case 'save': {
                event.cancelled = true
                config.allTime = allTime
                Config.save(nickname, config)
                break
            }
            case 'reset': {
                event.cancelled = true
                currentTime = 0
                allTime = 0
                timestamp = System.currentTimeMillis()
                config.allTime = 0
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isRainbow = (isStaffInfoRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            case 'toggle': {
                event.cancelled = true
                config.isStaffInfoEnabled = (isStaffInfoEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'scoreboard': {
                event.cancelled = true
                config.isGuiEnabled = (isGuiEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'position': {
                event.cancelled = true
                config.isGuiPosition = (isGuiPosition ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }

    if (args[0] == '/ks' || args[0] == '/keystrokes') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isKeystrokesEnabled = (isKeystrokesEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isKeystrokesRainbow = (isKeystrokesRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            case 'position': {
                event.cancelled = true
                config.isKeystrokesLeft = (isKeystrokesLeft ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
    if (args[0] == '/coords' || args[0] == '/coordinates') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isCoordsEnabled = (isCoordsEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isCoordinatesRainbow = (isCoordsRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            case 'position': {
                event.cancelled = true
                config.isCoordsPosition = (isCoordsPosition ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
})
