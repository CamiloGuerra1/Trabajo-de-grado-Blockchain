// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26; 

contract contrato{ 
    uint public counter = 0;

    struct Reserva { 
        string identificadorReserva;
        string codigoParqueadero;
        string identificadorCupoParqueadero;
        string placaVehiculo;
        string fechaReserva;
        string horaReserva;
        string fechaHoraTransaccion;
    } 

    mapping(uint => Reserva) public reservas;

    event ReservaCreated(
        string identificadorReserva,
        string codigoParqueadero,
        string identificadorCupoParqueadero,
        string placaVehiculo,
        string fechaReserva,
        string horaReserva,
        string fechaHoraTransaccion
    );

    constructor() public { 
        createReserva('none', 'none', 'none', 'none', 'none', 'none', '0000-00-00 00:00:00');
    } 

    function createReserva(string memory _identificadorReserva, string memory _codigoParqueadero, string memory _identificadorCupoParqueadero, string memory _placaVehiculo, string memory _fechaReserva, string memory _horaReserva, string memory _fechaHoraTransaccion) public { 
        counter ++;
        reservas[counter] = Reserva(_identificadorReserva, _codigoParqueadero, _identificadorCupoParqueadero, _placaVehiculo, _fechaReserva, _horaReserva, _fechaHoraTransaccion);
        emit ReservaCreated(_identificadorReserva, _codigoParqueadero, _identificadorCupoParqueadero, _placaVehiculo, _fechaReserva, _horaReserva, _fechaHoraTransaccion);
    } 

    function getReserva(uint _id) public view returns (string memory identificadorReserva, string memory codigoParqueadero, string memory identificadorCupoParqueadero, string memory placaVehiculo, string memory fechaReserva, string memory horaReserva, string memory fechaHoraTransaccion) {
        Reserva storage reserva = reservas[_id];
        identificadorReserva = reserva.identificadorReserva;
        codigoParqueadero = reserva.codigoParqueadero;
        identificadorCupoParqueadero = reserva.identificadorCupoParqueadero;
        placaVehiculo = reserva.placaVehiculo;
        fechaReserva = reserva.fechaReserva;
        horaReserva = reserva.horaReserva;
        fechaHoraTransaccion = reserva.fechaHoraTransaccion;
    }
    
    function getCounter() public view returns (uint) {
        return counter;
    }

} 