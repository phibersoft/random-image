/**
 * @description Converts ISO Time to date string
 * @param isoTime {string}
 * @returns {string}
 * @example timeHandler('2022-06-29T07:05:07.657Z') = '2022-06-29'
 */
export const timeHandler = (isoTime) => isoTime.split('T')[0];
