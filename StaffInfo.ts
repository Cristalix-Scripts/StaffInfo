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
if (!config.isDisplayEnabled) config.isDisplayEnabled = true
if (!config.isPlayerPingEnabled) config.isPlayerPingEnabled = false
if (!config.isPlayerPingRainbow) config.isPlayerPingRainbow = false
if (!config.isAimDetected) config.isAimDetected = false
if (!config.isAimRainbow) config.isAimRainbow = false
if (!config.isCPSDrawEnabled) config.isCPSDrawEnabled = false
if (!config.isCPSDRawRainbow) config.isCPSDRawRainbow

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
var isDisplayEnabled = config.isDisplayEnabled
var isPlayerPingEnabled = config.isPlayerPingEnabled
var isPlayerPingRainbow = config.isPlayerPingRainbow
var isAimDetected = config.isAimDetected
var isAimRainbow = config.isAimRainbow
var isCPSDrawEnabled = config.isCPSDrawEnabled
var isCPSDrawRainbow = config.isCPSDRawRainbow

var allTime = config.allTime
var timestamp = 0
var currentTime = 0
var clicks = 0

scheduler.scheduleAtFixedRate(function() {
    if (timestamp == 0) return
    leftClicks = 0
    rightClicks = 0
    config.allTime = allTime
    Config.save(nickname, config)
}, 0, 10, TimeUnit.SECONDS)

function DisplayEnabled() {
    if (isDisplayEnabled) {
        Display.setTitle('「 Ник: ' + nickname + ' | FPS: ' + Draw.getFps() + ' | ' + UtilTime.now() + ' 」')
    } else {
        Display.setTitle('Cristalix')
    }
}

Events.on(this, 'game_loop', function() {
    DisplayEnabled()
})

Events.on(this, 'server_connect', function() {
    currentTime = 0
    timestamp = System.currentTimeMillis()
})

Events.on(this, 'key_press', function (e) {
    stdout.println(e.key)
    if (e.key == 0) clicks++
})

scheduler.scheduleAtFixedRate(function() {
    clicks = 0
}, 0, 1, TimeUnit.SECONDS)

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
            Draw.drawRect(96, 0, 1, 75, 0x4C000000)
            fontRenderer.drawStringWithShadow('Весь онлайн', 5, 14, color)
            fontRenderer.drawStringWithShadow(allTimeFormatted, 11, 26, color)
            fontRenderer.drawStringWithShadow('Текущий онлайн', 5, 38, color)
            fontRenderer.drawStringWithShadow(currentTimeFormatted, 11, 50, color)
        } else {
            Draw.drawRect(width - 96, 0, width - 1, 75, 0x4C000000)
            fontRenderer.drawStringWithShadow('Весь онлайн', width - 92, 4, color)
            fontRenderer.drawStringWithShadow(allTimeFormatted, width - 86, 16, color)
            fontRenderer.drawStringWithShadow('Текущий онлайн', width - 92, 28, color)
            fontRenderer.drawStringWithShadow(currentTimeFormatted, width - 86, 40, color)
        }
    }
}

