import Experience, { ExperienceConfig } from "@/Experience/Experience";
import { useEffect, useRef } from "react";

const useApplyShader = (config: ExperienceConfig) => {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      new Experience(config);
      initialized.current = true; // 标记为已初始化
    }
  }, [config]);
};

export default useApplyShader;
