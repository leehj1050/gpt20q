import { motion } from "framer-motion";
import BaZi from "./BaZi";
import { FaYinYang } from "react-icons/fa";
import { GiHearts, GiCrystalBall, GiStarSwirl } from "react-icons/gi";
import { useSelectedStore } from "../store/useSelectedStore";
import { SajuType } from "@/app/types";

interface MenuListType {
    id: SajuType;
    title: string;
    icon: React.ReactNode
    desc: string;
}

const menuList: MenuListType[] = [
    { id: "newyear", title: "신년운세", icon: <GiStarSwirl className="text-3xl text-[#D2691E]" />, desc: "새해의 운세를 미리 확인하세요." },
    { id: "saju", title: "사주풀이", icon: <FaYinYang className="text-3xl text-[#8B5CF6]" />, desc: "당신의 사주팔자를 깊이 분석합니다." },
    { id: "today", title: "오늘의 운세", icon: <GiCrystalBall className="text-3xl text-[#4ADE80]" />, desc: "오늘 하루의 기운과 흐름을 확인하세요." },
    { id: "match", title: "궁합", icon: <GiHearts className="text-3xl text-[#F87171]" />, desc: "두 사람의 인연과 궁합을 알아보세요." },
]

const MainSelect = () => {
    const { selectedType, setSelectedType } = useSelectedStore()



    // ✅ 버튼 클릭 시 해시 추가 + 상태 변경
    const handleSelect = (type: SajuType) => {
        if (!type) return;

        setSelectedType(type);
        // URL에 해시 추가 (브라우저 히스토리 스택에 쌓임)
        window.history.pushState({ fortune: type }, "", `#${type}`);
    };


    // ✅ 선택한 운세에 따라 폼 컴포넌트 전환
    if (selectedType) {
        return <BaZi />
    }


    return (
        <div className="flex flex-col items-center md:h-full">
            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-[#FACC15]">무엇을 보고싶으신가요?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl md:h-full">
                {menuList.map((menu) => (
                    <motion.button
                        key={menu.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            if (menu.id === "match") alert("서비스 준비중...")
                            else handleSelect(menu.id)
                        }}
                        className="flex flex-col items-center justify-center bg-[#141322]/70 border border-[#8B5CF6]/30 rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
                    >
                        {menu.icon}
                        <p className="mt-3 text-lg font-bold text-[#FACC15]">{menu.title}</p>
                        <p className="text-sm text-gray-400 mt-1 text-center">{menu.desc}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default MainSelect;
