const mongoose=require('mongoose');

const contentSchema=new  mongoose.Schema({
    title:{
        type:String,
        required:[true,'Enter content title']
    },
    description:{
        type:String,
        required:[true,'Enter content description']
    },
    genre:[{
        type:String,
        required:[true,'Enter content genre']
    }],
    releaseDate:{
        type:Date,
            required:[true,'Enter content release date']
    },
    contentUrl:{
        type:String,
        required:[true,'Enter content URL']
    },
    duration:{
        type:Number,
        required:[true,'Enter content duration']
    },
    cast:[{
        type:String,
        required:[true,'Enter content cast']
    }],
    ratings:{
        average:{
            type:Number,
            default:0
        },
        count:{
            type:Number,
            default:0
        }
    },
    ageRating: { 
        type: String,
        enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
        required: [true,'Enter a valid age rating']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Content',contentSchema)