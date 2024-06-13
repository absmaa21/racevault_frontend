import React, {useState} from 'react';
import {ICircuit, IEvent, IGame, IVehicle} from "../pojos/interface";
import DropDown from "./DropDown";
import config from "../config";

function InputPage() {
    const [eventList, setEventList] = useState<IEvent[]>([])
    const [circuitList, setCircuitList] = useState<ICircuit[]>([])
    const [vehicleList, setVehicleList] = useState<IVehicle[]>([])
    const [gameList, setGameList] = useState<IGame[]>([])

    const [event, setEvent] = useState<IEvent>()
    const [circuit, setCircuit] = useState<ICircuit>()
    const [vehicle, setVehicle] = useState<IVehicle>()
    const [game, setGame] = useState<IGame>()

    const [qualOverall, setQualOverall] = useState<number>()
    const [qualClass, setQualClass] = useState<number>()
    const [raceOverall, setRaceOverall] = useState<number>()
    const [raceClass, setRaceClass] = useState<number>()

    function loadLists() {
        fetch(config.backendUrl + '/game', {method: 'GET'}).then(r => {
            // TODO
        })
    }


    return (
        <div className={'container'}>
            <DropDown data={game?.name ?? ''} setData={setGame} list={gameList} />
        </div>
    );
}

export default InputPage;
