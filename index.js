/* empty css                      */import{a as m,S as p,i}from"./assets/vendor-DFC3smAU.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const d="53028647-447da87338472664aa918ac68",g="https://pixabay.com/api/";async function y(t,r=1,o=12){const s={key:d,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:o};try{const e=await m.get(g,{params:s});if(e.data.hits.length===0)throw new Error("No images found for your search query.");return e.data}catch(e){throw e.response?new Error(`HTTP error! status: ${e.response.status}`):e}}function h(t){const{webformatURL:r,largeImageURL:o,tags:s,likes:e,views:a,comments:n,downloads:f}=t;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${o}">
        <img 
          class="gallery-image" 
          src="${r}" 
          alt="${s}" 
          loading="lazy" 
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${e}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${a}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${n}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${f}</span>
          </div>
        </div>
      </a>
    </li>
  `}function w(t){return t.map(h).join("")}function v(t){t.innerHTML=""}function L(t){t.style.display="flex"}function c(t){t.style.display="none"}const b=document.getElementById("search-form"),u=document.getElementById("gallery"),l=document.getElementById("loader");let E=new p(".gallery a",{captionsData:"alt",captionDelay:250});b.addEventListener("submit",P);async function P(t){t.preventDefault();const o=new FormData(t.target).get("searchQuery").trim();if(!o){i.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}v(u),L(l);try{const s=await y(o);c(l);const e=w(s.hits);u.innerHTML=e,E.refresh(),i.success({title:"Success",message:`Found ${s.totalHits} images!`,position:"topRight"})}catch(s){c(l),s.message==="No images found for your search query."?i.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",s)}t.target.reset()}
//# sourceMappingURL=index.js.map
