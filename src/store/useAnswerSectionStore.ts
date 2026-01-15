import { Section, SECTION_CONFIG } from "@/component/Answer/answerConfig";
import { useAnswerStore } from "./useAnswerStore";
import { useSelectedStore } from "./useSelectedStore";

// 사주타입에 따라 결과ui다르게
export const useAnswerSections = (): Section[] => {
  const { answerData } = useAnswerStore();
    const { selectedType } = useSelectedStore();
    
     if (selectedType === null) return [];

    return SECTION_CONFIG[selectedType](answerData);
};