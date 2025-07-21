import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const EditableGrid = ({ rowData = [], columnDefs, onSubmit, rowKey = 'id' }) => {
  const [gridApi, setGridApi] = useState(null);
  const [insertedRows, setInsertedRows] = useState([]);
  const [updatedRowsMap, setUpdatedRowsMap] = useState({});
  const [deletedRows, setDeletedRows] = useState([]);
  const [originalMap, setOriginalMap] = useState({});
  const nextTempId = useRef(-1); // for new rows

  useEffect(() => {
    const map = {};
    rowData.forEach(row => {
      map[row[rowKey]] = { ...row };
    });
    setOriginalMap(map);
    setInsertedRows([]);
    setUpdatedRowsMap({});
    setDeletedRows([]);
  }, [rowData, rowKey]);

  const onGridReady = params => setGridApi(params.api);

  const onCellEditRequest = useCallback((event) => {
    const key = event.data[rowKey];
    const original = originalMap[key];
    const isNew = insertedRows.some(row => row[rowKey] === key);

    if (isNew) {
      setInsertedRows(prev =>
        prev.map(row => (row[rowKey] === key ? { ...row, [event.colDef.field]: event.newValue } : row))
      );
      return;
    }

    const isChanged = original && original[event.colDef.field] !== event.newValue;
    if (isChanged) {
      setUpdatedRowsMap(prev => ({
        ...prev,
        [key]: { ...event.data, [event.colDef.field]: event.newValue }
      }));
    } else {
      const clone = { ...updatedRowsMap };
      delete clone[key];
      setUpdatedRowsMap(clone);
    }
  }, [originalMap, insertedRows, rowKey, updatedRowsMap]);

  const handleAddRow = () => {
    const newRow = { [rowKey]: nextTempId.current-- };
    const fullRow = columnDefs.reduce((acc, col) => {
      acc[col.field] = acc[col.field] || '';
      return acc;
    }, newRow);

    setInsertedRows(prev => [...prev, fullRow]);
    gridApi.applyTransaction({ add: [fullRow] });
  };

  const handleDeleteSelected = () => {
    const selected = gridApi.getSelectedRows();
    const selectedIds = selected.map(row => row[rowKey]);

    const isInserted = (id) => insertedRows.some(r => r[rowKey] === id);
    setInsertedRows(prev => prev.filter(row => !selectedIds.includes(row[rowKey])));
    setDeletedRows(prev => [
      ...prev,
      ...selected.filter(row => !isInserted(row[rowKey]))
    ]);
    setUpdatedRowsMap(prev => {
      const clone = { ...prev };
      selectedIds.forEach(id => delete clone[id]);
      return clone;
    });

    gridApi.applyTransaction({ remove: selected });
  };

  const handleSubmit = () => {
    const inserted = [...insertedRows];
    const updated = Object.values(updatedRowsMap);
    const deleted = [...deletedRows];
    onSubmit(inserted, updated, deleted);
    setInsertedRows([]);
    setUpdatedRowsMap({});
    setDeletedRows([]);
  };

  const hasChanges = insertedRows.length || Object.keys(updatedRowsMap).length || deletedRows.length;

  return (
    <div style={{ width: '100%' }}>
      <div style={toolbarStyle}>
        <i className="fas fa-plus icon-button" title="Add Row" onClick={handleAddRow}></i>
        <i className="fas fa-trash icon-button" title="Delete Selected" onClick={handleDeleteSelected}></i>
        <i
          className={`fas fa-save icon-button ${!hasChanges ? 'disabled' : ''}`}
          title="Submit Changes"
          onClick={hasChanges ? handleSubmit : undefined}
        ></i>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={[...rowData, ...insertedRows]}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onCellEditRequest={onCellEditRequest}
          defaultColDef={{ sortable: true, filter: true, flex: 1, resizable: true, editable: true }}
          getRowNodeId={data => data[rowKey]}
        />
      </div>
    </div>
  );
};

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '6px 10px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ccc',
  gap: '12px',
  fontSize: '1.1rem'
};

const iconBtnStyle = {
  cursor: 'pointer',
  color: '#444',
};

const disabledStyle = {
  opacity: 0.5,
  cursor: 'not-allowed'
};

export default EditableGrid;
