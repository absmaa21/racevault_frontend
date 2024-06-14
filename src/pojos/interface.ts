export interface IType {
    id?: string,
    name: string
}

export interface IRace {
    id?: string,
    // foreign
    event_id: string,
    circuit_id: string,
    game_id: string,
    // attributes
    start_date: number,
}

export interface IUser {
    id?: string,
    // attributes
    email: string,
    password?: string,
    last_login?: number,
    register_date: number,
    races: IUserRace[],
}

export interface IUserRace {
    id?: string,
    // foreign
    race_id: string,
    vehicle_id: string,
    // attributes
    position_qualifying_overall: number,
    position_race_overall: number,
    position_qualifying_class?: number,
    position_race_class?: number,
}

export interface IEvent extends IType {
    // attributes
    organizers: string[],
}

export interface IVehicle extends IType {
    // attributes
    class: string,
}

export interface IGame extends IType {
    // attributes
    release_date?: number,
}

export interface ICircuit extends IType {}
