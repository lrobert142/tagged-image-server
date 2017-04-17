/*jslint node: true */
'use strict';

var hippie = require('hippie');
var server = require('../app.js');

//Requires to stop code inspection notices
var before = require('mocha').before;
var beforeEach = require('mocha').beforeEach;
var describe = require('mocha').describe;
var it = require('mocha').it;
var chai = require('chai');
var expect = require('chai').expect;

describe("App.js", () => {
  it("Should return a static message", () => {
    hippie(server)
      .get('/')
      .expectStatus(200)
      .end((err) => {
        if (err) throw err;
        done();
      })
  });
});
