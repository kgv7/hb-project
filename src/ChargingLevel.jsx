import React, { useState, useEffect } from "react";


export default function ChargingLevelDropdown(props) {
    const [levels, getEVLevels] = useState([]);

    const chargingLevelOptions = levels.map((evChargingData) => evChargingData.charging_level).map(level => <option value={level}>{level}</option>)


    useEffect(() => {
        fetch('/api/charging-level')
        .then((response) => response.json())
        .then((evChargingData) => {
            getEVLevels(evChargingData);
        })
        }, []);

    return (
        <React.Fragment>
            <label htmlFor="charging-level">Charging Station Level</label>
            <select 
                name="level" 
                id="level" 
                value={props.level}
                onChange={props.onChange}
                >
                <option defaultValue="Select a Level">
                    Select a Level
                </option>
            {chargingLevelOptions}
            </select>
        </React.Fragment>
    )
    }