import React, {useEffect, useState} from 'react';
import {Alert, Grow} from "@mui/material";

function InputPage() {
    const [form, setForm] = useState({
        game: '',
        event: '',
        circuit: '',
        vehicle: '',
        start_date: Date.now(),
        position_qualifying_overall: 0,
        position_race_overall: 0,
        position_qualifying_class: 0,
        position_race_class: 0,
    })
    const [justAddedNewRace, setJustAddedNewRace] = useState(false)

    function handelSubmit(e: React.FormEvent) {
        e.preventDefault()
        setJustAddedNewRace(true)
    }

    function handelChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.type === 'number' && e.target.valueAsNumber < 1) return;
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const i = setTimeout(() => setJustAddedNewRace(false), 4000)
        return () => clearTimeout(i)
    }, [justAddedNewRace])

    return (
        <div className={'container vh-100 align-content-center'}>
            <Grow in={justAddedNewRace}>
                <Alert severity={'success'} className={'position-absolute bottom-0 end-0 m-2'}>
                    Successfully submitted a new race.
                </Alert>
            </Grow>
            <form onSubmit={handelSubmit}>
                <div className={'d-flex justify-content-between flex-wrap'}>
                    <div className={'form-group'}>
                        <input
                            name="game"
                            type="text"
                            className="form-control text-black"
                            placeholder="Game"
                            value={form.game}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="event"
                            type="text"
                            className="form-control text-black"
                            placeholder="Event"
                            value={form.event}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="circuit"
                            type="text"
                            className="form-control text-black"
                            placeholder="Circuit"
                            value={form.circuit}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="vehicle"
                            type="text"
                            className="form-control text-black"
                            placeholder="Vehicle"
                            value={form.vehicle}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="start_date"
                            type="datetime-local"
                            className="form-control text-black"
                            placeholder="Start date"
                            value={form.start_date}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="position_qualifying_overall"
                            type="number"
                            min={1}
                            className="form-control text-black"
                            placeholder="Qualifying overall"
                            value={form.position_qualifying_overall}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="position_race_overall"
                            type="number"
                            min={1}
                            className="form-control text-black"
                            placeholder="Race overall"
                            value={form.position_race_overall}
                            onChange={handelChange}
                            required
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="position_qualifying_class"
                            type="number"
                            min={1}
                            className="form-control text-black"
                            placeholder="Qualifying class"
                            value={form.position_qualifying_class}
                            onChange={handelChange}
                        />
                    </div>
                    <div className={'form-group'}>
                        <input
                            name="position_race_class"
                            type="number"
                            min={1}
                            className="form-control text-black"
                            placeholder="Race class"
                            value={form.position_race_class}
                            onChange={handelChange}
                        />
                    </div>
                </div>
                <button className={'btn btn-primary'}>Submit</button>
            </form>
        </div>
    );
}

export default InputPage;
