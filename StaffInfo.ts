/*
   ▄████████     ███        ▄████████    ▄████████    ▄████████       ▄█  ███▄▄▄▄      ▄████████  ▄██████▄
  ███    ███ ▀█████████▄   ███    ███   ███    ███   ███    ███      ███  ███▀▀▀██▄   ███    ███ ███    ███
  ███    █▀     ▀███▀▀██   ███    ███   ███    █▀    ███    █▀       ███▌ ███   ███   ███    █▀  ███    ███
  ███            ███   ▀   ███    ███  ▄███▄▄▄      ▄███▄▄▄          ███▌ ███   ███  ▄███▄▄▄     ███    ███
▀███████████     ███     ▀███████████ ▀▀███▀▀▀     ▀▀███▀▀▀          ███▌ ███   ███ ▀▀███▀▀▀     ███    ███
         ███     ███       ███    ███   ███          ███             ███  ███   ███   ███        ███    ███
   ▄█    ███     ███       ███    ███   ███          ███             ███  ███   ███   ███        ███    ███
 ▄████████▀     ▄████▀     ███    █▀    ███          ███             █▀    ▀█   █▀    ███         ▀██████▀

                            https://github.com/Nartsissov | https://github.com/xpepelok
*/

const nickname = Player.getName()
const config = Config.load(nickname);
const scheduler = Executors.newSingleThreadScheduledExecutor()

if (!config.allTime) config.allTime = 0
if (!config.isRainbow) config.isRainbow = false

var isRainbow = config.isRainbow

var allTime = config.allTime
var timestamp = 0
var currentTime = 0

Events.on(this, 'game_tick_pre', function() {
    Display.setTitle('「 Ник: ' + nickname + ' | FPS: ' + Draw.getFps() + ' | ' + UtilTime.now() + ' 」')
})

Events.on(this, 'server_connect', function() {
    timestamp = System.currentTimeMillis()
    scheduler.scheduleAtFixedRate(function() {
        config.allTime = allTime
        Config.save(nickname, config)
    }, 0, 30, TimeUnit.SECONDS)
})

function buildBoard() {
    if (timestamp == 0) return

    const res = Draw.getResolution();
    const width = res.getScaledWidth()

    currentTime = System.currentTimeMillis() - timestamp
    allTime += currentTime

    let allTimeFormatted = UtilTime.makeStr(allTime)
    let currentTimeFormatted = UtilTime.makeStr(currentTime)

    var color = 0xCFCCC2
    if (isRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)

    Draw.drawRect(width - 96, 0, width - 1, 55, 0xCC000000)
    Draw.drawString('Весь онлайн', width - 92, 4, color)
    Draw.drawString(allTimeFormatted, width - 86, 16, color)
    Draw.drawString('Текущий онлайн', width - 92, 28, color)
    Draw.drawString(currentTimeFormatted, width - 86, 40, color)
}

Events.on(this, 'gui_overlay_render', function() {
    buildBoard()
})

Events.on(this, 'chat_send', function(event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] != '/si' && args[0] != '/staffinfo') return
    switch (args[1]) {
        case 'save': {
            event.cancelled = true
            config.allTime = allTime
            Config.save(nickname, config)
            break
        }
        case 'reset': {
            event.cancelled = true
            allTime = 0
            timestamp = System.currentTimeMillis()
            config.allTime = 0
            Config.save(nickname, config)
            break
        }
        case 'rainbow': {
            event.cancelled = true
            if (isRainbow) {
                config.isRainbow = false
                isRainbow = false
                Config.save(nickname, config)
            } else {
                config.isRainbow = true
                isRainbow = true
                Config.save(nickname, config)
            }
            break
        }
        default:
            break
    }
})