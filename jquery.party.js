/*
 * Copyright (c) 2009 Tobias Baaz <tobias@baaz.nu>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

"use strict";
(function ($) {
	$.fn.party = function (options) {
		// See README for information
		var settings = {
			"gutter"	: 10,
			"perPage"	:  2, 
			"duration"	: "normal",
			
			"nextLink"	: false,
			"prevLink"	: false,
			"disableLinks" : true
		};
		if (options) {
			$.extend(settings, options);
		}

		if (isNaN(settings.duration)) {
			if (typeof $.fx.speeds[settings.duration] === "undefined") {
				settings.duration = "normal";
			}
			settings.duration = $.fx.speeds[settings.duration];
		}

		
		this.each(function () {
			var container = $(this);
			container.html("<div>" + container.html() + '</div>');

			var innerContainer	= $("div:eq(0)", container),
			    images			= $("img", container),
			    firstImage		= images.eq(0),
			    width			= firstImage.width(),
			    height			= firstImage.height(),

			    animationWidth	= width + settings.gutter,
			    lastLeft		= -1 * animationWidth * (images.length - settings.perPage),
			    destination,
				move,
				
				$nextLink,
				$prevLink;

			// width and overflow: hidden so we only show {settings.perPage} images
			container.css({
				"display"	: "block",
				"width"		: ((width + settings.gutter) * settings.perPage - settings.gutter) + "px",
				"height"	: height + "px",
				"overflow"	: "hidden",
				"position"	: "relative"
			});

			// position: absolute so we can move it, width so the images wont line-break
			innerContainer.css({
				"width"		: images.length * (width + settings.gutter) + "px",
				"position"	: "absolute",
				"top"		: 0,
				"left"		: 0
			});

			images.css({
				"display"	: "block",
				"float"		: "left",
				"margin-left" : settings.gutter + "px"
			});
			firstImage.css("margin-left", 0);
			
			move = function (direction) {
				var animationDiff = animationWidth * (direction === "right" ? -1 : 1);
				if (!innerContainer.is(":animated")) {
					destination = Math.round(parseInt(innerContainer.css("left"), 10), 0) + animationDiff;
				} else {
					destination += animationDiff;
					innerContainer.stop(true);
				}
				
				if (destination > 0) {
					destination = 0;
				}
				else if (destination < lastLeft) {
					destination = lastLeft;
				}
				
				innerContainer.animate({
					"left" : destination + "px"
				}, settings.duration);

				if (settings.disableLinks) {
					if (destination === 0) {
						$prevLink.addClass("party-disabled");
					} else {
						$prevLink.removeClass("party-disabled");
					}

					if (destination === lastLeft) {
						$nextLink.addClass("party-disabled");
					} else {
						$nextLink.removeClass("party-disabled");
					}
				}
			};

			container.bind("pageNext", function () {
				move("right");
			}).bind("pagePrev", function () {
				move("left");
			});

			if (settings.prevLink) {
				$prevLink = $(settings.prevLink).click(function (e) {
					e.preventDefault();
					container.trigger("pagePrev");
				}).addClass("party-disabled");
			}
			if (settings.nextLink) {
				$nextLink = $(settings.nextLink).click(function (e) {
					e.preventDefault();
					container.trigger("pageNext");
				});
			}
		});
	};
}(jQuery));
