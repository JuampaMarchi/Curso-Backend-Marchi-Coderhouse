API REST de E-Commerce con base de datos no relacional.

Tecnologias usadas:
-NodeJS
-Express
-Socket.IO
-MongoDB
-Mongoose
-Nodemailer
-MomentJS
-Pino
-Json Web Token
-Cord
-Bcrypt
-Cookie-Parser

Rutas en raiz:

Raiz - GET:
"/" => Si el usuario no esta logueado redirigira a "/auth", de lo contrario lo redirigira a "/products".
"/error" => se redirige a esta pantalla cuando haya problemas de funcionamiento
"/error-auth" => se redirige a esta pantalla cuando haya problemas de autenticacion

Componentes:
AUTH - Ruta: "/auth":

GET: "/" => Ruta para log in, con autenticacion por Json Web Token. Tiene enlace para ir al registro. De estar logueado el usuario lo redirige a "/products"
POST: "/" => Metodo encargado de procesar el log in de usuario. Almacena datos de usuario en payload para su uso donde sea requerido. El token queda almacenado en browser en una Cookie.
GET: "/logout" => Pagina de despedida. Destruye la cookie donde se almacenaba el token
POST: "/verifytoken" => Verifica validez de token almacenado en Cookie. Retorna payload.

USER - Ruta: "/user":

GET: "/" => Devuelve datos de usuario logueado. Requiere log in.
GET: "/all" => Devuelve listado de todos los usuarios. Requiere rol de admin.
GET: "/register" => Ruta para registro de usuario.
GET: "/orders" => Devuelve todas las ordenes en la base de datos. Requiere rol de admin.
GET: "/orders/:id" => Devuelve la orden especificada por id. Requiere rol de admin.
GET: "/user-orders" => Devuelve vista con ordenes de usuario logueado.
POST: "/create" => Metodo para el registro de usuario. Envia correo de confirmacion a usuario y admin.
PUT: "/:id" => Ruta para actualizar usuarios con su id. Requiere rol de admin.
DELETE: "/:id" => Ruta para borrar usuarios con su id. Requiere rol de admin.

PRODUCTS - Ruta: "/products":

GET: "/" => Devuelve vista principal, con listado de productos. Requiere estar logueado.
GET: "/:id" => Devuelve vista vista de producto soliticado por id. Requiere estar logueado.
GET: "/list" => Devuelve todos los productos en formato JSON. Requiere rol de admin.
GET: "/get/:id" => Devuelve producto solicitado por id en formato JSON. Requiere rol de admin.
POST: "/add" => Agrega producto a la base de datos. Requiere rol de admin.
PUT: "/:id" => Actualiza producto solicitado por id. Requiere rol de admin.
DELETE: "/:id" => Borra producto solicitado por id. Requiere rol de admin.

CART - Ruta: "/cart":

GET: "/" => Devuelve vista de productos en carrito. Requiere estar logueado.
GET: "/all" => Retorna todos los carritos en formato JSON. Requiere rol de admin.
POST: "/add" => Agrega producto al carrito. Requiere estar logueado.
POST: "/purchase" => Cierra carrito y genera orden con productos. Envia correo a usuario y administrador
POST: "update" => Permite al usuario actualizar las cantidades de los productos incluidos en el carrito.
PUT: "/:id" => Actualiza carrito solicitado por id. Requiere rol de admin.
DELETE: "/:id" => Borra carrito solicitado por id. Requiere rol de admin.

CHAT - Ruta: "/chat":

GET: "/" => Devuelve vista de chat, con boton para ingresar en la sala. Creado con websockets.
GET: "/list" => Retorna todas las sesiones de chat. Requiere rol de admin.
PUT: "/:id" => Actualiza sesion de chat solicitada por id. Requiere rol de admin.
DELETE: "/:id" => Borra sesion de chat solicitada por id. Requiere rol de admin.
