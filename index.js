const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const pino = require('express-pino-logger')();
const app = express();
var cors = require('cors');
app.use(cors());
var mysql = require('mysql2');
var fs = require('fs');
var md5 = require('md5');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const path = require('path');
const os = require('os');

var multer = require('multer')
// let nodemailer = require('nodemailer');
 //var forms = multer();
app.use(express.static('public'))

app.use(bodyParser.json()); 
//app.use(busboyBodyParser());

// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use(forms.array());

app.use(pino);


var con = mysql.createConnection({
  host: "localhost",
  user: "screenrecorder",
  password: "Pine#^37hety33",
  database: "screenRecorder"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// const adminMail = "piyush@pinesucceed.com";
// const hrMail = "hr@pinesucceed.com";


app.use('/video', express.static(path.join(__dirname, '/video')));
app.use('/video_thumb', express.static(path.join(__dirname, '/video_thumb')));
app.use(express.static('video'))
app.use(express.static('video_thumb'))

let nodemailer = require('nodemailer');
const adminMail = "piyush@pinesucceed.com";

const transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com", 
      port: 465,
      secure: true,
    auth: {
      user: "testpine123@gmail.com",
      pass: "pine@123" 
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

// function saveVideoToDisk(url, localPath) {
//   var fullUrl = url;
//   var file = fs.createWriteStream(localPath);
//   var request = https.get(url, function(response) {
//   response.pipe(file);
//   });
// }


app.post('/api/registerUser', (req, res, next) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var password = req.body.password
    
     var sql = "SELECT * FROM user WHERE email='"+ email+"' AND is_delete='0' AND is_active='1'";
      con.query(sql, function (err, result) {
      if (err) {
        res.json({
              status: 204,
              data:[],
              msg: 'Please Try Again'
        })
      } else {
        if(result.length<=0){
            var sql = "INSERT INTO user (first_name, last_name,email,password) VALUES ('"+fname+"', '"+lname+"','"+email+"','"+password+"')";
            con.query(sql, function (err, result) {
            if (err) {
              res.json({
                    status: 204,
                    data:[],
                    msg: 'Please Try Again'
              })
            } else {
              res.json({
                status: 200,
                data:[],
                msg: 'Successfully Register'
              })
            }
          });
        }
        else{
              res.json({
                status: 204,
                data:[],
                msg: 'Please Enter Another Email, This Email Already Use'
          })
        }
      }
    });


  }) 
  
  
  app.post('/api/LoginUser', (req, res, next) => {
    var email = req.body.email
     var password = req.body.password
      var sql = "SELECT * FROM user WHERE email='"+ email+"' AND password='"+password+"' AND is_delete='0' AND is_active='1'";
      con.query(sql, function (err, result) {
      if (err) {
        res.json({
              status: 204,
              data:[],
              msg: 'Please Try Again'
        })
      } else {
        
        if(result.length>0){
          res.json({
            status: 200,
            data:result,
            msg: 'Successfully Login'
          })
        }
        else{
              res.json({
                status: 204,
                data:[],
                msg: 'Please Enter Your valid Email Or Password'
          })
        }

        
      }
    });
  })  
  
  /** 1-9-2021 api  */
  app.post('/api/SocialLogin', (req, res, next) => {
     var email = req.body.email
     var first_name = req.body.first_name
     var last_name = req.body.last_name
     var sql = "SELECT * FROM user WHERE email='"+ email+"' AND is_delete='0' AND is_active='1'";
      con.query(sql, function (err, result) {
         
        if(result.length<=0){
          var sqll = "INSERT INTO user (first_name, last_name,email) VALUES ('"+first_name+"', '"+last_name+"','"+email+"')";
           con.query(sqll, function (err, result) {
            if (result) {
              var sql = "SELECT * FROM user WHERE email='"+ email+"' AND is_delete='0' AND is_active='1'";
              con.query(sql, function (err, result){
                  res.json({
                    status: 'success',
                    data:result
                })
              })
              } else {
                  res.json({
                    status: 'fail',
                    data:[]
              })
             }
           })
        }
        else{
          var sql = "SELECT * FROM user WHERE email='"+ email+"' AND is_delete='0' AND is_active='1'";
          con.query(sql, function (err, result) {
              res.json({
                status: 'success',
                data:result
            })
          })
        }
       
    });
  })  

  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, __dirname+'/video/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname )
    }
  })
  var upload = multer({ storage: storage })
  
  app.post('/api/uploadVideo',upload.single('file'),(req, res, next) => {
    var video = req.body.filename; 
    var user  = req.body.user; 
   
      var sql = "INSERT INTO videos (user_id,video_url) VALUES ('"+user+"', '"+video+"')";
      con.query(sql, function (err, result) {
      if (err) {
        res.json({
              status: 504,
              data:[]
        })
      } else {
        var sql = "SELECT * FROM videos WHERE user_id='"+ user+"' AND is_delete='0' AND is_active='1' ORDER BY id desc LIMIT 1";
        con.query(sql, function (err, result) {
          if (err) {
            res.json({
                  status: 504,
                  data:[]
            })
          } else {
            res.json({
              status: 200,
              data:result
            })
          }
        })
      }
    });


 })  


 app.post('/api/getVideos', (req, res, next) => {
  var user = req.body.user
  var sql = "SELECT * FROM videos WHERE user_id='"+user+"' AND is_delete=0 ORDER BY id DESC";
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 'fail',
            data:[]
      })
    } else {
      res.json({
        status: 'success',
        data:result
      })
    }
  });
})  


