import jwt from "jsonwebtoken";

const SECRET_KEY = "MYNAMEISSHAIKHMOHAMMADAQILRAZA";

export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const userId = decodedToken?._id
    if(req.body.userId && req.body.userId !== userId){
        throw 'Invalid user Id'
    }
    else{
        next()
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}
