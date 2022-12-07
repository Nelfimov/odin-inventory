#! /usr/bin/env node
/* eslint-disable no-unused-vars */

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import {series, parallel} from 'async';
import mongoose, {connect} from 'mongoose';

import Item from './models/item.js';
import Category from './models/category.js';

connect('mongodb://127.0.0.1:27017/inventoryApp');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const categories = [];

const itemCreate = (name, description, category, price, numbeInStock, cb) => {
  const item = new Item({
    name,
    description,
    category,
    price,
    number_in_stock: numbeInStock,
  });

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
};

const categoryCreate = (name, description, cb) => {
  const category = new Category({name, description});

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
};

const createCategories = (cb) => {
  series(
      [
        (callback) =>
          categoryCreate('Electronics', 'Laptops, smartphones', callback),
        (callback) => categoryCreate('Art', 'Paintings, statues', callback),
      ],
      cb,
  );
};

const createItems = (cb) => {
  parallel(
      [
        (callback) =>
          itemCreate(
              'Macbook Pro 14',
              'Newest Macbook Pro with m1 chip',
              categories[0],
              899.0,
              10,
              callback,
          ),
        (callback) =>
          itemCreate(
              'iPhone 14',
              'Newest iPhone from 2022',
              categories[0],
              799.0,
              3,
              callback,
          ),
        (callback) =>
          itemCreate(
              'Leo painting',
              'Latest Leo Da Vinci painting',
              categories[1],
              1999999.0,
              1,
              callback,
          ),
        (callback) =>
          itemCreate(
              'Michi painting',
              'Latest Micheliangello painting',
              categories[1],
              3999999.0,
              1,
              callback,
          ),
      ],
      cb,
  );
};

series([createCategories, createItems], (err, results) => {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('ITEM Instances: ' + results);
  }
  mongoose.connection.close();
});
