const mongoose = require('mongoose')
const moment = require('moment')
function getISTTimestamp() {
    return moment().utcOffset('+0530').format();
}
const registration = new mongoose.Schema({
    teamName:{
        type: String,
        required: false,
        default: ""
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
        min: 10,
        max: 10
    },
    teamLeaderEmail:{
        type: String,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        required: true
    },
    member2Name:{
        type: String,
        default: "",
        required: false
    },
    member2Email:{
        type: String,
        default: "",
        required: false
    },
    member3Name:{
        type: String,
        default: "",
        required: false
    },
    member3Email:{
        type: String,
        default: "",
        required: false
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
},{
    timestamps: true
});
module.exports.registrationSchema = mongoose.model('registrations',registration)