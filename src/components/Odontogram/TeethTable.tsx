import useOdontogramStates from "./useOdontogramStates";
import Tooth from "./Tooth";
import "./styles.css";

interface Props {
  enableButton?: boolean;
}

const TeethTable = ({ enableButton = true }: Props) => {
  const { completeOdontogram, handleToothStateChange, teethList } =
    useOdontogramStates(enableButton);
  return (
    <div className="teeth_table">
      <div id="teeth_permanent_maxillary" className="quadrants">
        <div id="maxillary_right" className="quadrant">
          {teethList.permanent["1"].map((tooth) => (
            <Tooth
              quadrant={"1"}
              tooth={tooth}
              key={tooth.tooth}
              handleToothStateChange={handleToothStateChange}
            />
          ))}
        </div>

        <div id="maxillary_left" className="quadrant">
          {teethList.permanent["2"].map((tooth) => (
            <Tooth
              quadrant={"2"}
              tooth={tooth}
              key={tooth.tooth}
              handleToothStateChange={handleToothStateChange}
            />
          ))}
        </div>
      </div>
      {completeOdontogram && (
        <>
          <div id="teeth_temporary_maxillary" className="quadrants">
            <div id="maxillary_right" className="quadrant">
              {teethList.temporary["5"].map((tooth) => (
                <Tooth
                  quadrant={"5"}
                  tooth={tooth}
                  key={tooth.tooth}
                  handleToothStateChange={handleToothStateChange}
                />
              ))}
            </div>

            <div id="maxillary_left" className="quadrant">
              {teethList.temporary["6"].map((tooth) => (
                <Tooth
                  quadrant={"6"}
                  tooth={tooth}
                  key={tooth.tooth}
                  handleToothStateChange={handleToothStateChange}
                />
              ))}
            </div>
          </div>

          <div id="teeth_temporary_mandibular" className="quadrants">
            <div id="mandibular_right" className="quadrant">
              {teethList.temporary["8"].map((tooth) => (
                <Tooth
                  quadrant={"8"}
                  tooth={tooth}
                  key={tooth.tooth}
                  handleToothStateChange={handleToothStateChange}
                />
              ))}
            </div>

            <div id="mandibular_left" className="quadrant">
              {teethList.temporary["7"].map((tooth) => (
                <Tooth
                  quadrant={"7"}
                  tooth={tooth}
                  key={tooth.tooth}
                  handleToothStateChange={handleToothStateChange}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <div id="teeth_permanent_mandibular" className="quadrants">
        <div id="mandibular_right" className="quadrant">
          {teethList.permanent["3"].map((tooth) => (
            <Tooth
              quadrant={"3"}
              tooth={tooth}
              key={tooth.tooth}
              handleToothStateChange={handleToothStateChange}
            />
          ))}
        </div>

        <div id="mandibular_left" className="quadrant">
          {teethList.permanent["4"].map((tooth) => (
            <Tooth
              quadrant={"4"}
              tooth={tooth}
              key={tooth.tooth}
              handleToothStateChange={handleToothStateChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeethTable;
