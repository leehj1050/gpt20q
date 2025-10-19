import { UserInfoType } from "./types"

export const ButtonList = [
    { id: "button_1", name: "close", color: "#FF5050" },
    { id: "button_2", name: "mini", color: "#F7DB3C" },
    { id: "button_3", name: "full", color: "#50D63E" },
]

export const userInfo: UserInfoType[] = [
    {
        id: "user_name", title: "이름", name: "userName", placeholder: "홍길동", type: "text", child: [
            { id: "gender_mail", title: "남자", name: "gender", type: "radio" },
            { id: "gender_femail", title: "여자", name: "gender", type: "radio" },
        ]
    },

    {
        id: "user_birthday", title: "생년월일", name: "birthDate", placeholder: "911015", type: "text", child: [
            { id: "birthday_solar", title: "양력", name: "birthMoon", type: "radio" },
            { id: "birthday_lunar", title: "음력", name: "birthMoon", type: "radio" },
            { id: "birthday_leap", title: "윤달", name: "birthMoon", type: "radio" },
        ]
    },
    {
        id: "user_birth_time", title: "출생시간", name: "birthTime", type: "time", child: [
            { id: "birth_time_unknown", title: "모름", name: "unknown", type: "checkbox" }
        ]
    },
]