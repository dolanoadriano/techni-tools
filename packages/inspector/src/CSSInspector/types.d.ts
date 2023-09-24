export type StyleDeclarationSchemaValue = string | RegExp | boolean;
export type StyleDeclarationSchemaCallback = (value: string) => boolean;
export type StyleDeclarationSchema = Partial<{
    [key in keyof CSSStyleRule["style"]]: StyleDeclarationSchemaValue | StyleDeclarationSchemaCallback;
}>;
