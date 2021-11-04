import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId
export const StarSchema = new Schema(
  {
    name: { type: String, required: true },
    galaxyId: { type: ObjectId, required: true, ref: 'Galaxy' },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
StarSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
StarSchema.virtual('galaxy', {
  localField: 'galaxyId',
  foreignField: '_id',
  justOne: true,
  ref: 'Galaxy'
})
