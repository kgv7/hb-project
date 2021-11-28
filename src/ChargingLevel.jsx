import React, { useState, useEffect } from "react";


export default function ChargingLevelDropdown(props) {

    const levels = ["Level 1", "Level 2", "Level 3"]

    const chargingLevelOptions = levels.map(level => <option key={level} value={level}>{level}</option>)

    return (
        <React.Fragment>
            <label htmlFor="charging-level">Charging Station Level</label>
            <select 
                name="level" 
                id="level" 
                value={props.value}
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