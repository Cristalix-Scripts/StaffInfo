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
if (!config.isKeystrokesEnabled) config.isKeystrokesEnabled = true
if (!config.isKeystrokesRainbow) config.isKeystrokesRainbow = false

var isStaffInfoRainbow = config.isStaffInfoRainbow
var isKeystrokesEnabled = config.isKeystrokesEnabled
var isKeystrokesRainbow = config.isKeystrokesRainbow

var allTime = config.allTime
var timestamp = 0
var currentTime = 0

scheduler.scheduleAtFixedRate(function() {
    if (timestamp == 0) return
    config.allTime = allTime
    Config.save(nickname, config)
}, 0, 10, TimeUnit.SECONDS)

Events.on(this, 'game_tick_pre', function() {
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

    let color = 0xCFCCC2
    if (isStaffInfoRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)

    Draw.drawRect(width - 96, 0, width - 1, 55, 0xCC000000)
    Draw.drawString('Весь онлайн', width - 92, 4, color)
    Draw.drawString(allTimeFormatted, width - 86, 16, color)
    Draw.drawString('Текущий онлайн', width - 92, 28, color)
    Draw.drawString(currentTimeFormatted, width - 86, 40, color)
}

function buildKeystrokes() {
    if (isKeystrokesEnabled) {
        let keyStrokesBackColor = color //свой цвет
        let keyStrokesTextColor = color //свой цвет
        if (isKeystrokesRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1) //Свой rgb

        //тут отрисовываешь как выше по примеру
    }
}

Events.on(this, 'gui_overlay_render', function() {
    buildBoard()
    buildKeystrokes()
})

Events.on(this, 'chat_send', function(event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] != '/si' && args[0] != '/staffinfo') {
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
            default:
                break
        }
        return
    }

    if (args[0] != '/ks' && args[0] != '/keystrokes') {
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
            default:
                break
        }
        return
    }
})