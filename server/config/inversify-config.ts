import "reflect-metadata";
import { Container } from "inversify";

import INVERSIFY_TYPES from "./inversify-types";
import { IDataBase } from "../database/IDataBase";
import { InMemoryDataBase } from "../database/InMemoryDataBase";

let container = new Container();
container.bind<IDataBase>(INVERSIFY_TYPES.IDataBase).to(InMemoryDataBase).inSingletonScope();

export default container;