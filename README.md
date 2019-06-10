# Lab 3 - Proyecto MayWeather

Para testearlo, hacer

    npm install --dev
    npm start

Se recomienda antes usar [`nvm`](https://github.com/nvm-sh/nvm) para asegurarse de tener la última versión de Node.

    nvm install --lts

## Árbol de componentes ##

El proyecto contiene a los componentes organizados de esta forma:

- App
  - Body
    - SearchBar
    - Weather
      - HourSelector
      - WeatherCard
        - WeatherAttributes
      - DaySelector

> Originalmente queríamos hacer componentes Header y Footer adentro de App.

## Manejo de estado ##

### Búsqueda de ciudades ###

El componente Body tiene el `cityCode` que comparten el SearchBar y Weather. Usamos el `localStorage` (nativo del navegador) para guardar la última búsqueda del usuario.

Al buscar una ciudad en SearchBar, se llama al método `onSubmit` que se encarga de que Weather se actualize con el nuevo `cityCode`.

### Llamada a la API ###

Usamos `axios` y la interfaz `Promise.all` (nativa del navegador) para realizar dos llamadas simultáneas a la API.

Dentro de Weather hay *flags* que indican el estado de la petición: `loadingCurrent` y `loadingForecast`.

Al finalizar exitosamente, se guarda toda la información necesaria en el estado de Weather, y se cargan los componentes hijos de Weather. (Evitamos incluir al WeatherCard cuando todavía no tenemos la información necesaria).

### HourSelector y DaySelector ###

Decidimos unificar la interfaz de las pestañas "current" y "forecast" tal como estaban en la consigna. Por defecto, mostramos el clima actual, que corresponde al `selectedDay` 0 y `selectedHour` 0. Luego, el usuario puede cambiar la hora o el día seleccionado y la WeatherCard se actualiza de acuerdo a eso.

Al cambiar el `selectedDay` o el `selectedHour` se actualiza el estado correspondiente en Weather, lo que fuerza que WeatherCard se actualice. El sistema es análogo al que ya vimos para el SearchBar, en donde necesitabamos comunicación entre componentes *hermanos* y decidimos poner el estado en el componente padre y crear un *callback* que haga que cambie el estado.
