import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Slider,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";
import "./responsiveModal.style.css";

const ResponsiveModal = ({
  types,
  filterByType,
  stats,
  filterByStats,
  resetStats,
  openResponsive,
  handleCloseResponsive,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [statVals, setStatValues] = useState([]);

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    if (stats && statVals.length === 0) {
      setStatValues(
        stats.map((record) => {
          return { key: record, value: [0, 210] };
        })
      );
    }
  }, [stats, statVals.length]);

  const updateVal = (values, index) => {
    statVals[index].value = values;
    setStatValues([...statVals]);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="responsive-modal_root">
      <Modal
        keepMounted
        open={openResponsive}
        onClose={handleCloseResponsive}
        aria-labelledby="keep-mounted-modal-title"
        sx={{ borderRadius: "10px" }}
      >
        <div className="responsive-modal">
          <h3 style={{ alignSelf: "flex-start" }}>Filters</h3>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              padding: "5px",
              margin: "5px",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<AddCircleOutlineIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                sx={{
                  width: "33%",
                  flexShrink: 0,
                  color: "#2e3156",
                  fontWeight: "bold",
                }}
              >
                Types
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <div className="type-accord_items">
                {types.map((record, key) => {
                  return (
                    <div className="type-accord_item" key={key} value={record}>
                      <label className="type-accord_label">
                        <input type="checkbox" onChange={filterByType}></input>
                        <p>{capitalize(record)}</p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              padding: "5px",
              margin: "5px",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<AddCircleOutlineIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography
                sx={{
                  width: "33%",
                  flexShrink: 0,
                  color: "#2e3156",
                  fontWeight: "bold",
                }}
              >
                Gender
              </Typography>
            </AccordionSummary>
            <select className="gender-responsive">
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Genderless</option>
            </select>
          </Accordion>

          {/* stats */}
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              padding: "5px",
              margin: "5px",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<AddCircleOutlineIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography
                sx={{
                  width: "33%",
                  flexShrink: 0,
                  color: "#2e3156",
                  fontWeight: "bold",
                }}
              >
                Stats
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <div className="stat-accord_items">
                {statVals.map((record, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="accord-slider-component"
                        style={{ display: "flex", flexDirection: "column" }}
                        key={index}
                      >
                        <div className="accord-statName">{record.key}</div>
                        <div className="accord-slider">
                          <Slider
                            sx={{
                              display: "flex",
                              color: "#2E3156",
                              width: "140px",
                            }}
                            valueLabelDisplay="auto"
                            value={record.value}
                            onChange={(event) =>
                              updateVal(event.target.value, index)
                            }
                            disableSwap
                            max={210}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="accord-buttons">
                  <button
                    className="accord-reset"
                    onClick={() => {
                      setStatValues(
                        stats.map((record) => {
                          return { key: record, value: [0, 210] };
                        })
                      );
                      resetStats();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="accord-apply"
                    onClick={() => filterByStats(statVals)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Modal>
    </div>
  );
};

export default ResponsiveModal;
