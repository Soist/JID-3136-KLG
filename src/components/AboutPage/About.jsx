import React from 'react';
import './About.css';

function About() {
    return (
        <div className='about-container'>
            <h1>The Teams</h1>
            <p>Hello! Welcome to the Korean Language Game web app! This project is a culmination of 4 semesters of work by Computer Science Students at the Georgia Institute of Technology. The Squid Team started this project in 2022; Team KLG improved its functionality in 2023. Here is an overview of each of the two teams:</p>

            <br></br>
            <h3>2023 - Team KLG</h3>
            <p>We are Team KLG, the group continuing this project now that the Squid Team has graduated. We are excited to help Professor Kim expand this website's functionality!</p>

            <div className="student-box-container">
                <div className="student-box">
                    <div className="student">
                        <h3>Kavya Ahuja</h3>
                        <p> <a href="https://www.linkedin.com/in/kavya-ahuja-956a5615a/">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>Sarah Mabrouk</h3>
                        <p> <a href="https://www.linkedin.com/in/sarahmabrouk/">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>Thomas Van Buren</h3>
                        <p> <a href="https://www.linkedin.com/in/tevanburen/">Developer</a> </p>
                    </div>
                </div>

                <div className="student-box">
                    <div className="student">
                        <h3>Manqi Li</h3>
                        <p>Developer</p>
                    </div>

                    <div className="student">
                        <h3>Jonathan "JT" Turner</h3>
                        <p> <a href="https://www.linkedin.com/in/the-jonathan-turner/">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>Qingyang "Leo" Yue </h3>
                        <p>Developer</p>
                    </div>
                </div>
            </div>

            <br></br>
            <h2>2022 - Squid Team</h2>
            <p>We are the Squid Team, aka. a group of 6 CS students who attend Georgia Tech. For our GT Junior Design capstone, we chose to make this website for Professor Yongtaek Kim's KOR 1001 class. Thanks for visiting our web app, and we hope this aids in your Korean language-learning journey. Here's our links: </p>

            <div className="student-box-container">
                <div className="student-box">
                    <div className="student">
                        <h3>Ishawn Gullapalli</h3>
                        <p> <a href="https://www.linkedin.com/in/ishawng/">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>Andrew Osmond</h3>
                        <p> <a href="https://www.linkedin.com/in/aosmond3/">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>James Kelley</h3>
                        <p>Developer</p>
                    </div>
                </div>

                <div className="student-box">
                    <div className="student">
                        <h3>Rina Yoo</h3>
                        <p> <a href="https://www.instagram.com/rinayooart/">Artist</a>, <a href="https://www.linkedin.com/in/rina-yoo/">Developer</a> </p>
                    </div>

                    <div className="student">
                        <h3>Karishma Rana</h3>
                        <p> <a href="https://www.linkedin.com/in/karishma-rana">Developer</a> </p>
                    </div>
                    <div className="student">
                        <h3>Arya Joshi</h3>
                        <p> <a href="https://www.linkedin.com/in/arya-joshi-3202641b3/">Developer</a> </p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default About;