# Grupo 12		
## Corrección		
	Tag o commit corregido:	lab-3
		
### Entrega		100.00%
	Tag correcto	100.00%
	En tiempo	100.00%
### Funcionalidad		100.00%
	"Current" funciona correctamente (se actualiza cada vez que se busca una nueva ciudad)	100.00%
	"Forecast" funciona correctamente (se muestra el listado de dias y si hago click veo el detalle para un dia)	100.00%
	El search box funciona correctament (si ingreso el nombre de una ciudad y presiono el boton se actualiza la información)	100.00%
	Se muestra un spinning wheel throbber cuando se buscan los datos de una ciudad	100.00%
	Los errores (si los hay) se muestran con un mensaje en pantalla. 	100.00%
### Modularización y diseño		95.00%
	Los componentes manejan su propio estado y/o el de sus componentes hijos. No se comparte estado entre componentes sibling.	100.00%
	Todo componente sin estado es un componente funcional (e.g. no se implementa como una clase)	80.00%
	Componentes distintos en archivos distintos. No se requiere específicamente un componente por archivo, pero sí que la modularización sea efectiva. Es decir, los componentes que son claramente distintos y tienen propósitos distintos no deberían estar en el mismo archivo. 	100.00%
	No se repite codigo innecesariamente, correcta elección de abstracciones	100.00%
	Todos los componentes hacen chequeo de tipos utilizando PropTypes.	100.00%
### Calidad de código		100.00%
	El README indica claramente como instalar el proyecto y setupear el linter	100.00%
	El linter Eslint no reporta errores de estilo	100.00%
### Uso de git		100.00%
	Commits frecuentes	100.00%
	Nombres de commits significativos	100.00%
	Commits de todes les integrantes	100.00%
### Opcionales		0.00%
	Punto estrella: Seccion UVI	0.00%
	Punto estrella: Utilización de la GeolocalizationAPI del browser para auto completar el search box	0.00%
	Punto Estrella: Permitir que el usuario pueda elegir el sistema métrico en el que quiere expresada la información	0.00%
		
# Nota Final		9.82
		
		
# Comentarios		
	- podrían haber usado listas en DaySelector (https://reactjs.org/docs/lists-and-keys.html).	
	- "// Decidimos tomar la descripción del clima de las 15:00 como representativa." Parece una decisión razonable, y que podría ir al informe porque es una decisión de diseño.	
	- es raro sumar 7 si después se hace (% 7)	
	- realmente hay una diferencia entre poner la imagen embebida que como imagen en un directorio? 	
	- n === 0 ? 0 : selectedHour es equivalente a max(0,selectedHour)	
	- hay muy pocos comentarios.	
	- la lógica del for dentro de getDailyForecast parece complicada.	
