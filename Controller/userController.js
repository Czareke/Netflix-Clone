const User=require('../model/userModel')
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


exports.getUser=catchAsync(async(req,res,next)=>{
    const user=await User.find()
    res.status(200).json({
        status: 'success',
        results:user.length,
        data:{
            user
        }
    })
})
exports.getOneUser=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params)
    if(!user){
        return next(new AppError('user not found',404));
    }
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})
exports.updateUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.user)
    if(!user){
        return next(new AppError('User not found',404));
    }
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})
exports.deleteUser=catchAsync(async(req,res,next)=>{
    const user= await User.findByIdAndDelete(req.params.user)
    if(!user){
        return next(new AppError('User not found',404))
    }
    res.status(204).json({
        status:'success',
        data:null
    })
})