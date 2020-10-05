import _ from 'lodash';
import proj4 from 'proj4';

proj4.defs([
    ["EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],
    ["EPSG:3826", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
    ["EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs"]
]);

// 傳入數字及座標
const transferCoordinate = (epsgCodeFrom, epsgCodeTo, coordinate) => proj4(`EPSG:${epsgCodeFrom}`, `EPSG:${epsgCodeTo}`, coordinate);



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
const flattenToPoints = (points, reverse = false, copy = true) => {
    if (copy) {
        points = _.cloneDeep(points);
    }
    let flattenResult = points.reduce((allPoints, point) => Array.isArray(point[0]) ?
        allPoints.concat(flattenToPoints(point, reverse, copy)) : allPoints.concat([point]), []);
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
    /*
    取得array的深度
    */
const getArrayDepth = value =>
    Array.isArray(value) ?
    1 + Math.max(...value.map(getArrayDepth)) : 0
    /*
     * UUID的產生法
     */
const uuid = () => {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default {
    flattenToLines,
    flattenToPoints,
    flattenDeep,
    removeDuplicatePoint,
    getArrayDepth,
    transferCoordinate,
    uuid,
}