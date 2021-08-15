module.exports = {
  rules: {
    'no-undef': 2, // 禁用未声明的变量
    'no-shadow': 0, // 禁止影子变量(ts需要禁用这个基本规则，否则会出现误报)
    "@typescript-eslint/no-shadow": 2, // 禁止变量声明与外层作用域的变量同名
    //'no-use-before-define': 2, // 不允许在变量定义之前使用它们
    'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
    'no-redeclare': 2, // 禁止多次声明同一变量
    'init-declarations': 0, // 要求或禁止 var 声明中的初始化
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字
    'no-new-require': 2, // 禁止调用 require 时使用 new 操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    //'no-useless-constructor': 2, // 禁用不必要的构造函数
    //'new-cap': 2, //构造函数首字母大写
    'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现
    '@typescript-eslint/adjacent-overload-signatures': 2, // 要求成员重载是连续的
  }
}