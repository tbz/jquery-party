Party, a simple image-cycler for jQuery
=======================================
Shows >2 images at a time, move by one image at a time.

HTML
----
    <p>
      <a id="prev">Move backward</a> - 
      <a id="next">Move forward</a>
    </p>
    <div id="images">
      <img ...>
      <img ...>
      ...
    </div>

JavaScript
----------
    $("#images").party({
      "prevLink" : "#prev",
      "nextLink" : "#next",
    });


Caveats
-------
- All images in selector should have the same dimensions (we use the first image's dimensions)

Settings
--------
    // gutter between images in pixels
    Integer gutter = 10
    // how many images should be shown at a time
    Integer perPage = 2
    // how fast the slide should go (ms or jQuery speed name)
    Integer|String duration = "normal"
    // selector to link to previous page or button
    String prevLink = ""
    // ... to next link
    String nextLink = ""
    // set party-disabled on above defined links when they have no function
    Boolean disableLinks = true

Events
------
Trigger pageNext or pagePrev to move (automatically done when using prev/nextLink)


