export type JsonPrimitive = string | number | boolean | null | undefined | Date;

export type JsonObject = {
  [Key in string]?: JsonValue | JsonObject | JsonArray;
};

export type JsonArray = Array<JsonValue>;

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;
