/*
  Run the full VexFlow test suite, grab the generated images, and
  dump them into a local directory as SVG files.

  This meant to be used with the visual regression test system in
  `tools/visual_regression.sh`.

  Quick commandline to convert the SVG files to PNG:
    $ for f in *.svg; do echo $f; rsvg-convert $f `basename $f .svg`.png; done
*/
var fs = require('fs');
var mkdirp = require('mkdirp');
var process = require('process');
var argv = process.argv;
var Vex = require(argv[2] + '/vexflow-debug.js');
Vex.Flow.Test = require(argv[2] + '/vexflow-tests.js');
var VF = Vex.Flow;

// Tell VexFlow that we're outside the browser -- just run
// the Node tests.
VF.Test.RUN_CANVAS_TESTS = false;
VF.Test.RUN_SVG_TESTS = false;
VF.Test.RUN_RAPHAEL_TESTS = false;
VF.Test.RUN_NODE_TESTS = true;
VF.Test.NODE_IMAGEDIR = argv[3];

// Create the image directory if it doesn't exist.
mkdirp.sync(VF.Test.NODE_IMAGEDIR);

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var getBoundingBox = require('svg-path-bounding-box');
var opentype = require('opentype.js');
var font = opentype.loadSync('./tools/NotoSans-Regular.ttf');

VF.Test.NodeOptions = {
  React: React,
  ReactDOMServer: ReactDOMServer,
  getBoundingBox: getBoundingBox,
  font: font,
};

// Run all tests.
VF.Test.run();
