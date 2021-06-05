import DashboardPanel from "./dashboard-panel"
import React from "react"


export default function CpuPanel() {
    return (
        <DashboardPanel title="CPU" entries={[
            {
                "title": "Temperature",
                "name": "temperature",
                "unit": "°C"
            },
            {
                "title": "Load",
                "name": "load",
                "unit": ""
            }
        ]} url="raspberry/cpu"/>
    )
}