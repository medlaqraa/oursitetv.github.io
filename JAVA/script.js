// JAVASCRIPT CODE FOR TOGGLE MENU
var navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right  = "0";
}
function hideMenu(){
    navLinks.style.right  = "-200px";
}


const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragstart =   false,isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const autoSlide = () => {

    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDiffrence =  firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return console.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;
    }
    console.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;
}

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60) ;
    })
});
const dragstart = (e) => {
    isDragstart =   true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragstart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    let isDragstart =   false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("touchstart", dragstart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("mouseend", dragStop);