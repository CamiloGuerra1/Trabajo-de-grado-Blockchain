async function trazabilidadControlVehicular() {    
    var {ethers} = require('ethers');
    var direcion = 'http://127.0.0.1:7545'; //Agregar la dirección de y puerto de la red de ganache (por medio de linea de comandos o software)
    var urlDireccion = new ethers.providers.JsonRpcProvider(direcion);
    var contratoABI = require('./ContractABI.json');
    var direccionContrato = '0x5BC1631FD57fc13f504445FFC7a1DDfd090EE360'; //Dirección del contrato inteligente, visualizado en la red de ganache
    var senderDireccion = '0x7bf3035823290ca4eC5CB80195ABDd741da8E01C';  //Dirección de envio de información del contrato inteligente, visualizado en la red de ganache
    var contract = new ethers.Contract(direccionContrato, contratoABI, urlDireccion);
    var gasPrice = await urlDireccion.getGasPrice();
    var latestBlockNumber = await urlDireccion.getBlockNumber();
    try {
        var counterBigNumber = await contract.getCounter();
        var counter = counterBigNumber.toNumber();
        for (let i = 2; i < counter+1; i++){
            var data = await contract.getControl(i, {from: senderDireccion});  //La función getControl, es obtenida del contrato inteligente
            var numeroBloque = await urlDireccion.getBlock(i);
            console.log('Recepcionamiento de la data en archivo JSON:', data);

            console.log('\nLa trazabilidad para el caso de estudio de gestión vehicular es:',
            '\nCódigo del parqueadero: ', data.codigoParqueadero,
            '\nIdentificador del cupo de parqueadero: ', data.identificadorCupoParqueadero,
            '\nPlaca del vehiculo: ', data.placaVehiculo,
            '\nEstado de la gestión vehicular: ', data.estadoControlVehicular,
            '\nFecha de la gestión vehicular: ', data.fecha,
            '\nHora de la gestión vehicular: ', data.hora), '\n';

            console.log('\nInformación importante, referente a la transacción:',
            `\nNúmero de bloque de la transacción: ${i}`,
            '\nHash de la transacción: ', numeroBloque.hash,
            '\nGas used/Gas usado en la transacción: ', numeroBloque.gasUsed.toString(),
            '\nGas price/Precio del gas de la red de Ganache: ', gasPrice.toString(),
            '\nGas limit/Limte de gas de la red de Ganache: ', numeroBloque.gasLimit.toString());
        }
    } catch (error){
        console.log('El error es: ', error);
    };
    console.log('\nNúmero de bloques implementados en la red de Ganache:', latestBlockNumber);
};

trazabilidadControlVehicular();
