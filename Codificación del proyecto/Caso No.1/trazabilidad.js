async function trazabilidadReserva() { 
    var {ethers} = require('ethers');
    var direcion = 'http://127.0.0.1:7545'; //Agregar la dirección y puerto de la red de ganache (por medio de linea de comandos o software)
    var urlDireccion = new ethers.providers.JsonRpcProvider(direcion);
    var contratoABI = require('./ContractABI.json'); //Lectra del contrato inteligente en formato ABI, previamente ya creado
    var direccionContrato = '0x3E97f9932313891DE86224D269Bd7D5693670d14'; //Asignación de la dirección del contrato inteligente
    var senderDireccion = '0xE2DeCC343ae71916d053276f5668B53333a9a961'; //Asignación del remitente del contrato inteligente
    var contract = new ethers.Contract(direccionContrato, contratoABI, urlDireccion);
    var gasPrice = await urlDireccion.getGasPrice();
    var numeroDeBloques = await urlDireccion.getBlockNumber();
    try {
        var counterBigNumber = await contract.getCounter(); //La función getCounter es obtenida por medio del contrato inteligente
        var counter = counterBigNumber.toNumber();
        for (let i = 2; i < counter+1; i++){
            var informaciónDatos = await contract.getReserva(i, {from: senderDireccion}); //La función getReserva es obtenida por medio del contrato inteligente
            var numeroBloque = await urlDireccion.getBlock(i);
            console.log('Recepcionamiento de la data en archivo JSON del caso de uso "Reserva": ', informaciónDatos);

            //Visualización de la información enviada
            console.log('\nLa traazabilidad para el caso de uso "Reserva" es:', 
            '\nIdentificador de la reserva: ', informaciónDatos.identificadorReserva,
            '\nCódigo del parqueadero: ', informaciónDatos.codigoParqueadero,
            '\nIdentificador de cupo del parqueadero: ', informaciónDatos.identificadorCupoParqueadero,
            '\nPlaca del vehiculo: ', informaciónDatos.placaVehiculo,
            '\nFecha de la reserva: ', informaciónDatos.fechaReserva,
            '\nHora de la reserva: ', informaciónDatos.horaReserva,
            '\nFecha y hora de la transacción: ', informaciónDatos.fechaHoraTransaccion);
            
            //Visualización de la información relacionada a la transacción generada
            console.log('\nInformación importante, referente a la transacción:', 
            `\nNúmero de bloque de la transacción: ${i}`,
            '\nHash de la transacción: ', numeroBloque.transactions, 
            '\nHash del bloque de la transacción: ', numeroBloque.hash,
            '\nGas used//Gas usado de la transacción: ', numeroBloque.gasUsed.toString(),
            '\nGas price//Precio del gas de la red de Ganache: ', gasPrice.toString(),
            '\nGas limit//Limite del gas de la red de Ganache: ', numeroBloque.gasLimit.toString(),
            '\nNúmero de transacciones en el bloque: ', numeroBloque.transactions.length, '\n');
        }
    } catch (error){
        console.log('\nEl error es: ', error);
    };
    console.log('\nNúmero de bloques implementados en la red de Ganache:', numeroDeBloques);
};

trazabilidadReserva();
