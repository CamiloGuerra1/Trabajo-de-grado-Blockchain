var fs = require('fs');
var solc = require('solc');

var contractPath = '/Users/camilo/proyecto/contrato.sol'; //Declaración de una variable, para poder asignar la ruta del contrato inteligente
var contractFile = fs.readFileSync(contractPath, 'utf-8'); //Declaración de variable para la lectura del contrato inteligente 

//Compila el contrato Solidity
var compiledContract = solc.compile(contractFile, 1);

//Obtiene el ABI del contrato compilado
var abi = JSON.parse(compiledContract.contracts[':contrato'].interface);

//Escribe el ABI en un archivo JSON
var abiPath = './ContractABI.json';
fs.writeFileSync(abiPath, JSON.stringify(abi));