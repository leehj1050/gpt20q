export type BirthTimeOption = {
  id: string;
  label: string;
  start: string;
  end: string;
  value:string
};

//태어난시
export const birthTimeOptions: BirthTimeOption[] = [
  { id: "ja", label: "자시", start: "00:00", end: "01:30", value: "자시(00:00~01:30)" },
  { id: "chuk", label: "축시", start: "01:31", end: "03:30", value: "축시(01:31~03:30)" },
  { id: "in", label: "인시", start: "03:31", end: "05:30", value: "인시(03:31~05:30)" },
  { id: "myo", label: "묘시", start: "05:31", end: "07:30", value: "묘시(05:31~07:30)" },
  { id: "jin", label: "진시", start: "07:31", end: "09:30", value: "진시(07:31~09:30)" },
  { id: "sa", label: "사시", start: "09:31", end: "11:30", value: "사시(09:31~11:30)" },
  { id: "oh", label: "오시", start: "11:31", end: "13:30", value: "오시(11:31~13:30)" },
  { id: "mi", label: "미시", start: "13:31", end: "15:30", value: "미시(13:31~15:30)" },
  { id: "sin", label: "신시", start: "15:31", end: "17:30", value: "신시(15:31~17:30)" },
  { id: "yu", label: "유시", start: "17:31", end: "19:30", value: "유시(17:31~19:30)" },
  { id: "sul", label: "술시", start: "19:31", end: "21:30", value: "술시(19:31~21:30)" },
  { id: "hae", label: "해시", start: "21:31", end: "23:30", value: "해시(21:31~23:30)" },
  { id: "yaja", label: "야자시", start: "23:31", end: "24:00", value: "야자시(23:31~24:00)" },
];

