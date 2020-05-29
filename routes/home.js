require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {check,validationResult} = require("express-validator");

//Get all contacts
router.get("/",(req,res)=>{
    User.find()
    .exec((err, contacts) => {
        if (err || !contacts) {
          return res.status(400).json({
            error: "No contacts found",
          });
        }
        res.json(contacts);
  });
});

//Create new contact
router.post("/",[check("name", "name should be at least 3 char").isLength({ min: 3 }),check("email", "email is required").isEmail()],
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {return res.status(422).json({error: errors.array()[0].msg});}
        const user = new User(req.body);
        user.save((err, user) => {if (err) {return res.status(400).json({err: "NOT able to save user in DB"});}
        res.json({name: user.name,email: user.email,});});});


//Get a contact using contact_id
router.get("/:id",(req,res)=>{
    return res.json(req.profile)
})

router.param("id",(req,res,next,id)=>{
    User.findById(id).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No user was found in DB"
          });
        }
        req.profile = user;
        next();
      });
})

//Delete a contact using id
router.delete("/:id",(req,res)=>{
    User.findByIdAndDelete(req.profile._id).exec((err,contact)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to delete contact"
            })
        }
        res.json({
            message:"Deleted succesfully",
            contact
        })
    });
});

//Update a contact
router.put("/:id",(req,res)=>{
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Not able to update"
                });
            }
            res.json(user);
        }
    );
})


module.exports = router;