const connection = require('../configs/db')
const authAdminModel = require('../models/M_authAdmin')
const helpers = require('../helpers/helpers')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const activationEmail = require('../helpers/ActivationEmail')
const { hash } = require('bcrypt');
bcrypt = require('bcryptjs');


const Login = async (req, res, next) =>{
    const {email, password} = req.body
    const result = await authAdminModel.findAdmin(email)
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
        jwt.sign({ email: user.email, role: 'admin'},
        process.env.SECRET_KEY, { expiresIn: "24h" },
        function(err, token) {
            console.log(token);
            console.log(process.env.SECRET_KEY);
            delete user.password;
            user.token = token;

            //ini set cookienya
            res.cookie('token', token,{
               max: 7200000,
               path:'/',
            } )
            res.cookie("user_isAuth", true,{
                max: 7200000,
                path:'/',

            } )
            res.cookie("user_idAdmin", user.idAdmin, {
                max: 7200000,
                path: "/",
              });
            res.cookie("user_role", user.role, {
                max: 7200000,
                path: "/",
            });
            helpers.response(res, user, 200,  {message:"Login Success"})
        }
    );
    })
}
// --------------------------------------------
const Register = async (req, res, next) =>{
    const {name, email, password} = req.body
    const user = await authAdminModel.findAdmin(email)
    if (user.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {

            const data = {
                idAdmin: uuidv4(),
                name: name,
                email: email,
                password: hash,
                status: 'inactive',
                role: 'admin',
                createdAt : new Date(),
                updatedAt : new Date()
            }

            authAdminModel.Register(data)
            .then((result)=>{
                delete data.password
                jwt.sign({ email: data.email }, process.env.SECRET_KEY, function(err, token) {
                    activationEmail.envoiEmail(data.email, data.name, token)
                  });
                helpers.response(res, data , 200, {message: "registered success! check your email for activation "})
            })
            .catch((error)=>{
                console.log(error);
                helpers.response(res, null, 500, {message: 'internal server error'})
            })
        })
    })
}
// -------------------------------------

const Activation = (req, res, next) =>{
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
                    authAdminModel.updateStatus(email)
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


module.exports = {
    Login,
    Register,
    Activation,
   
}