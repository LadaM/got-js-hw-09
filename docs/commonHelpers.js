import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */function r(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}const o=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let t=null;function n(){o.disabled=!o.disabled,e.disabled=!e.disabled}const l=()=>{t||(t=setInterval(()=>{document.body.style.backgroundColor=r()},1e3),n())},a=()=>{clearInterval(t),t=null,n()};o.addEventListener("click",l);e.addEventListener("click",a);
//# sourceMappingURL=commonHelpers.js.map