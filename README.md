Aplicacion local de E-Commerce con base de datos no relacional en MongoDB

Rutas disponibles:

Raiz - GET:
"/" => Si el usuario ya esta logueado redirigira a "/main", de lo contrario lo llevará al log in.
"/log_out" => pantalla luego de desloguearse
"/register" => pantalla para realizar registro
"/main" => pagina principal, con saludo al usuario y listado de productos, donde se podran agregar al carrito.
"/error" => se redirige a esta pantalla cuando haya problemas de autenticacion

Raiz - POST
"/" => para loguearse
"/register" => para registrarse. Se notificara por mail al administrador.

Cart - GET
"/" => vista de los productos cargados al carrito, con boton para finalizar compra.

Cart - POST
"/addToCart" => para agregar producto al carrito notificando por mail al usuario.
"/purchase" => para finalizar la compra notificando por mensaje de texto y mail al usuario.
