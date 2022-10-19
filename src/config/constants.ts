interface IConstantsConfig {
  PAGE_SIZE: number,
  PAGE_NUM: number,
  page_SIZE_LIST: number[],
  LAYOUT: string,
}

const ConstantsConfig: IConstantsConfig = {
  PAGE_SIZE: 10,
  PAGE_NUM: 1,
  page_SIZE_LIST: [10, 30, 50, 100],
  LAYOUT: "total, sizes, prev, pager, next, jumper",
}

export default ConstantsConfig;