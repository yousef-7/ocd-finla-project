
// Header 

const header = document.querySelector("header.header")

window.addEventListener("scroll",scrolled)

function scrolled(e){
    if(window.scrollY > 2){
        header.classList.add("fixed")
    }else{
        header.classList.remove("fixed")
    }
}
scrolled()

// Add Active link
const links = document.querySelectorAll("nav ul li a")
links.forEach(function(link){
    link.addEventListener("click",(e)=>{
        // Remove active link first
        links.forEach(link => link.classList.remove("active"))
        // Add active link
        link.classList.add("active")
    })
})

// Add Active While scroll
const nav = document.querySelector("nav")
window.addEventListener("scroll",(e)=>{
    const allSections = document.querySelectorAll("section");
    allSections.forEach(function(section){
        const secTop = section.getBoundingClientRect().top;
        const headerHeight = header.getBoundingClientRect().height;
        if(secTop - headerHeight <= 0){
            // Active Link
            const activeLink = document.querySelector(`a[href="#${section.id}"]`)
            //Remove Active Link  
            links.forEach(link => link.classList.remove("active"));
            // Add Active Link
            activeLink.classList.add("active")
        }
    })
})

// Navigation with Smooth behavior
links.forEach(function(link){
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        //Get The section 
        const section = document.querySelector(link.getAttribute("href"));
        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    })
});

/// Open&Close Menu
const btnContainer = document.querySelector(".btn-nav")
const ulLinks = document.querySelector("nav.nav-bar ul.links_list");
const linksContainer = document.querySelector("nav.nav-bar div.links_container");
btnContainer.addEventListener("click",(e)=>{
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    const ullinksHeight = ulLinks.getBoundingClientRect().height;
    if(linksContainerHeight === 0){
        openMenu(ullinksHeight)
    }else{
        closeMenu()
    }
})

function closeMenu(){
    btnContainer.classList.remove("close-menu")
    btnContainer.classList.add("show-menu")
    linksContainer.removeAttribute("style");
    //Header 
    header.classList.remove("small-screen-header")
}

function openMenu(ullinksHeight){
    btnContainer.classList.remove("show-menu")
    btnContainer.classList.add("close-menu")
    linksContainer.setAttribute("style",`height:${ullinksHeight}px;`);
    //Header
    header.classList.add("small-screen-header")
}

// Close Links After click
window.addEventListener("click",(e)=>{
    if(!e.target.classList.contains("btn-nav")){
        closeMenu()
    }
})

/*Porfolio Cards-Imgs*/
// const PorfolioImgs = document.querySelectorAll(".portfolio-card-img")
// PorfolioImgs.forEach(function(card){
//     const img = card.dataset.img;
//     card.style.backgroundImage=`url(/imges/${img}) , linear-gradient(rgb(1 1 18 / 50%), rgb(250 246 41 / 38%), rgb(26 26 26 / 50%))`
//     // card.style.backgroundColor="black"
// })

/*Slider*/
const arrayOfSrs = 
["marketing.png","design.png","printing.png","web.jpg","voiceover.png","photography.jpg","moderation.jpg","videography.png"]
const showSlider = document.querySelectorAll(".show-slider-icon")
const slider = document.querySelector(".slider_overlay");
const sliderDiv = document.querySelector(".slider_img");
const sliderImg = document.querySelector(".slider_img img");
const toRightIcon =  document.querySelector(".to_right_i");
const toLeftIcon =  document.querySelector(".to_left_i");
let currentIndex;

showSlider.forEach(function(icon){
    icon.addEventListener("click",function(e){
        const currentImg = icon.parentElement.dataset.img;
        // console.log(iconPatent);
        slider.classList.add("show_slider_overlay")
        slider.classList.remove("hide_slider_overlay")
        
        sliderImg.src=`imges/${currentImg}`
        currentIndex = getCurrentIndex(currentImg);
        /*Img Transition*/
        sliderDiv.classList.remove("img_down")
        sliderDiv.classList.add("img_up")
    })
})

slider.addEventListener("click",(e)=>{
    if(!e.target.classList.contains("to_right_i") && !e.target.classList.contains("to_left_i")){
        slider.classList.add("hide_slider_overlay");
        slider.classList.remove("show_slider_overlay");
        /*Img Transition*/
        sliderDiv.classList.remove("img_up")
        sliderDiv.classList.add("img_down")

    }
})

function getCurrentIndex(currentImg){
    const currentIndex = arrayOfSrs.indexOf(currentImg)
    return currentIndex
}

toRightIcon.addEventListener("click",(e)=>{
    let newIndex = ++currentIndex;
    if(newIndex > arrayOfSrs.length-1){
        currentIndex = 0;
        sliderImg.src=`imges/${arrayOfSrs[currentIndex]}`
    }else{
        sliderImg.src=`imges/${arrayOfSrs[newIndex]}`
    }
})

toLeftIcon.addEventListener("click",(e)=>{
    let newIndex = --currentIndex;
    if(newIndex < 0){
        currentIndex = arrayOfSrs.length-1;
        sliderImg.src=`imges/${arrayOfSrs[currentIndex]}`
    }else{
        sliderImg.src=`imges/${arrayOfSrs[newIndex]}`
    }
})

/*Year */
const yearEle = document.querySelector(".year")
const yearDate = new Date().getFullYear()
yearEle.innerHTML = yearDate 

/*to-top button*/
const toTopBtn = document.querySelector("button.to-top")

toTopBtn.addEventListener("click",(e)=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
})

window.addEventListener('scroll',(e)=>{
    if(window.scrollY >= 1000){
        toTopBtn.classList.remove("hide-btn");
        toTopBtn.classList.add("show-btn");
    }else{
        toTopBtn.classList.add("hide-btn");
        toTopBtn.classList.remove("show-btn");
    }
})

/*********************Scroll Revealing Animation***************/

const sr = ScrollReveal({
    origin:"top",
    distance:'60px',
    duration: 2500,
    delay:400,
    reset:true
})

sr.reveal(".about-content-info",{origin:"left"})
sr.reveal("footer .logo-link , .social p , .footer p")
sr.reveal(".about-content img",{origin:"right"})
sr.reveal(".cards-container .card , .portfolio-card , .social a",{interval:"100"})