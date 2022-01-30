import { readFileSync } from 'fs';

const loadJson = async ({ filePath }: any) => {
  const buffer = readFileSync(filePath);
  const data = JSON.parse(buffer.toString());
  return { data };
}

export default loadJson;
