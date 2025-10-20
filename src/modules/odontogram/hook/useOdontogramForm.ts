import { constantTeethList } from "@/utils/constants";
import { FACE_TYPE, ITeethList, IToothObject } from "../types/type";

function useOdontogramForm() {
  const odontogramData: ITeethList = constantTeethList;
  
  const handleToothClick = (tooth: IToothObject, face?: FACE_TYPE) => {
    console.log(tooth, face);
  };

  return {
    odontogramData,
    handleToothClick,
  };
}

export default useOdontogramForm;
