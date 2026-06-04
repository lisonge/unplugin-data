import serialize from 'serialize-javascript';

const findSafeIdentifier = (idPrefix: string, code: string): string => {
  if (!code.includes(idPrefix)) return idPrefix;
  let i = 1;
  let newId = '';
  while (true) {
    newId = idPrefix + i.toString(36);
    if (!code.includes(newId)) {
      return newId;
    }
  }
};

export function stringifyModule(mod: any): string {
  const modCode = serialize(mod);
  const modId = findSafeIdentifier('__module', modCode);
  const codes = [`const ${modId} = ${modCode}`];
  return codes
    .concat(
      Object.keys(mod).map((k) => {
        if (k === 'default') {
          return `export default ${modId}.${k}`;
        } else {
          return `export const ${k} = ${modId}.${k}`;
        }
      }),
    )
    .join(';\n');
}
