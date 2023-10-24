var fs = require('fs');
var solc = require('solc');

var contractPath = '/Users/camilo/proyecto2/contrato.sol'; 
var contractFile = fs.readFileSync(contractPath, 'utf-8'); 

//Compila el contrato Solidity
var compiledContract = solc.compile(contractFile, 1);

//Obtiene el ABI del contrato compilado
var abi = JSON.parse(compiledContract.contracts[':contrato'].interface);

//Escribe el ABI en un archivo JSON
var abiPath = './ContractABI.json';
fs.writeFileSync(abiPath, JSON.stringify(abi));