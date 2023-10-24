// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;

contract contrato{
    uint counter = 0;

    struct Control {
        string codigoParqueadero;
        string identificadorCupoParqueadero;
        string placaVehiculo;
        string estadoControlVehicular;
        string fecha;
        string hora;
        string fechaTransaccion;
    }

    mapping(uint => Control) public controles;

    event ControlCreated(
        string codigoParqueadero,
        string identificadorCupoParqueadero,
        string placaVehiculo,
        string estadoControlVehicular,
        string fecha,
        string hora,
        string fechaTransaccion
    );

    constructor() public {
        createControl('none', 'none', 'none', 'none', 'none', 'none', '0000-00-00 00:00:00');
    }

    function createControl(string memory _codigoParqueadero, string memory _identificadorCupoParqueadero, string memory _placaVehiculo, string memory _estadoControlVehicular, string memory _fecha, string memory _hora, string memory _fechaTransaccion) public { 
        counter ++; 
        controles[counter] = Control(_codigoParqueadero, _identificadorCupoParqueadero, _placaVehiculo, _estadoControlVehicular, _fecha, _hora, _fechaTransaccion);
        emit ControlCreated(_codigoParqueadero, _identificadorCupoParqueadero, _placaVehiculo, _estadoControlVehicular, _fecha, _hora, _fechaTransaccion);
    }

    function getControl(uint _id) public view returns (string memory codigoParqueadero, string memory identificadorCupoParqueadero, string memory placaVehiculo, string memory estadoControlVehicular, string memory fecha, string memory hora, string memory fechaTransaccion) {
        Control storage control = controles[_id];
        codigoParqueadero = control.codigoParqueadero;
        identificadorCupoParqueadero = control.identificadorCupoParqueadero;
        placaVehiculo = control.placaVehiculo;
        estadoControlVehicular = control.estadoControlVehicular;
        fecha = control.fecha;
        hora = control.hora;
        fechaTransaccion = control.fechaTransaccion;
    }

    function getCounter() public view returns (uint) {
        return counter;
    }

}