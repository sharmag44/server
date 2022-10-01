'use strict';
const _ = require("underscore");
exports.toModel = (entity) => {
    const model = {
        id: entity._id,
        description: entity.description,
        imgUrl: entity.imgUrl,
        CreateBy: entity.CreateBy,
        timeStamp: entity.timeStamp,
    };
    return model;
};

exports.toSearchModel = (entities) => {
    return _.map(entities, exports.toModel);
};