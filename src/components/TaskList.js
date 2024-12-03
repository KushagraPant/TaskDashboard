import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask, editTask } from '../features/tasks/taskSlice';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    
    // State to manage the edit dialog visibility and form data
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    // State for the delete confirmation dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Open the edit dialog
    const handleEditClick = (task) => {
        setCurrentTask(task); // Set the current task data to the form
        setOpenEditDialog(true);
    };

    // Close the edit dialog
    const handleCloseDialog = () => {
        setOpenEditDialog(false);
        setCurrentTask(null);
    };

    // Handle form submission (editing a task)
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            dispatch(editTask({ id: currentTask.id, updates: { 
                title: currentTask.title,
                description: currentTask.description,
                dueDate: currentTask.dueDate
            }})); // Dispatch the edit task action
            handleCloseDialog(); // Close the dialog
        }
    };

    // Open the delete confirmation dialog
    const handleDeleteClick = (task) => {
        setTaskToDelete(task); // Store the task to delete
        setOpenDeleteDialog(true); // Open the delete confirmation dialog
    };

    // Handle task deletion
    const handleDeleteConfirm = () => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete.id)); // Dispatch delete action
            setOpenDeleteDialog(false); // Close the confirmation dialog
            setTaskToDelete(null); // Clear the task to delete
        }
    };

    // Close the delete confirmation dialog
    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false); // Close the dialog without deleting
        setTaskToDelete(null); // Clear the task to delete
    };

    return (
        <>
            <Grid container spacing={2}>
                {tasks.map(task => (
                    <Grid item xs={12} sm={6} key={task.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {task.description}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Due Date: {task.dueDate}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color={task.completed ? 'secondary' : 'primary'}
                                    onClick={() => dispatch(toggleTask(task.id))}
                                >
                                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEditClick(task)} // Open the edit dialog
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteClick(task)} // Open the delete confirmation dialog
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Task Dialog */}
            {currentTask && (
                <Dialog open={openEditDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleEditSubmit}>
                            <TextField
                                label="Title"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={currentTask.title}
                                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                                required
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                margin="normal"
                                value={currentTask.description}
                                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                                required
                            />
                            <TextField
                                type="date"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={currentTask.dueDate}
                                onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                                <Button type="submit" color="primary">Save Changes</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Confirmation Dialog */}
            {taskToDelete && (
                <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Are you sure you want to delete the task "{taskToDelete.title}"?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
                        <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default TaskList;
