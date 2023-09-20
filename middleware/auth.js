import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken?.id;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}

// export default function auth(req, res, next) {
//   try {
//     const token = req.headers.authorization.split(' ')[1]
//     const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
//     const userId = decodedToken?.id
//     console.log("userId :", userId)
//     if(req.body.userId && req.body.userId !== userId){
//         throw 'Invalid user Id'
//     }
//     else{
//         next()
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// }
