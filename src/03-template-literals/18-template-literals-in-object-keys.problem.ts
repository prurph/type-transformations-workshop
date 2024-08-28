import { Equal, Expect } from "../helpers/type-utils";

type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

// Record syntax
type ObjectOfKeys = Record<TemplateLiteralKey, string>;
// Object syntax
type _ObjectOfKeys = { [K in TemplateLiteralKey]: string };

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >,
  Expect<
    Equal<
      _ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >
];
