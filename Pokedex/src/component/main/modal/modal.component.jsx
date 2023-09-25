import { Box, Modal } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import DescPopover from "../../helpers/descPopover/descPopover.component";
import Card from "../../helpers/pokecard/card.component";
import "./modal.style.css";

const InfoModal = ({
  infoModalPokemon,
  handleClose,
  open,
  description,
  prevPokemon,
  nextPokemon,
  evolPokemons,
  evolColor,
  windowSize,
  color,
}) => {
  const progressBar = (name, value) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", placeItems: "center" }}
      >
        <label>{`${name}`.toUpperCase()}</label>
        <div
          style={{
            display: "flex",
            height: 20,
            width: "160px",
            backgroundColor: " #93b2b2",
            borderRadius: 0,
            margin: 10,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${value}%`,
              backgroundColor: "#2e3156",
              borderRadius: "inherit",
              textAlign: "right",
              textAlignLast: "justify",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >{`${value}`}</span>
          </div>
        </div>
      </div>
    );
  };

  const colorModal = () => {
    if (infoModalPokemon === undefined) return;
    else return color(infoModalPokemon);
  };

  colorModal(infoModalPokemon);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
    >
      <Box className={windowSize > 600 ? "info-modal" : "info-modal-mobile"}>
        <div
          className={
            windowSize > 600 ? "info-modal_root" : "info-modal_root-mobile"
          }
        >
          <div
            className={
              windowSize > 600
                ? "info-modal_image_header"
                : "info-modal_image_header-mobile"
            }
          >
            <div
              style={
                windowSize > 600
                  ? {
                      display: "flex",
                      backgroundImage: `${colorModal(infoModalPokemon)}`,
                    }
                  : { display: "none" }
              }
              className="info-image_card"
            >
              <img
                src={`${infoModalPokemon?.sprites.other.dream_world.front_default}`}
                alt={"pokemon"}
                className={windowSize > 600 ? "image" : "image-mobile"}
              />
            </div>
            <div
              className={
                windowSize > 600
                  ? "info-modal_para_header"
                  : "info-modal_para_header-mobile"
              }
            >
              <div
                className={
                  windowSize > 600
                    ? "info-modal_header"
                    : "info-modal_header-mobile"
                }
              >
                <div>
                  <h2>{`${infoModalPokemon?.name}`.toUpperCase()}</h2>
                </div>
                <div
                  className={
                    windowSize > 600 ? "vertical-line" : "vertical-line-mobile"
                  }
                ></div>
                <div>
                  <h2>{("00" + infoModalPokemon?.id).slice(-3)}</h2>
                </div>
                <div
                  className={
                    windowSize > 600 ? "vertical-line" : "vertical-line-mobile"
                  }
                ></div>
                <div
                  className={
                    windowSize > 600
                      ? "info-modal_header_buttons"
                      : "info-modal_header_buttons-mobile"
                  }
                  style={{ width: "80px" }}
                >
                  <ArrowCircleLeftOutlinedIcon
                    onClick={(e) => prevPokemon(e)}
                    style={{
                      cursor: "pointer",
                      display: windowSize > 600 ? "flex" : "none",
                      padding: "2px",
                      margin: "4px",
                    }}
                  />

                  <CancelOutlinedIcon
                    style={{
                      display: "inline",
                      cursor: "flex",
                      padding: "2px",
                      margin: "4px",
                    }}
                    onClick={(e) => handleClose(e)}
                  />
                  <ArrowCircleRightOutlinedIcon
                    onClick={(e) => nextPokemon(e)}
                    style={{
                      cursor: "pointer",
                      display: windowSize > 600 ? "flex" : "none",
                      padding: "2px",
                      margin: "4px",
                    }}
                  />
                </div>
              </div>

              <div style={windowSize > 600 ? {} : { display: "flex" }}>
                <div
                  style={
                    windowSize < 600
                      ? {
                          display: "flex",
                          backgroundImage: `${colorModal(infoModalPokemon)}`,
                        }
                      : { display: "none" }
                  }
                  className="info-image_card-mobile"
                >
                  <img
                    src={`${infoModalPokemon?.sprites.other.dream_world.front_default}`}
                    alt={"pokemon"}
                    className={windowSize > 600 ? "image" : "image-mobile"}
                  />
                </div>

                <div
                  className={
                    windowSize > 600
                      ? "info-modal_para"
                      : "info-modal_para-mobile"
                  }
                >
                  <p style={{ margin: "0", display: "inline" }}>
                    {windowSize > 600
                      ? description[infoModalPokemon?.id - 1]
                          ?.slice(0, 4)
                          .join("")
                          .replace(/[^a-zA-Z ]/g, "")
                      : description[infoModalPokemon?.id - 1]
                          ?.slice(0, 1)
                          .join("")
                          .replace(/[^a-zA-Z ]/g, "")}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      display: "inline",
                    }}
                  >
                    <u>
                      <DescPopover
                        windowSize={windowSize}
                        description={description[infoModalPokemon?.id - 1]
                          ?.slice(0, 10)
                          .join("")
                          .replace(/[^a-zA-Z ]/g, " ")}
                      ></DescPopover>
                    </u>
                  </p>
                </div>
              </div>

              <div
                className={
                  windowSize > 600
                    ? "read-more_modal"
                    : "read-more_modal-mobile"
                }
              ></div>
            </div>
          </div>
          <div
            className={
              windowSize > 600
                ? "info-modal_details"
                : "info-modal_details-mobile"
            }
          >
            <div
              className={
                windowSize > 600
                  ? "info-modal_details_row1"
                  : "info-modal_details_row1-mobile"
              }
            >
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Height</h4>
                <p>{infoModalPokemon?.height}'</p>
              </div>
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Weight</h4> <p>{infoModalPokemon?.weight} Kg</p>
              </div>
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Gender(s)</h4> <p>{}</p>
              </div>
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Egg Groups</h4> <p>{}</p>
              </div>
            </div>
            <div
              className={
                windowSize > 600
                  ? "info-modal_details_row2"
                  : "info-modal_details_row2-mobile"
              }
            >
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Abilities</h4>{" "}
                <p>
                  {infoModalPokemon?.abilities[0]?.ability.name},{" "}
                  {infoModalPokemon?.abilities[1]?.ability.name}
                </p>
              </div>
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Types</h4>
                <p>
                  {infoModalPokemon?.types[0]?.type.name},{" "}
                  {infoModalPokemon?.types[1]?.type.name}
                </p>
              </div>
              <div
                className={
                  windowSize > 600
                    ? "info-modal_details_content"
                    : "info-modal_details_content-mobile"
                }
              >
                <h4>Weak against</h4> <p></p>
              </div>
            </div>
          </div>
          <div className={windowSize > 600 ? "stats-row" : "stats-row-mobile"}>
            <h3>Stats</h3>
            <div
              className={windowSize > 600 ? "stats-list" : "stats-list-mobile"}
            >
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[0].stat.name,
                  infoModalPokemon?.stats[0].base_stat
                )}
              </div>
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[2].stat.name,
                  infoModalPokemon?.stats[2].base_stat
                )}
              </div>
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[4].stat.name,
                  infoModalPokemon?.stats[4].base_stat
                )}
              </div>
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[1].stat.name,
                  infoModalPokemon?.stats[1].base_stat
                )}
              </div>
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[3].stat.name,
                  infoModalPokemon?.stats[3].base_stat
                )}
              </div>
              <div
                className={
                  windowSize > 600 ? "stats-progress" : "stats-progress-mobile"
                }
              >
                {progressBar(
                  infoModalPokemon?.stats[5].stat.name,
                  infoModalPokemon?.stats[5].base_stat
                )}
              </div>
            </div>
          </div>
          <div
            className={
              windowSize > 600 ? "evolution-main" : "evolution-main-mobile"
            }
          >
            <div
              className={
                windowSize > 600
                  ? "evolution-heading"
                  : "evolution-heading-mobile"
              }
            >
              <h3>Evolution Chain</h3>
            </div>
            <div
              className={
                windowSize > 600 ? "evolution-chain" : "evolution-chain-mobile"
              }
            >
              {windowSize > 600 ? (
                evolPokemons[0] ? (
                  <Card
                    img={`${evolPokemons[0]?.sprites.other.dream_world.front_default}`}
                    pokemon={evolPokemons[0]?.name}
                    index={evolPokemons[0]?.id}
                    color={evolColor?.[0]}
                  />
                ) : (
                  ""
                )
              ) : (
                <div
                  className="evolution-chain_card-mobile"
                  style={{ backgroundImage: `${evolColor?.[0]}` }}
                >
                  <img
                    src={`${evolPokemons[0]?.sprites.other.dream_world.front_default}`}
                    alt={"pokemon"}
                    className="evolution-chain-image-mobile"
                  />
                </div>
              )}
              {evolPokemons[0] ? (
                <h2
                  className={
                    windowSize > 600
                      ? "evolution-chain_arrow"
                      : "evolution-chain_arrow-mobile"
                  }
                >
                  &#8594;
                </h2>
              ) : (
                ""
              )}
              {windowSize > 600 ? (
                evolPokemons[1] ? (
                  <Card
                    img={`${evolPokemons[1]?.sprites.other.dream_world.front_default}`}
                    pokemon={evolPokemons[1]?.name}
                    index={evolPokemons[1]?.id}
                    color={evolColor?.[1]}
                  />
                ) : (
                  ""
                )
              ) : (
                <div
                  className="evolution-chain_card-mobile"
                  style={{ backgroundImage: `${evolColor?.[1]}` }}
                >
                  <img
                    src={`${evolPokemons[1]?.sprites.other.dream_world.front_default}`}
                    alt={"pokemon"}
                    className="evolution-chain-image-mobile"
                  />
                </div>
              )}
              {evolPokemons[2] ? (
                <h2
                  className={
                    windowSize > 600
                      ? "evolution-chain_arrow"
                      : "evolution-chain_arrow-mobile"
                  }
                >
                  &#8594;
                </h2>
              ) : (
                ""
              )}
              {windowSize > 600 ? (
                evolPokemons[2] ? (
                  <Card
                    img={`${evolPokemons[2]?.sprites.other.dream_world.front_default}`}
                    pokemon={evolPokemons[2]?.name}
                    index={evolPokemons[2]?.id}
                    color={evolColor?.[2]}
                  />
                ) : (
                  ""
                )
              ) : (
                <div
                  className="evolution-chain_card-mobile"
                  style={{ backgroundImage: `${evolColor?.[2]}` }}
                >
                  <img
                    src={`${evolPokemons[2]?.sprites.other.dream_world.front_default}`}
                    alt={"pokemon"}
                    className="evolution-chain-image-mobile"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default InfoModal;
