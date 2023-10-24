async function migracion_contrato(){ 
    var fs = require('fs'); 
    var Web3 = require('web3');
    var solc = require('solc');
    var sourceCode = await fs.readFileSync('contrato.sol').toString();
    var compiledCode = await solc.compile(sourceCode, 1);
    var compiledCodeContract = compiledCode.contracts[':contrato'];
    var contratoInterface = await JSON.parse(compiledCodeContract.interface);
    var contratoByteCode = compiledCode.contracts[':contrato'].bytecode;
    var web3 = new Web3('http://127.0.0.1:7545');
    var accounts = await web3.eth.getAccounts();
    var contratoContract = new web3.eth.Contract(contratoInterface);
    var myContract = await contratoContract.deploy({data: contratoByteCode}).send({from: accounts[0], gas: 4700000});
    escuchar_proyecto(myContract, accounts);
}; 

function escuchar_proyecto(myContract, accounts){
    var MYSQLEvents = require('mysql-events');
    var  conexion = {
        host: 'localhost', 
        user: 'root', 
        password: 'camilo1012', 
    };
    var myCon = MYSQLEvents(conexion);
    console.log('Conexión exitosa con la base de datos: Proyecto\nGestionando la actividad para la tabla: Reserva\n');
    console.log('Contrato desplegado en la red de Ganache con la siguiente dirección: ', myContract.options.address, '\n');
    var event1 = myCon.add(
        'proyecto.reserva',
        function(oldRow, newRow, event){
            if(oldRow === null) {
                var identificadorReserva = newRow.fields['identificadorReserva'].toString();
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString();
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var fechaReserva = newRow.fields['fechaReserva'].toString();
                var horaReserva = newRow.fields['horaReserva'].toString();
                var now = new Date();
                myContract.methods.createReserva(identificadorReserva, codigoParqueadero, identificadorCupoParqueadero, placaVehiculo,
                    fechaReserva, horaReserva, String(now)).send({from: accounts[0], gas: 3000000}).on('transactionHash', function (hash) {
                        //console.log('Transacción hash:', hash);
                    })
                    .on('receipt', function (receipt) { 
                        //console.log('Recibo de transacción:', receipt);
                    })
                    .on('error', function (error) {
                        console.error('Error en la transacción:', error);
                    });
                console.log('\nEl registro con la información:\nIdentificador de la reserva: ', newRow.fields['identificadorReserva'], 
                '\nha sido agregado de forma exitosa, en la base de datos: ', newRow.database,', para la tabla: ', newRow.table,
                '\nCon fecha y hora de registro: ', String(now)); 
            }
            if(oldRow !== null && newRow !== null) {
                var identificadorReserva = newRow.fields['identificadorReserva'].toString();
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString();
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var fechaReserva = newRow.fields['fechaReserva'].toString();
                var horaReserva = newRow.fields['horaReserva'].toString();
                var now = new Date();
                myContract.methods.createReserva(identificadorReserva, codigoParqueadero, identificadorCupoParqueadero, placaVehiculo,
                    fechaReserva, horaReserva, String(now)).send({from: accounts[0], gas: 3000000}).on('transactionHash', function (hash) {
                        //console.log('Transacción hash:', hash);
                    })
                    .on('receipt', function (receipt) { 
                        //console.log('Recibo de transacción:', receipt);
                    })
                    .on('error', function (error) {
                        console.error('Error en la transacción:', error);
                    });
                    console.log('\nEl registro con la información:\nIdentificador de la reserva: ', newRow.fields['identificadorReserva'], 
                '\nha sido modificdo de forma exitosa, en la base de datos: ', newRow.database,', para la tabla: ', newRow.table,
                '\nCon fecha y hora de transacción: ', String(now)); 
            }
        }
    );
};

migracion_contrato(); 