app.post('/api/updateVideoPreview', (req, res, next) => {
  var videoid = req.body.video
  var sql = "UPDATE videos SET total_user_view = total_user_view + 1 WHERE id = '"+videoid+"'";
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 'fail',
            data:[]
      })
    } else {
      res.json({
        status: 'success',
        data:[]
      })
    }
  });
})   


app.post('/api/getVideoDetails', (req, res, next) => {
  var user = req.body.user
  var videoid = req.body.video
  var sql = "SELECT * FROM videos WHERE user_id='"+user+"' and id='"+videoid+"'";
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 'fail',
            data:[]
      })
    } else {
      res.json({
        status: 'success',
        data:result
      })
    }
  });
})  

var storageThumb = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, __dirname+'/video_thumb/')
},
filename: function (req, file, cb) {
  cb(null,Date.now() + '-' +file.originalname )
}
})
var uploadThumb = multer({ storage: storageThumb })

app.post('/api/uploadVideoThumbnail',uploadThumb.single('file'),(req, res, next) => {
var user  = req.body.user; 
var videoId = req.body.video;
var title = req.body.title;
if(req.file){
  var thumbnail = req.file.filename;
  var sql = "UPDATE videos SET video_title = '"+title+"', video_thumb = '"+thumbnail+"' WHERE id = '"+videoId+"' AND user_id='"+user+"'";
}
else{
  var sql = "UPDATE videos SET video_title = '"+title+"' WHERE id = '"+videoId+"' AND user_id='"+user+"'";
}
con.query(sql, function (err, result) {
  if (err) {
    res.json({
          status: 'fail',
          data:[]
    })
  } else {
    res.json({
      status: 'success',
      data:result
    })
  }
});


})  


app.post('/api/deleteVideo', (req, res, next) => {
  var videoid = req.body.video
  var sql = "UPDATE videos SET is_delete = 1 WHERE id = '"+videoid+"'";
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 204,
            data:[]
      })
    } else {
      res.json({
        status: 200,
        data:[]
      })
    }
  });
})  


app.post('/api/getUserProfile', (req, res, next) => {
  var user = req.body.user
  var sql = "SELECT * FROM user WHERE id='"+user+"' AND is_delete=0 ORDER BY id DESC";
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 204,
            data:[]
      })
    } else {
      res.json({
        status: 200,
        data:result
      })
    }
  });
})  


app.post('/api/ProfileUpdate', (req, res, next) => {
   var email = req.body.email
   var password = req.body.password
   var userId = req.body.user


  var sql = "SELECT * FROM user WHERE email='"+email+"' AND id !='"+userId+"'";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 204,
            data:[],
            msg:'Please Try again a!'
      })
    } else {
      if(result.length<=0){
          var sql = "UPDATE user SET email = '"+email+"',password = '"+password+"' WHERE id = '"+userId+"'";
          con.query(sql, function (err, result) {
          if (err) {
            res.json({
                  status: 204,
                  data:[],
                  msg:'Please Try again b!'
            })
          } else {
            res.json({
              status: 200,
              data:result,
              msg:'Profile successfully updated'
            })
          }
        });
      }
      else{
        res.json({
              status: 204,
              data:[],
              msg:'This email already exists, Please choose another email'
        })
      }
    }
  });
})  



app.post('/api/ForgetPassword', (req, res, next) => {
 
  var email = req.body.email
  var sql = "SELECT * FROM user WHERE email='"+ email+"' AND is_delete='0' AND is_active='1'";
    con.query(sql, function (err, result) {
    if (err) {
      res.json({
            status: 204,
            data:[],
            msg: 'Please Try Again'
      })
    } else {
      if(result.length>0){
          
          var crypto = require('crypto');
          var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
          var key = 'password';


          var passwordGenerate = "pass"+Math.floor(1000 + Math.random() * 9000);
          
          var cipher = crypto.createCipher(algorithm, key);  
          var encrypted = cipher.update(passwordGenerate, 'utf8', 'hex') + cipher.final('hex');
                         
          var sql = "UPDATE user SET password = '"+encrypted+"' WHERE email = '"+email+"'";
          con.query(sql, function (err, result) {
          if (err) {
            res.json({
                  status: 204,
                  data:[],
                  msg: 'Please Try Again'
            })
          } else {
             
            // var content = `Your New Passsword is : ${passwordGenerate} \n`;

            var content = `<!doctype html><html lang="en-US">`+
              `<head></head>`+
                 `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">`+
                     `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open Sans", sans-serif;">`+
                       `<tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td style="height:20px;">&nbsp;</td></tr>`+
                        `<tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">`+
                         `<tr><td style="height:40px;">&nbsp;</td></tr>`+
                          `<tr><td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:Rubik,sans-serif;">You requested to reset your password </h1>`+
                          `<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">We cannot simply send you your old password. A unique password to reset your password has been generated for you, And Unique New Password is : ${passwordGenerate} </p></td>`+
                          `</tr> <tr> <td style="height:40px;">&nbsp;</td></tr></table> </td>`+
                          `<tr><td style="height:20px;">&nbsp;</td></tr>`+
                          `<tr><td style="height:80px;">&nbsp;</td> </tr></table></td> </tr> </table></body></html>`;
  
              var mail = {
                from: adminMail, 
                to: email, 
                subject: 'Forget Password',
                html: content
              }
            
              transporter.sendMail(mail, (err, data) => {
                if (err) {
                  res.json({
                    status: 204,
                    data:[],
                    msg: 'Please Try Again'
                  })
                }
              })
            res.json({
              status: 200,
              data:[],
              msg: 'successfully updated password'
            })
          }
        });
      }
      else{
            res.json({
              status: 204,
              data:[],
              msg: 'Email Is Not Registered'
        })
      }
    }
  });


}) 





  

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);