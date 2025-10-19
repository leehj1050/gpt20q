type PrimaryInfo = {
    placeholder?: string;
    id: string,
    title: string,
    type: string;
    name:string
}
export interface UserInfoType extends PrimaryInfo{
    child: PrimaryInfo[],
}