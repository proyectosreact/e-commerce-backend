// Modelo para el producto.

const category = require('./category');
mongoose.set('useCreateIndex', true); // uyamil - quitar Warning
const { Schema, model } = require('mongoose'),

    ProductSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Product name is required']
        },
        precioUni: {
            type: Number,
            required: [true, 'Unit Price is required']
        },
        description: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: false
        },
        disponible: {
            type: Boolean,
            required: true,
            default: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }, {
        timestamps: true
    });

module.exports = model('Product', ProductSchema);