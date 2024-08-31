const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("js/test.js");
    eleventyConfig.addPassthroughCopy("img/");
    eleventyConfig.addPlugin(syntaxHighlight);
  };