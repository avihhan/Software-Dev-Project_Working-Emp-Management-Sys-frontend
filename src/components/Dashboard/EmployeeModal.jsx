import { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Typography 
} from '@mui/material';
import employeeService from '../../services/employeeService';

function EmployeeModal({ employee, onClose, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...employee});

  const handleUpdate = async () => {
    await employeeService.update(employee.id, formData);
    setEditMode(false);
    onUpdate();
  };

  const handleSalaryUpdate = async () => {
    await employeeService.updateSalary(employee.id, { salary: formData.salary });
    onUpdate();
  };

  const handleDelete = async () => {
    await employeeService.delete(employee.id);
    onClose();
    onUpdate();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <DialogTitle>
        {editMode ? 'Edit Employee' : 'Employee Details'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="First Name"
            value={formData.firstName}
            disabled={!editMode}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
          {/* Add all other fields similarly */}
          <TextField
            label="Salary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: e.target.value})}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary">Save</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button onClick={handleSalaryUpdate} color="secondary">Update Salary</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
            <Button onClick={onClose}>Close</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeModal;