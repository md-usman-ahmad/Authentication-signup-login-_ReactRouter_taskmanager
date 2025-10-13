
async function AuthMiddleware(request,response,next){
        try {
            console.log("request.headers.authorization = ",request.headers.authorization);
        } catch (error) {
            
        }
}

module.exports = {
    AuthMiddleware
};