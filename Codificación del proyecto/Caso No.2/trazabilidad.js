async function trazabilidadControlVehicular() {    
    var {ethers} = require('ethers');
    var direcion = 'http://127.0.0.1:7545'; //Agregar la dirección y puerto de la red de ganache (por medio de linea de comandos o software)
    var urlDireccion = new ethers.providers.JsonRpcProvider(direcion);
    var contratoABI = require('./ContractABI.json'); //Lectra del contrato inteligente en formato ABI, previamente ya creado
    var direccionContrato = '0x8f134e96FE75F70416084ac810563769D54CC53B'; //Asignación de la dirección del contrato inteligente
    var senderDireccion = '0xb731694fCf51354eD4A65C6A58d0b16DA0C8a431'; //Asignación del remitente del contrato inteligente
    var contract = new ethers.Contract(direccionContrato, contratoABI, urlDireccion);
    var gasPrice = await urlDireccion.getGasPrice();
    var latestBlockNumber = await urlDireccion.getBlockNumber();
    try {
        var counterBigNumber = await contract.getCounter(); //La función getCounter es obtenida por medio del contrato inteligente
        var counter = counterBigNumber.toNumber();
        for (let i = 2; i < counter+1; i++){
            var data = await contract.getControl(i, {from: senderDireccion});  //La función getControl es obtenida por medio del contrato inteligente
            var numeroBloque = await urlDireccion.getBlock(i);
            console.log('Recepcionamiento de la data en archivo JSON:', data);

            //Visualización de la información enviada
            console.log('\nLa trazabilidad para el caso de estudio de gestión vehicular es:', 
            '\nCódigo del parqueadero: ', data.codigoParqueadero,
            '\nIdentificador del cupo de parqueadero: ', data.identificadorCupoParqueadero,
            '\nPlaca del vehiculo: ', data.placaVehiculo,
            '\nEstado de la gestión vehicular: ', data.estadoControlVehicular,
            '\nFecha de la gestión vehicular: ', data.fecha,
            '\nHora de la gestión vehicular: ', data.hora), '\n';
            
             //Visualización de la información relacionada a la transacción generada
            console.log('\nInformación importante, referente a la transacción:',
            `\nNúmero de bloque de la transacción: ${i}`,
            '\nHash del bloque de la transacción: ', numeroBloque.transactions, 
           \nHash del bloque de la transacción: ', numeroBloque.hash,
            '\nGas used//Gas usado de la transacción: ', numeroBloque.gasUsed.toString(),
            '\nGas price//Precio del gas de la red de Ganache: ', gasPrice.toString(),
            '\nGas limit//Limite del gas de la red de Ganache: ', numeroBloque.gasLimit.toString(),
            '\nNúmero de transacciones en el bloque: ', numeroBloque.transactions.length, '\n');
        }
    } catch (error){
        console.log('El error es: ', error);
    };
    console.log('\nNúmero de bloques implementados en la red de Ganache:', latestBlockNumber);
};

trazabilidadControlVehicular();
