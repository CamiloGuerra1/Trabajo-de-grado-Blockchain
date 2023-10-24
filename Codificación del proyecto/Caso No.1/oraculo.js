async function migracion_contrato(){ 
    var fs = require('fs'); 
    var Web3 = require('web3');
    var solc = require('solc');
    var sourceCode = await fs.readFileSync('contrato.sol').toString();
    var compiledCode = await solc.compile(sourceCode, 1);
    var compiledCodeContract = compiledCode.contracts[':contrato'];
    var contratoInterface = await JSON.parse(compiledCodeContract.interface);
    var contratoByteCode = compiledCode.contracts[':contrato'].bytecode;
    var web3 = new Web3('http://127.0.0.1:7545'); //Agregar la dirección y puerto de la red de ganache (por medio de linea de comandos o software)
    var accounts = await web3.eth.getAccounts();
    var contratoContract = new web3.eth.Contract(contratoInterface);
    var myContract = await contratoContract.deploy({data: contratoByteCode}).send({from: accounts[0], gas: 4700000});
    escuchar_proyecto(myContract, accounts); 
};

function escuchar_proyecto(myContract, accounts){ 
    var MYSQLEvents = require('mysql-events');
    var  conexion = { //Parametros de conexión a la base de datos
        host: 'localhost', 
        user: 'root', 
        password: '*******', 
    };
    var myCon = MYSQLEvents(conexion);
    console.log('Conexión exitosa con la base de datos: Proyecto\nGestionando la actividad para la tabla: Reserva\n');
    console.log('Contrato desplegado en la red de Ganache con la siguiente dirección: ', myContract.options.address, '\n'); 
    var event1 = myCon.add(
        'proyecto.reserva', //Asignación de la base de datos y tabla, para la detección de eventos
        function(oldRow, newRow, event){
            if(oldRow === null) { //Detección de inserciones en la base de datos
                var identificadorReserva = newRow.fields['identificadorReserva'].toString(); //Conversión de información a cadena de caracteres
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString();
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var fechaReserva = newRow.fields['fechaReserva'].toString();
                var horaReserva = newRow.fields['horaReserva'].toString();
                var now = new Date(); //Obtener la fecha y hora actual del sistema operativo
                myContract.methods.createReserva(identificadorReserva, codigoParqueadero, identificadorCupoParqueadero, placaVehiculo, 
                    fechaReserva, horaReserva, String(now)).send({from: accounts[0], gas: 3000000}).on('transactionHash', function (hash) { //Envio de información a la cadena de blqoues de ganache
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
            if(oldRow !== null && newRow !== null) { //Detección de modificaciones en la base de datos
                var identificadorReserva = newRow.fields['identificadorReserva'].toString(); //Conversión de información a cadena de caracteres
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString();
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var fechaReserva = newRow.fields['fechaReserva'].toString();
                var horaReserva = newRow.fields['horaReserva'].toString();
                var now = new Date(); //Obtener la fecha y hora actual del sistema operativo
                myContract.methods.createReserva(identificadorReserva, codigoParqueadero, identificadorCupoParqueadero, placaVehiculo,
                    fechaReserva, horaReserva, String(now)).send({from: accounts[0], gas: 3000000}).on('transactionHash', function (hash) { //Envio de información a la cadena de blqoues de ganache
                        //console.log('Transacción hash:', hash);
                    })
                    .on('receipt', function (receipt) { 
                        //console.log('Recibo de transacción:', receipt);
                    })
                    .on('error', function (error) {
                        console.error('Error en la transacción:', error);
                    });
                    console.log('\nEl registro con la información ha sido modificado:\nIdentificador de la reserva: ', newRow.fields['identificadorReserva'], 
                '\nha sido modificdo de forma exitosa, en la base de datos: ', newRow.database,', para la tabla: ', newRow.table,
                '\nCon fecha y hora de modificación: ', String(now)); 
            }
        }
    );
};

migracion_contrato(); 
