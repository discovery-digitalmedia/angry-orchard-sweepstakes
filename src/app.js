require("./css/normalize.css");
require("./css/app.css");
import "babel-polyfill";
import $ from 'jquery';
import {Navigation} from './js/navigation';
import {Config} from './js/config';

const TweenMax = require("TweenMax");
const ScrollToPlugin = require('ScrollToPlugin');
const ScrollMagic = require('scrollmagic');
import debugIndicators from 'debug.addIndicators';

let videoPlayer = $("#videoPlayer");
let videoPlayButton = $(".play-button");
let deltaSection = $("#fixed-angry-orchard");
let aboutSection = $("#fixed-about");
let puppyForMobile = $("#puppy");

const FORWARD = "FORWARD";
const REVERSE = "REVERSE";

$(document).ready(function() {
  $("#about").height(aboutSection.height() + 180);
  $("#angry-orchard").height(deltaSection.height() + 300);


  setTimeout(()=>{

    const mainHeaderHeight = $(".main-header").height();
    const topBannerHeight = $("#page-ad-container-bannerFlexOne").height();
    const topOffset = mainHeaderHeight + topBannerHeight + 50;
    const topPanelHeight = $(window).height() - topOffset;

    $("#home").height(topPanelHeight);

  },1500)
  let config = new Config();
  let nav = new Navigation();
  $("#nav li a").removeClass("blue").addClass("white");
  nav.update("home");

  let controller = new ScrollMagic.Controller();
  controller.scrollTo(function(posY) {
      TweenMax.to(window, 0.5, {scrollTo: {y: posY}});
  });

  document.addEventListener('scroll-to-section', (e) => {
    console.log("detail " + e.detail)
    if(config.isFirefox && e.detail.indexOf("about") !== -1){
        // TODO: there is padding in the at #home .content div need to remove
        controller.scrollTo(parseFloat($("#home").height())  + parseFloat( $("#home .content").css("padding-bottom")) + 100 );
    }else {
      console.log(e.detail)
        controller.scrollTo(e.detail);

    }
  });



  if (config.isMobile) {
    videoPlayButton.on("click touchstart", ()=> {
      videoPlayer[0].play();
    })

  }

  let homeScene = new ScrollMagic.Scene({
    triggerElement: '#home',
    duration: '100%'
  });
  homeScene.addTo(controller);
  homeScene.on("start", function(event) {
      videoPlayer[0].pause();
      videoPlayButton.css("display", "none");
  });
  homeScene.on("end", function(event) {

    if (config.isMobile) {
      videoPlayButton.css("display", "block");

      return;
    }

    if(event.scrollDirection == "REVERSE") {

      videoPlayer[0].pause();
      //videoPlayButton.css("display", "block");
    }else {
      videoPlayer[0].play();
      //videoPlayButton.css("display", "none");
    }
  })

  let enterScene = new ScrollMagic.Scene({
    triggerElement: '#enter',
    duration: '40%'
  });
  enterScene.addTo(controller);
  enterScene.on('start', function(event) {
    if (config.isMobile) return;

    if (event.scrollDirection == "REVERSE") {
      videoPlayer[0].play();
    }else {
      videoPlayer[0].pause();
    }
  })
  .on("end", function(event) {

    if (event.scrollDirection == "FORWARD") {
    //  videoPlayer.css("display", 'none');
      //deltaSection.css("display", 'block');
      deltaSection.css("z-index","1");

    }else {
  //    videoPlayer.css("display", 'block');
      //deltaSection.css("display", 'none');
      deltaSection.css("z-index","-1");

    }

  });

    let deltaScene = new ScrollMagic.Scene({
        triggerElement: '#angry-orchard',
        triggerHook: "onLeave"
    });
    deltaScene.addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#enter',
        triggerHook: "onLeave"
    })
    .addTo(controller)


    new ScrollMagic.Scene({
        triggerElement: '#about',
        triggerHook: "onLeave"
    })
    .addTo(controller);

    $( window ).resize(function() {
      let winWidth = $(window).width();

      $("#about").height(aboutSection.height() + 180);
      $("#angry-orchard").height(deltaSection.height() + 200);

      if(!config.isMobile && winWidth > 480) {
      //  nav.open(true);
      }else {
      //  nav.open(false);

      }
    });

    $(window).resize();
    $(window).on("scroll", () => {
      let currentWidth = $(window).width();
      if(config.isMobile || currentWidth < 480) {
        nav.open(false);
      }

      let winTop = $(window).scrollTop();
      let winHeight = $(window).height();
      var docHeight = $(document).height();
      let enterTop = $("#enter").offset().top;
      let homeTop = $("#home").offset().top;
      let aboutTop = $("#home").offset().top +  $("#home").height();
      let deltaTop = $("#enter").offset().top + $("#enter").height();
      let main = $("#main");

      if (Math.abs(homeTop - winTop) <= 150) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          nav.update("home");
        }, 250));
      }

      if (Math.abs(aboutTop - winTop) <= 150) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          nav.update("about");
        }, 250));
      }

      if (Math.abs(enterTop - winTop) <= 150) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          nav.update("enter");
        }, 250));
      }

      if (Math.abs(deltaTop - winTop) <= 150) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
          nav.update("delta");
        }, 250));
      }

      if(winTop > main.offset().top){
        $("#nav").css('position', "fixed");
        $("#fixed-about").css('position', "fixed");
        $("#fixed-angry-orchard").css('position', "fixed");
        if(!config.isMobile) {
                    $("#nav li a").removeClass("white").addClass("blue");
          $("#nav").addClass("white-bg");
        }

      }else{
        $("#nav").css('position', "absolute");
        $("#fixed-about").css('position', "absolute");
        $("#fixed-angry-orchard").css('position', "absolute");

        if (!config.isMobile) {
          $("#nav li a").removeClass("blue").addClass("white");
          $("#nav").removeClass("white-bg");
        }



      }


    })


  if (DEVELOPMENT) {
    if (module.hot) {
      module.hot.accept();
    }
  }

});