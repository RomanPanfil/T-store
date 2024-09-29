(function (b) {
  b.fn.autoResize = function (f) {
    var a = b.extend(
      {
        onResize: function () {},
        animate: !0,
        animateDuration: 150,
        animateCallback: function () {},
        extraSpace: 20,
        limit: 1e3,
      },
      f
    );
    this.filter("textarea").each(function () {
      var d = b(this).css({ "overflow-y": "hidden", display: "block" }),
        f = d.height(),
        g = (function () {
          var c = {};
          b.each(
            [
              "height",
              "width",
              "lineHeight",
              "textDecoration",
              "letterSpacing",
            ],
            function (b, a) {
              c[a] = d.css(a);
            }
          );
          return d
            .clone()
            .removeAttr("id")
            .removeAttr("name")
            .css({ position: "absolute", top: 0, left: -9999 })
            .css(c)
            .attr("tabIndex", "-1")
            .insertBefore(d);
        })(),
        h = null,
        e = function () {
          g.height(0).val(b(this).val()).scrollTop(1e4);
          var c = Math.max(g.scrollTop(), f) + a.extraSpace,
            e = b(this).add(g);
          h !== c &&
            ((h = c),
            c >= a.limit
              ? b(this).css("overflow-y", "")
              : (a.onResize.call(this),
                a.animate && "block" === d.css("display")
                  ? e
                      .stop()
                      .animate(
                        { height: c },
                        a.animateDuration,
                        a.animateCallback
                      )
                  : e.height(c)));
        };
      d.unbind(".dynSiz")
        .bind("keyup.dynSiz", e)
        .bind("keydown.dynSiz", e)
        .bind("change.dynSiz", e);
    });
    return this;
  };
})(jQuery);
