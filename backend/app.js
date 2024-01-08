// --------------------------------------------MODULES IMPORTS---------------------------------------------------------------
// import express application
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import bcrypt
const bcrypt = require("bcrypt");

// import axios
const axios = require("axios");

// import multer
const multer = require("multer");

// import path
const path = require("path");

// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/school');

// --------------------------------------------------CONFIGURATION------------------------------------------------------------

// create express apllication
const app = express();

// configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configuration image et file
app.use('/images', express.static(path.join('backend/images')));
app.use('/files', express.static(path.join('backend/files')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with , Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, PUT"
    );
    next();
});

// 
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let path = 'backend/images'; 

        if (req.body.role === 'teacher') {
            path = 'backend/files'; 
        }
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const lName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, lName);
    }
});

// Session Configuration
const secretKey = 'your-secret-key';
app.use(session({
secret: secretKey,
}));

// --------------------------------------------------Models Importation--------------------------------------------------------

// Models Importation
const User = require("./models/user");
const Course = require("./models/course");

// -----------------------------------------------------B.L USER-------------------------------------------------------

// Business Logic:Signup
// app.post("/users/signup", multer({ storage: storageConfig }).fields([
//     { name: 'img', maxCount: 1 }, { name: 'file', maxCount: 1 }]), (req,res) => {
//     console.log("here into BL: Signup", req.body);
//     User.findOne({ email: req.body.email }).then((doc) => {
//         if (doc) {
//             res.json({ msg: "oops,email exists" });

//         } else {
//             bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
//                 console.log("here crypted pwd", cryptedPwd);
//                 req.body.password = cryptedPwd;
//                 if (req.files['img']) {
//                     req.body.avatar = `http://localhost:3000/images/${req.files['img'][0].filename}`;
//                 }
                      
//                 if (req.files['file']) {
//                     req.body.file = `http://localhost:3000/files/${req.files['file'][0].filename}`;
//                               }

//                 // req.body.avatar = `http://localhost:3000/images/${req.file.filename}`;
//                 let user = new User(req.body);
//                 user.save((err, doc) => {
//                     if (err) {
//                         res.json({ msg: "failed" });
//                     } else {
//                         res.json({ msg: "added with succes" });
//                     }
//                 });
//             });
//         }
//     })
// });
app.post("/users/signup", multer({ storage: storageConfig }).fields([
    { name: 'img', maxCount: 1 }, { name: 'file', maxCount: 1 }]), (req, res) => {
        console.log("here into BL : sign up", req.body);
        User.findOne({ email: req.body.email }).then((doc) => {
            if (doc) {
                res.json({ msg: "oops, Email Exist" })
            } else {
                bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
                    console.log("here crypted pwd", cryptedPwd);
                    req.body.password = cryptedPwd;

                    if (req.body.role == "student") {
                        req.body.img = `http://localhost:3000/images/${req.files['img'][0].filename}`
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            telephone: req.body.telephone,
                            img: req.body.img,
                            adress: req.body.adress,
                            role: req.body.role,
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with success" });
                            }
                        });

                    } else if (req.body.role == "teacher") {
                        req.body.file = `http://localhost:3000/files/${req.files['file'][0].filename}`;
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            telephone: req.body.telephone,
                            speciality: req.body.speciality,
                            adress: req.body.adress,
                            password: req.body.password,
                            file: req.body.file,
                            status: req.body.status,
                            role: req.body.role
                            
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with success" });
                            }
                        });
                    }

                    else if (req.body.role == "parent") {
                        User.findOne({ telephone: req.body.childPhone, role: "student" }).then((doc) => {
                            if (!doc) {
                                res.json({ msg: " child Phone not found" });
                            }
                            else {
                                const user = new User({
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    email: req.body.email,
                                    telephone: req.body.telephone,
                                    adress: req.body.adress,
                                    childPhone: req.body.childPhone,
                                    role: req.body.role,
                                    password: req.body.password
                                    

                                });
                                user.save((err, doc) => {
                                    if (err) {
                                        res.json({ msg: " Failed" });
                                    } else {
                                        res.json({ msg: " Added with success" });
                                    }
                                });
                            }
                        });

                    } else if (req.body.role == "admin") {

                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            telephone: req.body.telephone,
                            adress: req.body.adress,
                            role: req.body.role,
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with success" });
                            }
                        });
                    }


                   
                });
            }
        })
    })

