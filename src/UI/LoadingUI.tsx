import { SajuType } from "@/app/types";

const TYPE_MAP = {
    saju: "사주플이를",
    newyear: "신년운세를",
    today: "오늘의운세를",
    match: "궁합을",
    default: "운명을"
}

const FortuneLoadingUI = ({ sajuType }: { sajuType: SajuType | null }) => {
    const message = `당신의 ${TYPE_MAP[sajuType ?? "default"]} 분석하고 있어요`


    return (
        <div className="flex flex-col items-center justify-center py-16 text-center h-full">
            {/* 운명 원판 */}
            <div className="relative w-20 h-20 mb-6">
                {/* 바깥 원 */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin-slow" />

                {/* 안쪽 빛 */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-cyan-400/30 blur-sm" />

                {/* 중앙 점 */}
                <div className="absolute inset-6 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
            </div>


            {/* 메시지 */}
            <p className="text-sm md:text-lg text-purple-400 tracking-wide text-shimmer">
                {message}
            </p>
            <p className="mt-1 text-xs text-purple-300/60">
                잠시만 기다려주세요
            </p>
        </div >
    );
};

export default FortuneLoadingUI;
