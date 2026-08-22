import React from "react";

function InformationCard({ heading, value, date, avatarClass, avatarBgClass }: any) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card mini-stats-wid mb-0 h-100">
        <div className="card-body">
          <div className="d-flex">
            <div className="flex-grow-1">
              <p className="fw-bold mb-2">{heading}</p>
              <h2 className="mb-0">
                <a href="on-way.html" className="text-info">
                  {value}
                </a>
              </h2>
              <small>{date ? `as on ${date}` : ""}</small>
            </div>
            <div className="flex-shrink-0 align-self-center">
              <div className={`mini-stat-icon avatar-sm rounded-circle ${avatarBgClass} align-self-center`}>
                <span className="avatar-title">
                  <i className={`fas ${avatarClass} font-size-24`}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationCard;
