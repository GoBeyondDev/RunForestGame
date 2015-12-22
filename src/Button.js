Button.prototype = new Rectangle();
Button.prototype.constructor = Button;

function Button() {
	const BT_PAUSE 	= "BT_PAUSE";
	const BT_MENU 	= "BT_MENU";

	this.SPRITE_IDS=[BT_PAUSE, BT_MENU];
					
	this.m_spriteMap=[];

	this.m_scale=0.5;
		
	this.init = function() {
		for(var i = 0; i < this.SPRITE_IDS.length; i++) {
			this.m_spriteMap.push(-1);
			for(var j = 0; j < this.m_spriteList.length; j++) {
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[i]) {
					this.m_spriteMap[i] = j;
					this.m_currentSprite = this.m_spriteList[j];					
				}
			}
		}

		this.m_w *= this.m_scale;
		this.m_h *= this.m_scale;
	}

	this.update = function(dt) {

		if(m_mouseEvent == MOUSE_DOWN)
		{
			if(this.isTouch(m_current_x, m_current_y)) {
				this.m_selected = true;
			}
			//Event is consumed, reset it to ZERO
			m_mouseEvent = 0;
		}

		if(this.m_selected) {
			this.onClick();

			//reset flag after executing the click
			this.m_selected = false;
		}

		//correct x coord in case the canvas gets resized
		this.m_x = m_canvas.getAttribute('width') - this.m_w;
	}

	this.render = function(context) {
		if(DEBUG_MODE) {
			Button.prototype.render.call(this, context);
		}
		this.m_currentSprite.draw(context, this.m_x, this.m_y, this.m_scale, this.m_scale);
	}

	this.onClick = function() {
		switch(this.m_currentSprite.m_id) {
			case BT_PAUSE:
				g_app.togglePause();
				break;
			case BT_MENU:
				break;
			default:
				break;
		}
	}
}