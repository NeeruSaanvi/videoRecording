(this["webpackJsonptecmint-app"]=this["webpackJsonptecmint-app"]||[]).push([[0],{72:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),s=c(32),a=c.n(s),i=c(33),l=c(34),o=c(41),j=c(40),d=(c.p,c(2)),b=c(35),u=c(6),h=c(36),m=c.n(h),p=c(14),O=c.n(p),x=c(5),g=c.n(x),v=c(3),f=c(0);var w=function(){var e=localStorage.getItem("userId");return Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:Object(f.jsx)(v.b,{class:"active",to:"/",children:"Home"})}),Object(f.jsx)("li",{children:e?Object(f.jsx)(v.b,{to:"/webrecorder",children:"WebCam Recording"}):null}),Object(f.jsx)("li",{children:e?Object(f.jsx)(v.b,{to:"/screenrecorder",children:"Screen Recording"}):null}),Object(f.jsx)("li",{children:e?Object(f.jsx)(v.b,{to:"/getvideos",children:"Your Recording"}):null}),Object(f.jsx)("li",{children:e?null:Object(f.jsx)(v.b,{to:"/login",children:"Login"})}),Object(f.jsx)("li",{children:e?null:Object(f.jsx)(v.b,{to:"/register",children:"Register"})}),Object(f.jsx)("li",{children:e?Object(f.jsx)(v.b,{to:"/logout",children:"Logout"}):null})]})})},y=function(){var e=r.a.useRef(null),t=r.a.useRef(null),c=r.a.useState(!1),n=Object(u.a)(c,2),s=n[0],a=n[1],i=r.a.useState([]),l=Object(u.a)(i,2),o=l[0],j=l[1],b=Object(d.g)(),h=r.a.useCallback((function(){a(!0),t.current=new MediaRecorder(e.current.stream,{mimeType:"video/webm"}),t.current.addEventListener("dataavailable",p),t.current.start()}),[e,a,t]),p=r.a.useCallback((function(e){var t=e.data;t.size>0&&j((function(e){return e.concat(t)}))}),[j]),x=r.a.useCallback((function(){t.current.stop(),a(!1)}),[t,e,a]);r.a.useCallback((function(){if(o.length){var e=new Blob(o,{type:"video/webm"}),t=URL.createObjectURL(e),c=document.createElement("a");document.body.appendChild(c),c.style="display: none",c.href=t,c.download="react-webcam-stream-capture.webm",c.click(),window.URL.revokeObjectURL(t),j([])}}),[o]),r.a.useCallback((function(){var t=e.current.getScreenshot();console.log("screenshot url::"+t)}),[e]);return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(w,{}),Object(f.jsx)("div",{className:"img_center",children:Object(f.jsx)(m.a,{audio:!0,ref:e,screenshotFormat:"image/jpeg",width:650})}),Object(f.jsxs)("div",{className:"img_center",children:[s?Object(f.jsx)("button",{onClick:x,children:"Stop Recording"}):Object(f.jsx)("button",{onClick:h,children:"Start Recording"}),o.length>0&&Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("button",{onClick:function(e){e.preventDefault();var t=localStorage.getItem("userId"),c=Date.now()+"-web-cam-recorder.mp4",n=new Blob(o,{type:"video/mp4"}),r=new File([n],c,{mimeType:"video/mp4"}),s=new FormData;s.append("user",t),s.append("filename",c),s.append("file",r);O.a.post("http://localhost:3001/api/uploadVideo",s,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(g()("Successfully saved","","success"),b.push("/getvideos"))})).catch((function(e){console.log(e)}))},children:"Upload Recording "})})]})]})},N=function(e){var t=e.title,c=e.value,n=e.style;return Object(f.jsxs)("div",{style:n,className:"pill",children:[Object(f.jsx)("h6",{children:t}),Object(f.jsx)("p",{children:c})]})},S=c(38),C=function(){var e=Object(S.a)({audio:!0,video:!0}),t=e.startRecording,c=e.pauseRecording,r=e.blobUrl,s=e.blob,a=e.resetRecording,i=e.resumeRecording,l=e.status,o=e.stopRecording,j=Object(n.useRef)(),b=Object(d.g)();return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(w,{}),Object(f.jsxs)("p",{children:["User name : ",localStorage.getItem("userName")]}),Object(f.jsx)("div",{id:"container",children:Object(f.jsxs)("div",{className:"wrapper",children:[Object(f.jsxs)("div",{className:"pills",children:[Object(f.jsx)(N,{title:"Status",value:l}),Object(f.jsx)(N,{style:{flexGrow:1},title:"Blob URL",value:r||"Waiting..."})]}),Object(f.jsx)("div",{children:Object(f.jsx)("video",{width:"300px",ref:j,src:r,poster:"/poster.png",controls:!0,autoPlay:!0})}),Object(f.jsxs)("div",{className:"buttons",children:[("idle"===l||"error"===l)&&Object(f.jsx)("button",{onClick:t,children:"Start recording"}),("recording"===l||"paused"===l)&&Object(f.jsx)("button",{onClick:o,children:"Stop recording"}),("recording"===l||"paused"===l)&&Object(f.jsx)("button",{onClick:function(){return"paused"===l?i():c()},children:"paused"===l?"Resume recording":"Pause recording"}),"stopped"===l&&Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("button",{onClick:function(){a(),j.current.load()},children:"Reset recording"}),Object(f.jsx)("button",{onClick:function(e){e.preventDefault();var t=localStorage.getItem("userId"),c=Date.now()+"-screenRecord.mp4",n=new File([s],c,{mimeType:"video/mp4"}),r=new FormData;r.append("user",t),r.append("filename",c),r.append("file",n),O.a.post("http://localhost:3001/api/uploadVideo",r,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(g()("Successfully saved","","success"),b.push("/getvideos"))})).catch((function(e){console.log(e)}))},children:"Upload Recording"})]})]})]})})]})},R=(c(39),function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)(""),a=Object(u.a)(s,2),i=a[0],l=a[1],o=Object(n.useState)(""),j=Object(u.a)(o,2),b=j[0],h=j[1],m=Object(n.useState)(""),p=Object(u.a)(m,2),O=p[0],x=p[1],w=Object(n.useState)(""),y=Object(u.a)(w,2),N=y[0],S=y[1],C=localStorage.getItem("userId");return Object(f.jsxs)(f.Fragment,{children:[C?Object(f.jsx)(d.a,{to:"/home"}):null,Object(f.jsx)("form",{onSubmit:function(e){e.preventDefault();var t={method:"post",body:JSON.stringify({fname:c,lname:i,email:b,password:O}),headers:{Accept:"application/json","Content-Type":"application/json"}};fetch("http://localhost:3001/api/registerUser",t).then((function(e){return e.json()})).then((function(e){"success"===e.status?(g()("Thanks! Your details has been submitted","","success"),r(""),l(""),h(""),x(""),S("")):g()("Sorry! Please try again","","error")}))},children:Object(f.jsxs)("div",{className:"container",children:[Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("h1",{children:"Register"}),Object(f.jsx)("p",{children:"Please fill in this form to create an account."}),Object(f.jsx)("hr",{})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"fname",children:Object(f.jsx)("b",{children:"First Name"})}),"\xa0",Object(f.jsx)("input",{type:"text",className:"form-control",placeholder:"First Name",onChange:function(e){r(e.target.value)},value:c,name:"fname",id:"fname",required:!0})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"lname",children:Object(f.jsx)("b",{children:"Last Name"})}),"\xa0",Object(f.jsx)("input",{type:"text",className:"form-control",placeholder:"Last Name",onChange:function(e){l(e.target.value)},value:i,name:"lname",id:"lname",required:!0})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"email",children:Object(f.jsx)("b",{children:"Email"})}),"\xa0",Object(f.jsx)("input",{type:"Email",className:"form-control",placeholder:"Enter Email",onChange:function(e){h(e.target.value)},value:b,name:"email",id:"email",required:!0})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"psw",children:Object(f.jsx)("b",{children:"Password"})}),"\xa0",Object(f.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter Password",onChange:function(e){x(e.target.value)},value:O,name:"psw",id:"psw",required:!0})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"psw-repeat",children:Object(f.jsx)("b",{children:"Repeat Password"})}),"\xa0",Object(f.jsx)("input",{type:"password",className:"form-control",placeholder:"Repeat Password",onChange:function(e){S(e.target.value)},value:N,name:"psw-repeat",id:"psw-repeat",required:!0}),Object(f.jsx)("hr",{})]})}),Object(f.jsx)("button",{type:"submit",className:"registerbtn",children:"Register"})]})}),Object(f.jsx)("div",{className:"container signin",children:Object(f.jsxs)("p",{children:["Already have an account? ",Object(f.jsx)(v.b,{to:"/login",children:"Sign in"}),"."]})})]})}),k=function(){var e=Object(d.g)(),t=Object(n.useState)(""),c=Object(u.a)(t,2),r=c[0],s=c[1],a=Object(n.useState)(""),i=Object(u.a)(a,2),l=i[0],o=i[1],j=localStorage.getItem("userId");return Object(f.jsxs)(f.Fragment,{children:[j?Object(f.jsx)(d.a,{to:"/screenrecorder"}):null,Object(f.jsx)("form",{onSubmit:function(t){t.preventDefault();var c={method:"post",body:JSON.stringify({email:r,password:l}),headers:{Accept:"application/json","Content-Type":"application/json"}};fetch("http://localhost:3001/api/LoginUser",c).then((function(e){return e.json()})).then((function(t){if("success"===t.status){var c=t.data[0].id,n=t.data[0].email,r=t.data[0].first_name+" "+t.data[0].last_name;localStorage.setItem("userId",c),localStorage.setItem("userEmail",n),localStorage.setItem("userName",r),g()("Successfully Login","","success"),e.push("/screenrecorder")}else g()("Sorry! Please try again","","error")}))},children:Object(f.jsxs)("div",{className:"container",children:[Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("h1",{children:"Login"}),Object(f.jsx)("p",{children:"Please fill in this form to Login account."}),Object(f.jsx)("hr",{})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"email",children:Object(f.jsx)("b",{children:"Email"})}),"\xa0",Object(f.jsx)("input",{type:"Email",className:"form-control",placeholder:"Enter Email",onChange:function(e){s(e.target.value)},value:r,name:"email",id:"email",required:!0})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("label",{htmlFor:"psw",children:Object(f.jsx)("b",{children:"Password"})}),"\xa0",Object(f.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter Password",onChange:function(e){o(e.target.value)},value:l,name:"psw",id:"psw",required:!0})]})}),Object(f.jsx)("button",{type:"submit",className:"loginbtn btn btn-primary",children:"Login"})]})}),Object(f.jsx)("div",{className:"container signin",children:Object(f.jsxs)("p",{children:["Register an account? ",Object(f.jsx)(v.b,{to:"/register",children:"Sign Up"}),"."]})})]})},F=c(12),I=c.n(F),E=c(15),L=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),c=t[0],r=t[1],s=localStorage.getItem("userId"),a=1;function i(e){var t=e.target.id;navigator.clipboard.writeText(t),g()("Successfully copied !","","success")}return Object(n.useEffect)((function(){function e(){return(e=Object(E.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"post",body:JSON.stringify({user:s}),headers:{Accept:"application/json","Content-Type":"application/json"}},e.next=3,fetch("http://localhost:3001/api/getVideos",t).then((function(e){return e.json()})).then((function(e){if("success"===e.status){var t=e.data;r(t)}else g()("Sorry! Please try again","","error")}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(w,{}),Object(f.jsxs)("div",{className:"container",children:[Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-md-12",children:[Object(f.jsx)("h1",{children:"User Videos"}),Object(f.jsx)("p",{children:"User Screen and web-Cam recordings."}),Object(f.jsx)("hr",{})]})}),Object(f.jsx)("div",{className:"row",children:Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("table",{children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Sr.No"}),Object(f.jsx)("th",{className:"table_mr",children:"Video"}),Object(f.jsx)("th",{className:"table_mr",children:"Total User View"}),Object(f.jsx)("th",{children:"Created Date"}),Object(f.jsx)("th",{children:"Action"})]})}),Object(f.jsx)("tbody",{children:c&&Object(f.jsx)(f.Fragment,{children:c.map((function(e,t){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:a++},"td1-key"+t),Object(f.jsx)("td",{children:Object(f.jsx)("video",{className:"video_mr",width:"250",height:"200",controls:!0,children:Object(f.jsx)("source",{src:"/"+e.video_url,type:"video/mp4"})})},"td2-key"+t),Object(f.jsx)("td",{children:e.total_user_view},"td5-key"+t),Object(f.jsx)("td",{children:e.created_date},"td3-key"+t),Object(f.jsx)("td",{children:Object(f.jsx)("button",{type:"button",className:"btn btn-primary",onClick:i,id:window.location.origin+"/preview/"+e.id+"/"+e.video_url,children:"Share"})},"td4-key"+t)]},"tr-key"+t)}))})})]})})})]})]})};var P=function(e){var t=e.cmp,c=localStorage.getItem("userId");return Object(f.jsx)("div",{children:c?Object(f.jsx)(t,{}):Object(f.jsx)(d.a,{to:"login"})})};var U=function(){return localStorage.clear(),Object(f.jsx)(d.a,{to:"home"})};var T=function(){var e=Object(d.h)().videoid,t=Object(d.h)().videoname;return Object(n.useEffect)((function(){function t(){return(t=Object(E.a)(I.a.mark((function t(){var c;return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c={method:"post",body:JSON.stringify({video:e}),headers:{Accept:"application/json","Content-Type":"application/json"}},t.next=3,fetch("http://localhost:3001/api/updateVideoPreview",c).then((function(e){return e.json()})).then((function(e){"success"===e.status||g()("Sorry! Please try again","","error")}));case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("video",{width:"100%",height:"100%",controls:!0,children:Object(f.jsx)("source",{src:"/"+t,type:"video/mp4"})})})},_=function(e){Object(o.a)(c,e);var t=Object(j.a)(c);function c(){return Object(i.a)(this,c),t.apply(this,arguments)}return Object(l.a)(c,[{key:"render",value:function(){return b.ReactSession.setStoreType("localStorage"),Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(d.d,{children:[Object(f.jsx)(d.b,{exact:!0,path:"/",children:Object(f.jsx)(w,{})}),Object(f.jsx)(d.b,{exact:!0,path:"/home",children:Object(f.jsx)(w,{})}),Object(f.jsx)(d.b,{exact:!0,path:"/register",children:Object(f.jsx)(R,{})}),Object(f.jsx)(d.b,{exact:!0,path:"/login",children:Object(f.jsx)(k,{})}),Object(f.jsx)(d.b,{exact:!0,path:"/screenrecorder",children:Object(f.jsx)(P,{cmp:C})}),Object(f.jsx)(d.b,{exact:!0,path:"/webrecorder",children:Object(f.jsx)(P,{cmp:y})}),Object(f.jsx)(d.b,{exact:!0,path:"/getvideos",children:Object(f.jsx)(P,{cmp:L})}),Object(f.jsx)(d.b,{exact:!0,path:"/logout",children:Object(f.jsx)(U,{})}),Object(f.jsx)(d.b,{exact:!0,path:"/preview/:videoid/:videoname",children:Object(f.jsx)(T,{})})]})})}}]),c}(r.a.Component);a.a.render(Object(f.jsx)(v.a,{children:Object(f.jsx)(_,{})}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.a62b9b4b.chunk.js.map