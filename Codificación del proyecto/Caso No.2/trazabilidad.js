async function trazabilidadControlVehicular() {    
    var {ethers} = require('ethers');
    var direcion = 'http://127.0.0.1:7545';
    var urlDireccion = new ethers.providers.JsonRpcProvider(direcion);
    var contratoABI = require('./ContractABI.json');
    var direccionContrato = '0x8f134e96FE75F70416084ac810563769D54CC53B';
    var senderDireccion = '0xb731694fCf51354eD4A65C6A58d0b16DA0C8a431';
    var contract = new ethers.Contract(direccionContrato, contratoABI, urlDireccion);
    var gasPrice = await urlDireccion.getGasPrice();
    var latestBlockNumber = await urlDireccion.getBlockNumber();
    try {
        var counterBigNumber = await contract.getCounter();
        var counter = counterBigNumber.toNumber();
        for (let i = 2; i < counter+1; i++){
            var data = await contract.getControl(i, {from: senderDireccion}); 
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
