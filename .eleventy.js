const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const replacements = require("./_data/replacements.json")
const md = new markdownIt({
  breaks: true,
});

module.exports = function (eleventyConfig) {
  console.log(`${replacements.data.length} text replacements found.`)

  eleventyConfig.addCollection("directory_item", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./directory-items/*.md"]);
  });

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });

  eleventyConfig.addShortcode("fig", function (url, alt, className) {
    urls = [`${url.replace(/\.(jpg|jpeg|png)/gi, ".webp")}`];
    return `<figure class='post-figure ${className}'>
        <img src="${url}" loading="lazy" srcset="${urls[0]} 2000w" alt="${alt}">
        </figure>
        `;
  });
  eleventyConfig.addTransform(
    "applyTextReplacements",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        replacements.data.forEach(r => {
          let re = new RegExp(r.search, "g")
          content = content.replace(re, r.replace)
        })
      }
      return content;
    }
  );
  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "config.yml" });
  eleventyConfig.addPassthroughCopy("./dist");
  eleventyConfig.addPassthroughCopy("./assets/");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("/*.xml");

  eleventyConfig.addWatchTarget("./dist/main.js");
  eleventyConfig.addWatchTarget("./css/**.scss");
  eleventyConfig.addPlugin(pluginRss);
};
