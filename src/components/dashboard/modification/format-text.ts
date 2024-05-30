export const formatUrlToTitle = (pathUrl: string | undefined) => {
  if (pathUrl) {
    const firstLetterToUpperCase = pathUrl[1].charAt(0).toUpperCase();
    const urlWithOutSlash = pathUrl.split("/")[1]
    const urlWithOutFirstLetter = urlWithOutSlash.slice(1, urlWithOutSlash.length)
    return firstLetterToUpperCase.concat(urlWithOutFirstLetter)
  }
}