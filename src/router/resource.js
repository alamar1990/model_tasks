"use strict";
const express = require('express');

/**
* Create an API resource mapper for CRUD endpoints.
 */
exports.resource = (controller) => {
    return express.Router()
        //Read operations.
        .get('/', controller.all)
        .get('/:id', controller.view)

        //Write operations.
        .post('/', controller.create)
        .put('/:id', controller.update)
        .delete('/:id', controller.remove)
}
