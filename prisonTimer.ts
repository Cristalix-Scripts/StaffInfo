const nickname = Player.getName()
const config = Config.load(nickname)

if (!config.isPrisonResFirstEnabled) config.isPrisonResFirstEnabled = false
if (!config.isPrisonResFirstRainbow) config.isPrisonResFirstRainbow = false

var isPrisonResFirstEnabled = config.isPrisonResFirstEnabled
var isPrisonResFirstRainbow = config.isPrisonResFirstRainbow

function PrisonResFirst() {
    if (isPrisonResFirstEnabled) {
        let color = 0xCFCCC2
        if (isPrisonResFirstRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        let timerTo = System.currentTimeMillis() + 1000 * 60 * 7;
        var timerString = UtilTime.makeStr(timerTo - System.currentTimeMillis());
        Draw.drawString(timerString, 50, 38, color);
    }
}

Events.on(this, 'gui_overlay_render', function() {
    PrisonResFirst()
})

Events.on(this, 'chat_send', function(event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] == '/pr' || args[0] == '/prison') {
        switch (args[1]) {
            case 'rainbow': {
                event.cancelled = true
                config.isPrisonResFirstRainbow = (isPrisonResFirstRainbow ^= true)
                Config.save(nickname, config)
                break
            }
            case 'toggle': {
                event.cancelled = true
                config.isPrisonResFirstEnabled = (isPrisonResFirstEnabled ^= true)
                Config.save(nickname, config)
                break
            }
            default:
                break
        }
        return
    }
})