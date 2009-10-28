(function ($) {
	$.fn.party = function (options) {
		var settings = {
			"gutter"			: 10, // Gutter in pixels
			"perPage"			:  2, // Images per page
			"duration"			: "normal", // How fast the slide should go (@see http://docs.jquery.com/Effects/animate#paramsdurationeasingcallback)
		
			"prevLink"			: false, // selector for link to previous page (false = no link)
			"nextLink"			: false, // selector for link to next page (false = no link)
		
			"disableLinks"		: true   // Set class "disabled" on {prev,next}Link when on last/first page
		};
		if (options) $.extend(settings, options);

		if (isNaN(settings.duration)) {
			if (typeof $.fx.speeds[settings.duration] == "undefined") {
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
			    destination,
			    lastLeft		= -1 * animationWidth * (images.length - settings.perPage);

			// width and overflow: hidden so we only show {settings.perPage} images
			container.css({
				"display" 	: "block",
				"width"		: ((width + settings.gutter) * settings.perPage - settings.gutter) + "px",
				"height"	: height + "px",
				"overflow"	: "hidden",
				"position"	: "relative"
			});

			// position: absolute so we can move it, width so the images wont line-break
			innerContainer.css({
				"width"		: images.length * (width + settings.gutter) + "px",
				"position" 	: "absolute",
				"top"		: 0,
				"left"		: 0
			});

			images.css({
				"display"	: "block",
				"float"		: "left",
				"margin-left" : settings.gutter + "px"
			});
			firstImage.css("margin-left", 0);
			
			var move = function (direction) {
				var animationDiff = animationWidth * (direction == "left" ? -1 : 1);
				if (!innerContainer.is(":animated")) {
					destination = Math.round(parseInt(innerContainer.css("left"))) + animationDiff;
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
			};

			if (settings.nextLink) {
				$(settings.nextLink).click(function (e) {
					e.preventDefault();
					move("left");
				});
			}
			if (settings.prevLink) {
				$(settings.prevLink).click(function (e) {
					e.preventDefault();
					move("right");
				});
			}
		});
	};
})(jQuery);
