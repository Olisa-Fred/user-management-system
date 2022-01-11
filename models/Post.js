const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author:{
        type: String
    },
    title:{
        type: String,
        required: [true, "Please put a title"]
    },
    description:{
        type: String,
        required: [true, "Please add a body"]
    },
}, {
    timestamps: true,
});

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.dateCreated;
        delete ret.dateUpdated;
    }
});

module.exports = mongoose.model('Post', postSchema);