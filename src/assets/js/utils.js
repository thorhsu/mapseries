/** 
 * 不管是幾維陣列，攤平成一個所有座標點的一維陣列
 * ex. [[[[1,2],[2,3]]]] => [1,2,2,3]
 * @param: coordinates
 * @return: Array
 */
const flattenDeep = points =>
    points.reduce((allPoints, point) => Array.isArray(point) ?
        allPoints.concat(flattenDeep(point)) : allPoints.concat(point), []);

/** 
 * 不管是幾維陣列，攤平成一個所有座標點的一維陣列
 * ex. [[[[1,2],[2,3]]]] => [[1,2], [2,3]]
 * @param: coordinates
 * @return: Array
 */
const flattenToPoints = points =>
    points.reduce((allPoints, point) => Array.isArray(point[0]) ?
        allPoints.concat(flattenToPoints(point)) : allPoints.concat([point]), []);


/** 
 * 不管是幾維陣列，攤平成含所有線段的陣列
 * ex. [[[[1,2],[2,3]], [[3,4], [5,6]]]] => [[[1,2], [2,3]], [[3,4], [5,6]]]
 * [[1,2], [2,3]] 是第一條線段。[[3,4], [5,6]] 是第二條線段 
 * @param: coordinates
 * @return: Array
 */
const flattenToLines = points =>
    points.reduce((allPoints, point) => Array.isArray(point[0][0]) ?
        allPoints.concat(flattenToLines(point)) : allPoints.concat([point]), []);

export default {
    flattenToLines,
    flattenToPoints
}