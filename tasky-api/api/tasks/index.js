import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { tasksData } from './tasksData';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task details by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Add a new task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;

    // Create a new task with unique ID and set created_at and updated_at
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    // Add the new task to the tasks array
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
});

// Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    // Update the existing task with the provided data and set updated_at
    const updatedTask = {
        ...tasksData.tasks[taskIndex],
        ...req.body,
        updated_at: new Date().toISOString(),
    };

    // Replace the old task with the updated task in the tasks array
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return res.status(404).json({ status: 404, message: 'Task not found' });

    // Remove the task with the specified ID from the tasks array
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});

export default router;