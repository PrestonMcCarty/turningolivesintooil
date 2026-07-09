const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add(".netlify/**");
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("node_modules/**");

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

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};
