var mongoose = require('mongoose')

var ArticleSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'would make it clearer :)']
  },
  image: String
},{ timestamps: true })

ArticleSchema.methods.toJSONFor = function(){
  return {
    id: this._id,
    body: this.body,
    image: this.image,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Article', ArticleSchema)
