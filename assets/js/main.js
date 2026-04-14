/*=============== MENU SHOW/HIDE ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== STICKY HEADER ===============*/
window.addEventListener('scroll', () => {
    const header = document.getElementById('header')
    if(window.scrollY >= 50){
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
})

/*=============== DARK MODE ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'

const selectedTheme = localStorage.getItem('selected-theme')

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    localStorage.setItem('selected-theme', 
        document.body.classList.contains(darkTheme) ? 'dark' : 'light')
})

/*=============== CART OPEN/CLOSE ===============*/
const cart = document.getElementById("cart")
const cartShop = document.getElementById("cart-shop")
const cartClose = document.getElementById("cart-close")

if(cartShop){
    cartShop.addEventListener("click", () => cart.classList.add("show-cart"))
}
if(cartClose){
    cartClose.addEventListener("click", () => cart.classList.remove("show-cart"))
}

/*=============== ADD TO CART → REDIRECT (FINAL FIX) ===============*/
document.querySelectorAll(".button, .products__button").forEach(btn => {
    btn.addEventListener("click", (e) => {

        e.preventDefault(); // 🔥 IMPORTANT

        let card = e.target.closest(".featured__card, .products__card, .new__card, .home")

        if(!card){
            alert("Product not found ❌")
            return
        }

        // ✅ GET CORRECT DATA
        let name = card.querySelector(".featured__title, .products__title, .new__title, .home__title")?.innerText || "Watch"
        let price = card.querySelector(".featured__price, .products__price, .new__price, .home__price")?.innerText || "$1000"
        let img = card.querySelector("img")?.src

        // ✅ STORE DATA
        const product = {
            name: name,
            price: price,
            img: img
        }

        localStorage.setItem("cartProduct", JSON.stringify(product))

        // 🔁 REDIRECT TO CHECKOUT PAGE
        window.location.href = "checkout.html"
    })
})

/*=============== SCROLL ANIMATION ===============*/
const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const top = window.scrollY
        const offset = sec.offsetTop - 200

        if(top > offset){
            sec.classList.add("show-section")
        }
    })
})

/*=============== SEARCH FILTER ===============*/
const searchInput = document.createElement("input")
searchInput.placeholder = "Search products..."
searchInput.className = "search-box"

const productSection = document.querySelector(".products.section")
if(productSection){
    productSection.prepend(searchInput)

    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase()
        document.querySelectorAll(".products__card").forEach(card => {
            const name = card.innerText.toLowerCase()
            card.style.display = name.includes(value) ? "block" : "none"
        })
    })
}
