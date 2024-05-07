import {RegisterObject} from "./type.ts";
import {genericFetch} from "../../common/request/request.ts";

export const register = (registerObject: RegisterObject) => genericFetch<RegisterObject>("/auth/register", 'POST', registerObject)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on register");
    }
  })