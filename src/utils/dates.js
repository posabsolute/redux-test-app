 export function getFormatDate(completedDate, notext = false) {
   const longOptions = { year: 'numeric', month: 'long', day: 'numeric' };
   const date1 = completedDate ? new Intl.DateTimeFormat('en-US', longOptions).format(new Date(completedDate)) : '';
   return notext ? date1 : `Completed on ${date1}`;
 }

 export function getFormatDateTime(completedDate) {
   const longOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
   return completedDate ? new Intl.DateTimeFormat('en-US', longOptions).format(new Date(completedDate)) : '';
 }
