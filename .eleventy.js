module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('./js');
  eleventyConfig.addPassthroughCopy('./static');
  return {
    dir: {
      input: 'pages',
    },
  };
};
