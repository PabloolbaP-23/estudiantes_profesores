const formulario = document.querySelector("#formulario");
const cardEstudiantes = document.querySelector("#cardEstudiantes");
const cardProfesores = document.querySelector("#cardProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesor = document.querySelector("#templateProfesor").content;
const alert = document.querySelector(".alert");
const estudiantes = [];
const profesores = [];

document.addEventListener('click', e => {
    if (e.target.dataset.uid) {
        if (e.target.matches(".btn-success")) {
            estudiantes.map(item => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = true;
                }
                return item;
            });
        }
    }
    if (e.target.dataset.uid) {
        if (e.target.matches(".btn-danger")) {
            estudiantes.map(item => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = false;
                }
                return item;
            });
        }
    }
    Persona.pintarPersonaUI(estudiantes, "Estudiante");
});
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.uid = `${Date.now()}`;
    }
    static pintarPersonaUI(personas, tipo) {
        if (tipo === "Estudiante") {
            cardEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });        
            cardEstudiantes.appendChild(fragment);
        } else {
            cardProfesores.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoProfesor());
            }); 
            cardProfesores.appendChild(fragment);
        }
    }
}
class Estudiante extends Persona{
    #estado = false;
    #estudiante = "Estudiante";
    set setEstado(estado) {
        this.#estado = estado;
    }
    get getEstudiante() {
        return this.#estudiante;  
    }

    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector('h5 .text-primary').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.getEstudiante;
        clone.querySelector(".lead").textContent = this.edad;
        if (this.#estado) {
            clone.querySelector('.badge').className = "badge bg-success";
            clone.querySelector(".btn-success").disabled = true;
            clone.querySelector(".btn-danger").disabled = false;
        } else {
            clone.querySelector('.badge').className = "badge bg-danger";     
            clone.querySelector(".btn-danger").disabled = true;
            clone.querySelector(".btn-success").disabled = false;
        }
        clone.querySelector(".badge").textContent = this.#estado ? "Aprobado" : "Reprobado";
        clone.querySelector('.btn-success').dataset.uid = this.uid;
        clone.querySelector('.btn-danger').dataset.uid = this.uid;
        return clone;       
    }
}
class Profesor extends Persona{
    #profesor = "Profesor"
    agregarNuevoProfesor() {
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector('.lead').textContent = this.edad;
        return clone;
    }
}

formulario.addEventListener('submit', e =>{
    e.preventDefault();
    alert.classList.add("d-none");
    const datos = new FormData(formulario); // Par clave valor de los inputs
    const [nombre, edad, opcion] = [...datos.values()];
    if (!nombre.trim() || !edad.trim() || !opcion.trim()) {
        console.log("Algún dato en blanco");
        alert.classList.remove("d-none");
        return
    }
    if (opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante); 
        Persona.pintarPersonaUI(estudiantes, opcion);
    } else { // Profesor
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores, opcion);
    }
    
});