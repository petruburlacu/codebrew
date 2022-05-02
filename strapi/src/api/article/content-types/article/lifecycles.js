"use strict";

const slugify = require("slugify");

module.exports = {
  async beforeCreate(event) {
    strapi.log.debug("article lifecycle hook: beforeCreate");
    const { data } = event.params;
    if (data.title) {
        data.slug = slugify(data.title, {lower: true});
    }
  },
  async beforeUpdate(event) {
    strapi.log.debug("article lifecycle hook: beforeUpdate");
    const { data } = event.params;
    if (data.title) {
        data.slug = slugify(data.title, {lower: true});
    }
  },
};
