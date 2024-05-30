import {genericFetchWithBody} from "../../common/request/request.ts";
import {LoginObject} from "./type.ts";

export const login = (loginObject: LoginObject) => genericFetchWithBody<LoginObject>("/auth/login", 'POST', loginObject)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error request on Login");
    }
  })