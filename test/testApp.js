/*jslint node: true */
'use strict';

// var hippie = require('hippie');
var request = require('supertest');
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
    request(server)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  // describe("Create", () => {
  //
  //   it("400s if any fields are missing", () => {
  //     hippie(server)
  //       .json()
  //       .post('/')
  //       .send({})
  //       .expectStatus(400)
  //       .end((err) => {
  //         if (err) throw err;
  //         done();
  //       });
  //   });
  //
  //   it("201s if all fields are present", () => {
  //     hippie(server)
  //       .json()
  //       .post('/')
  //       .attach('image', __dirname + '/test.png')
  //       .send({
  //         title: "Lorem"
  //         tags: "Ipsum,Dolor,Sit,Amet"
  //       })
  //       .expectStatus(400)
  //       .end((err) => {
  //         if (err) throw err;
  //         done();
  //       });
  //   });
  //
  // });

});
