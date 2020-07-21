const {Schema, model}= require('mongoose'),
{generarSku} = require("../helpers/utils");
ProductSchema = new Schema({
    product:{
        type: String,
        required: true,
        trim: true
    },
    sku:{
        type: String,
        default: () => generarSku()
    },
    uri:{
        public_id: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default:''
        },
        name: {
            type: String,
            default:''
        }
    },
    price:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    id_subCategory:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    enable:{
        type: Boolean,
        default: 1
    }
},{ timestamps:true }
);
module.exports = model('Product',ProductSchema);
