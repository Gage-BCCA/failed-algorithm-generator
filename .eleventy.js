const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./static/bundle.css");
    eleventyConfig.addPassthroughCopy("./static/js/portfolio.js");
    eleventyConfig.addPassthroughCopy("./static/img");
    //eleventyConfig.addPassthroughCopy("js/littleBrother.js");
    eleventyConfig.addPlugin(syntaxHighlight);

    return {
      dir: {
        input: "pages",
      }
    }
  };
