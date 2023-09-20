#### English:
# Quiz Warriors

## Game Description

Quiz Warriors is an exciting turn-based game that combines strategy and knowledge in an exhilarating clash of questions and answers. In this game, players customize their avatars and compete against each other in multiplayer battles, all while showcasing their ability to answer questions correctly.

### Key Features

- **Turn-Based Battles:** Players engage in thrilling battles where knowledge and strategy are key to victory.

- **Avatar Customization:** Create and personalize your own avatar with a wide range of options, from appearance to gestures and sounds.

- **Questions and Answers:** Answer questions in different categories and accumulate mana points to unleash powerful attacks against your opponents.

- **Seasons and Levels:** Level up, unlock rewards, and compete in seasons to prove who's the ultimate QuizWarrior.

- **Leaderboard:** Compete for the top spots in different categories and show your mastery in the game.

- **Special Events:** Participate in themed events and earn exclusive customization items.

## Server-Side REST API Services

The functionality of Quiz Warriors relies on server-side REST API services to perform various actions and provide essential data for the game. Here's a description of the required API services:

### 1. Get Random Questions

- **Route:** `/api/questions/random`
- **Method:** GET
- **Description:** This service returns a random question from the question database.

### 2. Validate Answer

- **Route:** `/api/questions/validate`
- **Method:** POST
- **Description:** This service verifies whether an answer provided by the player is correct and returns the corresponding score.

### 3. Get Player Information

- **Route:** `/api/player/{playerId}`
- **Method:** GET
- **Description:** This service retrieves information about a player, including their level, experience, and customization items.

### 4. Update Player Information

- **Route:** `/api/player/{playerId}`
- **Method:** PUT
- **Description:** This service allows a player to update their information, such as level, experience, and customization items.

### 5. Get Leaderboard

- **Route:** `/api/leaderboard/{category}`
- **Method:** GET
- **Description:** This service fetches the leaderboard for a specific category, showcasing the top players.

### 6. Purchase Customization Items

- **Route:** `/api/store/buy/{playerId}/{itemType}/{itemId}`
- **Method:** POST
- **Description:** This service enables a player to purchase customization items in the in-game store.

### 7. Special Events

- **Route:** `/api/events/{eventName}`
- **Method:** GET
- **Description:** This service is used to obtain information about special events in the game, including rewards and event details.

These are some of the essential REST API services used in Quiz Warriors to enable gameplay and provide features such as random questions, player customization, leaderboards, and special events. These services should be available and functioning correctly to ensure a smooth gaming experience.

## Setup and Usage

To set up and run the server and database required for Quiz Warriors, follow the detailed instructions in the [DOCUMENTATION.md](DOCUMENTATION.md) file.

## Contribution

If you wish to contribute to the development of Quiz Warriors, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to collaborate on the project.

#### Español
# Quiz Warriors

## Descripción del Juego

Quiz Warriors es un emocionante juego de pelea por turnos que combina estrategia y conocimiento en un emocionante enfrentamiento de preguntas y respuestas. En este juego, los jugadores personalizan sus avatares y compiten contra otros jugadores en batallas multijugador, todo mientras demuestran su habilidad para responder preguntas correctamente.

### Características Principales

- **Batallas por Turnos:** Los jugadores se enfrentan en emocionantes batallas donde el conocimiento y la estrategia son clave para la victoria.

- **Personalización del Avatar:** Crea y personaliza tu propio avatar con una amplia gama de opciones, desde la apariencia hasta gestos y sonidos.

- **Preguntas y Respuestas:** Responde preguntas en diferentes categorías y acumula puntos de mana para lanzar poderosos ataques contra tus oponentes.

- **Temporadas y Niveles:** Sube de nivel, desbloquea recompensas y compite en temporadas para demostrar quién es el mejor QuizWarrior.

- **Tabla de Clasificación:** Compite por los primeros puestos en diferentes categorías y muestra tu dominio en el juego.

- **Eventos Especiales:** Participa en eventos temáticos y obtén elementos de personalización exclusivos.

## Servicios REST API del Lado del Servidor

El funcionamiento de Quiz Warriors depende de servicios REST API en el lado del servidor para realizar diversas acciones y proporcionar datos esenciales para el juego. Aquí hay una descripción de los servicios API requeridos:

### 1. Obtener Preguntas Aleatorias

- **Ruta:** `/api/questions/random`
- **Método:** GET
- **Descripción:** Este servicio devuelve una pregunta aleatoria de la base de datos de preguntas.

### 2. Validar Respuesta

- **Ruta:** `/api/questions/validate`
- **Método:** POST
- **Descripción:** Este servicio verifica si una respuesta proporcionada por el jugador es correcta y devuelve la puntuación correspondiente.

### 3. Obtener Información del Jugador

- **Ruta:** `/api/player/{playerId}`
- **Método:** GET
- **Descripción:** Este servicio devuelve información sobre un jugador, incluyendo su nivel, experiencia y elementos de personalización.

### 4. Actualizar Información del Jugador

- **Ruta:** `/api/player/{playerId}`
- **Método:** PUT
- **Descripción:** Este servicio permite actualizar la información del jugador, como su nivel, experiencia y elementos de personalización.

### 5. Obtener Tabla de Clasificación

- **Ruta:** `/api/leaderboard/{category}`
- **Método:** GET
- **Descripción:** Este servicio devuelve la tabla de clasificación de una categoría específica, mostrando los mejores jugadores.

### 6. Comprar Elementos de Personalización

- **Ruta:** `/api/store/buy/{playerId}/{itemType}/{itemId}`
- **Método:** POST
- **Descripción:** Este servicio permite a un jugador comprar elementos de personalización en la tienda del juego.

### 7. Eventos Especiales

- **Ruta:** `/api/events/{eventName}`
- **Método:** GET
- **Descripción:** Este servicio se utiliza para obtener información sobre eventos especiales en el juego, incluyendo recompensas y detalles del evento.

Estos son algunos de los servicios REST API esenciales que se utilizan en Quiz Warriors para permitir el juego y proporcionar funcionalidades como preguntas aleatorias, personalización del jugador, tablas de clasificación y eventos especiales. Estos servicios deben estar disponibles y funcionando correctamente para garantizar una experiencia de juego fluida.

## Configuración y Uso

Para configurar y ejecutar el servidor y la base de datos requeridos para Quiz Warriors, sigue las instrucciones detalladas en el archivo de documentación [DOCUMENTACIÓN.md](DOCUMENTACIÓN.md).

## Contribución

Si deseas contribuir al desarrollo de Quiz Warriors, consulta nuestro [CONTRIBUTING.md](CONTRIBUTING.md) para obtener información sobre cómo colaborar en el proyecto.

