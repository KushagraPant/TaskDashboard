import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';

const AddTaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '' });
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addTask(task));
        setTask({ title: '', description: '', dueDate: '' });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                marginBottom: 4,
            }}
        >
            <TextField
                label="Title"
                variant="outlined"
                value={task.title}
                onChange={e => setTask({ ...task, title: e.target.value })}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={task.description}
                onChange={e => setTask({ ...task, description: e.target.value })}
                required
            />
            <TextField
                type="date"
                variant="outlined"
                value={task.dueDate}
                onChange={e => setTask({ ...task, dueDate: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Task
            </Button>
        </Box>
    );
};

export default AddTaskForm;   