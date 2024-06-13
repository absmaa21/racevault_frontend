import React, {useState} from 'react';
import {IType} from "../pojos/interface";

interface IDropDown {
    setData: React.Dispatch<React.SetStateAction<IType>>,
    data: string,
    list: IType[]
}

function DropDown(props: IDropDown) {
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                    onClick={() => setIsCollapsed(!isCollapsed)}>
                {props.data}
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    );
}

export default DropDown;
