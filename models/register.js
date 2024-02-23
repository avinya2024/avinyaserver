const mongoose = require('mongoose')
const registration = new mongoose.Schema({
    teamName:{
        type: String,
        required: false
    },
    teamMembers:{
        type: Number,
        required: false,
        default: 1
    },
    teamLeaderName:{
        type: String,
        required: true
    },
    teamLeaderPhone:{
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 10
    },
    teamLeaderEmail:{
        type: String,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        unique: true,
        required: true
    },
    member2Name:{
        type: String
    },
    member2Email:{
        type: String,
    },
    member3Name:{
        type: String
    },
    member3Email:{
        type: String
    },
    department:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    hackathon:{
        type: Boolean,
        default: false
    },
    exhibition:{
        type: Boolean,
        default: false
    },
    techexpert:{
        type: Boolean,
        default: false
    },
    nontechexpert:{
        type: Boolean,
        default: false
    },
    transactionId:{
        type: Array,
        required: true
    },
    paidAmount:{
        type: Number,
        required: true,
        default: 0
    }
});
module.exports.registrationSchema = mongoose.model('registrations',registration)