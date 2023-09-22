import { Schema } from "mongoose";



export const CommentSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'},
    body: {type: String, required: true},
    isAttending: {type: Boolean, required: true, default: false}
}, {timestamps:true, toJSON: {virtuals: true}})


CommentSchema.virtual('creator', {
localField: 'creatorId',
foreignField: '_id',
ref: 'Account',
justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: 'event',
    ref: 'Event',
    justOne: true
})