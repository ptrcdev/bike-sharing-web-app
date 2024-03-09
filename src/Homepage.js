import React from "react";
import './Homepage.css';

function Homepage( {handleStart }) {

    
    return (
        <div className="welcome">
            <div>
            <h1>Welcome!</h1>
            <h2> Here are just some instructions on how the website works.</h2>

            <h4>Map</h4>
            <p>
                There's a map. First thing that you will see is a lot of markers indicating all the networks per country.
                On the map, you will have + and - buttons that can control the zoom and also a back button that should be disabled at first.
                Once you click on a network, the markers will disappear and you will see new markers. These markers are the stations available in the network you have selected.
                If you wish to get more information about those stations, click on the markers to open a small pop up with their info!
            </p>

            <h4>Back Button</h4>
            <p>
                As I mentioned before, there is a small back button underneath the zoom control buttons. At first, it should be disabled. What this button does is - you guessed it - go back.

                So, for example, if you have clicked on a network by mistake and you want to go back and see all the networks again, just click on the button!
            </p>

            <h4>Information Button</h4>
            <p>
                There is also a information button on the top left corner of the screen. Click it if you want to come back to this page!
            </p>
            <h3>Pretty easy, right? If you're ready to dive in, click the button below!</h3>

            <button className="start" onClick={handleStart}>Start looking!</button>

            </div>
        </div>
    )
}

export default Homepage;