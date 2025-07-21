// src/pages/services/OpalTeam.jsx
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../constants/api';
import EditableGrid from '../../utils/EditableGrid';

const OpalTeam = () => {
    const [rowData, setRowData] = useState([]);
    const API_GET_ALL = API_ENDPOINTS.teams.getAll();

    const columnDefs = [
        { field: 'id', headerName: 'ID', editable: false },
        { field: 'name', headerName: 'Name', editable: true },
        { field: 'kerberos', headerName: 'Kerberos', editable: true },
        { field: 'email', headerName: 'Email', editable: true },
    ];

    const fetchData = async () => {
        try {
            const res = await fetch(API_GET_ALL);
            const data = await res.json();
            setRowData(data);
        } catch (err) {
            console.error('Error fetching team data:', err);
        }
    };

    const handleSubmitChanges = async (changedRows) => {
        for (const row of changedRows) {
            try {
                await fetch(`http://localhost:8080/api/perfdb/teams/${row.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(row),
                });
            } catch (err) {
                console.error(`Error updating row ${row.id}:`, err);
            }
        }
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Opal Team</h2>
            <EditableGrid
                rowData={rowData}
                columnDefs={columnDefs}
                onSubmit={handleSubmitChanges}
                rowKey="id"
            />
        </div>
    );
};

export default OpalTeam;
