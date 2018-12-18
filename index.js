import fs from 'fs';
import recast from 'recast';
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;
import { print } from './printUtils';

const data = fs.readFileSync('./testData.js', 'utf8');
const n = recast.types;
const b = recast.types.builders;



// let c = b.functionDeclaration(
//   b.identifier('add'),
//   [b.identifier('a'), b.identifier('b')],
//   b.blockStatement(
//     [
//       b.returnStatement(
//         b.binaryExpression('+', b.identifier('a'), b.identifier('b'))
//       ),
//     ]
//   )
// );
const ast = recast.parse(data).program;
n.visit(ast, {
  visitFunctionDeclaration: function (path) {
    path.get('body', 'body').unshift(makeConsole(`'${path.node.id.name}'`));
    this.traverse(path);
  }
});
function makeConsole(param) {
  const d = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.identifier('console'),
        b.identifier('log'),
      ),
      [b.identifier(param)],
    )
  );
  return d;
}
console.log(recast.print(ast).code);
// fs.writeFileSync();
// print(makeConsole('cc'));
