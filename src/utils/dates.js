 export function getFormatDate(completedDate) {
   const longOptions = { year: 'numeric', month: 'long', day: 'numeric' };
   const date1 = new Intl.DateTimeFormat('en-US', longOptions).format(new Date(completedDate));
   return `Completed on ${date1}`;
 }