/* Magic Mirror
 * Module: MMM-IronManGIF
 *
 * By 2hdlockness https://github.com/2hdlockness
 * MIT Licensed.
 */

Module.register("MMM-IronManGIF", {
  // Default module config.
  defaults: {
    style: "1",
    maxWidth: "100%"
  },

  start: function() {
    self = this;
    this.url = "";
    this.GifUrls = {
      "1": "./modules/MMM-IronManGIF/Resources/1.gif",
      "2": "./modules/MMM-IronManGIF/Resources/2.gif",
      "3": "./modules/MMM-IronManGIF/Resources/3.gif",
      "4": "./modules/MMM-IronManGIF/Resources/4.gif",
      "5": "./modules/MMM-IronManGIF/Resources/5.gif",
      "6": "./modules/MMM-IronManGIF/Resources/6.gif",
      "7": "./modules/MMM-IronManGIF/Resources/7.gif",
      "8": "./modules/MMM-IronManGIF/Resources/8.gif",                                    
    }
    
    if (this.config.style != "") {
        this.url = this.GifUrls[this.config.style];
    }
  },      

  getStyles: function() {
    return ["MMM-IronManGIF.css"];
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    var image = document.createElement("img");
    if (this.config.style != "") {
        image.classList.add = "photo";
        image.src = this.url ;

        image.style.maxWidth = this.config.maxWidth;
    }
    wrapper.appendChild(image);
    return wrapper;
  },

  notificationReceived: function(notification, payload) {
    if (notification === 'HIDE_IronManGIF') {
      this.hide(1000, {lockString: "LOCKEDBYMODULE"});
    } else if (notification === 'SHOW_IronManGIF') {
      this.show(1000, {lockString: "LOCKEDBYMODULE"});
    }

  }
  
});
