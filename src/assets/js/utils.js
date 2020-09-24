import _ from 'lodash'
/** 
 * 不管是幾維陣列，攤平成一個所有座標點的一維陣列
 * ex. [[[[1,2],[2,3]]]] => [1,2,2,3]
 * @param: coordinates
 * @return: Array
 */
const flattenDeep = points =>
    _.cloneDeep(points).reduce((allPoints, point) => Array.isArray(point) ?
        allPoints.concat(flattenDeep(point)) : allPoints.concat(point), []);

/** 
 * 不管是幾維陣列，攤平成一個所有座標點的一維陣列
 * ex. [[[[1,2],[2,3]]]] => [[1,2], [2,3]]
 * @param: coordinates
 * @return: Array
 */
const flattenToPoints = (points, reverse = false) => {
    let flattenResult = _.cloneDeep(points).reduce((allPoints, point) => Array.isArray(point[0]) ?
        allPoints.concat(flattenToPoints(point)) : allPoints.concat([
            [...point]
        ]), []);
    if (reverse) {
        return flattenResult.map(point => point.reverse());
    }
    return flattenResult;
};

/** 
 * 不管是幾維陣列，攤平成含所有線段的陣列
 * ex. [[[[1,2],[2,3]], [[3,4], [5,6]]]] => [[[1,2], [2,3]], [[3,4], [5,6]]]
 * [[1,2], [2,3]] 是第一條線段。[[3,4], [5,6]] 是第二條線段 
 * @param: coordinates
 * @return: Array
 */
const flattenToLines = points =>
    _.cloneDeep(points).reduce((allPoints, point) => Array.isArray(point[0][0]) ?
        allPoints.concat(flattenToLines(point)) : allPoints.concat([point]), []);

const removeDuplicatePoint = coordinates => {
    // 去掉重覆的點，下面的寫法無法去除重覆的點，因為[2,3] != [2,3]
    let array4compare = [];
    return _.cloneDeep(coordinates).filter(coordinate => {
        const strCoordinate = JSON.stringify(coordinate);
        if (array4compare.includes(strCoordinate))
            return false;
        array4compare.push(strCoordinate);
        return true;
    });

}

export default {
    flattenToLines,
    flattenToPoints,
    flattenDeep,
    removeDuplicatePoint
}