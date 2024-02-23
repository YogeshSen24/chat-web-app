const asyncHandler = (functionToExecute)=>{
    return(req , res,next)=>{
        Promise.resolve(functionToExecute(req , res , next)).catch((e)=>{
            next(e)
        })
    }
}

export {asyncHandler}