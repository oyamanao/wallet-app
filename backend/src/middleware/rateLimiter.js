import ratelimit from "../config/upstast.js";

const rateLimiter = async (req,res,next) => {
    try {
        const{success} = await ratelimit.limit("my-rate-limit"); //usually userid or ip adress

        if(!success){
            return res.status(429).json({
                message:"too many requests , try again later"
            });

        }

        next()
    } catch (error) {
        console.log("Ratelimit error",error)
        next(error)
    }
}

export default rateLimiter