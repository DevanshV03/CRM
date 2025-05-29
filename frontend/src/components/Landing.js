import React from "react";
import "./Landing.css";
import bg from '../assets/bg.jpg'; 

const Landing = ({gotoSignup}) => {
  return (
    <div
  className="landing-bg"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '100vh'
  }}
>
      <div className="landing-main">
        {/* Left Side: Headline & Buttons */}
        <div className="landing-left">
          <div className="landing-badge">
            <span>New!</span> Introducing Contree 3.0 <span role="img" aria-label="celebrate">🎉</span>
          </div>
          <h1>
            Empower Your <br />
            Sales Team with <br />
            <span className="accent">Smarter CRM</span>
          </h1>
          <p className="landing-desc">
            Streamline workflows, nurture leads, and close deals faster with our all-in-one CRM solution designed for growing businesses.
          </p>
          <div className="landing-btns">
            <button className="cta" onClick={gotoSignup}>Sign Up</button>
            <button className="ghost">Contact Sales</button>
          </div>
        </div>
        {/* Right Side: Feature Cards */}
        <div className="landing-right">
          <div className="card mini-card">
            <div className="card-label">Conversion</div>
            <div className="card-big">50.5%</div>
            <div className="mini-bar">
              <div className="bar" style={{ width: "70%" }}></div>
              <div className="bar" style={{ width: "55%" }}></div>
              <div className="bar" style={{ width: "87%" }}></div>
              <div className="bar" style={{ width: "44%" }}></div>
            </div>
          </div>
          <div className="card graph-card">
            <div className="card-label">Monthly Revenue Growth</div>
            <div className="fake-graph">
              <svg height="60" width="140">
                <polyline
                  points="2,49 20,44 35,24 50,30 70,15 100,45 130,39"
                  style={{ fill: "none", stroke: "#8B5CF6", strokeWidth: 3 }}
                />
              </svg>
              <div className="graph-label">Apr 2024: $8.8k</div>
            </div>
          </div>
          <div className="card lead-card">
            <div>
              <span className="card-label">Lead Sources</span>
              <span className="lead-time">Last 6 Months</span>
            </div>
            <div className="leads-main">
              <div className="lead-num">504</div>
              <div className="lead-growth">+1.83%</div>
            </div>
            <div className="lead-row">
              <span>Social Media</span>
              <span className="lead-box blue">168</span>
            </div>
            <div className="lead-row">
              <span>Website</span>
              <span className="lead-box purple">104</span>
            </div>
            <div className="lead-row">
              <span>Email</span>
              <span className="lead-box pink">20</span>
            </div>
          </div>
        </div>
      </div>
      {/* Logos Row */}
    </div>
  );
};

export default Landing;
