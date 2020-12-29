const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const replacements = require("./_data/replacements.json");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const md = new markdownIt({
  breaks: true,
});

if (process.env.NODE_ENV === "production") {
  console.log(
    "Creating an optimised production build (This might take a while)"
  );
} else {
  console.log("Development mode, skipping time-consuming build steps.");
}

module.exports = function (eleventyConfig) {
  console.log(`${replacements.data.length} text replacements found.`);

  eleventyConfig.addCollection("directory_item", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./directory-items/*.md"]);
    // Sort alphabetically
    // let sorted = items.sort((a, b) => {
    //   if (a.data.date < b.data.date) {
    //     return 1;
    //   } else if (a.data.date > b.data.date) {
    //     return -1;
    //   }
    //   return 0;
    // });
    // return sorted;
  });

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });

  eleventyConfig.addShortcode("fig", async function (url, alt, className) {
    let config = {
      widths: [1500],
      formats: ["webp", "png"],
      urlPath: "/assets/images/",
      outputDir: "./_site/assets/images/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}.${format}`;
      },
    };
    if (process.env.NODE_ENV === "dev") {
      //      console.log(`Skipping ${url}`);
      const extension = path.extname(url);
      const name = path.basename(url, extension);
      return `<picture class="post-figure ${className}">
        <img
          src="/assets/images/${name}.webp"
          alt="${alt}">
      </picture>`;
    } else {
      console.log(`Processing ${url}`);
      let metadata = await Image("." + url, config);
      let fallback = metadata.png[0];
      return `<picture class="post-figure ${className}">
        ${Object.values(metadata)
          .map((imageFormat) => {
            return `<source type="image/${
              imageFormat[0].format
            }" srcset="${imageFormat
              .map((entry) => entry.srcset)
              .join(", ")}" sizes="100vw">`;
          })
          .join("\n")}
          <img
            src="${fallback.url}"
            alt="${alt}">
        </picture>`;
    }
  });

  eleventyConfig.addShortcode("img", async function (src, width) {
    let formats = ["png", "webp"];
    let config = {
      widths: [width],
      formats: formats,
      urlPath: "/assets/images/",
      outputDir: "./_site/assets/images/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    };
    if (process.env.NODE_ENV === "dev") {
      //console.log(`Skipping ${src}`);
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `/assets/images/${name}-${width}w.png`;
    } else {
      console.log(`Processing ${src}`);
      let metadata = await Image("." + src, config);
      let data;
      if (metadata.jpeg) {
        data = metadata.jpeg.pop();
      } else {
        data = metadata.png.pop();
      }
      return data.url;
    }
  });

  eleventyConfig.addTransform(
    "applyTextReplacements",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        replacements.data.forEach((r) => {
          let re = new RegExp(r.search, "g");
          content = content.replace(re, r.replace);
        });
      }
      return content;
    }
  );
  eleventyConfig.addPassthroughCopy("./*.xml");
  eleventyConfig.addPassthroughCopy("./assets/fonts/");
  eleventyConfig.addPassthroughCopy("./assets/favicons/");

  eleventyConfig.addWatchTarget("./dist/main.js");
  eleventyConfig.addWatchTarget("./css/**.scss");
  eleventyConfig.addPlugin(pluginRss);
};
