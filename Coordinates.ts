function Coords() {
    var x = Math.floor(Player.getPosX())
    var y = Math.floor(Player.getPosY())
    var z = Math.floor(Player.getPosZ())
    var WorldType = World.getDimension()
    Draw.drawStringWithShadow(x + ' ' + y + ' ' + ' ' + z, 4, 4, 0x34c26d)
    Draw.drawStringWithShadow(x / 8 + ' ' + '? ' + z / 8, 4, 16, 0x610916)
        if (WorldType == -1) {
            Draw.drawStringWithShadow(x * 8 + ' ? ' + z * 8, 4, 4, 0x34c26d)
            Draw.drawStringWithShadow(x + ' ' + y + ' ' + Z, 4, 16, 0x610916)
            }
        }
    
    Events.on(this, 'gui_overlay_render', function() {
       Coords()
    })