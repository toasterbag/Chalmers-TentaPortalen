export type JsonPrimitive = string | number | boolean;

export type JsonObject = { [Key in string]?: JsonValue };

export type JsonArray = Array<JsonValue>;

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export type JsonResponse = JsonArray | JsonObject;
