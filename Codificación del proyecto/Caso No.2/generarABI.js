var fs = require('fs');
var solc = require('solc');

var contractPath = '/Users/user/proyecto2/contrato.sol'; //Agregar la dirección, donde se encuentra el contrato inteligente
var contractFile = fs.readFileSync(contractPath, 'utf-8'); 

var compiledContract = solc.compile(contractFile, 1);

var abi = JSON.parse(compiledContract.contracts[':contrato'].interface);

var abiPath = './ContractABI.json';
fs.writeFileSync(abiPath, JSON.stringify(abi));
