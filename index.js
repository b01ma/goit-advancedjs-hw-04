/* empty css                      */import{a as E,S as P,i}from"./assets/vendor-DFC3smAU.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const R="53028647-447da87338472664aa918ac68",S="https://pixabay.com/api/";async function p(e,o=1,s=15){const r={key:R,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:s};try{const t=await E.get(S,{params:r});if(t.data.hits.length===0)throw new Error("No images found for your search query.");return t.data}catch(t){throw t.response?new Error(`HTTP error! status: ${t.response.status}`):t}}function I(e){const{webformatURL:o,largeImageURL:s,tags:r,likes:t,views:a,comments:d,downloads:v}=e;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img 
          class="gallery-image" 
          src="${o}" 
          alt="${r}" 
          loading="lazy" 
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${t}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${a}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${d}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${v}</span>
          </div>
        </div>
      </a>
    </li>
  `}function h(e){return e.map(I).join("")}function M(e){e.innerHTML=""}function y(e){e.style.display="flex"}function g(e){e.style.display="none"}function f(e){e&&(e.style.display="block")}function w(e){e&&(e.style.display="none")}function q(e,o){const s=h(o);e.insertAdjacentHTML("beforeend",s)}function $(){const e=document.querySelectorAll(".gallery-item");if(e.length>0){const o=e[0].getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}const x=document.getElementById("search-form"),m=document.getElementById("gallery"),l=document.getElementById("loader"),n=document.getElementById("load-more-btn");let L="",c=1,u=0,b=new P(".gallery a",{captionsData:"alt",captionDelay:250});x.addEventListener("submit",B);n.addEventListener("click",H);async function B(e){e.preventDefault();const s=new FormData(e.target).get("searchQuery").trim();if(!s){i.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}if(s.length<2){i.warning({title:"Warning",message:"Search query must be at least 2 characters long!",position:"topRight"});return}L=s,c=1,u=0,M(m),w(n),y(l);try{const r=await p(s,c);g(l),u=r.totalHits;const t=h(r.hits);m.innerHTML=t,b.refresh(),i.success({title:"Success",message:`Found ${r.totalHits} images!`,position:"topRight"});const a=Math.ceil(u/15);c<a&&f(n)}catch(r){g(l),r.message==="No images found for your search query."?i.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",r)}e.target.reset()}async function H(){c+=1,n.disabled=!0,n.textContent="Loading...",y(l);try{const e=await p(L,c);g(l),q(m,e.hits),b.refresh(),$();const o=Math.ceil(u/15);c<o?(n.disabled=!1,n.textContent="Load more",f(n)):(w(n),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){g(l),n.disabled=!1,n.textContent="Load more",f(n),i.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight"}),console.error("Error loading more images:",e)}}
//# sourceMappingURL=index.js.map
