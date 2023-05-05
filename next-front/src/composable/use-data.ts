import { csvDataItem, csvKeys } from "../components/cardList.vue"
import {isEmpty} from 'lodash-es';
export function fetchRawData(): Promise<string>{
    return new Promise((resolve,reject) => {
        fetch('https://raw.githubusercontent.com/FunctionSir/TransDefenseProject/master/%E6%88%92%E7%BD%91%E7%98%BE(%E5%8F%AF%E8%83%BD%E5%90%AB%E6%89%AD%E8%BD%AC%E6%B2%BB%E7%96%97)%E6%9C%BA%E6%9E%84%E5%88%97%E8%A1%A8.csv')
        .then((response)=>{
            response.text()
            .then((data)=>{
                resolve(data)
            })
        })
        .catch((reason) => {
            reject(reason)
        })
    })
}
export async function useData(raw?: string): Promise<{ header: csvKeys; content: (csvDataItem|null)[]; total: number}>{
    let rawData = raw;
    if (!rawData){
        rawData = await fetchRawData();
    }
    const dataArray = rawData.split('\n');
    const headerMapping = {
        '#': 'id',
        '名称': 'school_name',
        '相关网页': 'website',
        '地理位置(机构声称/其他来源)(仅已知)': 'location',
        '来源': 'data_source',
        '可能存在对跨性别者的迫害': 'persecute',
        '相关证据': 'evidence',
        '待审核': 'audit'
    }
    const zh2enMapping = Object.values(headerMapping);
    const header = dataArray[0].split(',')
                    .map((zh, idx) => {
                        return {
                            [zh2enMapping[idx]]: {
                                name: zh
                            }
                        }
                    })
                    .reduce((pre,cur) => {
                        return {
                            ...pre,
                            ...cur
                        }
                    }) as csvKeys;
    const content = dataArray.slice(1)
                    .map((item) => item.split(','))
                    .map((rawDataArray: string[]) => {
                        const maybeCsvDataItem:{}|csvDataItem = rawDataArray.reduce((pre, cur, idx) => {
                            if (isEmpty(cur)){
                                return {};
                            }
                            return {
                                ...pre,
                                [zh2enMapping[idx]]: cur
                            }
                        }, {});
                        if (isEmpty(maybeCsvDataItem)){
                            return null;
                        } else {
                            return maybeCsvDataItem as csvDataItem;
                        }
                    })
                    .filter((val) => val !== null);
    console.log(content)
    const total = content.length;
    return {
        header,
        content,
        total
    }
}