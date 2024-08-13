import Experience, { ExperienceConfig } from "@/Experience/Experience";
import { useEffect } from "react";

const useApplyShader = (config: ExperienceConfig) => {
  useEffect(() => {
    new Experience(config);
  }, [config]);
};

export default useApplyShader;
