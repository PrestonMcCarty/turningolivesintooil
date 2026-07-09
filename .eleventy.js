const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  eleventyConfig.addFilter("byCategory", (posts, category) => {
    if (!posts) return [];
    return posts.filter((p) => p.data.category === category);
  });

  eleventyConfig.addFilter("limit", (arr, n) => {
    if (!arr) return [];
    return arr.slice(0, n);
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};
