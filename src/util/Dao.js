import data from "../data.json";

export default function fetchData() {
    return data.features;
}
export function fetchDataById(ids) {
    var arr = [];
    for (var i = 0; i < data.features.length; i++) {
        for (var j = 0; j < ids.length; j++) {
            if (data.features[i].properties.id == ids[j]) {
                arr.push(data.features[i]);
            }
        }
    }
    return arr;
}
