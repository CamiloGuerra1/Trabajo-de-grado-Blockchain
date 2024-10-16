CONFIGURACIÓN DEL PROYECTO

La configuración del presente proyecto es esencial para el correcto funcionamiento, relacionado al despliegue e interacción con los componentes desarrollados. A continuación, se dará a conocer el respectivo paso a paso de la configuración implementada.

Nota: se debe tener instalado las herramientas de: node.js, npm y visual studio code.

--------------------------------------------------------------------
Paso No.1: Creación del directorio para el almacenamiento de los componentes.
| mkdir "nombre del directorio" | 
| ------------- |
--------------------------------------------------------------------
Paso No.2: Acceder al directorio, previamente creado.
| cd "nombre del directorio" | 
| ------------- |
--------------------------------------------------------------------
Paso No.3: Identificar la versión instalada de node.js y de npm.
| node --version  | npm --version |
| ------------- | ------------- |
| Versión implementada para node: 14.21.3 | Versión implementada para npm: 6.14.18|
--------------------------------------------------------------------
Paso No.4: Permite la automatización en la instalación de las dependencias.
| npm install .y | 
| ------------- |
--------------------------------------------------------------------
Paso No.5: Realiza la inicialziación del proyeecto, proporcionando una versión y arhivos .json del proyecto.
| npm init -y | 
| ------------- |
--------------------------------------------------------------------
Paso No.6: Realiza la instalación de la biblioteca web3 en la versión No.1.6.0 y de igual forma ser agregarla como una dependencia de desarrollo en el proyecto.
| npm install web3@1.6.0 --save-dev | 
| ------------- |
--------------------------------------------------------------------
Paso No.7: Realiza la instalación del compilador Solidity (solc) en la versión No.0.4.26  y de igual forma ser agregarla como una dependencia de desarrollo en el proyecto.
| npm install solc@0.4.26 --save-dev | 
| ------------- |
--------------------------------------------------------------------
Paso No.8: Por medio del comnado ls, se visualizara los archivos creados en el directorio del proyecto
| ls  | ls node_modules |
| ------------- | ------------- |
--------------------------------------------------------------------
Paso No.9: Realizar la instalación de la libreria mysql-events, el cual permitira detectar los eventos enviados a la base de datos.
| npm install mysql-events |
| ------------- |

Nota: una vez que se instale diche libreria,Se requiere generar la activación de permisos de lectura para el binlog o también conocido como binary log de la base de datos

--------------------------------------------------------------------
Paso No.10: Realizar la instalación de la libreria ethers, la cual permitira la interacción y lectura de información enviada a la blockchain (cadena de bloques).
| npm install ethers@5.7.2 |
| ------------- |
--------------------------------------------------------------------
Paso No.11: Se realiza la creación del arhivo con estrctura .sol (arhcivo de solidity), para definir el contrato inteligente implementado.
| touch "nombre del contrato inteligente.sol" |
| ------------- |
--------------------------------------------------------------------
Paso No.12: Se realiza la creación del arhivo con estrctura .js (archivo de JavaScript), para definir el oraculo implementado (dicho componente es implementado para la configuración y despliegue del contrato inteligente en la red de blockchain). 
| touch "nombre del oraculo.js" |
| ------------- |
--------------------------------------------------------------------
Paso No.13: Se realiza la creación del arhivo con estrctura .js (archivo de JavaScript), generar el ABI (Application binary interface-Interfaz binaria de aplicación) del contrato ineligente y poder ser invocados en un ente externo (componente de la trazzabilidad).
| touch "nombre del generados ABI.js" |
| ------------- |
--------------------------------------------------------------------
Paso No.14: Se realiza la creación del arhivo con estrctura .js (archivo de JavaScript), para definir el componente que permitira la interacción con la red de ganache  y realizar el seguimiento de la información enviada.
| touch "nombre del componente.js" |
| ------------- |
--------------------------------------------------------------------
Paso No.15: Es ejecutado el presente comando, con el fin de realizar la ejecución del editor de codigo fuente visual studio code, desde la linea de comandos de una maquina.
| touch "code ." |
| ------------- |
--------------------------------------------------------------------
Paso No.16: Una vez que se haya ejecutado visual studio code, se procede agregar las extensiones necesarias para la ejecución del proyecto, en el apartado izquierdo de la ventana, se da clic en el apartado de "extensiones", buscar las siguientes extensiones:
  1. solidity de "Julian Blnaco".
  2. npm Intellisense de "Cristina Kohler".
     
y se procede a dar clic en la opciópn "Instalar".

--------------------------------------------------------------------
Paso No.17: Por medio de la paleta de comandos de visual studio code, ubicada en el apartado inferior izquierda se procede a dar clic en la siguiente opción:
  1. configuración.
  2. paleta de comandos.
     
Posterioremtne, se procede a buscar "Solidity: Change global compiler versión (Remote)"; realizar la busqueda de la versión del compialdor de solidity, gestionar la instalación y buscar la versión del compialdor del paso No.7, con el fin de evitar mensajes de advertencia, referente a nuevas actualizaciones de dicho compilador.
