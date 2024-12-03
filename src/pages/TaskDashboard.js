import React from 'react';
import { Container, Typography } from '@mui/material';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

const TaskDashboard = () => (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Task Management Dashboard
        </Typography>
        <AddTaskForm />
        <TaskList />
    </Container>
);

export default TaskDashboard;