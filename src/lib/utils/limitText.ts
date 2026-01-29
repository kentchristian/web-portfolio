

export const limitText = (text: string, maxRange: number) => {  
  const formattedText = text.length > maxRange  
  ? `${text.slice(0, maxRange)}...` 
  : text; 
  return formattedText;
}