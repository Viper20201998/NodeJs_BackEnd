# NodeJs_BackEnd
Aprendizaje en código facilito

git clone https://github.com/Viper20201998/NodeJs_BackEnd
Heroku
heroku git:clone -a nombre_de_tu_app
./config/config.js configurar la base de datos
git add .
git commit -am "configuracion de la base de datos"
git push heroku master
heroku run sequelize db:migrate --env production
Listo esta tu entorno de produccion

Rutas
/signup que es para registarse
/sessions para iniciar sesion

/categories para ver las categorias
/categories/new para agregar nueva categoria
/categories/id para ver la categoria en especifico id=1 con id 1
/categories/id/edit para editar dicha categoria buscando por id

/tasks para ver todas la tareas
/tasks/new para crear nuevas tareas
/tasks/id para buscar una tarea en especifico por su id
/tasks/id/edit para editar dicha tarea
