import $ from 'jquery';
import {Config} from './config';

export class Navigation {

    constructor() {
        this.hamburgerMenu = $("#hamburger-menu");
        this.menu = $("#nav ul");
        this.config = new Config();
        this.initEvents();
    }

    initEvents() {
        this.hamburgerMenu.on("tap click", () => {
          let currentWidth = $(window).width();
          var isVisible = !this.menu.is(":visible")
          if (this.config.isMobile || currentWidth < 480) {
            this.open(false);
            this.hamburgerMenu.remove('open');

          }

          this.hamburgerMenu.toggleClass('open');
          this.open(isVisible)
        });

        $(document).on("click", "a[href^='#']", function(e){
            let id = $(this).attr("href");
          
            console.log("id ", + id);
              $("#nav li a").each(function(idx, li) {
                  $(li).removeClass("active");
              });

            if ($(id).length > 0) {
                e.preventDefault();
                let currentSection = $(this);

                const event = new CustomEvent("scroll-to-section", {
                    detail: id
                });

                document.dispatchEvent(event);

              if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
              }
            }
          });
    }

    update(section) {
        $("#nav li a").each(function(idx, li) {

          if ($(li).hasClass("active")) $(li).removeClass("active");

          if($(li).attr('href').replace(/#/, "") === section ) {
            let currentSection = $(li);
            if (!currentSection.hasClass("active")) currentSection.addClass("active");
          }
        });

        let hash = window.location.hash.substr(1);
        if (hash != section) {
            window.history.pushState('', document.title, "#" + section);
        }
    }

    open(o) {

        let currentWidth = $(window).width();

        if (o) {
          this.menu.show();
          this.hamburgerMenu.addClass("open");
        }else {
          this.menu.hide();
          this.hamburgerMenu.removeClass("open");
        }

        if (!this.config.isMobile && currentWidth > 480) {
          this.hamburgerMenu.removeClass("menu-close").addClass("menu-open");
        }
    }


}