function DrawCPS() {
    if (isCPSDrawEnabled) {
        let color = 0xffffff
        if (isCPSDrawRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        fontRenderer.drawStringWithShadow(clicks, 10, 10, color)
    }
}

function buildKeystrokes() {
    if (isKeystrokesEnabled) {
        const res = Draw.getResolution()
        const width = res.getScaledWidth()
        const height = res.getScaledHeight()

        let color = 0xCC000000
        let colorr = 0x808080
        let colorrr = 0xCC808080
        let pressColor = 0xCCffffff
        if (isKeystrokesRainbow) colorr = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1), colorrr = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        if (isKeystrokesLeft) {
            Draw.drawRect(50, 85, 30, 105, Keyboard.isKeyDown(31) ? pressColor : color)
            fontRenderer.drawStringWithShadow('S', 38, 92, colorr)

            Draw.drawRect(50, 60, 30, 80, Keyboard.isKeyDown(17) ? pressColor : color)
            fontRenderer.drawStringWithShadow('W', 38, 67, colorr)

            Draw.drawRect(75, 85, 55, 105, Keyboard.isKeyDown(32) ? pressColor : color)
            fontRenderer.drawStringWithShadow('A', 63, 92, colorr)

            Draw.drawRect(25, 85, 5, 105, Keyboard.isKeyDown(30) ? pressColor : color)
            fontRenderer.drawStringWithShadow('D', 13, 92, colorr)

            Draw.drawRect(75, 110, 5, 130, Keyboard.isKeyDown(57) ? pressColor : color)
            Draw.drawRect(60, 119, 20, 121, colorrr)

            Draw.drawRect(37, 135, 5, 155, Mouse.isButtonDown(0) ? pressColor : color)
            fontRenderer.drawStringWithShadow('LMB', 13, 142, colorr)

            Draw.drawRect(75, 135, 42, 155, Mouse.isButtonDown(1) ? pressColor : color)
            fontRenderer.drawStringWithShadow('RMB', 50, 142, colorr)
        } else {
            Draw.drawRect(width - 50, height - 105, width - 30, height - 125, Keyboard.isKeyDown(17) ? pressColor : color)
            fontRenderer.drawStringWithShadow('W', width - 43, height - 118, colorr)

            Draw.drawRect(width - 50, height - 80, width - 30, height - 100, Keyboard.isKeyDown(31) ? pressColor : color)
            fontRenderer.drawStringWithShadow('S', width - 43, height - 93, colorr)

            Draw.drawRect(width - 75, height - 80, width - 55, height - 100, Keyboard.isKeyDown(30) ? pressColor : color)
            fontRenderer.drawStringWithShadow('A', width - 68, height - 93, colorr)
            Draw.drawRect(width - 25, height - 80, width - 5, height - 100, Keyboard.isKeyDown(32) ? pressColor : color)
            fontRenderer.drawStringWithShadow('D', width - 18, height - 93, colorr)

            Draw.drawRect(width - 75, height - 55, width - 5, height - 75, Keyboard.isKeyDown(57) ? pressColor : color)
            Draw.drawRect(width - 60, height - 64, width - 20, height - 66, colorrr)

            Draw.drawRect(width - 37, height - 30, width - 5, height - 52, Mouse.isButtonDown(1) ? pressColor : color)
            fontRenderer.drawStringWithShadow('RMB',width - 30, height - 45, colorr)

            Draw.drawRect(width - 75, height - 30, width - 42, height - 52, Mouse.isButtonDown(0) ? pressColor : color)
            fontRenderer.drawStringWithShadow('LMB', width - 68, height - 45, colorr)
        }
    }
}

function PlayerPing() {
    if (isPlayerPingEnabled) {
        var name = Player.getName()
        var color = 0x8273f0
        if (isPlayerPingRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        fontRenderer.drawStringWithShadow(connection.getPlayerInfo(name).getResponseTime(), 4, 4, color)
    }

}

function BIGKINGSmallDick() {
    if (isCoordsEnabled) {
        var color = 0xfae1a7
        const res = Draw.getResolution()
        const width = res.getScaledWidth()
        if (isCoordsRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        if (isCoordsPosition) {
            fontRenderer.drawStringWithShadow("x: " + Math.floor(Player.getPosX()), width - 60, 4, color) + fontRenderer.drawStringWithShadow("Y: " + Math.floor(Player.getPosY()), width - 60, 16, color) + fontRenderer.drawStringWithShadow("Z: " + Math.floor(Player.getPosZ()), width - 60, 28, color)
        } else {
            fontRenderer.drawStringWithShadow("x: " + Math.floor(Player.getPosX()), 4, 4, color) + fontRenderer.drawStringWithShadow("Y: " + Math.floor(Player.getPosY()), 4, 16, color) + fontRenderer.drawStringWithShadow("Z: " + Math.floor(Player.getPosZ()), 4, 28, color)
        }
    }
}

function DetectAim() {
    if (isAimDetected) {
        let resolution = Draw.getResolution();
        let x = resolution.getScaledWidth() / 2;
        let y = resolution.getScaledHeight() / 2;
        let color = 0x03fc90
        if (isAimRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        Draw.drawHorizontalLine(2 + x, 4 + x, y, color)
        Draw.drawVerticalLine(x, 2 + y, 5 + y, color)
        Draw.drawHorizontalLine(-2 + x, -4 + x, y, color)
        Draw.drawVerticalLine(x, -2 + y, -5 + y, color)

    }
}

Events.on(this, 'gui_overlay_render', function() {
    buildBoard()
    buildKeystrokes()
    BIGKINGSmallDick()
    PlayerPing()
    DetectAim()
    DrawCPS()
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
    if (args[0] == '/dis' || args[0] == '/display') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isDisplayEnabled = (isDisplayEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }

    if (args[0] == '/ping' || args[0] == '/playerping') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isPlayerPingEnabled = (isPlayerPingEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isPlayerPingRainbow = (isPlayerPingRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
    if (args[0] == '/hb' || args[0] == '/hitbox') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isAimDetected = (isAimDetected ^= true)
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isAimRainbow = (isAimRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
    if (args[0] == '/cps' || args[0] == '/clicks') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isCPSDrawEnabled = (isCPSDrawEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            case 'rainbow': {
                event.cancelled = true
                config.isCPSDrawRainbow = (isCPSDrawRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
})
