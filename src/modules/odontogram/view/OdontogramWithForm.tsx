import AffectationForm from "../components/AffectationForm";
import Odontogram from "../components/Odontogram";

import useOdontogramForm from "../hook/useOdontogramForm";

const OdontogramWithForm = () => {
  const { odontogramData, handleToothClick } = useOdontogramForm();

  return (
    <>
      <AffectationForm />

      <Odontogram
        odontogramData={odontogramData}
        handleToothClick={handleToothClick}
      />
    </>
  );
};

export default OdontogramWithForm;
