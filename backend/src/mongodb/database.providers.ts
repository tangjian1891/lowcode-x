import * as mongoose from "mongoose";
const password = "q8vk3pUKSKZEvtww";
const uri = `mongodb+srv://tangjian1891:${password}@cluster0.lhndjvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(uri),
  },
];
