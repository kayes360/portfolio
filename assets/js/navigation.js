const select=(el,all=!1)=>(el=el.trim(),all?[...document.querySelectorAll(el)]:document.querySelector(el)),on=(type,el,listener,all=!1)=>{let selectEl=select(el,all);selectEl&&(all?selectEl.forEach(e=>e.addEventListener(type,listener)):selectEl.addEventListener(type,listener))};window.addEventListener("scroll",()=>{const header=select("#header"),heroSection=select("#hero"),heroNavbar=heroSection.querySelector("#navbar"),heroNavPosition=heroNavbar.getBoundingClientRect();heroNavPosition.bottom<=0?header.classList.add("header-sticky"):header.classList.remove("header-sticky")}),on("click","#navbar .nav-link",(function(e){let section=select(this.hash);if(section){e.preventDefault();let navbar=select("#navbar"),navlinks;if(select("#navbar .nav-link",!0).forEach(item=>{item.classList.remove("active")}),this.classList.add("active"),navbar.classList.contains("navbar-mobile")){navbar.classList.remove("navbar-mobile");let navbarToggle=select(".mobile-nav-toggle");navbarToggle.classList.toggle("bi-list"),navbarToggle.classList.toggle("bi-x")}window.scrollTo({top:section.offsetTop-85,behavior:"smooth"})}}),!0);