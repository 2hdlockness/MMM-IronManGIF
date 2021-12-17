/* Magic Mirror
 * Module: MMM-IronManGIF
 *
 * By 2hdlockness https://github.com/2hdlockness
 * Modified by Ronald Joe Record (@doctorfree)
 *     - Rotate through gif resources at a specified rate
 *
 * MIT Licensed.
 */

Module.register("MMM-IronManGIF", {
  // Default module config.
  defaults: {
    style: 1,
    rotate: false,
    updateInterval: 300000, // 5 minutes
    maxWidth: "100%"
  },

  start: function() {
    var self = this;
    self.url = "";
    self.GifUrls = {
      1: "./modules/MMM-IronManGIF/Resources/1.gif",
      2: "./modules/MMM-IronManGIF/Resources/2.gif",
      3: "./modules/MMM-IronManGIF/Resources/3.gif",
      4: "./modules/MMM-IronManGIF/Resources/4.gif",
      5: "./modules/MMM-IronManGIF/Resources/5.gif",
      6: "./modules/MMM-IronManGIF/Resources/6.gif",
      7: "./modules/MMM-IronManGIF/Resources/7.gif",
      8: "./modules/MMM-IronManGIF/Resources/8.gif",                                    
    }
    self.initializeStyle()
    self.url = self.GifUrls[self.config.style];
  },      
  
  getDom: function() {
    var self = this;
    var wrapper = document.createElement("div");
    self.image = document.createElement("img");
    self.image.src = self.url ;
    self.image.style.maxWidth = self.config.maxWidth;
    wrapper.appendChild(self.image);
    return wrapper;
  },

  notificationReceived: function(notification, payload) {
    if (notification === 'HIDE_IronManGIF') {
      this.hide(1000, {lockString: "IronLOCK"});
    } else if (notification === 'SHOW_IronManGIF') {
      this.show(1000, {lockString: "IronLOCK"});
    }
  },

  initializeStyle: function() {
    try {
      let styleCheck = null
      styleCheck = parseInt(this.config.style)
      this.activeStyle = styleCheck
      if (!Number.isInteger(styleCheck) || styleCheck <= 0 || styleCheck > 8) {
        console.error("config.style Corrected to 1")
        this.config.style = 1
        this.activeStyle = 1
      }
      if (this.config.rotate) {
        Log.log("Scheduling updates")
        this.scheduleUpdateInterval()
      }
    } catch (e) {
      console.error("config.style error!", e)
      this.config.style = 1
      this.activeStyle = 1
    }
  },

  scheduleUpdateInterval: function() {
    var self = this;
    Log.info("Scheduled update interval set up...");
    self.updateDom();
    setInterval(function() {
      Log.log("Incrementing image style from " + self.activeStyle)
      self.activeStyle++
      if (!Number.isInteger(self.activeStyle) || self.activeStyle <= 0 || self.activeStyle > 8) {
        self.config.style = 1
        self.activeStyle = 1
      }
      self.url = self.GifUrls[self.activeStyle];
      self.image.src = self.url ;
      Log.log("New image src = " + self.image.src)
      self.updateDom()
    }, self.config.updateInterval)
  }
});
