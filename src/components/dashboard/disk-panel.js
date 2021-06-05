import React from 'react'
import DashboardPanel from "./dashboard-panel"

export default function DiskPanel() {
    return (
        <DashboardPanel title="Disk" entries={[
            {
                "title": "Size",
                "name": "size",
                "unit": "GB"
            },
            {
                "title": "Free",
                "name": "free",
                "unit": "GB",
            },
            {
                "title": "Used",
                "name": "used",
                "unit": "GB"
            }
        ]} url="raspberry/disk"/>
    )
}
