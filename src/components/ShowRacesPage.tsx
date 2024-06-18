import React, {useContext, useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {IUserRace} from "../pojos/interface";
import config from "../config";
import {UserContext} from "../contexts/UserContext";

function ShowRacesPage() {
    const User = useContext(UserContext)
    const [races, setRaces] = useState<IUserRace[]>()
    const colNames =
        ['#', 'Game', 'Race start', 'Event', 'Race duration', 'Circuit', 'Quali pos.', 'Race pos.', 'Vehicle']

    useEffect(() => {
        if (!User?.user?.id) return
        fetch(config.backendUrl + `/races/` + User.user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => {
                if (!r.ok) return
                r.json().then(data => setRaces(data))
            }).catch(err => console.log(err))
    }, [User])

    return (
        <div className={'d-flex flex-column w-100 mt-2'}>
            <div className={'d-flex justify-content-around'}>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {colNames.map((name, i) =>
                                <TableCell className={'fw-bolder'} align={i === 0 ? 'left' : 'right'}>{name}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {races?.map((race, index) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align='right'>{race.game}</TableCell>
                                <TableCell align='right'>{new Date(race.start_date).toLocaleString()}</TableCell>
                                <TableCell align='right'>{race.event}</TableCell>
                                <TableCell align='right'>{race.duration}</TableCell>
                                <TableCell align='right'>{race.circuit}</TableCell>
                                <TableCell align='right'>
                                    {race.position_qualifying_class
                                        ? race.position_qualifying_class + ' (' + race.position_qualifying_overall + ')'
                                        : race.position_qualifying_overall}
                                </TableCell>
                                <TableCell align='right'>
                                    {race.position_race_class
                                        ? race.position_race_class + ' (' + race.position_race_overall + ')'
                                        : race.position_race_overall}
                                </TableCell>
                                <TableCell align='right'>{race.vehicle}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ShowRacesPage;
