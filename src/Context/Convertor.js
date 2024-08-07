
export const convertView = (views) => {
    if (views >= 1000000) {
      return Math.floor(views / 1000000) + "M"
    }
    else if (views >= 1000) {
      return Math.floor(views / 1000) + "K"
    }
    else {
      return views;
    }
}

export const convertTextToHtml = (text) => {
  // Replace new lines with <br> tags
  let htmlText = text.replace(/\n/g, '<br>');

  // Convert bold text (**bold** or __bold__)
  htmlText = htmlText.replace(/(\*\*|__)(.*?)\1/g, '<b>$2</b>');

  // Convert italic text (*italic* or _italic_)
  htmlText = htmlText.replace(/(\*|_)(.*?)\1/g, '<i>$2</i>');

  // Convert inline code (`code`)
  htmlText = htmlText.replace(/`(.*?)`/g, '<code>$1</code>');

  // Convert links [text](url)
  htmlText = htmlText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  return htmlText;
};
