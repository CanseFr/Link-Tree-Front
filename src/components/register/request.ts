import {RegisterObject} from "./type.ts";
import {genericFetchWithBody} from "../../common/request/request.ts";

export const register = (registerObject: RegisterObject) => genericFetchWithBody<RegisterObject>("/auth/register", 'POST', registerObject)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on register");
    }
  })