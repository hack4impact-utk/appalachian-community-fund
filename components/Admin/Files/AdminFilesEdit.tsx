import React, { useState } from 'react';
import { DataGrid, GridCellEditCommitParams, MuiEvent } from '@mui/x-data-grid';

const AdminFilesEdit: React.FC = () => {

    const [formattedPosts, setFormattedPosts] = useState([]);

    return (
        <div style={{ height: 600, width: '90%' }}>
            <DataGrid 
                columns={[
                    { field: 'fileName', headerName: 'File Name' }
                ]}
                rows={formattedPosts}
            />
        </div>
    );
}

export default AdminFilesEdit;