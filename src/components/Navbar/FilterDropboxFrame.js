import "./FilterDropboxFrame.css";
const FilterDropboxFrame = ({ onClose }) => {
  return (
    <div className="filterdropboxframe">
      <select className="townselectionframe">
        <option value="Vilnius">Vilnius</option>
        <option value="Kaunas">Kaunas</option>
      </select>
      <select className="townselectionframe">
        <option value="Pirma">Pirma</option>
        <option value="Antra">Antra</option>
      </select>
      <select className="townselectionframe">
        <option value="PirmaSaka">PirmaSaka</option>
        <option value="AntraSaka">AntraSaka</option>
      </select>
    </div>
  );
};

export default FilterDropboxFrame;
