document.addEventListener("DOMContentLoaded", function () {

    const botones = document.querySelectorAll(".ver-mas");

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tarjeta = boton.closest(".producto");
            const nombre = tarjeta.querySelector("h3").textContent;
            const precio = tarjeta.querySelector("strong").textContent;

            alert(
                "Producto: " + nombre +
                "\nPrecio: " + precio
            );

        });

    });


    const formulario = document.getElementById("formularioContacto");

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const asunto = document.getElementById("asunto").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();


            if (
                nombre === "" ||
                correo === "" ||
                asunto === "" ||
                mensaje === ""
            ) {

                alert("Por favor, completa todos los campos.");

                return;
            }


            alert(
                "Gracias, " +
                nombre +
                ". Tu mensaje fue enviado correctamente."
            );

            formulario.reset();

        });

    }


    const busqueda = document.getElementById("busqueda");
    const categoria = document.getElementById("categoria");

    if (busqueda && categoria) {

        const productos = document.querySelectorAll(".producto");


        function filtrarProductos() {

            const texto = busqueda.value.toLowerCase();
            const seleccion = categoria.value;


            productos.forEach(function (producto) {

                const nombre =
                    producto.querySelector("h3")
                    .textContent
                    .toLowerCase();

                const tipo =
                    producto.dataset.categoria;


                const coincideNombre =
                    nombre.includes(texto);

                const coincideCategoria =
                    seleccion === "todos" ||
                    tipo === seleccion;


                if (coincideNombre && coincideCategoria) {

                    producto.style.display = "";

                } else {

                    producto.style.display = "none";

                }

            });

        }


        busqueda.addEventListener(
            "input",
            filtrarProductos
        );


        categoria.addEventListener(
            "change",
            filtrarProductos
        );

    }

});