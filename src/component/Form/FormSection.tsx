import { useRef } from 'react'
import { useUserStore } from '../../store/userDataStore'
import { useUserFormHandlers } from '@/utils/useUserFormHandlers'
import { birthTimeOptions } from './config';

const FormSection = ({ onClick }: { onClick: () => void }) => {
    //ref
    const dateRef = useRef<HTMLInputElement>(null);

    //store
    const { userData } = useUserStore()
    const { handleChangeInput, hadelSelectTime, handleSelectOptions } = useUserFormHandlers()


    const openDatePicker = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const el = dateRef.current as any;

        if (el) {
            if ("showPicker" in el) {
                el.showPicker();
            } else {
            }
        }
    };


    return (
        <div className="w-full h-full flex flex-1 flex-col min-h-0 overflow-y-auto">
            <div className="h-full flex flex-col gap-3 ">
                <form className=" flex flex-col flex-1 gap-5 md:gap-8">
                    <div>
                        <label className="block mb-1 text-gray-300">이름</label>
                        <input
                            value={userData.userName}
                            name="userName"
                            type="text"
                            placeholder="홍길동"
                            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] outline-none"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select value={userData.birthMoon} className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]" onChange={handleSelectOptions}>
                            <option value="solar" id="solar">
                                양력
                            </option>
                            <option value="lunar" id="lunar">
                                음력
                            </option>
                            <option value="leap" id="leap">
                                윤달
                            </option>
                        </select>
                        <select value={userData.gender} className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]" onChange={handleSelectOptions}>
                            <option value="male">남자</option>
                            <option value="female">여자</option>
                        </select>
                    </div>

                    <div onClick={openDatePicker}>
                        <label htmlFor="birthDate" className="block mb-1 text-gray-300">
                            생년월일
                        </label>
                        <input
                            value={userData.birthDate}
                            name="birthDate"
                            ref={dateRef}
                            id="birthDate"
                            type="date"
                            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6] appearance-none"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="birthTime" className="block mb-1 text-gray-300">
                            출생 시간
                        </label>
                        <select
                            id="birthTime"
                            value={userData.birthTime}
                            onChange={hadelSelectTime}
                            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6] appearance-none">
                            <option value="" disabled>
                                선택
                            </option>
                            {birthTimeOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label} ({item.start} ~ {item.end})
                                </option>
                            ))}
                        </select>


                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="text-xs text-gray-500 mt-1">모르면 '모름'에 체크하세요</p>
                    </div>

                    <div className="flex gap-3">
                        <label htmlFor="unknown" className="block text-gray-300 ">
                            모름
                        </label>
                        <input
                            name="unknown"
                            id="unknown"
                            type="checkbox"
                            className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:border-[#8B5CF6]"
                            onChange={handleChangeInput}
                            checked={userData.unknown}
                        />
                    </div>
                </form>
                <button
                    type="button"
                    onClick={onClick}
                    className="w-full mt-auto py-3 bg-gradient-to-r from-[#8B5CF6] to-[#FACC15] text-black font-semibold rounded-lg shadow-lg hover:scale-[1.02] transition">
                    운세 보기 🔮
                </button>
            </div>
        </div>
    )
}

export default FormSection