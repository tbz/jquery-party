(function ($) {
	$.fn.party = function (options) {
		var settings = {
			"gutter" 	: 10,
			"perPage" 	: 2,
			"duration"	: "normal",

			"prevLink"	: false,
			"nextLink"	: false,
			"hideLinks"	: false
		};
		if (options) $.extend(settings, options);

		if (isNaN(settings.duration)) {
			if (typeof $.fx.speeds[settings.duration] == "undefined") {
				settings.duration = "normal";
			}
			settings.duration = $.fx.speeds[settings.duration];
		}

		this.each(function () {
			var container	= $(this);
			container.html('<div>' + container.html() + '</div>');

			var innerContainer = $("div:eq(0)", container),
			    images		= $("img", container),
				firstImage	= images.eq(0),
			    width 		= firstImage.width(),
				height		= firstImage.height(),
				animationWidth = width + settings.gutter,
				lastLeft	= -1 * animationWidth * (images.length - settings.perPage),
				move,
				moveTo,
				moveQueue	= [],
				faster		= false;

			container.css({
				"display" 	: "block",
				"width"		: ((width * settings.perPage) + settings.gutter) + "px",
				"height"	: height + "px",
				"overflow"	: "hidden",
				"position"	: "relative"
			});
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
				var to = animationWidth,
				    animationDiff = innerContainer.css("left") % animationWidth;

				if (animationDiff > 0) {
					to += animationDiff;
				}
				if (direction == "right") {
					to = to * -1;
				}

				innerContainer.animate({
					"left" : "+=" + to + "px"
				});
				return true;
			};

			if (settings.prevLink) {
				$prevLink = $(settings.prevLink).click(function (e) {
					e.preventDefault();
					move("left");
				});
			}
			if (settings.nextLink) {
				$nextLink = $(settings.nextLink).click(function (e) {
					e.preventDefault();
					move("right");
				});
			}
		});

		// "This will ensure that the expected jQuery chaining remains intact"
		return this;
	};
})(jQuery);

