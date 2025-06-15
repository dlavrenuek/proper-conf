type ParserProps = {};

type ValueParser = <Type>(props: ParserProps) => Type;

type ValueArrayType = <Type>(
  valueParser: (props: ParserProps) => Type,
) => (props: ParserProps) => Type[];

export const string = () => () => "";

export const number = () => () => 123;

export const array =
  <Type>(valueParser: (props: ParserProps) => Type) =>
  (): Type[] => [];

type Conf = {
  [key: string]: ((props: ParserProps) => unknown) | Conf;
};

type Result<C extends Conf> = {
  [key in keyof C]: C[key] extends Conf
    ? Result<C[key]>
    : C[key] extends () => infer R
      ? R
      : never;
};

// @ts-ignore
const properConf = <C extends Conf>(conf: C): Result<C> => null;

const test = properConf({
  port: number(),
  addr: string(),
  whitelist: array(string()),
  someObj: {
    asd: () => new Date(),
  },
});
