import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Umumiy Daromad</h1>
        <MoreVertIcon fontSize="small" className="revenue-menu" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={65} text={`${65}%`} strokeWidth={5} />
        </div>
        <p className="title">Bugungi Daromad</p>
        <p className="amount">${420}</p>
        <p className="desc">Previous transactions processing. Last payments may not be included.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Hozir</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${12.4}k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">O'tgan Hafta</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${12.4}k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">O'tgan Oy</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
