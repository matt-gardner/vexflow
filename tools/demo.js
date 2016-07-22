var Vex = require('../build/vexflow-debug.js');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var getBoundingBox = require('svg-path-bounding-box');
var opentype = require('opentype.js');
var fontPack = {
  NotoSans: {
    regular: opentype.loadSync('./fonts/NotoSans-Regular.ttf'),
    italic: opentype.loadSync('./fonts/NotoSans-Italic.ttf'),
    bold: opentype.loadSync('./fonts/NotoSans-Bold.ttf'),
    bolditalic: opentype.loadSync('./fonts/NotoSans-BoldItalic.ttf')
  },
  NotoSerif: {
    regular: opentype.loadSync('./fonts/NotoSerif-Regular.ttf'),
    italic: opentype.loadSync('./fonts/NotoSerif-Italic.ttf'),
    bold: opentype.loadSync('./fonts/NotoSerif-Bold.ttf'),
    bolditalic: opentype.loadSync('./fonts/NotoSerif-BoldItalic.ttf')
  },
  getFont: function(style) {
    /*
      times, Times, Times New Roman, serif, Serif => Noto Serif
      Arial, sans-serif... default => Noto Sans
    */
    var fontName = /(times|serif)+/i.test(style['font-family']) ?
      'NotoSerif' : 'NotoSans';

    var fontStyle = '';
    if (style['font-weight'] === 'bold') fontStyle = 'bold';
    if (style['font-style'] === 'italic') fontStyle += 'italic';
    if (fontStyle.length === 0) fontStyle = 'regular';

    return this[fontName][fontStyle];
  }
};

var options = {
  React: React,
  ReactDOMServer: ReactDOMServer,
  getBoundingBox: getBoundingBox,
  fontPack: fontPack
};

var context = Vex.Flow.Renderer.getTextSVGContext(options, 500, 500);

/*******************************
 * Put your example code below *
 *******************************/
var stave = new Vex.Flow.Stave(50, 50, 300);
stave.setClef('treble');
stave.setContext(context).draw();

/*********** END ***************/

console.log(context.toSVG());

