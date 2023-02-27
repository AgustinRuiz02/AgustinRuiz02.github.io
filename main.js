let body = document.querySelector("body");


function darkmode(color){
    document.body.classList.toggle("dark")

    document.querySelector(".leftarea").classList.toggle("darkcontent")

    document.querySelector(".rightarea").classList.toggle("darkcontent")
}
