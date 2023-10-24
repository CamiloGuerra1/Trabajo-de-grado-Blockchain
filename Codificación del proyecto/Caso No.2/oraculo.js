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
    var myContract = await contratoContract.deploy({data: contratoByteCode}).send({from: accounts[1], gas: 4700000}); //Especificación de la cuenta de despliegue del contrato inteligente en la red de gaanche
    escuchar_proyecto(myContract, accounts);
};

function escuchar_proyecto(myContract, accounts){
    var MYSQLEvents = require('mysql-events');
    var conexion = { //Parametros de conexión a la base de datos
        host: 'localhost',
        user: 'root',
        password: '******',
    };
    myCon = MYSQLEvents(conexion);
    console.log('Conexión exitosa con la base de datos: Proyecto, gestionando la actividad para la tabla: controlvehicular\n');
    console.log('Contrato desplegado en la red de Ganache, con la siguiente dirección: ',myContract.options.address,'\n');
    var event1 = myCon.add(
        'proyecto.controlvehicular', //Asignación de la base de datos y tabla, para la detección de eventos
        function(oldRow, newRow, event) {
            if (oldRow === null) { //Detección de inserciones en la base de datos
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString() //Conversión de información a cadena de caracteres
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var estadoControlVehicular = newRow.fields['estadoControlVehicular'].toString();
                var fecha = newRow.fields['fecha'].toString();
                var hora = newRow.fields['hora'].toString();
                var now = new Date(); //Obtener la fecha y hora actual del sistema operativo
                myContract.methods.createControl(codigoParqueadero, identificadorCupoParqueadero, placaVehiculo, estadoControlVehicular,
                    fecha, hora, String(now)).send({from: accounts[1], gas: 3000000}).on('transactionHash', function (hash) { //Envio de información a la cadena de blqoues de ganache
                        //console.log('Transacción hash:', hash);
                    })
                    .on('receipt', function (receipt) { 
                        //console.log('Recibo de transacción:', receipt);
                    })
                    .on('error', function (error) {
                        console.error('Error en la transacción:', error);
                    });
                console.log('\nEl registro para el ingreso/salida vehicular con la placa del vehiculo: ',newRow.fields['placaVehiculo'],
                '\nha sido agreadado de forma exitosa, en la base de datos: ',newRow.database, ', para la tabla: ',newRow.table,
                '\nCon fecha y hora: ', String(now));
            }
            if(oldRow !== null && newRow !== null) { //Detección de modificaciones en la base de datos
                var codigoParqueadero = newRow.fields['codigoParqueadero'].toString(); //Conversión de información a cadena de caracteres
                var identificadorCupoParqueadero = newRow.fields['identificadorCupoParqueadero'].toString();
                var placaVehiculo = newRow.fields['placaVehiculo'].toString();
                var estadoControlVehicular = newRow.fields['estadoControlVehicular'].toString();
                var fecha = newRow.fields['fecha'].toString();
                var hora = newRow.fields['hora'].toString();
                var now = new Date(); //Obtener la fecha y hora actual del sistema operativo
                myContract.methods.createControl(codigoParqueadero, identificadorCupoParqueadero, placaVehiculo, estadoControlVehicular,
                    fecha, hora, String(now)).send({from: accounts[1], gas: 3000000}).on('transactionHash', function (hash) { //Envio de información a la cadena de blqoues de ganache
                        //console.log('Transacción hash:', hash);
                    })
                    .on('receipt', function (receipt) { 
                        //console.log('Recibo de transacción:', receipt);
                    })
                    .on('error', function (error) {
                        console.error('Error en la transacción:', error);
                    });
                console.log('\nEl registro para el ingreso/salida vehicular ha sido modificado con la placa del vehiculo: ',newRow.fields['placaVehiculo'],
                '\nha sido agreadado de forma exitosa, en la base de datos: ',newRow.database, ', para la tabla: ',newRow.table,
                '\nCon fecha y hora de transacción: ', String(now));
            }
        }
    );
}

migracion_contrato();
