class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }
    getFullName = () => `El nombre del usuario es ${this.nombre} ${this.apellido}`;
    addMascota = nombreMascota => this.mascotas.push(nombreMascota)
    countMascotas = () => this.mascotas.length
    addBook = (titulo, autor) => {
        this.libros.push({nombre: titulo, autor: autor})
    }
    getBookNames = () => this.libros.map(e => e.nombre)
}

let juan = new Usuario("Juan", "Pablo", [{nombre: "Rio Sagrado", autor: "Wilbur Smith"}], ["perro"])
console.log(juan)
console.log(juan.getFullName())
juan.addMascota("gato")
console.log(juan.mascotas)
console.log(`Hay ${juan.countMascotas()} mascotas`)
juan.addBook("El Pistolero", "Stephen King")
console.log(juan.libros)
console.log(juan.getBookNames())
