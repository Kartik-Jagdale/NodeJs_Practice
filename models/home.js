const mongoose = require('mongoose');
const Favrouites = require('../../airbnb with MVC/models/favrouites');

const homeSchema = mongoose.Schema({
    houseName: {type: String, required: true},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    rating: {type: Number, required: true},
    photoUrl: String,
})

homeSchema.pre('findOneAndDelete', async function(next){
    const homeId = this.getQuery()._id;
    await Favrouites.deleteMany({houseId: homeId})
})   

module.exports = mongoose.model('Home', homeSchema);
