# Burger Queen (API Client)

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Requerimientos del cliente](#2-requerimientos-del-cliente)
* [3. Organización](#3-organización)
* [4. Diseño de la interfaz de usuario](#4-diseño-de-la-interfaz-de-usuario)
* [5. Historias de usuario](#5-historias-de-usuario)
* [6. Despliegue](#6-despliegue)
* [7. Uso](#7-uso)
* [8. Consideraciones](#8-consideraciones)
* [9. Objetivos de aprendizaje](#9-objetivos-de-aprendizaje)

***

## 1. Resumen del proyecto

Burger Queen API Client es una aplicación desarrollada con React, que cuenta con una interfaz para un restaurante de hamburgesas, a través de la cual los usuarios pueden tomar pedidos (mesero), enviarlos al área de preparación (chef) y hacer el manejo de usuarios y productos (administrador), todo esto conectado a una API.

![logo-burger-queen](https://github.com/KarlaMacedo/Burger-queen-api-client/blob/main/src/assets/Images/logo.png?raw=true)

## 2. Requerimientos del cliente

Un pequeño restaurante de hamburguesas, que está creciendo, necesita un
sistema a través del cual puedan tomar pedidos usando una _tablet_, y enviarlos
a la cocina para que se preparen ordenada y eficientemente.

![burger-queen](https://user-images.githubusercontent.com/110297/42118136-996b4a52-7bc6-11e8-8a03-ada078754715.jpg)

Este proyecto tiene dos áreas: interfaz (cliente) y API (servidor). Nuestra
clienta nos ha solicitado desarrollar la interfaz que se integre con una API.

Esta es la información proporcionada por la clienta:

> Somos **Burguer Queen**, una cadena de comida 24hrs.
>
> Nuestra propuesta de servicio 24hrs ha tenido muy buena acogida y, para
> seguir creciendo, necesitamos un sistema que nos ayude a tomar los pedidos de
> nuestros clientes.
>
> Tenemos 2 menús: 
>
>   - Uno muy sencillo para el desayuno:
>
> | Ítem                      |Precio $|
> |---------------------------|------|
> | Café americano            |    5 |
> | Café con leche            |    7 |
> | Sandwich de jamón y queso |   10 |
> | Jugo de frutas natural    |    7 |
>
>  - Y otro menú para el resto del día:
>
> | Ítem                      |Precio|
> |---------------------------|------|
> |**Hamburguesas**           |   **$**   |
> |Hamburguesa simple         |    10|
> |Hamburguesa doble          |    15|
> |**Acompañamientos**        |   **$**   |
> |Papas fritas               |     5|
> |Aros de cebolla            |     5|
> |**Para tomar**             |   **$**   |
> |Agua 500ml                 |     5|
> |Agua 750ml                 |     7|
> |Bebida/gaseosa 500ml       |     7|
> |Bebida/gaseosa 750ml       |     10|
>
> Nuestros clientes son bastante indecisos, por lo que es muy común que cambien
> el pedido varias veces antes de finalizarlo.

La interfaz debe mostrar los dos menús (desayuno y resto del día), cada uno
con todos sus _productos_. El usuario debe poder ir eligiendo qué _productos_
agregar y la interfaz debe ir mostrando el _resumen del pedido_ con el
costo total.

![out](https://user-images.githubusercontent.com/110297/45984241-b8b51c00-c025-11e8-8fa4-a390016bee9d.gif)

Además la clienta nos ha dado un [link a la documentación](https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0)
que especifica el comportamiento esperado de la API HTTP a consumir.
Ahí se encuentran todos los detalles de los _endpoints_, como por ejemplo
qué parámetros esperan, qué deben responder, etc.

## 3. Organización

Como herramienta de organización utilizamos [Trello](https://trello.com/b/B4DmOSE5/proyecto-5-burger-queen),
en donde hicimos toda la planeación de trabajo de 
cada sprint que duró este proyecto (4): 

![Trello](https://github.com/KarlaMacedo/Burger-queen-api-client/blob/main/src/assets/Images/trello.png?raw=true)

## 4. Diseño de la interfaz de usuario

El prototipo fue elaborado en [Figma](https://www.figma.com/proto/chmlKFe3zPN5ePyxAjphrz/Burger?type=design&node-id=11-1062&t=8T7WlFU9GgIWXEpS-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=11%3A1062&show-proto-sidebar=1&mode=design).

![Prototipo baja fidelidad](https://github.com/KarlaMacedo/Burger-queen-api-client/blob/main/src/assets/Images/prototipo.png?raw=true)

## 5. Historias de Usuario

### Historia de usuario 1: Mesero/a debe poder ingresar al sistema, si el admin ya le ha asignado credenciales

Yo como mesero quiero poder ingresar al sistema de pedidos.

#### Criterios de aceptación

* Acceder a una pantalla de login.
* Ingresar email y contraseña.
* Recibir mensajes de error comprensibles, dependiendo de cuál es el error
  con la información ingresada.
* Ingresar al sistema de pedidos si las crendenciales son correctas.
***

### Historia de usuario 2: Mesero/a debe poder tomar pedido de cliente/a

Yo como mesero quiero tomar el pedido de un cliente para no depender de mi mala
memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y
que se puedan ir preparando en orden.

#### Criterios de aceptación

* Anotar nombre de cliente.
* Agregar productos al pedido.
* Eliminar productos.
* Ver resumen y el total de la compra.
* Enviar pedido a cocina (guardar en alguna base de datos).
* Se ve y funciona bien en una _tablet_
***

### Historia de usuario 3: Jefe de cocina debe ver los pedidos

Yo como jefe de cocina quiero ver los pedidos de los clientes en orden y
marcar cuáles están listos para saber qué se debe cocinar y avisar a los meseros
que un pedido está listo para servirlo a un cliente.

#### Criterios de aceptación

* Ver los pedidos ordenados según se van haciendo.
* Marcar los pedidos que se han preparado y están listos para servirse.
* Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se
  marcó como completado.
***

### Historia de usuario 4: Mesero debe ver pedidos listos para servir

Yo como mesero quiero ver los pedidos que están preparados para entregarlos
rápidamente a los clientes que las hicieron.

#### Criterios de aceptación

* Ver listado de pedido listos para servir.
* Marcar pedidos que han sido entregados.
* Los datos se deben mantener íntegros, incluso después de que un pedido ha
  terminado. Todo esto para poder tener estadísticas en el futuro.
***

### Historia de usuario 5: Administrador(a) de tienda debe administrar a sus trabajadores

Yo como administrador(a) de tienda quiero gestionar a los usuarios de
la plataforma para mantener actualizado la informacion de mis trabajadores.

#### Criterios de aceptación

* Ver listado de trabajadores.
* Agregar trabajadores.
* Eliminar trabajadores.
* Actualizar datos de trabajadores.
***

### Historia de usuario 6: Administrador(a) de tienda debe administrar a sus productos

Yo como administrador(a) de tienda quiero gestionar los productos
para mantener actualizado el menú.

#### Criterios de aceptación

* Ver listado de productos.
* Agregar productos.
* Eliminar productos.
* Actualizar datos de productos.
***

## 6. Despliegue

Se realizó el despliegue con [Vercel](https://vercel.com/).

### App:

https://dev-007-burger-queen-api-client.vercel.app/

### API:

https://localhost:8080/

## 7. Uso

Para poder ingresar a la aplicación se puede utilizar los siguients usuarios:

![Trello](https://github.com/KarlaMacedo/Burger-queen-api-client/blob/main/src/assets/Images/usuarios.png?raw=true)

## 8. Consideraciones

Este proyecto se hizo en dupla y fue una propuesta para que trabajar con el backend consumiendo esta
[API](https://github.com/Laboratoria/burger-queen-api-mock).

El tiempo estimado para completar el proyecto fue de 3 a 5 Sprints y se realizó en 4 Sprints.

La lógica del proyecto debía estar implementada completamente en JavaScript
(ES6+), HTML y CSS y empaquetada de manera automatizada.

La aplicación debía ser un _Single Page App_. Los pedidos debían tomarse desde una
_tablet_, pero **no se requirió una app nativa**, sino una web app que sea
**mobile-first**.

La aplicación desplegada tiene 92-100% de
Performance, Progressive Web App, Accessibility y Best Practices de [_Lighthouse_](https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/main/LighthouseReport.pdf).

La aplicación hace uso de `npm-scripts` y cuenta con scripts `dev`,
`test`, `build` y `deploy`, que se encargan de arrancar, correr las pruebas,
empaquetar y desplegar la aplicación respectivamente.

Por otro lado, la estructura de carpetas y archivos es:

```text
.
├── 
├── README.md
├── package.json
├── index.html
├── src
|  ├── main.jsx
|  ├── App.jsx
|  ├── App.css
|  ├── index.css
|  ├── components
|  |   ├──button
|  |   |  ├──button.css
|  |   |  └──button.jsx
|  |   ├──chefButton
|  |   |  ├──chefButton.css
|  |   |  └──chefButton.jsx
|  |   ├──input
|  |   |  ├──input.css
|  |   |  └──input.jsx
|  |   ├──logoutButton
|  |   |  ├──logoutButton.css
|  |   |  └──logoutButton.jsx
|  |   ├──modal
|  |   |  ├──modal.css
|  |   |  └──modal.jsx
|  |   ├──pages
|  |   |  ├──Error
|  |   |  |  ├──error-page.css
|  |   |  |  └──error-page.jsx
|  |   |  ├──Home
|  |   |  |  ├──home.css
|  |   |  |  └──home.jsx
|  |   |  ├──Kitchen
|  |   |  |  ├──kitchen.css
|  |   |  |  ├──kitchen.jsx
|  |   |  |  ├──kitchen.spec.js
|  |   |  |  └──renderKitchen.spec.js
|  |   |  ├──Login
|  |   |  |  ├──login.css
|  |   |  |  ├──login.jsx
|  |   |  |  └──login.spec.js
|  |   |  ├──Menu
|  |   |  |  ├──menu.css
|  |   |  |  ├──menu.jsx
|  |   |  |  ├──menu.spec.js
|  |   |  |  └──renderMenu.spec.js
|  |   |  ├──Orders
|  |   |  |  ├──orders.css
|  |   |  |  ├──orders.jsx
|  |   |  |  └──orders.spec.js
|  |   |  ├──Products
|  |   |  |  ├──products.css
|  |   |  |  ├──products.jsx
|  |   |  |  ├──products.spec.js
|  |   |  |  └──renderProducts.spec.js
|  |   |  └──Users
|  |   |  |  ├──renderUsers.spec.js
|  |   |  |  ├──users.css
|  |   |  |  ├──users.jsx
|  |   |  |  └──users.spec.js
|  |   ├──stopwatch
|  |   |  ├──stopwatch.css
|  |   |  └──stopwatch.jsx
|  |   └──waiterButton
|  |   |  ├──waiterButton.css
|  |   |  └──waiterButton.jsx
|  ├── services
|  |   ├── apiRequest.jsx
|  |   └── apiRequest.spec.js
|  ├── utils
|  |   ├── kitchen.jsx
|  |   ├── login.jsx
|  |   ├── menu.jsx
|  |   ├── orders.jsx
|  |   ├── products.jsx
|  |   └── users.jsx
|  └── assets
|     └── Images
|        ├──add.png
|        ├──admin.png
|        ├──agua.png
|        ├──borrar.png
|        ├──cafe.png
|        ├──cafeLeche.png
|        ├──ceboll.png
|        ├──chef.png
|        ├──close.png
|        ├──cocin.png
|        ├──dobl.png
|        ├──editar.png
|        ├──fondo.png
|        ├──hamb.gif
|        ├──hide.png
|        ├──jug.png
|        ├──listo.png
|        ├──logo.png
|        ├──logo2.png
|        ├──meser.png
|        ├──out.png
|        ├──pago.png
|        ├──paps.png
|        ├──refr.png
|        ├──remove.png
|        ├──sandw.png
|        ├──sencill.png
|        ├──show.png
|        └──waiter.png
├── mock-assets.js
├── mock-css.js
├── package-lock.json
├── babel.config.cjs
├── vite.config.js
├── .eslintrc.cjs
├── .gitignore
├── LighthouseReport.pdf
└──thumb.png

```

## 9. Objetivos de aprendizaje

 ### 9.1 Objetivo general de apredizaje

 El objetivo principal es aprender a construir una _interfaz web_ usando React. Tratando de solucionar el problema: **cómo mantener la interfaz
 y el estado sincronizados**. Así que en este proyecto nos familiarizamos con  el concepto de _estado de pantalla_, y cómo cada cambio sobre el estado se va reflejando en la interfaz (por ejemplo, cada vez que agregamos un _producto_
 a un _pedido_, la interfaz actualiza la lista del pedido y el total).

### 9.2 Objetivo particulares de apredizaje

#### HTML

- [✓] **Uso de HTML semántico**

  <details><summary>Links</summary><p>

  * [HTML semántico](https://curriculum.laboratoria.la/es/topics/html/02-html5/02-semantic-html)
  * [Semantics - MDN Web Docs Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
</p></details>

#### CSS

- [✓] **Uso de selectores de CSS**

  <details><summary>Links</summary><p>

  * [Intro a CSS](https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css)
  * [CSS Selectors - MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors)
</p></details>

- [✓] **Modelo de caja (box model): borde, margen, padding**

  <details><summary>Links</summary><p>

  * [Box Model & Display](https://curriculum.laboratoria.la/es/topics/css/01-css/02-boxmodel-and-display)
  * [The box model - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
  * [Introduction to the CSS box model - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
  * [CSS display - MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/display)
  * [display - CSS Tricks](https://css-tricks.com/almanac/properties/d/display/)
</p></details>

- [✓] **Uso de flexbox en CSS**

  <details><summary>Links</summary><p>

  * [A Complete Guide to Flexbox - CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
  * [Flexbox Froggy](https://flexboxfroggy.com/#es)
  * [Flexbox - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
</p></details>

- [✓] **Uso de CSS Grid Layout**

  <details><summary>Links</summary><p>

  * [A Complete Guide to Grid - CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
  * [Grids - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
</p></details>

- [ ] **Uso de media queries**

  <details><summary>Links</summary><p>

  * [CSS media queries - MDN](https://developer.mozilla.org/es/docs/CSS/Media_queries)
</p></details>

#### JavaScript

- [✓] **Pruebas unitarias (unit tests)**

  <details><summary>Links</summary><p>

  * [Empezando con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/getting-started)
</p></details>

- [✓] **Pruebas asíncronas**

  <details><summary>Links</summary><p>

  * [Tests de código asincrónico con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/asynchronous)
</p></details>

- [✓] **Uso de mocks y espías**

  <details><summary>Links</summary><p>

  * [Manual Mocks con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/manual-mocks)
</p></details>

- [✓] **Módulos de ECMAScript (ES Modules)**

  <details><summary>Links</summary><p>

  * [import - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import)
  * [export - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export)
</p></details>

- [✓] **Uso de linter (ESLINT)**

- [✓] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

#### Control de Versiones (Git y GitHub)

- [✓] **Git: Instalación y configuración**

- [✓] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [✓] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [✓] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [ ] **GitHub: Despliegue con GitHub Pages**

  <details><summary>Links</summary><p>

  * [Sitio oficial de GitHub Pages](https://pages.github.com/)
</p></details>

- [✓] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [✓] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

#### HTTP

- [✓] **Consulta o petición (request) y respuesta (response).**

  <details><summary>Links</summary><p>

  * [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)
  * [Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
</p></details>

- [✓] **Cabeceras (headers)**

  <details><summary>Links</summary><p>

  * [HTTP headers - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Headers)
</p></details>

- [✓] **Cuerpo (body)**

  <details><summary>Links</summary><p>

  * [Cuerpo de Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages#cuerpo)
</p></details>

- [✓] **Verbos HTTP**

  <details><summary>Links</summary><p>

  * [Métodos de petición HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
</p></details>

- [✓] **Códigos de status de HTTP**

  <details><summary>Links</summary><p>

  * [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
  * [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
</p></details>

- [✓] **Encodings y JSON**

  <details><summary>Links</summary><p>

  * [Introducción a JSON - Documentación oficial](https://www.json.org/json-es.html)
</p></details>

- [ ] **CORS (Cross-Origin Resource Sharing)**

  <details><summary>Links</summary><p>

  * [Control de acceso HTTP (CORS) - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
</p></details>

#### React

- [✓] **JSX**

  <details><summary>Links</summary><p>

  * [Presentando JSX - Documentación oficial](https://es.react.dev/learn/writing-markup-with-jsx)
</p></details>

- [✓] **Componentes y propiedades (props)**

  <details><summary>Links</summary><p>

  * [Componentes y propiedades - Documentación oficial](https://es.react.dev/learn/passing-props-to-a-component)
</p></details>

- [✓] **Manejo de eventos**

  <details><summary>Links</summary><p>

  * [Manejando eventos - Documentación oficial](https://es.react.dev/learn/responding-to-events)
</p></details>

- [✓] **Listas y keys**

  <details><summary>Links</summary><p>

  * [Listas y keys - Documentación oficial](https://es.react.dev/learn/rendering-lists)
</p></details>

- [✓] **Renderizado condicional**

  <details><summary>Links</summary><p>

  * [Renderizado condicional - Documentación oficial](https://es.react.dev/learn/conditional-rendering)
</p></details>

- [✓] **Elevación de estado**

  <details><summary>Links</summary><p>

  * [Levantando el estado - Documentación oficial](https://es.react.dev/learn/sharing-state-between-components)
</p></details>

- [✓] **Hooks**

  <details><summary>Links</summary><p>

  * [Presentando Hooks - Documentación oficial](https://es.react.dev/reference/react)
</p></details>

- [✓] **CSS modules**

  <details><summary>Links</summary><p>

  * [Adding a CSS Modules Stylesheet - Documentación de Create React App (en inglés)](https://vitejs.dev/guide/features.html#css-modules)
</p></details>

- [✓] **React Router**

  <details><summary>Links</summary><p>

  * [Quick Start - Documentación oficial (en inglés)](https://reactrouter.com/en/main/start/tutorial)
</p></details>

#### Bases de datos

- [ ] **Modelado de datos**

#### Centrado en el usuario

- [✓] **Diseñar y desarrollar un producto o servicio poniendo a las usuarias en el centro**

#### Diseño de producto

- [✓] **Crear prototipos de alta fidelidad que incluyan interacciones**

- [✓] **Seguir los principios básicos de diseño visual**

### Investigación

- [✓] **Planear y ejecutar testeos de usabilidad de prototipos en distintos niveles de fidelidad**

  <details><summary>Links</summary><p>

  * [Intro a testeos usabilidad](https://coda.io/@bootcamp-laboratoria/contenido-ux/test-de-usabilidad-15)
  * [Pruebas con Usuarios 1 — ¿Qué, cuándo y para qué testeamos?](https://eugeniacasabona.medium.com/pruebas-con-usuarios-1-qu%C3%A9-cu%C3%A1ndo-y-para-qu%C3%A9-testeamos-7c3a89b4b5e7)
</p></details>
