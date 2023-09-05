export type Category = {
  id: number;
  name: string;
  dateCreated: string;
  userId: number;
};

export type Task = {
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  taskId: number;
};
