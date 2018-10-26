export interface Project {
  id?: string;
  name: string;
  desc: string;
  coverImg: string;
  taskLists?: string[]; // 列表的id
  members?: string[]; // 项目成员id
}
