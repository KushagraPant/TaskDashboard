import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TextField,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTaskOrder } from '../features/tasks/taskSlice'; // You need to implement this action to update task order

const FilterTasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'pending':
                return tasks.filter(task => !task.completed && task.dueDate >= currentDate);
            case 'overdue':
                return tasks.filter(task => !task.completed && task.dueDate < currentDate);
            default:
                return tasks;
        }
    };

    const getTaskStatus = task => {
        if (task.completed) {
            return { text: 'Completed', color: 'green' };
        } else if (task.dueDate < currentDate) {
            return { text: 'Overdue', color: 'red' };
        } else {
            return { text: 'Pending', color: 'orange' };
        }
    };

    // Filter tasks based on filter selection
    const filteredTasks = getFilteredTasks().filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    // Handle drag-and-drop reorder
    const handleDragEnd = result => {
        const { destination, source } = result;
        if (!destination) return; // Dropped outside the list

        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(source.index, 1);
        reorderedTasks.splice(destination.index, 0, movedTask);

        dispatch(updateTaskOrder(reorderedTasks)); // Dispatch updated task order to the Redux store
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Tasks
            </Typography>

            {/* Search Bar */}
            <TextField
                label="Search Tasks by Title"
                variant="outlined"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel id="filter-select-label">Filter Tasks</InputLabel>
                <Select
                    labelId="filter-select-label"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    label="Filter Tasks"
                >
                    <MenuItem value="all">All Tasks</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
            </FormControl>

            {/* Drag-and-Drop Area */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <Grid container spacing={2} {...provided.droppableProps} ref={provided.innerRef}>
                            {filteredTasks.map((task, index) => {
                                const { text, color } = getTaskStatus(task);
                                return (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                                        <Typography
                                                            variant="caption"
                                                            display="block"
                                                            style={{ color }}
                                                        >
                                                            {text}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    );
};

export default FilterTasks;
