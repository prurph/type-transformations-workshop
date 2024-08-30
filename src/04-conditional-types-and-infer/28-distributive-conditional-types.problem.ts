import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

// This doesn't work: compares the entire Fruit union against just apple | banana,
// therefore Fruit does *not* extend apple | banana in this context and you get never.
type _AppleOrBanana = Fruit extends "apple" | "banana" ? Fruit : never;

// Instead, using a generic context, you get "distributive conditinoal types", where
// the condition is _applied to each member of the union_, not the entire union.
type GetAppleBanana<T> = T extends "apple" | "banana" ? T : never;
type AppleOrBanana = GetAppleBanana<Fruit>;

// Alternate syntax: capture each member of Fruit using generic inline, then distributivity
// applies to the condition.
type AppleOrBananaInline = Fruit extends infer T
  ? T extends "apple" | "banana"
    ? T
    : never
  : never;

type tests = [
    Expect<Equal<AppleOrBanana, "apple" | "banana">>
    Expect<Equal<AppleOrBananaInline, "apple" | "banana">>,
];
