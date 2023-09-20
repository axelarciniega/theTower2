import { Schema } from "mongoose";
import BaseController from "../utils/BaseController.js";



export const EventSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    name: {type: String, required: true, maxLength: 20},
    description: {type: String, required: true},
    coverImg: {type: String, required: true, maxLength: 500, default: 'https://images.unsplash.com/photo-1673267569891-ca4246caafd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'  },
    location: {type: String, required: true, maxLength: 30},
    capacity: {type: Number, required: true,},
    startDate: {type: Date, required: true},
    isCanceled: {type: Boolean, default: false},
    type: {type: String, enum: ['concert', 'sport','digital','convention'], lowercase: true},


}, {timestamps: true, toJSON: {virtuals: true}})


EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})



EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})
