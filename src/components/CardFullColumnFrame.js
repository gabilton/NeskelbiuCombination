import RecentlyAddedBox from "./RecentlyAddedBox";
import CategoryFrame1 from "./CategoryFrames/CategoryFrame1";
import CategoryFrame2 from "./CategoryFrames/CategoryFrame2";
import CategoryFrame3 from "./CategoryFrames/CategoryFrame3";
import CategoryFrame4 from "./CategoryFrames/CategoryFrame4";
import CategoryFrame5 from "./CategoryFrames/CategoryFrame5";
import CategoryFrame6 from "./CategoryFrames/CategoryFrame6";
import CategoryFrame7 from "./CategoryFrames/CategoryFrame7";
import CategoryFrame8 from "./CategoryFrames/CategoryFrame8";
import "./CardFullColumnFrame.css";
const CardFullColumnFrame = () => {
  return (
    <div className="cardfullcolumnframe">
      <div className="recentlyaddedandkategoriesfram">
        <div className="recentlyaddedframe">
          <RecentlyAddedBox />
        </div>
        <div className="first4categoriesframe">
          <div className="and2categoriesrowframe">
            <CategoryFrame1 />
            <CategoryFrame2 />
          </div>
          <div className="and4categoriesrowframe">
            <CategoryFrame3 />
            <CategoryFrame4 />
          </div>
        </div>
      </div>
      <div className="last4categoriesframe">
        <div className="and6categoriesrowframe">
          <CategoryFrame5 />
          <CategoryFrame6 />
        </div>
        <div className="and6categoriesrowframe">
          <CategoryFrame7 />
          <CategoryFrame8 />
        </div>
      </div>
    </div>
  );
};

export default CardFullColumnFrame;
