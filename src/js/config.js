
let instance = null;

export class Config {
  constructor() {
    if(!instance) {
      instance = this;
    }

    this.isFirefox = navigator.userAgent.toLowerCase().match(/firefox/g) ? true : false;
    this.isMobile = ( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    return instance;
  }
}
