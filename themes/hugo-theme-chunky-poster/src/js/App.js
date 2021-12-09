'use strict';

import $ from 'jquery';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
    faBookOpen,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faClock,
    faEnvelope,
    faRss,
    faTag,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faFacebookF,
    faGithub,
    faGitlab,
    faInstagram,
    faKeybase,
    faLinkedin,
    faLinkedinIn,
    faMastodon,
    faMedium,
    faPinterest,
    faReddit,
    faRedditAlien,
    faStackOverflow,
    faTwitter,
    faWeibo,
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faBookOpen,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faClock,
    faEnvelope,
    faFacebook,
    faFacebookF,
    faGithub,
    faGitlab,
    faInstagram,
    faKeybase,
    faLinkedin,
    faLinkedinIn,
    faMastodon,
    faMedium,
    faPinterest,
    faReddit,
    faRedditAlien,
    faRss,
    faStackOverflow,
    faTag,
    faTwitter,
    faWeibo,
);

export default {
    loadFontAwesome: () => {
        dom.watch();
    },
    bootstrapify: () => {
        $('.content blockquote').addClass('blockquote');
        $('.content table').addClass('table');
        $('.content table').wrap('<div class="table-responsive" />');
        $('.content table thead').addClass('thead-dark');
        $('.content pre').wrap('<figure class="highlight" />');
        $('.content figure > img').addClass('img-fluid');
    },
    lazyload: async () => {
        const { default: LazyLoad } = await import(/* webpackChunkName: "lazyload" */ 'vanilla-lazyload');
        new LazyLoad({
            thresholds: "40px 10%",
            load_delay: 100,
        });
    },
    navbarFade: () => {
        let $position = $(window).scrollTop();

        $(window).scroll(() => {
            const $scroll = $(window).scrollTop();
            const $navbarHeight = $('#navbar-main-menu.fixed-top').outerHeight();

            $scroll > $position ? $('#navbar-main-menu.fixed-top').css('top', -$navbarHeight) :
                $('#navbar-main-menu.fixed-top').css('top', 0);

            if ($scroll <= 0) {
              $('#navbar-main-menu.fixed-top').css('top', 0);
            }

            $position = $scroll;
        });
    },
    lightbox: async () => {
        const { default: ekkoLightbox } = await import(/* webpackChunkName: "ekkoLightbox" */ 'ekko-lightbox');
        $('[data-toggle="lightbox"]').click(function(e) {
            e.preventDefault();
            $(this).ekkoLightbox();
        });
    },
    syntaxHighlight: () => {
        if (!window.Prism) {
          return;
        }

        Prism.highlightAll();

        $('pre:has(> code[class*=language-])').removeAttr('style');

        const element = $('pre:has(> code:not([class*=language-]))');

        element.addClass('language-none');
        $('> code', element).addClass('language-none');
    }
};

// new code for toggle button

$(document).ready(function() {

  $chunks = $('.fold');

  $chunks.each(function () {

    // add button to source code chunks
    if ( $(this).hasClass('s') ) {
      $('pre.r', this).prepend("<div class=\"showopt\">Show Source</div><br style=\"line-height:22px;\"/>");
      $('pre.r', this).children('code').attr('class', 'folded');
    }

    // add button to output chunks
    if ( $(this).hasClass('o') ) {
      $('pre:not(.r)', this).has('code').prepend("<div class=\"showopt\">Show Output</div><br style=\"line-height:22px;\"/>");
      $('pre:not(.r)', this).children('code:not(r)').addClass('folded');

      // add button to plots
      $(this).find('img').wrap('<pre class=\"plot\"></pre>');
      $('pre.plot', this).prepend("<div class=\"showopt\">Show Plot</div><br style=\"line-height:22px;\"/>");
      $('pre.plot', this).children('img').addClass('folded');

    }
  });

  // hide all chunks when document is loaded
  $('.folded').css('display', 'none')

  // function to toggle the visibility
  $('.showopt').click(function() {
    var label = $(this).html();
    if (label.indexOf("Show") >= 0) {
      $(this).html(label.replace("Show", "Hide"));
    } else {
      $(this).html(label.replace("Hide", "Show"));
    }
    $(this).siblings('code, img').slideToggle('fast', 'swing');
  });
});


