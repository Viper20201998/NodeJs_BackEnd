# NodeJs_BackEnd
Aprendizaje en código facilito

git clone https://github.com/Viper20201998/NodeJs_BackEnd <br>
Heroku<br>
heroku git:clone -a nombre_de_tu_app<br>
./config/config.js configurar la base de datos<br>
git add .<br>
git commit -am "configuracion de la base de datos"<br>
git push heroku master<br>
heroku run sequelize db:migrate --env production<br>
Listo esta tu entorno de produccion<br>
<br>
Rutas<br>
/signup que es para registarse<br>
/sessions para iniciar sesion<br>
<br>
/categories para ver las categorias<br>
/categories/new para agregar nueva categoria<br>
/categories/id para ver la categoria en especifico id=1 con id 1<br>
/categories/id/edit para editar dicha categoria buscando por id<br>
<br>
/tasks para ver todas la tareas<br>
/tasks/new para crear nuevas tareas<br>
/tasks/id para buscar una tarea en especifico por su id<br>
/tasks/id/edit para editar dicha tarea<br>
<br>
Entorno Local<br>
npm init<br>
configuracion de la base de datos con sqlite.
