import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends { parse: () => infer P }
  ? P
  : T extends { extract: () => infer P }
  ? P
  : T extends () => infer P
  ? P
  : never;

// Nice thing about this style is it avoids nested ternaries and is
// therefore arguably easier to parse, no pun intended!
type GetParserResultUnion<T> = T extends
  | { parse: () => infer P }
  | { extract: () => infer P }
  | (() => infer P)
  ? P
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>,
  Expect<Equal<GetParserResultUnion<typeof parser1>, number>>,
  Expect<Equal<GetParserResultUnion<typeof parser2>, string>>,
  Expect<Equal<GetParserResultUnion<typeof parser3>, boolean>>
];
