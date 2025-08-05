export function handleMath(expression: string): string {
  try {
    const safeExpr = expression.replace(/[^-()\d/*+.]/g, "");
    const result = eval(safeExpr);
    return `The result is: ${result}`;
  } catch (err) {
    return "Could not evaluate the expression.";
  }
}
