import {parse, stringify} from 'query-string';

export function querySearch(path, filters){
    const params = parse(path);

    function has(name){
        return filters[name]!=='' && filters[name]!=null;
    }

    for(let key in filters){
        if(has(key)){
            params[key] = filters[key];
        } else {
            delete params[key];
        }
    }
    const query =stringify(params);

    return query ? "?"+query : "";
}