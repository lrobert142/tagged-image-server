/*jslint node: true */
'use strict';

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

  describe("Create", () => {

    it("400s if any fields are missing", (done) => {
      request(server)
        .post('/')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it("201s if all fields are present", (done) => {
      request(server)
        .post('/')
        .field('title', 'Lorem')
        .field('tags', ['Ipsum', 'Dolor', 'Sit'])
        .attach('image', __dirname + '/test.png')
        .expect(201)
        .end((err) => {
          if (err) throw err;
          done();
        });
    });

  });

  describe("All", () => {

    it("Returns all records", (done) => {
      request(server)
        .get('/all')
        .expect(200)
        .expect((res) => {
          res.body.images.length > 0;
        })
        .end((err) => {
          if (err) throw err;
          done();
        });
    });

  });

  describe("Search", () => {

    it("Returns all records containing the search text (all lowercase)", (done) => {
      request(server)
        .get('/search/lorem')
        .expect(200)
        .expect((res) => {
          res.body.images.length > 0;
        })
        .end((err) => {
          if (err) throw err;
          done();
        });
    });

    it("Returns all records containing the search text (mixed-case)", (done) => {
      request(server)
        .get('/search/LoReM')
        .expect(200)
        .expect((res) => {
          res.body.images.length > 0;
        })
        .end((err) => {
          if (err) throw err;
          done();
        });
    });

  });

  describe("Update", () => {

    it("Updates the record with the specified ID", (done) => {
      request(server)
        .put('/1')
        .field('title', 'Ipsum')
        .field('tags', ['Lorem', 'Amet',])
        .attach('image', __dirname + '/test.png')
        .expect(200)
        .end((err) => {
          if (err) throw err;
          done();
        });
    });

  });

});
