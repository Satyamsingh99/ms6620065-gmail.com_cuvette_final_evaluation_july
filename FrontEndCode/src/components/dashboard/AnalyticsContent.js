import React from 'react'
import './dashboard.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { handleGetAnalyticsData } from './analytics.action';
function AnalyticsContent(user) {
    const [analyticsData, setAnalyticsData] = useState(
        {
            backlog: 0,
            todo: 0,
            inprogress: 0,
            completed: 0,
            highPriority: 0,
            moderatePriority: 0,
            lowPriority: 0,
            dueDateCount: 0
        }
    )
    useEffect(() => {
        handleGetAnalyticsData(user, setAnalyticsData)
    }, [])
    return (
        <div className="analytics-content">
            <header>
                <h3>Analytics</h3>
            </header>
            <section className='analytics'>
                <div className='analytics-box'>
                    <ul>
                        <li>Backlog Tasks </li>
                        <li>To-DO Tasks</li>
                        <li>In-Progress Tasks</li>
                        <li>Completed Tasks </li>
                    </ul>
                    <ul className='no-bullet'>
                        <li>{analyticsData.backlog}</li>
                        <li>{analyticsData.todo}</li>
                        <li>{analyticsData.inprogress}</li>
                        <li>{analyticsData.completed}</li>
                    </ul>
                </div>
                <div className='analytics-box'>
                    <ul>
                        <li>Low Priority</li>
                        <li>Moderate Priority </li>
                        <li>High Priority </li>
                        <li>Due Date Tasks </li>
                    </ul>
                    <ul className='no-bullet'>
                        <li>{analyticsData.lowPriority}</li>
                        <li>{analyticsData.moderatePriority}</li>
                        <li>{analyticsData.highPriority}</li>
                        <li>{analyticsData.dueDateCount}</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
export default AnalyticsContent;  