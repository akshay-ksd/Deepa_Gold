const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const createToken = require("../../authentication/createToken")

const Joi = require("@hapi/joi");

const registrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
});

//signup user
router.post("/register", async(req, res) => {
    //check if emial aleready exist
    const emailExist = await User.findOne({email: req.body.email});

    //if email exist then return

    if(emailExist){
        const status = {
            login: false,message: "Email aleready exist"
        }
        res.status(200).send({status});
        return;
    }

    // hashing phonenumber;
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = "8157896995cbcbjebc";

    //adding new user

    const user = new User({
        name: req.body?.name,
        email: req.body?.email?req.body?.email:"false",
        phoneNumber: req.body?.phoneNumber,
        password: hashedPassword,
        lastLogin: Date.now(),
        isActive: true
    });

    try {
        const {error} = await registrationSchema.validateAsync(req.body);

        if(error) {
            res.status(400).send(error.details[0]?.message);
            return;
        }else{
            const saveUser = await user.save();
            const token = createToken(saveUser?._id)
            const status = {login: true, token: token}
            res.status(200).send({status});
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/accountIsExist", async(req, res) => {
    try{
        const data = await User.findOne({phoneNumber: req.body.phoneNumber});
        if(data){
            const token = createToken(data?._id)
            const status = {login: true, token: token}
            res.status(200).send({status});
        }else{
            const token = createToken(data?._id)
            const status = {login: false, token: "false"}
            res.status(200).send({status});
        }
    }catch(error){
        console.log("error",error)
        res.status(500).send({message: "Internal server error"})
    }
})

module.exports = router;