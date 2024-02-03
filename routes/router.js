const express = require('express');
const cors = require('cors');
const router = new express.Router();
const registerUsers = require('../models/userSchema');
const bcrypt = require("bcryptjs");

router.use(express.json());
router.use(cors());

router.post('/register', async (req, resp) => {
    const { fname, email, password, cPassword } = req.body;

    if (!fname || !email || !password || !cPassword) {
        return resp.status(401).json({ message: "Fill the required fields" });
    }

    try {
        const preuser = await registerUsers.findOne({ email });

        if (preuser) {
            return resp.status(401).json({ message: "Email already exists" });
        } else if (password !== cPassword) {
            return resp.status(401).json({ message: "Password mismatch" });
        } else {
            // Hash the password before saving it to the database

            const data = new registerUsers({ fname, email, password, cPassword });

            const storeData = await data.save();
            console.log(storeData);
            resp.status(201).json({status:201 ,message: "Registration successful" });
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login",async (req,resp)=>{
    const {email,password} = req.body

    if ( !email || !password ) {
        return resp.status(401).json({ message: "Fill the required fields" });
    }

    try{

        const userData = await registerUsers.findOne({email:req.body.email});

        if(userData){
            const isMatch = await bcrypt.compare(password,userData.password)

            if(isMatch){
                resp.status(201).json({status:201 ,message: "Login successful" });

            }
        }
    }catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
    
})

module.exports = router;
