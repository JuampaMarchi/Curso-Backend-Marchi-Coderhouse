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

"/register" => Ruta para registro de usuario, envia correo de confirmacion.