var showdown = require('showdown'),
  converter = new showdown.Converter(),
  text = '# hey, I have an idea.',
  html = converter.makeHtml(text);
