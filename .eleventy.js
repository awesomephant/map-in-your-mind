const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt({
  breaks: true,
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("directory_item", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./directory-items/*.md"]);
  });

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });

  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "config.yml" });
  eleventyConfig.addPassthroughCopy("./dist");
  eleventyConfig.addPassthroughCopy("./assets/");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("/*.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("/dist/*.js");
  eleventyConfig.addWatchTarget("./css/**.scss");
  eleventyConfig.addPlugin(pluginRss);
};
