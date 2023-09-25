import React, { useState } from "react";
import Dropdown from "../../helpers/dropdown/dropdown.component";
import StatsModal from "../../helpers/slider/slider.component";
import "./filters.style.css";
import TuneIcon from "@mui/icons-material/Tune";
import ResponsiveModal from "../../helpers/responsive-modal/responsiveModal.component";

const Filters = ({
  searchPokemon,
  types,
  stats,
  filterByType,
  filterByStats,
  resetStats,
  windowSize,
}) => {
  const [open, setOpen] = useState(false);
  const [slider, setSlider] = useState(false);
  const [responsive, setResponsive] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const openSlider = () => setSlider(!slider);
  const closeSlider = () => setSlider(false);

  const handleCloseResponsive = () => setResponsive(false);
  const openResponsiveModal = () => setResponsive(!responsive);

  return (
    <div>
      <div className="filters">
        <input
          type="search"
          onChange={(e) => searchPokemon(e)}
          className={windowSize > 600 ? "search" : "search-mobile"}
          placeholder="Name or Number"
        ></input>

        <button
          name="Normal"
          value="Types"
          type="button"
          className={windowSize > 600 ? "type-button" : "type-button-mobile"}
          onClick={() => handleOpen()}
          style={
            open ? { backgroundColor: "white" } : { backgroundColor: "#c9dde2" }
          }
        >
          Types
        </button>
        <Dropdown
          onHandleChange={(e) => filterByType(e)}
          records={types}
          open={open}
          handleClose={handleClose}
        />

        <select className={windowSize > 600 ? "gender" : "gender-mobile"}>
          <option value="">Male</option>
          <option value="">Female</option>
          <option value="">Genderless</option>
        </select>

        <button
          name="Normal"
          value="Stats"
          type="button"
          className={windowSize > 600 ? "stats-button" : "stats-button-mobile"}
          onClick={() => openSlider()}
          style={
            slider
              ? { backgroundColor: "white" }
              : { backgroundColor: "#c9dde2" }
          }
        >
          Stats
        </button>
        <StatsModal
          records={stats}
          handleClose={closeSlider}
          open={slider}
          filterByStats={filterByStats}
          resetStats={resetStats}
        />

        <div
          className={
            windowSize > 600 ? "filters-button" : "filters-button-mobile"
          }
          onClick={() => openResponsiveModal()}
        >
          <TuneIcon></TuneIcon>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {windowSize < 600 && (
            <ResponsiveModal
              windowSize={windowSize}
              open={open}
              types={types}
              handleClose={handleClose}
              filterByType={filterByType}
              handleOpen={handleOpen}
              openSlider={openSlider}
              slider={slider}
              stats={stats}
              closeSlider={closeSlider}
              filterByStats={filterByStats}
              resetStats={resetStats}
              handleCloseResponsive={handleCloseResponsive}
              openResponsive={responsive}
            ></ResponsiveModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
