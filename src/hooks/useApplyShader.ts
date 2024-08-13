import Experience from "@/Experience/Experience";
import { useEffect } from "react";

export interface IUseApplyShader {
  id: string;
}

const useApplyShader = (id: string) => {
  useEffect(() => {
    new Experience(id);
  }, [id]);
};

export default useApplyShader;
