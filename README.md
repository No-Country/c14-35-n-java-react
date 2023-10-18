

<div style="text-align: left;">
  <h1>c14-35-n-Java-React</h1>
  <h3>Learning simplified</h3>
  <img src="./project-data/assets/favicon.jpeg" alt="Logo" width="122vw">
</div>

<br />

**GitHub url:** [c14-35-n-java-react](https://github.com/No-Country/c14-35-n-java-react)

**Edtech** (tecnología educativa): Plataforma de entrenamiento en línea "Learning Simplified".


## Proyecto en desarrollo

Se lleva a cabo la construcción del backend y el frontend aparte y se conectarán mediante **RESTful API** _(proyecto abierto a cambios)_.

### Back-End Stack

Server: RESTful API.

 * MySql
 * Spring Boot 3
 * Java 17
 * Maven 3

### Front-End Stack

Client: Responsive Webpage.

 * React
 * NextJs (App router)
 * Typescript
 * Tailwind CSS
 * [**Daisy UI**](https://github.com/saadeghi/daisyui)

---

<br />

### Equipo

[desarrollo]

<div align="center">
  <a href="https://github.com/No-Country" target="_blank"><img src="./project-data/assets/user.svg" alt="No Country" width="80vw"></a>
  <a href="https://github.com/Seujumon" target="_blank"><img src="https://avatars.githubusercontent.com/u/126124556?v=4" alt="Juan" width="80vw"></a>
  <a href="https://github.com/LauraZeier" target="_blank"><img src="https://avatars.githubusercontent.com/u/118227686?v=4" alt="Laura Zeier" width="80vw"></a>
  <a href="https://github.com/martinArg96" target="_blank"><img src="https://avatars.githubusercontent.com/u/86529590?v=4" alt="Martin" width="80vw"></a>
  
  <a href="https://github.com/1ronlag" target="_blank"><img src="https://avatars.githubusercontent.com/u/95989282?v=4" alt="Nicolas" width="80vw"></a>
  <a href="https://github.com/rcpc265" target="_blank"><img src="https://avatars.githubusercontent.com/u/78826890?v=4" alt="Rafael" width="80vw"></a>
  <a href="https://github.com/Andr7st" target="_blank"><img src="https://avatars.githubusercontent.com/u/63387323?v=4" alt="Andrés Segura" width="80vw"></a>
  <a href="https://github.com/Anavil4Scrum" target="_blank"><img src="https://avatars.githubusercontent.com/u/145689629?v=4" alt="Ana Avila" width="80vw"></a>
</div>

[comment]: <> ( Tubo euna participación en el proyecto, pero se retiró. )
[comment]: <> ( <a href="https://github.com/DiegoAlexanderSanmartinY" target="_blank"><img src="https://avatars.githubusercontent.com/u/114791208?v=4" alt="Diego" width="80vw"></a> )
[comment]: <> (  <a href="https://github.com/XanderWander" target="_blank"><img src="https://avatars.githubusercontent.com/u/146034178?v=4" alt="Elio Castillo" width="80vw"></a> )

 
### Contrib

# CONTRIBUTING.md

Debido a que el equipo de desarrollo de la webapp debe tener un sólo repositorio que contenga el tanto el 
front-end como el back-end, acordamos que para hacer el desarrollo más eficiente debe 
haber una rama que se enfoque únicamente al backend y otra al frontend 
_(el servidor y el cliente se crean en simultáneo)._

#### ramas principales

<div style="text-align: right;">
  <img src="./project-data/documents/S1.jpg" alt="Logo" width="800vw">
</div>

En el modo de desarrollo este repositorio consta de tres ramas principales, en donde se organiza el flujo de trabajo.

 * Una rama central `main` que contenga todo tanto el back-end _(./server)_ y el front-end _(./client)_.
 * Una rama que maneje exclusivamente el backend `backend-main`, donde se encuentra el proyecto **Spring Boot - Java - Maven**.
 * Una rama que maneja exclusivamente el frontend `frontend-main`, donde se encuentra el proyecto **React - NextJs - Typescript**.

Las ramas `backend-main` y `frontend-main` a su vez tienen sus ramas de pruebas de desarrollo `[branch]-dev`. 
na vez se haya alcanzado una version en la cual tanto el backend y el frontend se puedan comunicar mediante **RESTful API** 

Para las otras ramas son temporales donde se puede hacer push a las ramas de desarrollo de backend y frontend.


Aclarado lo anterior para participar en el proyecto solo son permitidas las aportaciones del equipo establecido.

### Clonar (ssh)

Ejemplo de clonar la rama específica:

 * backend: `git clone -b backend-dev git@github.com:No-Country/c14-35-n-java-react.git`.

 * frontend `git clone -b frontend-dev git@github.com:No-Country/c14-35-n-java-react.git`.
 



---
