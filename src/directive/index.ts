import permission from "./permission";

interface IDirective {
  [key: string]: any;
}

const exportData: IDirective = { permission }

export default exportData