import Carousel from "./carousel";
import CountUp from "react-countup";
import Context from "./context/Context";

import { useContext } from "react";

export default function Dashboard() {
  const date = new Date();
  const context = useContext(Context);
  return (
    <>
      <div className="projects-section dashboard-section">
        <div className="projects-section-header">
          <p>Dashboard</p>
          <p className="time">{date.toDateString()}</p>
        </div>
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number value-books">
                <CountUp
                  end={context.filteredbookListData.length}
                  duration={3}
                />
              </span>
              <span className="status-type">Total Books</span>
            </div>
            <div className="item-status">
              <span className="status-number">
                <CountUp end={context.filteredMemberData.length} duration={3} />
              </span>
              <span className="status-type">Total Members</span>
            </div>
            <div className="item-status">
              <span className="status-number">
                {" "}
                <CountUp end={context.issuedBook} />
              </span>
              <span className="status-type">Issued Books</span>
            </div>
          </div>
        </div>
        <div className="new-arrivals">New Arrivals</div>
        <div className={`project-boxes row`} id="project-boxes">
          <Carousel />
        </div>
      </div>
    </>
  );
}
