import jwt from 'jsonwebtoken'; 

const auth = async (req,res,next ) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const currentToken = token.length < 500;
        let decodedData; 

        if(token && currentToken) {
            decodedData =  jwt.verify(token, process.env.JWT_SECRET); 
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token); 
            req.userId = decodedData?.sub
        }
        next();
        
    } catch (error) {
        console.log(error);
    }
}

export default auth