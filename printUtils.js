import recast from 'recast';

export function print(input) {
  console.log(recast.print(input).code)
}
