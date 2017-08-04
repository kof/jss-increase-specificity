/**
 * use :not(#\20), :not(.\20) and :not(\20) instead of generating unlikely
 * appearing ids…
 * — twitter.com/subzey/status/829050478721896448
 * Rationale: \20 is a css escape for U+0020 Space, and neither classname,
 * nor id, nor tagname can contain a space
 * — twitter.com/subzey/status/829051085885153280
 */

var selector = ':not(#\\20)';
var defaultOptions = { repeat: 3 };

module.exports = function increaseSpecificity(userOptions) {
  var options = Object.assign({}, defaultOptions, userOptions);
  var prefix = Array(options.repeat + 1).join(selector);

  function onProcessSheet(sheet) {
    sheet.rules.index.forEach(function(rule) {
      if (rule.type === 'conditional') {
        return onProcessSheet(rule);
      }

      rule.selectorText = prefix + rule.selectorText;
    });
  }

  return { onProcessSheet: onProcessSheet };
};
