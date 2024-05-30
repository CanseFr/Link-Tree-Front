import {useEffect} from "react";
import { useParams} from "react-router-dom";
import {getUrlOwner} from "./request.ts";

export const LinkTreePage = () => {

  const { url_owner } = useParams();

  useEffect(() => {
    getUrlOwner(url_owner!)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }, [url_owner]);

  return (
    <>
    </>
  )
}