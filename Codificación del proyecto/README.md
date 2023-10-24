# **IMPORTANTE**

Como se visualizo en la carpeta "Configuración_del_proyecto", en el archivo de configuración, se realizo la creación de los componentes necesarios para la ejecución de dicho proyecto, los cuales serán descritos a continuacion:

------------------------------------------
  **1. Componente contrato inteligente:**
  
El contrato inteligente o normalmente conocido como smart contract, programa informático, escrito o codificado en el lenguaje de programación de Solidity, encargado de enviar y registrar la respectiva información a la cadena de bloques o como se conoce normalmente blockchain.

------------------------------------------
  **2. Componente oraculo:**
  
Los oráculos son aquellos componentes que presentan un servicio, el cual permite proporcionar información externa a un contrato inteligente o smart contract, logrando obtener una comunicación o puente entre el mundo exterior con la blockchain. El propósito para la construcción de un oraculo, es poder suministrar una conexión entre la blockchain y la información o datos off-chain (es la información o datos que se encuentran fuera de la cadena de bloques-blockchain), adicionalmente se implementa la librería Mysql-events con el fin de poder gestionar la comunicación de los eventos de la base de datos con el contrato inteligente y la blockchain.

------------------------------------------
  **3. Componente generadorABI:**

El ABI o mayormente conocido como Application binary interface-Interfaz binaria de aplicación, es implementado como medio de interacción o comunicación con los contratos inteligente con la blockchain, para el presente proyecto es implementado el ABI, con el fin de poder gestionarlo como mecanismos necesarios para su interacción, el ABI normalmente es una descripción de las funciones y eventos de un contrato inteligente que se pueden llegar a ser invocados desde un ente externo.

------------------------------------------
  **4. Componente trazabilidad:**

El componente trazabilidad, es implementado con el fin de poder gestionar la lectura de la información o transacciones generadas por medio de los contratos inteligentes a la cadena de bloques, a través de la librería ethers.js de javaScript, se realiza la respectiva configuración de conectividad con la cadena de bloques (Ganache) y la implementación del contrato ABI (Application binary interface- Interfaz binaria de aplicación), para la invocación de funciones que se encuentran en los contratos inteligentes.

------------------------------------------
**Nota:**
Para este proyecto, se realizo la implementación de las caracteristicas de trazabilidad e inmutabilidad de la blockchain y a su vez el almacenamiento de la infomración, para el caso de estudio seleccionado en dos de requisitos principales, es por esto que para prevenir errores en la configuración y despliegue de contratos intelignetes, son creados dos directorios para cada unos de los requitos principales del sistema.