// Business Logic:Login
app.post("/users/login", (req, res) => {
    console.log("here into BL :login", req.body);
    let result;
    User.findOne({ $or: [{ email: req.body.email }, { telephone: req.body.telephone }] }).then((doc) => {
        console.log("here finded User by email or tel", doc);
        if (!doc) {
            res.json({ msg: "please check your email or tel" })
        } else {
            result = doc
            bcrypt.compare(req.body.password, doc.password).then((pwdCompare) => {
                console.log("here pwdCompare", pwdCompare);
                if (pwdCompare) {
                    // If the user is valid, generate a JWT token
                    const token = jwt.sign({
                        firstName: result.firstName,
                        lastName: result.lastName,
                        id: result._id,
                        role: result.role,
                        status: result.status
                    },
                        secretKey, { expiresIn: '1h' });
                    res.json({
                        msg: "welcome",
                        token: token
                    })
                } else {
                    res.json({ msg: "please check your pwd" })
                }
            })

        }
    })

});

// Business Logic: get all users
app.get("/users", (req, res) => {
    console.log("here into BL: get all users");
    User.find().then((users) => {
        res.json({ users: users });
    });

});

// Business Logic:get user by id
app.get("/users/:id", (req, res) => {
    console.log("here into BL: get user by id");
    User.findById(req.params.id).then((doc) => {
        res.json({ user: doc });
    });
});

// Business Logic:Edit User
app.put("/users", (req, res) => {
    console.log("here into BL: Edit User");
    let newUser = req.body;
    User.updateOne({ _id: req.body._id }, newUser).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
});

// Business Logic:Delete User
app.delete("/users/:id", (req, res) => {
    console.log("here into BL: Delete User");
    let userId = req.params.id;
    User.deleteOne({ _id: userId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});

// -----------------------------------------------------B.L COURSE--------------------------------------------------------

// Business Logic: get all courses
app.get("/courses", (req, res) => {
    console.log("here into BL: get all courses");
    Course.find().then((docs) => {
        res.json({ courses: docs });
    });
});

// Business Logic:get course by id
app.get("/courses/:id", (req, res) => {
    console.log("here into BL: get course by id");
    Course.findById(req.params.id).then((doc) => {
        res.json({ course: doc });
    });
});

// Business Logic:Add Course
app.post("/courses", (req, res) => {
    console.log("here into BL: Add course",req.body);
    let obj = new Course(req.body);
    obj.save((err,doc)=>{
        if (err) {
            res.json({msg:"Error"});
        } else {
            res.json({msg:"Sucess"});
        }
    });
});

// Business Logic:Edit Course
app.put("/courses", (req, res) => {
    console.log("here into BL: Edit Course");
    let newCourse = req.body;
    Course.updateOne({ _id: req.body._id }, newCourse).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
});

// Business Logic:Delete Course
app.delete("/courses/:id", (req, res) => {
    console.log("here into BL: Delete Course");
    let courseId = req.params.id;
    Course.deleteOne({ _id: courseId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }


    });
});

// Business logic: Affecte Student
app.post("/users/affectation", (req, res) => {
    console.log("here into BL:Affecte Student", req.body);
    const { idStudent,  idCourse} = req.body;
   
     User.findOne({ _id: idStudent, role: 'student' }).then((student)=>{
       console.log("here ",student);
   
    if (!student) {
        res.json({ msg: "Student not Found" });
    }else {
    Course.findOne({_id:idCourse}).then((doc)=>{
        console.log("here into BL",doc);
        if (!doc) {
        return res.json({msg:"course not found"});
        }
   
    // Ajoutez l'étudiant au cours
    doc.students.push(idStudent);
    doc.save((err, doc) => {
        if (err) {
            res.json({msg:"failed"});
        } else {
         student.save()
        res.json({ msg: "Added with success" }); 
        }
     })
})} });

});
// ---------------------------------------------------EXPORTS----------------------------------------------------------

// make app importable from another files
module.exports = app;