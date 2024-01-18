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

// configuration image and file
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

// multer
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

// configuration multer
const coursConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, imgName);
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
const Note = require("./models/note");

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

                    if (req.body.role == "student" || req.body.role == "admin" ) {
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
                        req.body.img = `http://localhost:3000/images/${req.files['img'][0].filename}`;
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            telephone: req.body.telephone,
                            speciality: req.body.speciality,
                            adress: req.body.adress,
                            password: req.body.password,
                            file: req.body.file,
                            img: req.body.img,
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
                                req.body.img = `http://localhost:3000/images/${req.files['img'][0].filename}`;
                                const user = new User({
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    email: req.body.email,
                                    telephone: req.body.telephone,
                                    adress: req.body.adress,
                                    childPhone: req.body.childPhone,
                                    img: req.body.img,
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

                    }                  
                });
            }
        })
    })

// Business Logic:Login
app.post("/users/login", (req, res) => {
    console.log("here into BL :login", req.body);
    let query;
    const login = req.body.login;
    if (login.includes('@')) {

        // L'entrée est un e-mail
        query = { email: login };
    } else {
        // L'entrée est un numéro de téléphone
        query = { tel: login };
    }
    let result;
    User.findOne(query).then((doc) => {
        console.log("here finded User by email or tel", doc);
    // let result;
    // User.findOne({ $or: [{ input: req.body.email || req.body.telephone }] }).then((doc) => {
    //     console.log("here finded User by email or tel", doc);
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
    });
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
// Business Logic:validate teacher
app.get("/users/validation/:id",(req,res)=>{
    console.log("here into BL: validate teacher");
    User.updateOne({ _id: req.params.id},{status:"confirmed"}).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
})

// Business Logic:Search Teachers By Speciality
app.get("/users/searchTeacher/:speciality",(req, res) => {
    console.log("here into BL: Search Teachers By Specialty");
          const speciality = req.params.speciality;
          User.find({speciality: speciality,role:"teacher"}).then((docs)=>{
            res.json({teachers:docs});
    
});
});

// search child's Results
app.post("/users/searchChildByTel",(req,res)=>{
    console.log("here into BL: search child's Results");

    const childPhone=req.body.childPhone;
    User.findOne({telephone: childPhone,role:"student"}).populate({
        path: "course",
        populate: {
            path: "teacher",
            model: "User"
        }
    }).populate("notes").then((doc)=>{
          console.log("here response from BE", doc);
     res.json({student:doc});
    })

})
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
app.post("/courses", multer({ storage: coursConfig }).single("img"), (req, res) => {
    console.log("here into BL: Add course", req.body);
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        teacher: req.body.teacher,
        img: `http://localhost:3000/images/${req.file.filename}`,

    })
    course.save((err, doc) => {
        if (err) {
            res.json({ msg: "ERROR" })
        } else {

            res.json({ msg: "added with success" })
        }
    })
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

// Business logic: Get Teacher Courses
app.get("/courses/teacherscourse/:teacher", (req, res) => {
    console.log("here into business logic : Get Teacher Courses");
   const IdTeacher=req.params.teacher;
    Course.find({teacher:IdTeacher}).populate("teacher").then((docs) => {
        res.json({ courses: docs });
    });
});

// Business logic: Get Student Courses
app.get("/courses/studentCourse/:IdStudent", (req, res) => {
    console.log("here into business logic : Get Student Courses");
   const student=req.params.IdStudent;
    Course.find({students:student}).populate("students").then((docs) => {
        res.json({ courses: docs });
    });
});

// ---------------------------------------------------B.L: NOTE-----------------------------------------------------------------------------

// Business Logic: get all Notes
app.get("/notes", (req, res) => {
    console.log("here into BL: get all Notes");
    Note.find().then((docs) => {
        res.json({ notes: docs });
    });
});

// Business Logic:get Note by id
app.get("/notes/:id", (req, res) => {
    console.log("here into BL: get note by id");
    Note.findById(req.params.id).then((doc) => {
        res.json({ note: doc });
    });
});

// Business Logic:Add Note
app.post("/notes", (req, res) => {
    console.log("here into BL ", req.body);
    const idStudent = req.body.idStudent;
    const idCourse = req.body.idCourse;
    User.findOne({ _id: idStudent }).then((doc) => {
        console.log("here student", doc);
        if (!doc) {
            return res.json({ msg: "No student" });
        }

    Course.findOne({ _id: idCourse }).then((course) => {
            console.log("here course", course);
            if (!course) {
                return res.json({ msg: "No course" });
            }
            const note = new Note({
                value: req.body.value,
                evaluation: req.body.evaluation,
                course: course._id,
                student: doc._id,

            })
            note.save((err, doc) => {
                if (err) {
                    res.json({ msg: "failed" });
                } else {
                    doc.note = doc._id;
                    doc.save();
                    res.json({ msg: "added with success" });
                }

            })
        })
    })
});
// app.post("/notes", (req, res) => {
//     console.log("here into BL: Add Note",req.body);
//     let obj = new Note(req.body);
//     obj.save((err,doc)=>{
//         if (err) {
//             res.json({msg:"Error"});
//         } else {
//             res.json({msg:"Sucess"});
//         }
//     });
// });

// Business Logic:Edit Note
app.put("/notes", (req, res) => {
    console.log("here into BL: Edit Note");
    let newNote = req.body;
    Note.updateOne({ _id: req.body._id }, newNote).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
});

// Business Logic:Delete Note
app.delete("/notes/:id", (req, res) => {
    console.log("here into BL: Delete Note");
    let noteId = req.params.id;
    Note.deleteOne({ _id: noteId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});
// -------------------------------------------------------------------------------------------------------------

app.post("/university", (req, res) => {
    console.log("here into BL: university", req.body);
    let apiUrl ="http://universities.hipolabs.com/search"; 
   axios.get(apiUrl, { params: {  country: req.body.country } })
   .then((response) => {
        console.log("here API response", response.data);
        if (response.data.length > 0) {
            const firstUniversity = response.data[0];

        let resultToSend= {
            name: firstUniversity.name,
            country: firstUniversity.country,
            domains: firstUniversity.domains
        };
        res.json({ result: resultToSend });
}});

});

// Business Logic : details note
app.get("/notes/noteDetails/:user", (req, res) => {
    const idStudent = req.params.user;
    // relation entre les modèles d'étudiant, de cours et de note
    Note.findOne({ student: idStudent })
        .populate("student")
        .populate({
            path: "course",
            populate: {
                path: "teacher",
                model: "User"  // Assurez-vous que "User" est le modèle correct pour les enseignants
            }
        })
        .then((doc) => {
           
            if (!doc) {
                // La note n'a pas été trouvée pour l'étudiant connecté et le cours spécifié
          return  res.json({ msg: "Note not found " });
            }

            res.json({ note: doc});
        })
       
});

// business logic : get  Note For parent
app.post("/notes/noteForParent",(req,res)=>{
    console.log("here into BL: get note For Parent",req.body);

    Note.findOne({course:req.body.idCourse, student:req.body.idUser}).populate("course")
    .populate("student").then((doc) => {
        res.json({ note: doc });
    })
})
// ---------------------------------------------------EXPORTS----------------------------------------------------------

// make app importable from another files
module.exports = app;