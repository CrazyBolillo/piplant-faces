import DashboardPanel from "./dashboard-panel"
import React from 'react'

export default function AmbientPanel() {
    return (
        <DashboardPanel title="Ambient" entries={[
            {
                "title": "Relative Humidity",
                "name": "humidity",
                "unit": "%"
            },
            {
                "title": "Temperature",
                "name": "temperature",
                "unit": "°C"
            }
        ]} url="ambient"/>
    )
}
