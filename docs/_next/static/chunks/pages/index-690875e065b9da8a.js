(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4169)}])},4169:function(e,n,r){"use strict";r.r(n),r.d(n,{__N_SSG:function(){return A},default:function(){return I}});var t=r(5893),i=r(9008),s=r.n(i),c=r(4349),a=r(6826),l=r.n(a),o=r(7244),d=r.n(o),h=r(1664),j=r.n(h),_=e=>(0,t.jsx)("div",{className:d().nav,children:(0,t.jsx)("ul",{children:e.entries.map(n=>(0,t.jsx)("li",{children:(0,t.jsx)(j(),{href:n.href,passHref:!0,children:(0,t.jsxs)("span",{className:n.label==e.selected?"".concat(d()["nav-entry"]," ").concat(d().selected):d()["nav-entry"],children:[(0,t.jsx)("span",{className:d().bullet,children:">>>>"}),(0,t.jsx)("span",{className:d().label,children:n.label})]})})},n.label))})}),x=r(3024),m=r(9417),u=r(6417),p=r.n(u),v=r(9603),f=r(7294),N=e=>{let[n,r]=(0,f.useState)(!1),i=(0,f.useRef)(null);return(0,t.jsx)(j(),{href:e.href,passHref:!0,children:(0,t.jsxs)("div",{className:p().outer,onMouseEnter:()=>{if(r(!0),void 0==i.current||"none"==getComputedStyle(i.current).transitionProperty)return;let e=i.current.scrollWidth;i.current.style.width=e+"px"},onMouseLeave:()=>{if(r(!1),void 0==i.current||"none"==getComputedStyle(i.current).transition)return;let e=i.current.scrollWidth,n=i.current.style.transition;i.current.style.transition="",requestAnimationFrame(()=>{i.current.style.width=e+"px",i.current.style.transition=n,requestAnimationFrame(function(){i.current.style.width="0px"})})},children:[(0,t.jsx)("div",{className:p().inner,children:e.hoverIcon&&n?(0,t.jsx)(v.G,{icon:e.hoverIcon}):(0,t.jsx)(v.G,{icon:e.icon})}),(0,t.jsx)("div",{className:p().label,ref:i,children:(0,t.jsx)("span",{children:e.name})})]})})},b=r(4624),g=r.n(b),w=e=>(0,t.jsxs)("div",{className:g().entry,children:[(0,t.jsx)("div",{className:g().side,children:(0,t.jsx)("h3",{children:e.exp.dates})}),(0,t.jsxs)("div",{className:g().main,children:[(0,t.jsx)("h1",{children:e.exp.title}),(0,t.jsx)("h2",{children:e.exp.company}),(0,t.jsx)(c.R,{...e.exp.contentSerialized})]})]},e.exp.title),y=r(4255),E=r.n(y),H=e=>(0,t.jsxs)("div",{className:E().education,children:[(0,t.jsxs)("span",{children:[(0,t.jsx)("h3",{children:e.dates}),(0,t.jsx)("h3",{className:E().sep,children:"◇"}),(0,t.jsx)("h3",{children:e.location})]}),(0,t.jsx)("h1",{className:E()["education-inst"],children:e.inst}),(0,t.jsx)("h2",{children:e.major})]}),P=r(3628),C=r.n(P),M=r(8889),S=e=>{var n;return(0,t.jsx)("div",{children:(0,t.jsx)(j(),{href:"/projects/".concat(e.project.slug),passHref:!0,children:(0,t.jsxs)("div",{className:C()["project-card"],children:[(0,t.jsxs)("div",{className:C()["image-layer"],children:[e.project.images&&e.project.images.length>0?(0,t.jsx)("div",{className:C()["right-pad"],children:(0,t.jsx)(M.Z,{src:e.project.images[0],alt:e.project.title+" image",fill:!0})}):(0,t.jsx)("div",{className:C()["right-pad"],children:(0,t.jsx)(M.Z,{src:e.project.thumbnail,alt:e.project.title+" image",fill:!0})}),(0,t.jsx)("div",{className:C().image,children:(0,t.jsx)(M.Z,{src:e.project.thumbnail,alt:e.project.title+" thumbnail",fill:!0})}),null===(n=e.project.images)||void 0===n?void 0:n.filter(n=>n!=e.project.thumbnail).slice(1).map(n=>(0,t.jsx)("div",{className:C().image,children:(0,t.jsx)(M.Z,{src:n,alt:e.project.title+" image",fill:!0},n)},n))]}),(0,t.jsxs)("div",{className:C()["project-card-inner"],children:[(0,t.jsxs)("div",{className:C()["text-container"],children:[(0,t.jsxs)("div",{className:C().text,children:[(0,t.jsx)("h1",{children:e.project.title}),(0,t.jsx)("p",{children:e.project.description})]}),(0,t.jsx)("div",{className:C().window})]}),(0,t.jsx)("div",{className:C().arrow,children:(0,t.jsx)("span",{children:">>"})})]})]})})})},A=!0,I=e=>{let{blurb:n,experience:r,projects:i}=e,a=(0,f.useRef)(null),o=(0,f.useRef)(null),d=(0,f.useRef)(null),[h,j]=(0,f.useState)("About"),u=(e,n)=>{history.replaceState(null,"",location.origin+location.pathname+"#".concat(n)),j(e)};return(0,f.useEffect)(()=>{let e=new IntersectionObserver(e=>{let[n]=e;n.isIntersecting&&u("About","about")},{root:null,rootMargin:"0px",threshold:1});a.current&&e.observe(a.current);let n=new IntersectionObserver(e=>{let[n]=e;n.isIntersecting&&u("Experience","experience")},{root:null,rootMargin:"0px",threshold:1});o.current&&n.observe(o.current);let r=new IntersectionObserver(e=>{let[n]=e;n.isIntersecting&&u("Projects","projects")},{root:null,rootMargin:"0px",threshold:1});d.current&&r.observe(d.current)},[a,o,d]),(0,t.jsxs)("div",{className:l()["main-page"],children:[(0,t.jsx)(s(),{children:(0,t.jsx)("title",{children:"Samuel Lihn | Home"})}),(0,t.jsxs)("div",{className:l()["main-flex"],children:[(0,t.jsx)("div",{className:"".concat(l()["left-pane"]," ").concat(l()[h]),children:(0,t.jsxs)("div",{className:l()["title-bar"],children:[(0,t.jsx)("h1",{children:"Samuel Lihn"}),(0,t.jsx)(_,{entries:[{label:"About",href:"#about"},{label:"Experience",href:"#experience"},{label:"Projects",href:"#projects"}],selected:h}),(0,t.jsxs)("div",{className:l()["dynamic-panel-1"],children:[(0,t.jsx)("h1",{children:"Education"}),(0,t.jsxs)("div",{className:l().education,children:[(0,t.jsx)(H,{inst:"Johns Hopkins University",major:"Mechanical Engineering & Computer Engineering",dates:"Class of 2027",location:"Baltimore, MD"}),(0,t.jsx)(H,{inst:"Edison Academy Magnet School",major:"Electrical & Computer Engineering Technologies",dates:"Class of 2023",location:"Edison, NJ"})]})]}),(0,t.jsxs)("div",{className:l()["social-container"],children:[(0,t.jsx)(N,{icon:x.hwn,name:"linkedin.com/in/samuellihn/",href:"https://www.linkedin.com/in/samuellihn/"}),(0,t.jsx)(N,{icon:x.zhw,name:"github.com/samuellihn",href:"https://github.com/samuellihn"}),(0,t.jsx)(N,{icon:m.FU$,name:"slihn1@jh.edu",href:"mailto: slihn1@jh.edu",hoverIcon:m.dwZ})]})]})}),(0,t.jsxs)("div",{className:l().content,children:[(0,t.jsx)("section",{id:"about",ref:a,className:l()["title-screen"],children:(0,t.jsx)("div",{className:l().blurb,children:(0,t.jsx)(c.R,{...n})})}),(0,t.jsxs)("section",{id:"experience",className:l().experience,children:[(0,t.jsx)("h1",{ref:o,children:"Experience"}),r.map(e=>(0,t.jsx)(w,{exp:e},e.title))]}),(0,t.jsxs)("section",{id:"projects",className:l().projects,children:[(0,t.jsx)("h1",{ref:d,children:"Projects"}),(0,t.jsx)("div",{className:l()["projects-container"],children:i.map(e=>(0,t.jsx)(S,{project:e},e.slug))})]})]})]})]})}},6826:function(e){e.exports={"main-page":"Home_main-page__hbOdp","main-flex":"Home_main-flex__9wRQH",About:"Home_About__GMKh1","title-bar":"Home_title-bar__HTn4K","dynamic-panel-1":"Home_dynamic-panel-1__cjzEj","social-container":"Home_social-container__UGtNx",Experience:"Home_Experience__GDlFe",Projects:"Home_Projects__8vST6","left-pane":"Home_left-pane__v3l6W",education:"Home_education__qep7e",content:"Home_content__dtYZ9","title-screen":"Home_title-screen__p5No3",blurb:"Home_blurb__wEC5D",experience:"Home_experience__6pglw",projects:"Home_projects__b1yTf","projects-container":"Home_projects-container__4hqkq"}},4255:function(e){e.exports={education:"Education_education__rr11A",sep:"Education_sep__dQxM6"}},4624:function(e){e.exports={entry:"Experience_entry__5hQhw",side:"Experience_side__tuo0M",main:"Experience_main__Oq43z"}},7244:function(e){e.exports={nav:"Nav_nav__wQQbQ","nav-entry":"Nav_nav-entry__rjbiN",bullet:"Nav_bullet__Oh5IB",label:"Nav_label__XmHT7",selected:"Nav_selected__IiduA"}},3628:function(e){e.exports={"project-card":"ProjectCard_project-card__lu_Up","image-layer":"ProjectCard_image-layer__KgpCj","right-pad":"ProjectCard_right-pad__FMzhp",image:"ProjectCard_image__DYjTF","project-card-inner":"ProjectCard_project-card-inner__q2Pxc","text-container":"ProjectCard_text-container__peJWA",text:"ProjectCard_text__9KwMr",window:"ProjectCard_window__MDl2f",arrow:"ProjectCard_arrow__xosDt"}},6417:function(e){e.exports={outer:"SocialPod_outer__RLKdW",label:"SocialPod_label__my_ao",inner:"SocialPod_inner__3Ml2W"}}},function(e){e.O(0,[976,948,107,888,774,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);