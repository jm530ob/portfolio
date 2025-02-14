

export function parseText(html: string | null): string | null {
  if (html) {
    let output = html.replace(/\n/g, "<br>");

    //todo: if figure is present do that first
    const urlImagePattern = /(?<img>(?<tag>!\[image\])\((?<url>https?:\/\/.+)\))/gm;
    output = output.replace(urlImagePattern, "<img src=$3 >");

    return output;
  }
  return null;
}



