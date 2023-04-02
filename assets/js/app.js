/*Variables */


const formulario = document.getElementById("formulario");
const inputFormulario = document.getElementById("inputFormulario")
const container__flags = document.querySelector(".flags")
const title = document.querySelector(".title");


title.addEventListener("click", () => location.reload())

document.addEventListener("DOMContentLoaded", () =>{
 
    if(JSON.parse(localStorage.getItem("theme")) == null){
        localStorage.setItem("theme",JSON.stringify("light"))
    }else{
        JSON.parse(localStorage.getItem("theme"))
    }
    modeDefault()
    fetchData();
})


const fetchData = async () =>{
   try {
    const url = "https://restcountries.com/v3.1/all";
    const res = await fetch(url);
    const data = await res.json();
    flags(data)
    alertaSucess()
    formularioBusqueda(data)
    filtradoRegion(data)
   } catch (error) {
    alertaFailed(error)
   }
} 

const flags =  data =>{
    let html = "";
    if(data.length <= 0){
        html = 
        `<div class="no-result">
            <h2>No results available</h2>
        </div>`
    }else{
        data.forEach(pais => {
            const {name,flags,population,region,capital} = pais
            html += 
            `  <article class="card">
            <img src="${flags.svg}" alt="flag-${name.common}" class="img-fluid">
            <div class="card-content">
              <h2>${name.common}</h2>
              <p class="population">
                <span>Population:</span>
                ${population}
              </p>
              <p class="region">
                <span>Region:</span>
                ${region}
              </p>
              <p class="capital">
                <span>Capital:</span>
                ${capital}
              </p>
              <div class="center">
              <a class="btn-more" href="details.html?name=${name.common}">More info <i class="fa-solid fa-angles-right"></i> </a>
              </div>
            </div>
          </article>`
        });
    }
 
    container__flags.innerHTML = html

}

const alertaSucess = () =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha cargado la lista de paises correctamente!'
      })

}
const alertaFailed = (error) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: `¡Hubo un error inesperado! : ${error}`
      })
}