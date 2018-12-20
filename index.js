import fs from 'fs';
import recast from 'recast';

const data = fs.readFileSync('./testData.js', 'utf8');
const n = recast.types;
const b = recast.types.builders;

const ast = recast.parse(data).program;
n.visit(ast, {
  visitFunctionDeclaration: function (path) {
    path.get('body', 'body').unshift(makeConsole(`'${path.node.id.name}'`));
    // path.get('body').unshift(makeConsole(`'${path.node.id.name}'`));
    this.traverse(path);
  },
  visitFunctionExpression: function (path) {
    // TODO use check
    if (path.parent.value.type === 'VariableDeclarator') {
      path.get('body', 'body').unshift(makeConsole(`'${path.parent.node.id.name}'`))
    }
    if (path.parent.value.type === 'MethodDefinition') {
      path.get('body', 'body').unshift(makeConsole(`'${path.parent.node.key.name}'`))
    }
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
      [b.identifier(`${param}`)],
    )
  );
  return d;
}
const modifiedCode = recast.print(ast).code;
fs.writeFileSync('./testData.js', modifiedCode, 'utf-8');


