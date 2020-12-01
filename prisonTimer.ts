const config = Config.load('prisonTimer')

if (!config.isPrisonTimer) config.isPrisonTimer = false
if (!config.isPrisonTimerRainbow) config.isPrisonTimerRainbow= false

var isPrisonTimer = config.isPrisonTimer
var isPrisonTimerRainbow = config.isPrisonTimerRainbow

function prisonTimer() {
    if (isPrisonTimer) {
        let color = 0xCFCCC2
        if (isPrisonTimerRainbow) color = Colors.HSBtoRGB(Math.ceil(System.currentTimeMillis() / 20) % 360 / 360, 1, 1)
        let timerTo = System.currentTimeMillis() + 1000 * 60 * 7;
        var timerString = UtilTime.makeStr(timerTo - System.currentTimeMillis());
        Draw.drawString(timerString, 50, 38, color);
    }
}

Events.on(this, 'gui_overlay_render', function() {
    prisonTimer()
})

Events.on(this, 'chat_send', function(event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] == '/pr' || args[0] == '/prison') {
        switch (args[1]) {
            case 'rainbow': {
                event.cancelled = true
                config.isPrisonTimerRainbow = (isPrisonTimerRainbow ^= true)
                Config.save('prisonTImer', config)
                break
            }
            case 'toggle': {
                event.cancelled = true
                config.isPrisonTimer = (isPrisonTimer ^= true)
                Config.save('prisonTimer', config)
                break
            }
            default:
                break
        }
        return
    }
})
