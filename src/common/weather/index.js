import './less/index.less'
import React, { Component } from 'react';
export const Sunny = () => {
    return(
        <div className="weather">
        <div className="sunny">
            <span className="sun"></span>
            </div>
        </div>
    )
}

export const Cloudy = () => {
    return (
        <div className="weather">
            <div className="cloudy">
                <span className="cloud"></span>
                <span className="cloud"></span>
            </div>
        </div>
    )
}

export const Snowy = () => {
    return (
        <div className="weather">
            <div className="snowy">
                <span className="snowman"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )

}

export const Stormy = () => {
    return (
        <div className="weather">
            <div className="stormy">
                <span className="cloud"></span>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>

    )
}

export const Supermoon = () => {
    return (
        <div className="weather">
            <div className="supermoon">
                <span className="moon"></span>
                <span className="meteor"></span>
            </div>
        </div>
    )
}