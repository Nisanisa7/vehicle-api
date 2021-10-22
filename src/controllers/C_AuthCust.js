const connection = require('../configs/db')
const authCustModel = require('../models/M_auth_cust')
const helpers = require('../helpers/helpers')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const emailActivation = require('../helpers/emailActivation')
const { hash } = require('bcrypt');
bcrypt = require('bcryptjs');

const Login = async(req, res, next)=>{
    try {
        const {email, password} = req.body
    const result = await authCustModel.findUser(email)
    const user = result[0]

    if(email == ''|| password == ''){
        helpers.response(res, null, 500, {message: 'Email or Password can not be empty'})
    }
    else if(result < 1){
        return helpers.response(res, null, 500, {message: "We couldn't find an account that matched the one you entered. please try again"})
    }
    bcrypt.compare(password, user.password, function(err, resCompare) {
        if (!resCompare) {      
            return helpers.response(res, null, 401, {message: 'Password wrong'})
        }
        jwt.sign({ email: user.email, role: 'custommer'},
        process.env.SECRET_KEY, { expiresIn: "24h" },
        function(err, token) {
            console.log(token);
            console.log(process.env.SECRET_KEY);
            delete user.password;
            user.token = token;

            //ini set cookienya
            res.cookie('token', token,{
                // httpOnly: true, 
                max: 7200000,
                // secure: true,
                path:'/',
                // sameSite: 'strict'
            } )
            res.cookie("user_isAuth", true,{
                max: 7200000,
                path:'/',

            } )
            res.cookie("user_idCustommer", user.idCustommer, {
                max: 7200000,
                path: "/",
              });
            res.cookie("user_role", user.role, {
                max: 7200000,
                path: "/",
            });
            helpers.response(res, user, 200)
        }
    );
    })
    } catch (error) {
        console.log(error);
    }
    
// }
}
// ==========================================
const Register = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body
        const user = await authCustModel.findUser(email)
        if (user.length > 0){
            return helpers.response(res, null, 401, {message:"This email address is already being used"})
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password , salt, function(err, hash) {
    
                const data = {
                    idCustommer: uuidv4(),
                    name: name,
                    email: email,
                    password: hash,
                    status: 'inactive',
                    role: 'custommer',
                    createdAt : new Date(),
                    updatedAt : new Date()
                }
    
                authCustModel.Register(data)
                .then((result)=>{
                    delete data.password
                    jwt.sign({ email: data.email }, process.env.SECRET_KEY, function(err, token) {
                        emailActivation.sendEmail(data.email, data.name, token)
                      });
                    helpers.response(res, data , 200, {message: "registered success! check your email for activation "})
                })
                .catch((error)=>{
                    console.log(error);
                    helpers.response(res, null, 500, {message: 'internal server error'})
                })
    
    
            })

        })
    } catch (error) {
        console.log(error);
    }
   
}
// =============================================================

const userActivation = (req, res, next) =>{
    const token = req.params.token
    if(token){
        try{

            jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
                if(err) {
                
                    console.log(err);
                    return helpers.response(res, null, 500,{message: 'something went wrong'})
                
                }else{
                    email = decoded.email
                    console.log(email);
                    authCustModel.updateStatus(email)
                    .then(()=>{
                        // helpers.response(res, null, 200, {message: "Your account has been successfully verified"})
                        res.redirect('http://localhost:3000/email')
                    })
                    .catch((err)=>{
                        console.log(err);
                        return helpers.response(res, null, 500, {message: "there's something wrong.."})
                    })
                }   
                 
              });
        } catch (err) {
           console.log(err);
           return helpers.response(res, null, 500, {message: 'something went wrong..'})
        }
    }

}

// ----------------------------
const CheckToken = (req, res, next) =>{
    try{
        const Token = req.headers.cookie;
        console.log(Token);
        const result = Token.slice(6)
        // console.log(result);
        jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
            if(err){
                if(err.name === 'TokenExpiredError'){
        
                    const error = new Error('token expired')
                    error.status = 401
                    return next(error)
        
                } else if (err.name === 'JsonWebTokenError'){
                  
                    const error = new Error('token Invalid')
                    error.status = 401
                    return next(error)
        
                } else{
                    const error = new Error('token not active')
                    error.status = 401
                    return next(error)
                }       
            }
          const data = decoded.email
          console.log(data);
        //   console.log(email);
           authCustModel.getPayLoad(data)
           .then((result)=>{
            console.log(result);
            helpers.response(res, result[0], 200, {message: 'naicu dazu'})
        })
           .catch((error)=>{
            console.log(error);
            res.status(500)
            res.json({
                message:'internal server error'
            })
           })
        //    console.log(decoded);
        })
    } catch (err) {
        console.log(err);
        return helpers.response(res, null, 500, {message: 'something went wrong..'})
     }
}

const Profile = (req, res, next)=>{
    const token = req.cookie.token
    console.log(token);
}
const Logout = (req, res, next)=>{
    try {
        res.clearCookie('token')
        res.clearCookie('user_idCustommer')
        res.clearCookie('user_role')
        res.clearCookie('user_isAuth')
    
        res.status(200);
        res.json({
          message: 'Success logout'
        });
      } catch (error) {
        console.log(error)
        next(new Error(error.message))
      }
}
module.exports ={
    Login,
    Register,
    userActivation,
    CheckToken,
    Profile,
    Logout
}