import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from 'bcrypt';
// const bodyParser = require('body-parser');
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require ('cors');
// const bcrypt = require('bcrypt');
// const bodyParser = require("body-parser");
const router = express.Router();
import dotenv from 'dotenv'
// const dotenv = require("dotenv");
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error1) => {
    console.log(error1)

})

//mongoose.connect(mongodb+srv://manvendrasingh:manvendra123@cluster0.8iflvjz.mongodb.net/?retryWrites=true&w=majority)
                 
const cardSchema = new mongoose.Schema({
    title: String,
    priority: String,
    checklists: [{ text: String, checked: Boolean }],
    dueDate: Date,
    createdDate: Date,
    status: String,
    userEmail: String
})
const card = new mongoose.model("card", cardSchema)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

app.post("/delete-card", async (req, res) => {
    const _id = req.body.id;
    try {
        const card1 = await card.findOne({ _id });
        await card1.delete();
        res.json({ message: 'Card Deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
})

app.post("/save-todo", (req, res) => {
    try {
        const { title, priority, checklists, dueDate, status, user } = req.body
        const card2 = new card({
            title: title,
            priority: priority,
            checklists: checklists,
            dueDate: dueDate,
            status: status,
            userEmail: user.email,
            createdDate: new Date()
        })
        card2.save(err => {
            if (err) {
                res.send(err)
            }
            else {
                res.send({ message: "Details saved successfully." })
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})
app.post("/get-analytics-data", async (req, res) => {
    let user = req.body.user1;
    try {
        const data = await card.find({
            userEmail: user.email
        });
        let backlog = 0;
        let todo = 0;
        let inprogress = 0;
        let completed = 0;
        let lowPriority = 0;
        let moderatePriority = 0;
        let highPriority = 0;
        let dueDateCount = 0;
        for (let i = 0; i < data.length; i++) {
            let record = data[i];
            if (record.status === "todo")
                todo++;
            else if (record.status === "backlog")
                backlog++;
            else if (record.status === "done")
                completed++;
            else if (record.status === "inprogress")
                inprogress++;
            if (record.priority === "High")
                highPriority++;
            else if (record.priority === "Low")
                lowPriority++;
            else if (record.priority === "Moderate")
                moderatePriority++;
            if (record.dueDate != null)
                dueDateCount++;
        }
        let analyticsData = {
            backlog: backlog,
            todo: todo,
            inprogress: inprogress,
            completed: completed,
            highPriority: highPriority,
            moderatePriority: moderatePriority,
            lowPriority: lowPriority,
            dueDateCount: dueDateCount
        }
        res.send(analyticsData)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})
app.post("/get-Data", async (req, res) => {
    try {
        let selectedOption = req.body.selectedOption;
        let user = req.body.user;
        let day = 6;
        if (selectedOption == 'This Month') {
            day = 29;
        } else if (selectedOption == 'Today') {
            day = 0;
        }
        let date = new Date();
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        date.setDate(date.getDate() - day);
        let date2 = new Date();
        const data1 = await card.find({
            $and: [
                { createdDate: { $gte: date, $lte: date2 } },
                { userEmail: user.email }
            ]
        });
        res.send(data1)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
// password Update
app.post('/update-card', async (req, res) => {
    const { itemdata } = req.body;
    const _id = itemdata._id
    try {
        const card1 = await card.findOne({ _id });
        card1.status = itemdata.status;
        card1.title = itemdata.title;
        card1.priority = itemdata.priority;
        card1.checklists = itemdata.checklists;
        card1.dueDate = itemdata.dueDate;
        card1.createdDate = new Date();
        await card1.save();

        res.json({ message: 'Card updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body
        User.findOne({ email: email }, async (err, user) => {
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    res.send({ message: "Login Successful", user: user })
                }
                else {
                    res.send({ message: "Password Did't Match" })
                }

            }
            else {
                res.send({ message: "User Not Registerd" })
            }

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


})
app.post("/register", (req, res) => {
    try {
        const { name, email, password } = req.body
        User.findOne({ email: email }, async (err, user) => {
            if (user) {
                res.send({ message: "User Already Registerd" })
            }
            else {

                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })
                user.save(err => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send({ message: "Successfully registerd ,Please Login Now" })
                    }
                })

            }

        })
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
})

// password Update
app.post('/update-password', async (req, res) => {
    const { user, oldPassword, newPassword, name } = req.body;
    let email = user.user.email;
    try {
        // Find user by name
        const user = await User.findOne({ email: email });

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        user.name = name;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// app.use(bodyParser.json());
app.use(cors());
// Endpoint to generate URL and store card data
app.post('/api/cards', async (req, res) => {
    try {
        const { userName, address } = req.body;
        const newCard = new Card({ userName, address });
        await newCard.save();
        res.json({ cardUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log(`server is running on http://localhost:${process.env.PORT}`))
        .catch(error => console.log(error))

})
