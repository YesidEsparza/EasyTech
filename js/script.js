document.addEventListener("DOMContentLoaded", function () {

    const botonesProducto = document.querySelectorAll(".ver-mas");

    botonesProducto.forEach(function (boton) {
        boton.addEventListener("click", function () {

            const tarjeta = boton.closest(".producto");
            const nombre = tarjeta.querySelector("h3").textContent;
            const precio = tarjeta.querySelector("strong").textContent;

            let detalle = tarjeta.querySelector(".detalle-producto");

            if (!detalle) {
                detalle = document.createElement("p");
                detalle.className = "detalle-producto";
                tarjeta.querySelector(".tarjeta-contenido").appendChild(detalle);
            }

            if (detalle.textContent === "") {
                detalle.textContent = "Producto: " + nombre + " | Precio: " + precio;
                boton.textContent = "Ocultar información";
            } else {
                detalle.textContent = "";
                boton.textContent = "Ver más";
            }
        });
    });

    const campoBusqueda = document.getElementById("busqueda");
    const filtroCategoria = document.getElementById("categoria");
    const productos = document.querySelectorAll(".producto");

    if (campoBusqueda && filtroCategoria) {

        const contenedorProductos = document.querySelector(".productos");

        let mensajeResultados = document.getElementById("mensajeResultados");

        if (!mensajeResultados) {
            mensajeResultados = document.createElement("p");
            mensajeResultados.id = "mensajeResultados";
            mensajeResultados.setAttribute("role", "status");
            mensajeResultados.setAttribute("aria-live", "polite");

            contenedorProductos.parentElement.insertBefore(
                mensajeResultados,
                contenedorProductos
            );
        }

        function filtrarProductos() {

            const texto = campoBusqueda.value.trim().toLowerCase();
            const categoriaSeleccionada = filtroCategoria.value;

            let cantidadVisible = 0;

            productos.forEach(function (producto) {

                const nombreProducto =
                    producto.querySelector("h3").textContent.toLowerCase();

                const categoriaProducto = producto.dataset.categoria;

                const coincideTexto = nombreProducto.includes(texto);

                const coincideCategoria =
                    categoriaSeleccionada === "todos" ||
                    categoriaProducto === categoriaSeleccionada;

                const mostrarProducto = coincideTexto && coincideCategoria;

                producto.hidden = !mostrarProducto;

                if (mostrarProducto) {
                    cantidadVisible++;
                }
            });

            if (cantidadVisible === 0) {
                mensajeResultados.textContent =
                    "No se encontraron productos con esos criterios.";
            } else {
                mensajeResultados.textContent =
                    "Productos encontrados: " + cantidadVisible;
            }
        }

        campoBusqueda.addEventListener("input", filtrarProductos);
        filtroCategoria.addEventListener("change", filtrarProductos);
    }

    const formulario = document.getElementById("formularioContacto");

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            const nombre = document.getElementById("nombre").value.trim();

            let confirmacion = document.getElementById("confirmacionFormulario");

            if (!confirmacion) {
                confirmacion = document.createElement("p");
                confirmacion.id = "confirmacionFormulario";
                confirmacion.setAttribute("role", "status");
                confirmacion.setAttribute("aria-live", "polite");

                formulario.appendChild(confirmacion);
            }

            confirmacion.textContent =
                "Gracias, " + nombre +
                ". Tus datos fueron validados correctamente.";

            formulario.reset();
        });
    }

});